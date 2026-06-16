import { PrismaClient as TenantPrismaClient } from '../packages/database/dist/generated/tenant/index.js';
import { PatientsService } from '../apps/tenant/api/dist/patients/patients.service.js';
import { HouseholdsService } from '../apps/tenant/api/dist/households/households.service.js';
import { ConsultationsService } from '../apps/tenant/api/dist/consultations/consultations.service.js';
import { AppointmentsService } from '../apps/tenant/api/dist/appointments/appointments.service.js';
import { ReferralsService } from '../apps/tenant/api/dist/referrals/referrals.service.js';
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
  console.log('[Test EMR] Connected to tenant database.');

  // Clean up table data for idempotency
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
  console.log('[Test EMR] Cleaned existing clinical data.');

  const patientsService = new PatientsService(prisma);
  const householdsService = new HouseholdsService(prisma);
  const consultationsService = new ConsultationsService(prisma);
  const appointmentsService = new AppointmentsService(prisma);
  const referralsService = new ReferralsService(prisma);

  // 1. Register Patient 1
  console.log('1. Registering Patient 1...');
  const patient1 = await patientsService.create({
    firstName: 'Juan',
    lastName: 'Dela Cruz',
    sex: 'MALE',
    birthDate: '1990-01-15',
    orgType: 'PRIVATE',
    facilityId,
    createdById
  });
  console.log(`Created Patient 1: ${patient1.firstName} ${patient1.lastName} (PIN: ${patient1.pin})`);

  // 2. Register duplicate check trigger
  console.log('2. Verifying duplicate matching check...');
  try {
    await patientsService.create({
      firstName: 'Juan',
      lastName: 'Dela Cruz',
      sex: 'MALE',
      birthDate: '1990-01-15',
      orgType: 'PRIVATE',
      facilityId,
      createdById
    });
    assert.fail('Should have thrown DUPLICATE_WARNING error');
  } catch (err) {
    assert.ok(err.response?.message === 'DUPLICATE_WARNING', 'Correct duplicate warning triggered');
    console.log('Duplicate warning validation passed.');
  }

  // 3. Force save a second patient
  console.log('3. Registering Patient 2 (Pedro)...');
  const patient2 = await patientsService.create({
    firstName: 'Pedro',
    lastName: 'Penduko',
    sex: 'MALE',
    birthDate: '1992-06-20',
    orgType: 'PRIVATE',
    facilityId,
    createdById,
    forceSave: true
  });
  console.log(`Created Patient 2: ${patient2.firstName} ${patient2.lastName}`);

  // 4. Create household & relationship
  console.log('4. Registering Household and Relationships...');
  const household = await householdsService.createHousehold({
    address: '123 Main St Cebu City',
    barangayCode: '072217001',
    facilityId
  });

  const relationship = await householdsService.addRelationship({
    patientId: patient1.id,
    relatedPatientId: patient2.id,
    relationshipType: 'SPOUSE',
    householdId: household.id,
    isHead: true
  });
  console.log(`Registered relationship between patient 1 and 2: ${relationship.relationshipType}`);

  // 5. Start Consultation
  console.log('5. Creating Consultation in DRAFT...');
  const consultation = await consultationsService.create({
    natureOfVisit: 'GENERAL_CONSULTATION',
    modeOfTransaction: 'FACILITY',
    patientConsent: true,
    chiefComplaint: 'Headache and minor cough',
    patientId: patient1.id,
    facilityId,
    createdById
  });
  assert.strictEqual(consultation.status, 'DRAFT');
  console.log(`Created Consultation in status: ${consultation.status}`);

  // 6. Add Vitals and verify BMI
  console.log('6. Adding Vitals signs...');
  const vitals = await consultationsService.addVitals(consultation.id, {
    bpSystolic: 120,
    bpDiastolic: 80,
    temperatureCelsius: 36.8,
    heightCm: 175,
    weightKg: 70
  }, facilityId, createdById);

  assert.strictEqual(Number(vitals.bmi), 22.86);
  assert.strictEqual(vitals.bmiCategory, 'NORMAL');
  console.log(`Vitals added successfully. Calculated BMI: ${vitals.bmi} (Category: ${vitals.bmiCategory})`);

  // 7. Add Physical Exam
  console.log('7. Adding Physical Exam findings...');
  const exam = await consultationsService.addPhysicalExam(consultation.id, {
    systemName: 'Cardiovascular',
    findings: 'Normal rhythm, no murmurs',
    isNormal: true
  }, facilityId, createdById);
  console.log(`Physical exam added: ${exam.systemName}`);

  // 8. Add ICD-10 Diagnosis
  console.log('8. Adding ICD-10 diagnosis (Hypertension - I10)...');
  const diagnosis = await consultationsService.addDiagnosis(consultation.id, {
    icd10Code: 'I10',
    diagnosisType: 'FINAL',
    isPrimary: true,
    remarks: 'Pre-existing condition'
  }, facilityId, createdById);
  console.log(`Diagnosis added: ${diagnosis.icd10Code} (${diagnosis.icd10Description})`);

  // 9. Add Prescription
  console.log('9. Generating e-prescription...');
  const rx = await consultationsService.addPrescription(consultation.id, {
    validUntil: '2026-12-31',
    medicationOrders: [{
      medicineName: 'Amlodipine 5mg',
      dose: '1 tablet',
      frequency: 'Once a day',
      duration: '30 days',
      quantity: 30,
      instructions: 'Take in the morning'
    }]
  }, facilityId, createdById);
  assert.ok(rx.prescriptionToken.startsWith('RX-TOKEN-'), 'e-Prescription token format is correct');
  console.log(`Prescription created. Token: ${rx.prescriptionToken}`);

  // 10. Complete Consultation (Workflows lock verification)
  console.log('10. Completing consultation & verifying status lock...');
  const completedConsultation = await consultationsService.complete(consultation.id, facilityId);
  assert.strictEqual(completedConsultation.status, 'COMPLETED');

  try {
    await consultationsService.addVitals(consultation.id, {
      bpSystolic: 130,
      bpDiastolic: 90
    }, facilityId, createdById);
    assert.fail('Should have blocked writing to completed consultation');
  } catch (err) {
    assert.ok(err.message.includes('completed consultation'), 'Write blocker triggered correctly');
    console.log('Completion lock verified.');
  }

  // 11. Profile Merge
  console.log('11. Verifying profile merge...');
  const mergedSource = await patientsService.merge(patient2.id, patient1.id, facilityId);
  assert.strictEqual(mergedSource.isMerged, true);
  assert.strictEqual(mergedSource.mergedIntoId, patient1.id);
  console.log('Patient profile merge completed successfully.');

  // 12. Appointment Booking
  console.log('12. Booking Appointment...');
  const appointment = await appointmentsService.create({
    scheduledDate: '2026-07-01',
    scheduledTime: '10:00 AM',
    purpose: 'Routine Hypertension Follow-up',
    patientId: patient1.id,
    facilityId,
    createdById
  });
  console.log(`Appointment scheduled on: ${appointment.scheduledDate}`);

  // 13. Referrals
  console.log('13. Submitting Referral...');
  const referral = await referralsService.create(consultation.id, {
    referralType: 'CLINICAL',
    urgency: 'ROUTINE',
    referralReason: 'Cardiologist consult',
    referringFacilityId: facilityId,
    createdById
  });
  console.log(`Referral created: ${referral.id} (Status: ${referral.status})`);

  await prisma.$disconnect();
  console.log('[Test EMR] EMR Core flows validated successfully!');
}

main().catch((err) => {
  console.error('[Test EMR] Validation failed:', err);
  process.exit(1);
});
