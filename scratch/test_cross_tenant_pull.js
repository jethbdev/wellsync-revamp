import { PrismaClient as TenantPrismaClient } from '../packages/database/dist/generated/tenant/index.js';
import { PrismaClient as ControlPlanePrismaClient } from '../packages/database/dist/generated/control-plane/index.js';
import { EMRPullController } from '../apps/tenant/api/dist/patients/emr-pull.controller.js';
import { PatientsService } from '../apps/tenant/api/dist/patients/patients.service.js';
import { ConsultationsService } from '../apps/tenant/api/dist/consultations/consultations.service.js';
import { PluginRegistryService } from '../apps/tenant/api/dist/plugins/plugin-registry.service.js';
import assert from 'assert';

async function main() {
  // 1. Setup Prisma Clients
  const cavitePrisma = new TenantPrismaClient({
    datasources: { db: { url: 'postgresql://postgres@localhost:5432/healthbridge_tenant_cavite-clinic' } }
  });
  const cebuPrisma = new TenantPrismaClient({
    datasources: { db: { url: 'postgresql://postgres@localhost:5432/healthbridge_tenant_cebu-clinic' } }
  });
  const cpPrisma = new ControlPlanePrismaClient({
    datasources: { db: { url: 'postgresql://postgres@localhost:5432/healthbridge_control_plane' } }
  });

  await cavitePrisma.$connect();
  await cebuPrisma.$connect();
  await cpPrisma.$connect();
  console.log('[Test Cross-Tenant EMR] Connected to databases.');

  // Ensure organizations have correct slugs
  await cavitePrisma.organization.updateMany({
    data: { slug: 'cavite-clinic', name: 'Cavite Family Clinic' }
  });
  await cebuPrisma.organization.updateMany({
    data: { slug: 'cebu-clinic', name: 'Cebu Family Clinic' }
  });

  // Ensure both organizations are registered in the Control Plane
  await cpPrisma.cpOrganization.upsert({
    where: { slug: 'cavite-clinic' },
    update: { dbConnectionUri: 'postgresql://postgres@localhost:5432/healthbridge_tenant_cavite-clinic' },
    create: {
      name: 'Cavite Family Clinic',
      slug: 'cavite-clinic',
      type: 'PRIVATE_CLINIC',
      status: 'ACTIVE',
      billingPlan: 'ENTERPRISE',
      dbConnectionUri: 'postgresql://postgres@localhost:5432/healthbridge_tenant_cavite-clinic',
      dbSchemaVersion: '1.0.0'
    }
  });

  await cpPrisma.cpOrganization.upsert({
    where: { slug: 'cebu-clinic' },
    update: { dbConnectionUri: 'postgresql://postgres@localhost:5432/healthbridge_tenant_cebu-clinic' },
    create: {
      name: 'Cebu Family Clinic',
      slug: 'cebu-clinic',
      type: 'PRIVATE_CLINIC',
      status: 'ACTIVE',
      billingPlan: 'ENTERPRISE',
      dbConnectionUri: 'postgresql://postgres@localhost:5432/healthbridge_tenant_cebu-clinic',
      dbSchemaVersion: '1.0.0'
    }
  });

  const caviteFacility = await cavitePrisma.facility.findFirst();
  const cebuFacility = await cebuPrisma.facility.findFirst();
  const caviteUser = await cavitePrisma.user.findFirst();
  const cebuUser = await cebuPrisma.user.findFirst();

  const facility1 = caviteFacility.id;
  const facility2 = cebuFacility.id;
  const staffId1 = caviteUser.id;
  const staffId2 = cebuUser.id;

  // Clean up EMR databases and global Control Plane Patient Index
  await cpPrisma.cpPatientIndex.deleteMany();
  
  await cavitePrisma.fhsisServiceRecord.deleteMany();
  await cavitePrisma.vitalSigns.deleteMany();
  await cavitePrisma.diagnosis.deleteMany();
  await cavitePrisma.prescription.deleteMany();
  await cavitePrisma.scheduledVisit.deleteMany();
  await cavitePrisma.referral.deleteMany();
  await cavitePrisma.patientRelationship.deleteMany();
  await cavitePrisma.patientAllergy.deleteMany();
  await cavitePrisma.patientAlert.deleteMany();
  await cavitePrisma.patientSession.deleteMany();
  await cavitePrisma.patientAccount.deleteMany();
  await cavitePrisma.patientVerification.deleteMany();
  await cavitePrisma.consultations.deleteMany();
  await cavitePrisma.patient.deleteMany();

  await cebuPrisma.fhsisServiceRecord.deleteMany();
  await cebuPrisma.vitalSigns.deleteMany();
  await cebuPrisma.diagnosis.deleteMany();
  await cebuPrisma.prescription.deleteMany();
  await cebuPrisma.scheduledVisit.deleteMany();
  await cebuPrisma.referral.deleteMany();
  await cebuPrisma.patientRelationship.deleteMany();
  await cebuPrisma.patientAllergy.deleteMany();
  await cebuPrisma.patientAlert.deleteMany();
  await cebuPrisma.patientSession.deleteMany();
  await cebuPrisma.patientAccount.deleteMany();
  await cebuPrisma.patientVerification.deleteMany();
  await cebuPrisma.consultations.deleteMany();
  await cebuPrisma.patient.deleteMany();

  const registry1 = new PluginRegistryService(cavitePrisma);
  const patientsServiceCavite = new PatientsService(cavitePrisma, registry1);
  const consultationsServiceCavite = new ConsultationsService(cavitePrisma, registry1);

  // 2. Create patient in Cavite Clinic
  console.log('2. Creating patient in Cavite Clinic...');
  const patient = await patientsServiceCavite.create({
    firstName: 'Jose',
    lastName: 'Rizal',
    sex: 'MALE',
    birthDate: '1861-06-19',
    orgType: 'PRIVATE',
    facilityId: facility1,
    createdById: staffId1
  });

  console.log(`Patient created. PIN: ${patient.pin}`);

  // 3. Add clinical consultation details to Cavite EMR
  console.log('3. Writing clinical consultation in Cavite...');
  const consult = await consultationsServiceCavite.create({
    patientId: patient.id,
    facilityId: facility1,
    createdById: staffId1,
    natureOfVisit: 'GENERAL_CONSULTATION',
    modeOfTransaction: 'WALK_IN',
    chiefComplaint: 'Migraine and vision pain'
  });

  await consultationsServiceCavite.addVitals(consult.id, {
    heightCm: 165,
    weightKg: 60,
    bpSystolic: 120,
    bpDiastolic: 80
  }, facility1, staffId1);

  await consultationsServiceCavite.addDiagnosis(consult.id, {
    icd10Code: 'I10',
    diagnosisType: 'FINAL',
    isPrimary: true,
    remarks: 'Hypertension under watch'
  }, facility1, staffId1);

  await consultationsServiceCavite.complete(consult.id, facility1);

  // 4. Verify patient index exists on the Control Plane
  console.log('4. Checking Global Patient Directory on Control Plane...');
  // Sleep briefly to allow async fetch hook to complete
  await new Promise(resolve => setTimeout(resolve, 500));

  const cpIndex = await cpPrisma.cpPatientIndex.findUnique({
    where: { patientPin: patient.pin }
  });
  assert.ok(cpIndex, 'Global index was successfully registered on Control Plane');
  assert.strictEqual(cpIndex.firstName, 'Jose');
  assert.strictEqual(cpIndex.orgSlug, 'cavite-clinic');
  console.log('Global index verified.');

  // 5. Instantiate EMRPullController on Cebu Clinic context
  console.log('5. Triggering EMR Pull Request from Cebu Clinic...');
  const pullControllerCebu = new EMRPullController(cebuPrisma);

  const requestRes = await pullControllerCebu.pullRequest({ patientPin: patient.pin });
  assert.ok(requestRes.success);
  console.log(`Pull request initiated. OTP generated and logged.`);

  // Find generated OTP in the controller's cache
  // Import the map from controller module directly in test
  const { pendingPullRequests } = await import('../apps/tenant/api/dist/patients/emr-pull.controller.js');
  const pending = pendingPullRequests.get(patient.pin);
  assert.ok(pending);
  const otp = pending.otp;
  console.log(`Captured verification OTP code: ${otp}`);

  // 6. Confirm pull request with incorrect OTP -> should fail
  console.log('6. Confirming pull request with invalid OTP...');
  try {
    await pullControllerCebu.pullConfirm({
      patientPin: patient.pin,
      otp: '999999' // incorrect
    }, {
      session: {
        session: { facilityId: facility2 },
        user: { id: staffId2 }
      }
    });
    assert.fail('Should have blocked transfer on wrong OTP');
  } catch (err) {
    if (err.message && err.message.includes('Should have')) {
      throw err;
    }
    console.log('Caught expected error:', err.message || err);
    console.log('Invalid OTP challenge rejected as expected.');
  }

  // 7. Confirm pull request with correct OTP -> should sync records
  console.log('7. Confirming pull request with correct OTP...');
  const confirmRes = await pullControllerCebu.pullConfirm({
    patientPin: patient.pin,
    otp
  }, {
    session: {
      session: { facilityId: facility2 },
      user: { id: staffId2 }
    }
  });

  assert.ok(confirmRes.success);
  console.log('EMR record imported successfully.');

  // 8. Verify the patient clinical records exist in Cebu Clinic EMR
  console.log('8. Verifying records exist in Cebu Clinic EMR...');
  const cebuPatient = await cebuPrisma.patient.findFirst({
    where: { pin: patient.pin },
    include: {
      consultations: {
        include: {
          vitalSigns: true,
          diagnoses: true
        }
      }
    }
  });

  assert.ok(cebuPatient, 'Patient record exists in Cebu EMR');
  assert.strictEqual(cebuPatient.firstName, 'Jose');
  assert.strictEqual(cebuPatient.consultations.length, 1);
  assert.strictEqual(cebuPatient.consultations[0].chiefComplaint, 'Migraine and vision pain');
  assert.strictEqual(Number(cebuPatient.consultations[0].vitalSigns[0].heightCm), 165);
  assert.strictEqual(cebuPatient.consultations[0].diagnoses[0].icd10Code, 'I10');
  console.log('Imported patient vitals and diagnoses verified.');

  await cavitePrisma.$disconnect();
  await cebuPrisma.$disconnect();
  await cpPrisma.$disconnect();
  console.log('[Test Cross-Tenant EMR] All cross-tenant direct pull cases validated successfully!');
}

main().catch((err) => {
  console.error('[Test Cross-Tenant EMR] Verification failed:', err);
  process.exit(1);
});
