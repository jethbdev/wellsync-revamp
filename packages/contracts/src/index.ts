import { z } from "zod";

export const testVal = "contracts-working";

// ====================================================
// 1. Authentication & Session Schemas
// ====================================================

export const LoginInputSchema = z.object({
  email: z.string().email("Invalid email address"),
  password: z.string().min(6, "Password must be at least 6 characters"),
});

export type LoginInput = z.infer<typeof LoginInputSchema>;

export const ChangePasswordInputSchema = z.object({
  oldPassword: z.string().min(1, "Current password is required"),
  newPassword: z.string().min(6, "New password must be at least 6 characters"),
});

export type ChangePasswordInput = z.infer<typeof ChangePasswordInputSchema>;

export const ResetPasswordInputSchema = z.object({
  token: z.string().min(1, "Reset token is required"),
  newPassword: z.string().min(6, "New password must be at least 6 characters"),
});

export type ResetPasswordInput = z.infer<typeof ResetPasswordInputSchema>;

export const UserSessionSchema = z.object({
  userId: z.string().uuid(),
  email: z.string().email(),
  displayName: z.string().nullable(),
  roleName: z.string(),
  facilityId: z.string().uuid().nullable(),
  organizationId: z.string().uuid(),
  permissions: z.array(z.string()),
});

export type UserSession = z.infer<typeof UserSessionSchema>;

// ====================================================
// 2. Patient Directory & Relationships
// ====================================================

export const CreatePatientSchema = z.object({
  firstName: z.string().min(1, "First name is required"),
  lastName: z.string().min(1, "Last name is required"),
  middleName: z.string().optional(),
  suffix: z.string().optional(),
  sex: z.enum(["MALE", "FEMALE"]),
  birthDate: z.string().min(1, "Birth date is required"),
  birthPlace: z.string().optional(),
  civilStatus: z.string().optional(),
  bloodType: z.string().optional(),
  nationality: z.string().optional(),
  contactNumber: z.string().optional(),
  email: z.string().email("Invalid email").optional().or(z.literal("")),
  streetAddress: z.string().optional(),
  zipCode: z.string().optional(),

  // Profile Selection
  orgType: z.enum(["GOVERNMENT", "PRIVATE"]),

  // Government Profile Specifics
  philhealthNumber: z.string().optional(),
  nhtsId: z.string().optional(),
  pantawidId: z.string().optional(),
  familySerialNumber: z.string().optional(),
  regionCode: z.string().optional(),
  provinceCode: z.string().optional(),
  municipalityCode: z.string().optional(),
  barangayCode: z.string().optional(),

  // Private Profile Specifics
  insuranceProvider: z.string().optional(),
  insuranceNumber: z.string().optional(),
  hmoCardNumber: z.string().optional(),
  hmoPolicyHolder: z.string().optional(),
  hmoApprovalCode: z.string().optional(),
}).refine((data) => {
  if (data.orgType === "GOVERNMENT") {
    return !!data.regionCode && !!data.barangayCode;
  }
  return true;
}, {
  message: "Region and Barangay codes are required for government deployments",
  path: ["regionCode"],
});

export type CreatePatient = z.infer<typeof CreatePatientSchema>;

export const PatientAllergySchema = z.object({
  allergenType: z.string().min(1, "Allergen type is required"),
  allergenName: z.string().min(1, "Allergen name is required"),
  reaction: z.string().optional(),
  severity: z.enum(["LOW", "MODERATE", "SEVERE"]),
});

export type PatientAllergy = z.infer<typeof PatientAllergySchema>;

export const PatientAlertSchema = z.object({
  alertType: z.string().min(1, "Alert type is required"),
  description: z.string().optional(),
  isActive: z.boolean().default(true),
});

export type PatientAlert = z.infer<typeof PatientAlertSchema>;

export const HouseholdSchema = z.object({
  householdCode: z.string().min(1, "Household code is required"),
  address: z.string().min(1, "Address is required"),
  barangayCode: z.string().min(1, "Barangay code is required"),
});

export type Household = z.infer<typeof HouseholdSchema>;

export const PatientRelationshipSchema = z.object({
  relatedPatientId: z.string().uuid("Invalid related patient ID"),
  relationshipType: z.string().min(1, "Relationship type is required"),
  householdId: z.string().uuid().optional(),
  isHead: z.boolean().default(false),
});

export type PatientRelationship = z.infer<typeof PatientRelationshipSchema>;

// ====================================================
// 3. Consultations & SOAP TIMELINES
// ====================================================

export const CreateConsultationSchema = z.object({
  natureOfVisit: z.string().min(1, "Nature of visit is required"),
  modeOfTransaction: z.string().min(1, "Mode of transaction is required"),
  patientConsent: z.boolean().default(true),
  chiefComplaint: z.string().min(1, "Chief complaint is required"),
  historyOfIllness: z.string().optional(),
  treatmentPlan: z.string().optional(),
  followUpInstructions: z.string().optional(),
});

export type CreateConsultation = z.infer<typeof CreateConsultationSchema>;

export const VitalSignsSchema = z.object({
  bpSystolic: z.number().int().min(40).max(250).optional(),
  bpDiastolic: z.number().int().min(30).max(180).optional(),
  bpAssessment: z.string().optional(),
  respiratoryRate: z.number().int().min(5).max(60).optional(),
  temperatureCelsius: z.number().min(30).max(45).optional(),
  heartRate: z.number().int().min(30).max(220).optional(),
  oxygenSaturation: z.number().min(50).max(100).optional(),
  heightCm: z.number().min(20).max(250).optional(),
  weightKg: z.number().min(1).max(300).optional(),
  bmi: z.number().optional(),
  bmiCategory: z.string().optional(),
});

export type VitalSigns = z.infer<typeof VitalSignsSchema>;

export const PhysicalExamSchema = z.object({
  systemName: z.string().min(1, "System name is required"),
  findings: z.string().min(1, "Findings details are required"),
  isNormal: z.boolean().default(true),
});

export type PhysicalExam = z.infer<typeof PhysicalExamSchema>;

export const DiagnosisSchema = z.object({
  icd10Code: z.string().min(1, "ICD-10 code is required"),
  icd10Description: z.string().optional(),
  diagnosisType: z.enum(["WORKING", "FINAL"]),
  isPrimary: z.boolean().default(true),
  remarks: z.string().optional(),
});

export type Diagnosis = z.infer<typeof DiagnosisSchema>;

// ====================================================
// 4. Prescriptions & Medication Orders
// ====================================================

export const MedicationOrderSchema = z.object({
  productId: z.string().uuid().optional(),
  medicineName: z.string().min(1, "Medicine name is required"),
  dose: z.string().min(1, "Dose is required"),
  frequency: z.string().min(1, "Frequency is required"),
  duration: z.string().min(1, "Duration is required"),
  quantity: z.number().positive("Quantity must be greater than zero"),
  unit: z.string().optional(),
  instructions: z.string().optional(),
});

export type MedicationOrder = z.infer<typeof MedicationOrderSchema>;

export const CreatePrescriptionSchema = z.object({
  validUntil: z.string().optional(),
  medicationOrders: z.array(MedicationOrderSchema).min(1, "At least one medication order is required"),
});

export type CreatePrescription = z.infer<typeof CreatePrescriptionSchema>;

// ====================================================
// 5. Referrals & Appointments
// ====================================================

export const CreateReferralSchema = z.object({
  referralType: z.enum(["CLINICAL", "LABORATORY", "IMAGING"]),
  urgency: z.enum(["ROUTINE", "URGENT", "EMERGENCY"]),
  referralReason: z.string().min(1, "Reason for referral is required"),
  clinicalSummary: z.string().optional(),
  consentLevel: z.string().optional(),

  // Intra-org target facility
  receivingFacilityId: z.string().uuid().optional(),

  // Cross-org target coordinates
  receivingOrgSlug: z.string().optional(),
  receivingFacilityName: z.string().optional(),
});

export type CreateReferral = z.infer<typeof CreateReferralSchema>;

export const CreateAppointmentSchema = z.object({
  scheduledDate: z.string().min(1, "Appointment date is required"),
  scheduledTime: z.string().optional(),
  purpose: z.string().min(1, "Purpose of visit is required"),
});

export type CreateAppointment = z.infer<typeof CreateAppointmentSchema>;
