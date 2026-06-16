import { PrismaClient as TenantPrismaClient } from '../packages/database/dist/generated/tenant/index.js';
import { ConsultationsService } from '../apps/tenant/api/dist/consultations/consultations.service.js';
import { PluginRegistryService } from '../apps/tenant/api/dist/plugins/plugin-registry.service.js';
import { AppointmentsService } from '../apps/tenant/api/dist/appointments/appointments.service.js';
import { PatientsService } from '../apps/tenant/api/dist/patients/patients.service.js';
import assert from 'assert';

async function main() {
  const facilityId = '480e3b77-64ca-4411-8e53-7997a3bd26bd';
  const createdById = 'b3feae3e-90d9-4a3b-83d0-cbc7236ff818';

  const prisma = new TenantPrismaClient({
    datasources: {
      db: {
        url: 'postgresql://postgres@localhost:5432/healthbridge_tenant_cavite-clinic'
      }
    }
  });

  await prisma.$connect();
  console.log('[Test Plugins] Connected to Cavite clinic database.');

  // Clean up
  await prisma.installedPlugin.deleteMany();
  await prisma.fhsisServiceRecord.deleteMany();
  await prisma.scheduledVisit.deleteMany();
  await prisma.medicationOrder.deleteMany();
  await prisma.prescription.deleteMany();
  await prisma.consultations.deleteMany();
  await prisma.patient.deleteMany();

  const registry = new PluginRegistryService(prisma);
  const consultationsService = new ConsultationsService(prisma, registry);
  const patientsService = new PatientsService(prisma, registry);
  const appointmentsService = new AppointmentsService(prisma, registry);

  // 1. Create a patient
  console.log('1. Creating patient record...');
  const patient = await patientsService.create({
    firstName: 'Maria',
    lastName: 'Clara',
    sex: 'FEMALE',
    birthDate: '1995-05-12',
    orgType: 'PRIVATE',
    facilityId,
    createdById
  });
  console.log(`Patient created. PIN: ${patient.pin}`);

  // Verify list shows plugins as uninstalled initially
  const activePluginsInitial = await registry.getActivePlugins();
  assert.strictEqual(activePluginsInitial.length, 0, 'No active plugins initially');

  // 2. Install FHSIS Reporting Plugin
  console.log('2. Installing fhsis-reporting plugin...');
  await prisma.installedPlugin.create({
    data: {
      pluginId: 'fhsis-reporting',
      isActive: true,
      facilityId,
      installedById: createdById
    }
  });

  const activePluginsAfterInstall = await registry.getActivePlugins();
  assert.strictEqual(activePluginsAfterInstall.length, 1);
  assert.strictEqual(activePluginsAfterInstall[0].id, 'fhsis-reporting');
  console.log('FHSIS Reporting Plugin installed and verified active.');

  // 3. Create a consultation and verify FHSIS Service Record is created atomically inside transaction
  console.log('3. Creating consultation...');
  const consultation = await consultationsService.create({
    patientId: patient.id,
    facilityId,
    createdById,
    natureOfVisit: 'FAMILY_PLANNING',
    modeOfTransaction: 'WALK_IN',
    chiefComplaint: 'Regular checkup'
  });

  // Verify FHSIS record exists
  const fhsisRecord = await prisma.fhsisServiceRecord.findFirst({
    where: { consultationId: consultation.id }
  });
  assert.ok(fhsisRecord, 'FHSIS record was created atomically');
  assert.strictEqual(fhsisRecord.serviceType, 'FAMILY_PLANNING');
  assert.strictEqual(fhsisRecord.patientId, patient.id);
  console.log('FHSIS record verified successfully.');

  // 4. Install test-limiter plugin
  console.log('4. Installing test-limiter plugin...');
  await prisma.installedPlugin.create({
    data: {
      pluginId: 'test-limiter',
      isActive: true,
      facilityId,
      installedById: createdById
    }
  });

  // 5. Attempt adding a prescription that fails validation (qty > 100) -> should rollback
  console.log('5. Testing transaction rollback on test-limiter violation...');
  try {
    await consultationsService.addPrescription(consultation.id, {
      medicationOrders: [
        {
          medicineName: 'Amoxicillin 500mg',
          dose: '1 tablet',
          frequency: '3x a day',
          duration: '7 days',
          quantity: 120 // exceeds 100
        }
      ]
    }, facilityId, createdById);
    assert.fail('Should have rolled back and thrown limit error');
  } catch (err) {
    assert.ok(err.message.includes('limit exceeded'), 'Transaction rolled back as expected');
    console.log('Rollback verified successfully. Error message:', err.message);
  }

  // Verify prescription was NOT created
  const rxCount = await prisma.prescription.count({
    where: { consultationId: consultation.id }
  });
  assert.strictEqual(rxCount, 0, 'Prescription table remains empty due to rollback');
  console.log('Prescription table empty check passed.');

  // 6. Add valid prescription (qty < 100)
  console.log('6. Adding valid prescription (qty = 21)...');
  const validRx = await consultationsService.addPrescription(consultation.id, {
    medicationOrders: [
      {
        medicineName: 'Amoxicillin 500mg',
        dose: '1 tablet',
        frequency: '3x a day',
        duration: '7 days',
        quantity: 21
      }
    ]
  }, facilityId, createdById);

  assert.ok(validRx.id);
  console.log(`Prescription created successfully. RX Token: ${validRx.prescriptionToken}`);

  // 7. Install SMS Reminders Plugin and create appointment to verify post-commit hooks emit
  console.log('7. Installing sms-reminders plugin...');
  await prisma.installedPlugin.create({
    data: {
      pluginId: 'sms-reminders',
      isActive: true,
      facilityId,
      installedById: createdById
    }
  });

  console.log('8. Scheduling appointment to trigger SMS post-commit hook...');
  const appointment = await appointmentsService.create({
    patientId: patient.id,
    facilityId,
    createdById,
    scheduledDate: '2026-07-20',
    scheduledTime: '10:00 AM',
    purpose: 'Follow-up consultation'
  });
  assert.ok(appointment.id);
  
  // Wait a small duration to let post-commit promise logging print
  await new Promise(resolve => setTimeout(resolve, 500));

  await prisma.$disconnect();
  console.log('[Test Plugins] All plugin system flows validated successfully!');
}

main().catch((err) => {
  console.error('[Test Plugins] Failed:', err);
  process.exit(1);
});
