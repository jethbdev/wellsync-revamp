import { PrismaClient as TenantPrismaClient } from '../packages/database/dist/generated/tenant/index.js';
import { PatientPortalService } from '../apps/tenant/api/dist/patient-portal/patient-portal.service.js';
import { PatientsService } from '../apps/tenant/api/dist/patients/patients.service.js';
import { AppointmentsService } from '../apps/tenant/api/dist/appointments/appointments.service.js';
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
  console.log('[Test Phase 6] Connected to tenant database.');

  // Clean up table data for idempotency
  await prisma.patientAccount.deleteMany();
  await prisma.scheduledVisit.deleteMany();
  await prisma.referral.deleteMany();
  await prisma.medicationOrder.deleteMany();
  await prisma.prescription.deleteMany();
  await prisma.diagnosis.deleteMany();
  await prisma.physicalExam.deleteMany();
  await prisma.vitalSigns.deleteMany();
  await prisma.consultations.deleteMany();
  await prisma.patientRelationship.deleteMany();
  await prisma.household.deleteMany();
  await prisma.patient.deleteMany();

  const patientsService = new PatientsService(prisma);
  const portalService = new PatientPortalService(prisma);
  const appointmentsService = new AppointmentsService(prisma);

  // 1. Create a patient record via clinic staff service
  console.log('1. Creating patient record...');
  const patient = await patientsService.create({
    firstName: 'Juan',
    lastName: 'Dela Cruz',
    sex: 'MALE',
    birthDate: '1990-01-15',
    orgType: 'PRIVATE',
    facilityId,
    createdById
  });
  console.log(`Patient created. PIN: ${patient.pin}, Birthdate: 1990-01-15`);

  // 2. Perform Claim Profile
  console.log('2. Claiming patient profile...');
  const claimedPatient = await portalService.claim({
    pin: patient.pin,
    email: 'juan.delacruz@patient.dev',
    passwordHashOrPlain: 'securepassword123',
    birthDate: '1990-01-15'
  });

  assert.strictEqual(claimedPatient.email, 'juan.delacruz@patient.dev');
  assert.strictEqual(claimedPatient.portalAccountId, patient.id);
  console.log('Patient profile successfully claimed.');

  // Verify duplicate claim throws error
  console.log('2b. Verifying double claim blocker...');
  try {
    await portalService.claim({
      pin: patient.pin,
      email: 'another@patient.dev',
      passwordHashOrPlain: 'password',
      birthDate: '1990-01-15'
    });
    assert.fail('Should have blocked double-claim');
  } catch (err) {
    assert.ok(err.message.includes('claimed'), 'Double claim blocked correctly');
    console.log('Double claim blocker verified.');
  }

  // 3. Query Dashboard Profile
  console.log('3. Fetching claimed patient portal profile...');
  const profile = await portalService.getProfile(patient.id);
  assert.strictEqual(profile.firstName, 'Juan');
  assert.strictEqual(profile.email, 'juan.delacruz@patient.dev');
  console.log('Patient portal profile retrieval verified.');

  // 4. Appointment Confirm & Cancel workflows
  console.log('4. Testing appointment confirm/cancel states...');
  const visit = await appointmentsService.create({
    scheduledDate: '2026-08-01',
    scheduledTime: '2:00 PM',
    purpose: 'Routine check',
    patientId: patient.id,
    facilityId,
    createdById
  });

  const confirmedVisit = await portalService.updateAppointmentStatus(visit.id, patient.id, 'CONFIRMED');
  assert.strictEqual(confirmedVisit.status, 'CONFIRMED');
  console.log('Appointment confirmation verified.');

  const cancelledVisit = await portalService.updateAppointmentStatus(visit.id, patient.id, 'CANCELLED');
  assert.strictEqual(cancelledVisit.status, 'CANCELLED');
  console.log('Appointment cancellation verified.');

  // 5. Test Audit Log insertion
  console.log('5. Writing manual audit log...');
  const audit = await prisma.auditLog.create({
    data: {
      userId: createdById,
      facilityId,
      action: 'TEST_AUDIT_ACTION',
      tableName: 'patients',
      recordId: patient.id,
      newValues: { pin: patient.pin },
      ipAddress: '127.0.0.1'
    }
  });
  assert.ok(audit.id > 0n);
  console.log(`Audit log written. ID: ${audit.id.toString()}`);

  await prisma.$disconnect();
  console.log('[Test Phase 6] Phase 6 flows validated successfully!');
}

main().catch((err) => {
  console.error('[Test Phase 6] Validation failed:', err);
  process.exit(1);
});
