
Object.defineProperty(exports, "__esModule", { value: true });

const {
  Decimal,
  objectEnumValues,
  makeStrictEnum,
  Public,
  getRuntime,
  skip
} = require('./runtime/index-browser.js')


const Prisma = {}

exports.Prisma = Prisma
exports.$Enums = {}

/**
 * Prisma Client JS version: 5.22.0
 * Query Engine version: 605197351a3c8bdd595af2d2a9bc3025bca48ea2
 */
Prisma.prismaVersion = {
  client: "5.22.0",
  engine: "605197351a3c8bdd595af2d2a9bc3025bca48ea2"
}

Prisma.PrismaClientKnownRequestError = () => {
  const runtimeName = getRuntime().prettyName;
  throw new Error(`PrismaClientKnownRequestError is unable to run in this browser environment, or has been bundled for the browser (running in ${runtimeName}).
In case this error is unexpected for you, please report it in https://pris.ly/prisma-prisma-bug-report`,
)};
Prisma.PrismaClientUnknownRequestError = () => {
  const runtimeName = getRuntime().prettyName;
  throw new Error(`PrismaClientUnknownRequestError is unable to run in this browser environment, or has been bundled for the browser (running in ${runtimeName}).
In case this error is unexpected for you, please report it in https://pris.ly/prisma-prisma-bug-report`,
)}
Prisma.PrismaClientRustPanicError = () => {
  const runtimeName = getRuntime().prettyName;
  throw new Error(`PrismaClientRustPanicError is unable to run in this browser environment, or has been bundled for the browser (running in ${runtimeName}).
In case this error is unexpected for you, please report it in https://pris.ly/prisma-prisma-bug-report`,
)}
Prisma.PrismaClientInitializationError = () => {
  const runtimeName = getRuntime().prettyName;
  throw new Error(`PrismaClientInitializationError is unable to run in this browser environment, or has been bundled for the browser (running in ${runtimeName}).
In case this error is unexpected for you, please report it in https://pris.ly/prisma-prisma-bug-report`,
)}
Prisma.PrismaClientValidationError = () => {
  const runtimeName = getRuntime().prettyName;
  throw new Error(`PrismaClientValidationError is unable to run in this browser environment, or has been bundled for the browser (running in ${runtimeName}).
In case this error is unexpected for you, please report it in https://pris.ly/prisma-prisma-bug-report`,
)}
Prisma.NotFoundError = () => {
  const runtimeName = getRuntime().prettyName;
  throw new Error(`NotFoundError is unable to run in this browser environment, or has been bundled for the browser (running in ${runtimeName}).
In case this error is unexpected for you, please report it in https://pris.ly/prisma-prisma-bug-report`,
)}
Prisma.Decimal = Decimal

/**
 * Re-export of sql-template-tag
 */
Prisma.sql = () => {
  const runtimeName = getRuntime().prettyName;
  throw new Error(`sqltag is unable to run in this browser environment, or has been bundled for the browser (running in ${runtimeName}).
In case this error is unexpected for you, please report it in https://pris.ly/prisma-prisma-bug-report`,
)}
Prisma.empty = () => {
  const runtimeName = getRuntime().prettyName;
  throw new Error(`empty is unable to run in this browser environment, or has been bundled for the browser (running in ${runtimeName}).
In case this error is unexpected for you, please report it in https://pris.ly/prisma-prisma-bug-report`,
)}
Prisma.join = () => {
  const runtimeName = getRuntime().prettyName;
  throw new Error(`join is unable to run in this browser environment, or has been bundled for the browser (running in ${runtimeName}).
In case this error is unexpected for you, please report it in https://pris.ly/prisma-prisma-bug-report`,
)}
Prisma.raw = () => {
  const runtimeName = getRuntime().prettyName;
  throw new Error(`raw is unable to run in this browser environment, or has been bundled for the browser (running in ${runtimeName}).
In case this error is unexpected for you, please report it in https://pris.ly/prisma-prisma-bug-report`,
)}
Prisma.validator = Public.validator

/**
* Extensions
*/
Prisma.getExtensionContext = () => {
  const runtimeName = getRuntime().prettyName;
  throw new Error(`Extensions.getExtensionContext is unable to run in this browser environment, or has been bundled for the browser (running in ${runtimeName}).
In case this error is unexpected for you, please report it in https://pris.ly/prisma-prisma-bug-report`,
)}
Prisma.defineExtension = () => {
  const runtimeName = getRuntime().prettyName;
  throw new Error(`Extensions.defineExtension is unable to run in this browser environment, or has been bundled for the browser (running in ${runtimeName}).
In case this error is unexpected for you, please report it in https://pris.ly/prisma-prisma-bug-report`,
)}

/**
 * Shorthand utilities for JSON filtering
 */
Prisma.DbNull = objectEnumValues.instances.DbNull
Prisma.JsonNull = objectEnumValues.instances.JsonNull
Prisma.AnyNull = objectEnumValues.instances.AnyNull

Prisma.NullTypes = {
  DbNull: objectEnumValues.classes.DbNull,
  JsonNull: objectEnumValues.classes.JsonNull,
  AnyNull: objectEnumValues.classes.AnyNull
}



/**
 * Enums
 */

exports.Prisma.TransactionIsolationLevel = makeStrictEnum({
  ReadUncommitted: 'ReadUncommitted',
  ReadCommitted: 'ReadCommitted',
  RepeatableRead: 'RepeatableRead',
  Serializable: 'Serializable'
});

exports.Prisma.OrganizationScalarFieldEnum = {
  id: 'id',
  name: 'name',
  slug: 'slug',
  type: 'type',
  status: 'status',
  billingEmail: 'billingEmail',
  createdAt: 'createdAt',
  updatedAt: 'updatedAt',
  allowCrossOrgReferrals: 'allowCrossOrgReferrals',
  referralCapacityStatus: 'referralCapacityStatus',
  referralGeographicScope: 'referralGeographicScope',
  acceptedReferralTypes: 'acceptedReferralTypes'
};

exports.Prisma.FacilityScalarFieldEnum = {
  id: 'id',
  organizationId: 'organizationId',
  nhfrCode: 'nhfrCode',
  name: 'name',
  facilityType: 'facilityType',
  regionCode: 'regionCode',
  provinceCode: 'provinceCode',
  municipalityCode: 'municipalityCode',
  barangayCode: 'barangayCode',
  address: 'address',
  contactNumber: 'contactNumber',
  email: 'email',
  logoUrl: 'logoUrl',
  leftSealUrl: 'leftSealUrl',
  rightSealUrl: 'rightSealUrl',
  reportHeaderProvince: 'reportHeaderProvince',
  reportHeaderOffice: 'reportHeaderOffice',
  isActive: 'isActive',
  createdAt: 'createdAt'
};

exports.Prisma.RegionScalarFieldEnum = {
  code: 'code',
  name: 'name'
};

exports.Prisma.ProvinceScalarFieldEnum = {
  code: 'code',
  name: 'name',
  regionCode: 'regionCode'
};

exports.Prisma.MunicipalityScalarFieldEnum = {
  code: 'code',
  name: 'name',
  provinceCode: 'provinceCode'
};

exports.Prisma.BarangayScalarFieldEnum = {
  code: 'code',
  name: 'name',
  municipalityCode: 'municipalityCode'
};

exports.Prisma.RoleScalarFieldEnum = {
  id: 'id',
  name: 'name',
  description: 'description',
  scope: 'scope',
  color: 'color',
  icon: 'icon'
};

exports.Prisma.PermissionScalarFieldEnum = {
  id: 'id',
  roleId: 'roleId',
  permission: 'permission'
};

exports.Prisma.UserScalarFieldEnum = {
  id: 'id',
  email: 'email',
  passwordHash: 'passwordHash',
  firstName: 'firstName',
  lastName: 'lastName',
  displayName: 'displayName',
  contactNumber: 'contactNumber',
  roleId: 'roleId',
  facilityId: 'facilityId',
  isActive: 'isActive',
  isAcceptingConsultations: 'isAcceptingConsultations',
  isFirstLogin: 'isFirstLogin',
  lastLoginAt: 'lastLoginAt',
  mfaEnabled: 'mfaEnabled',
  createdById: 'createdById',
  createdAt: 'createdAt',
  updatedAt: 'updatedAt',
  emailVerified: 'emailVerified',
  image: 'image'
};

exports.Prisma.PatientScalarFieldEnum = {
  id: 'id',
  facilityId: 'facilityId',
  pin: 'pin',
  prefix: 'prefix',
  firstName: 'firstName',
  lastName: 'lastName',
  middleName: 'middleName',
  suffix: 'suffix',
  sex: 'sex',
  birthDate: 'birthDate',
  birthPlace: 'birthPlace',
  civilStatus: 'civilStatus',
  bloodType: 'bloodType',
  nationality: 'nationality',
  religion: 'religion',
  ethnicGroup: 'ethnicGroup',
  isIndigenous: 'isIndigenous',
  regionCode: 'regionCode',
  provinceCode: 'provinceCode',
  municipalityCode: 'municipalityCode',
  barangayCode: 'barangayCode',
  streetAddress: 'streetAddress',
  zipCode: 'zipCode',
  contactNumber: 'contactNumber',
  email: 'email',
  emergencyContactName: 'emergencyContactName',
  emergencyContactPhone: 'emergencyContactPhone',
  emergencyContactRelationship: 'emergencyContactRelationship',
  philhealthNumber: 'philhealthNumber',
  philhealthCategory: 'philhealthCategory',
  philhealthStatus: 'philhealthStatus',
  nhtsId: 'nhtsId',
  isNhtsMember: 'isNhtsMember',
  pantawidId: 'pantawidId',
  is4psMember: 'is4psMember',
  familySerialNumber: 'familySerialNumber',
  insuranceProvider: 'insuranceProvider',
  insuranceNumber: 'insuranceNumber',
  hmoCardNumber: 'hmoCardNumber',
  hmoPolicyHolder: 'hmoPolicyHolder',
  hmoApprovalCode: 'hmoApprovalCode',
  photoUrl: 'photoUrl',
  status: 'status',
  isMerged: 'isMerged',
  mergedIntoId: 'mergedIntoId',
  portalAccountId: 'portalAccountId',
  createdById: 'createdById',
  createdAt: 'createdAt',
  updatedAt: 'updatedAt',
  emailVerified: 'emailVerified'
};

exports.Prisma.PatientAllergyScalarFieldEnum = {
  id: 'id',
  patientId: 'patientId',
  allergenType: 'allergenType',
  allergenName: 'allergenName',
  reaction: 'reaction',
  severity: 'severity',
  createdById: 'createdById',
  createdAt: 'createdAt'
};

exports.Prisma.PatientAlertScalarFieldEnum = {
  id: 'id',
  patientId: 'patientId',
  alertType: 'alertType',
  description: 'description',
  isActive: 'isActive',
  createdById: 'createdById',
  createdAt: 'createdAt'
};

exports.Prisma.PatientDocumentScalarFieldEnum = {
  id: 'id',
  patientId: 'patientId',
  fileName: 'fileName',
  fileType: 'fileType',
  fileSize: 'fileSize',
  fileUrl: 'fileUrl',
  uploadedBy: 'uploadedBy',
  createdAt: 'createdAt'
};

exports.Prisma.HouseholdScalarFieldEnum = {
  id: 'id',
  facilityId: 'facilityId',
  householdCode: 'householdCode',
  address: 'address',
  barangayCode: 'barangayCode',
  createdAt: 'createdAt'
};

exports.Prisma.PatientRelationshipScalarFieldEnum = {
  id: 'id',
  patientId: 'patientId',
  relatedPatientId: 'relatedPatientId',
  relationshipType: 'relationshipType',
  householdId: 'householdId',
  isHead: 'isHead',
  createdAt: 'createdAt'
};

exports.Prisma.ConsultationsScalarFieldEnum = {
  id: 'id',
  facilityId: 'facilityId',
  patientId: 'patientId',
  consultationNumber: 'consultationNumber',
  consultationDate: 'consultationDate',
  consultationTime: 'consultationTime',
  natureOfVisit: 'natureOfVisit',
  modeOfTransaction: 'modeOfTransaction',
  patientAgeYears: 'patientAgeYears',
  patientAgeMonths: 'patientAgeMonths',
  patientAgeDays: 'patientAgeDays',
  attendingProviderId: 'attendingProviderId',
  patientConsent: 'patientConsent',
  chiefComplaint: 'chiefComplaint',
  historyOfIllness: 'historyOfIllness',
  treatmentPlan: 'treatmentPlan',
  followUpInstructions: 'followUpInstructions',
  status: 'status',
  scheduledVisitId: 'scheduledVisitId',
  referralId: 'referralId',
  createdById: 'createdById',
  createdAt: 'createdAt',
  updatedAt: 'updatedAt'
};

exports.Prisma.ConsultationTypeScalarFieldEnum = {
  id: 'id',
  consultationId: 'consultationId',
  typeCode: 'typeCode',
  isPrimary: 'isPrimary'
};

exports.Prisma.VitalSignsScalarFieldEnum = {
  id: 'id',
  consultationId: 'consultationId',
  bpSystolic: 'bpSystolic',
  bpDiastolic: 'bpDiastolic',
  bpAssessment: 'bpAssessment',
  respiratoryRate: 'respiratoryRate',
  temperatureCelsius: 'temperatureCelsius',
  heartRate: 'heartRate',
  pulseRate: 'pulseRate',
  oxygenSaturation: 'oxygenSaturation',
  heightCm: 'heightCm',
  weightKg: 'weightKg',
  bmi: 'bmi',
  bmiCategory: 'bmiCategory',
  heightForAge: 'heightForAge',
  weightForAge: 'weightForAge',
  createdById: 'createdById',
  createdAt: 'createdAt'
};

exports.Prisma.PhysicalExamScalarFieldEnum = {
  id: 'id',
  consultationId: 'consultationId',
  systemName: 'systemName',
  findings: 'findings',
  isNormal: 'isNormal',
  createdById: 'createdById',
  createdAt: 'createdAt'
};

exports.Prisma.DiagnosisScalarFieldEnum = {
  id: 'id',
  consultationId: 'consultationId',
  icd10Code: 'icd10Code',
  icd10Description: 'icd10Description',
  diagnosisType: 'diagnosisType',
  isPrimary: 'isPrimary',
  remarks: 'remarks',
  createdById: 'createdById',
  createdAt: 'createdAt'
};

exports.Prisma.Icd10CodeScalarFieldEnum = {
  code: 'code',
  description: 'description',
  category: 'category',
  isActive: 'isActive'
};

exports.Prisma.DoctorsOrderScalarFieldEnum = {
  id: 'id',
  consultationId: 'consultationId',
  orderType: 'orderType',
  orderDetails: 'orderDetails',
  orderedById: 'orderedById',
  status: 'status',
  createdAt: 'createdAt'
};

exports.Prisma.LabResultScalarFieldEnum = {
  id: 'id',
  doctorsOrderId: 'doctorsOrderId',
  consultationId: 'consultationId',
  labType: 'labType',
  resultData: 'resultData',
  resultDate: 'resultDate',
  performedBy: 'performedBy',
  createdById: 'createdById',
  createdAt: 'createdAt'
};

exports.Prisma.PrescriptionScalarFieldEnum = {
  id: 'id',
  consultationId: 'consultationId',
  patientId: 'patientId',
  prescriptionToken: 'prescriptionToken',
  validUntil: 'validUntil',
  status: 'status',
  prescribedById: 'prescribedById',
  createdAt: 'createdAt'
};

exports.Prisma.MedicationOrderScalarFieldEnum = {
  id: 'id',
  consultationId: 'consultationId',
  patientId: 'patientId',
  prescriptionId: 'prescriptionId',
  productId: 'productId',
  medicineName: 'medicineName',
  dose: 'dose',
  frequency: 'frequency',
  duration: 'duration',
  quantity: 'quantity',
  unit: 'unit',
  instructions: 'instructions',
  status: 'status',
  prescribedById: 'prescribedById',
  createdAt: 'createdAt'
};

exports.Prisma.ScheduledVisitScalarFieldEnum = {
  id: 'id',
  patientId: 'patientId',
  facilityId: 'facilityId',
  consultationId: 'consultationId',
  scheduledDate: 'scheduledDate',
  scheduledTime: 'scheduledTime',
  purpose: 'purpose',
  status: 'status',
  smsSent: 'smsSent',
  createdById: 'createdById',
  createdAt: 'createdAt',
  meetingLink: 'meetingLink',
  passcode: 'passcode',
  doctorId: 'doctorId'
};

exports.Prisma.ProductScalarFieldEnum = {
  id: 'id',
  code: 'code',
  genericName: 'genericName',
  brandName: 'brandName',
  dosageForm: 'dosageForm',
  category: 'category',
  unitOfMeasure: 'unitOfMeasure',
  isBatchTracked: 'isBatchTracked',
  isVaccine: 'isVaccine',
  requiresColdChain: 'requiresColdChain',
  vvmRequired: 'vvmRequired',
  reorderLevel: 'reorderLevel',
  minStockLevel: 'minStockLevel',
  maxStockLevel: 'maxStockLevel',
  storageRequirements: 'storageRequirements',
  nosirsCode: 'nosirsCode',
  isActive: 'isActive',
  createdAt: 'createdAt'
};

exports.Prisma.FacilityProductThresholdScalarFieldEnum = {
  id: 'id',
  facilityId: 'facilityId',
  productId: 'productId',
  reorderLevel: 'reorderLevel',
  minStockLevel: 'minStockLevel',
  maxStockLevel: 'maxStockLevel'
};

exports.Prisma.WarehouseScalarFieldEnum = {
  id: 'id',
  facilityId: 'facilityId',
  name: 'name',
  isDefault: 'isDefault',
  isActive: 'isActive'
};

exports.Prisma.StorageBinScalarFieldEnum = {
  id: 'id',
  warehouseId: 'warehouseId',
  binCode: 'binCode',
  description: 'description',
  isActive: 'isActive',
  createdAt: 'createdAt'
};

exports.Prisma.InventoryItemScalarFieldEnum = {
  id: 'id',
  facilityId: 'facilityId',
  warehouseId: 'warehouseId',
  productId: 'productId',
  quantityOnHand: 'quantityOnHand',
  lastUpdated: 'lastUpdated'
};

exports.Prisma.InventoryBatchScalarFieldEnum = {
  id: 'id',
  inventoryItemId: 'inventoryItemId',
  warehouseId: 'warehouseId',
  binId: 'binId',
  productId: 'productId',
  batchNumber: 'batchNumber',
  lotNumber: 'lotNumber',
  quantityOnHand: 'quantityOnHand',
  manufacturedDate: 'manufacturedDate',
  expiryDate: 'expiryDate',
  vvmStatus: 'vvmStatus',
  manufacturer: 'manufacturer',
  unitPrice: 'unitPrice',
  fundingSource: 'fundingSource',
  storageLocation: 'storageLocation',
  status: 'status',
  createdById: 'createdById',
  createdAt: 'createdAt'
};

exports.Prisma.StockTransactionScalarFieldEnum = {
  id: 'id',
  facilityId: 'facilityId',
  warehouseId: 'warehouseId',
  binId: 'binId',
  productId: 'productId',
  batchId: 'batchId',
  transactionType: 'transactionType',
  quantity: 'quantity',
  quantityBefore: 'quantityBefore',
  quantityAfter: 'quantityAfter',
  referenceType: 'referenceType',
  referenceId: 'referenceId',
  patientId: 'patientId',
  consultationId: 'consultationId',
  transactionDate: 'transactionDate',
  notes: 'notes',
  createdById: 'createdById',
  createdAt: 'createdAt'
};

exports.Prisma.DispenseRecordScalarFieldEnum = {
  id: 'id',
  facilityId: 'facilityId',
  dispenseNumber: 'dispenseNumber',
  consultationId: 'consultationId',
  patientId: 'patientId',
  dispenseType: 'dispenseType',
  destination: 'destination',
  programName: 'programName',
  dispenseDate: 'dispenseDate',
  dispenseTime: 'dispenseTime',
  dispensedById: 'dispensedById',
  notes: 'notes',
  status: 'status',
  createdAt: 'createdAt'
};

exports.Prisma.DispenseLineScalarFieldEnum = {
  id: 'id',
  dispenseRecordId: 'dispenseRecordId',
  medicationOrderId: 'medicationOrderId',
  productId: 'productId',
  batchId: 'batchId',
  quantityDispensed: 'quantityDispensed',
  unitOfMeasure: 'unitOfMeasure',
  dose: 'dose',
  frequency: 'frequency',
  duration: 'duration',
  instructions: 'instructions',
  stockBefore: 'stockBefore',
  stockAfter: 'stockAfter',
  stockTransactionId: 'stockTransactionId',
  revertedAt: 'revertedAt',
  revertReason: 'revertReason',
  revertedById: 'revertedById'
};

exports.Prisma.SupplierScalarFieldEnum = {
  id: 'id',
  name: 'name',
  contactPerson: 'contactPerson',
  email: 'email',
  phone: 'phone',
  address: 'address',
  taxType: 'taxType',
  withholdingTaxRate: 'withholdingTaxRate',
  creditTermsDays: 'creditTermsDays',
  creditLimit: 'creditLimit',
  status: 'status',
  createdAt: 'createdAt'
};

exports.Prisma.RequisitionScalarFieldEnum = {
  id: 'id',
  facilityId: 'facilityId',
  reqNumber: 'reqNumber',
  reqDate: 'reqDate',
  reason: 'reason',
  preferredDeliveryDate: 'preferredDeliveryDate',
  status: 'status',
  autoSuggested: 'autoSuggested',
  notes: 'notes',
  createdById: 'createdById',
  createdAt: 'createdAt'
};

exports.Prisma.RequisitionLineScalarFieldEnum = {
  id: 'id',
  requisitionId: 'requisitionId',
  productId: 'productId',
  quantity: 'quantity',
  unit: 'unit'
};

exports.Prisma.PurchaseOrderScalarFieldEnum = {
  id: 'id',
  facilityId: 'facilityId',
  poNumber: 'poNumber',
  requisitionId: 'requisitionId',
  supplierId: 'supplierId',
  orderDate: 'orderDate',
  expectedDelivery: 'expectedDelivery',
  paymentTermsDays: 'paymentTermsDays',
  fundingSource: 'fundingSource',
  totalAmount: 'totalAmount',
  status: 'status',
  notes: 'notes',
  createdById: 'createdById',
  createdAt: 'createdAt'
};

exports.Prisma.PurchaseOrderLineScalarFieldEnum = {
  id: 'id',
  purchaseOrderId: 'purchaseOrderId',
  productId: 'productId',
  quantityOrdered: 'quantityOrdered',
  quantityReceived: 'quantityReceived',
  unitPrice: 'unitPrice',
  discountPercent: 'discountPercent',
  netAmount: 'netAmount'
};

exports.Prisma.GoodsReceiptScalarFieldEnum = {
  id: 'id',
  facilityId: 'facilityId',
  grnNumber: 'grnNumber',
  purchaseOrderId: 'purchaseOrderId',
  issuanceId: 'issuanceId',
  receiptDate: 'receiptDate',
  sourceType: 'sourceType',
  supplierId: 'supplierId',
  drNumber: 'drNumber',
  drAttachmentUrl: 'drAttachmentUrl',
  notes: 'notes',
  receivedById: 'receivedById',
  createdAt: 'createdAt'
};

exports.Prisma.GoodsReceiptLineScalarFieldEnum = {
  id: 'id',
  grnId: 'grnId',
  productId: 'productId',
  poLineId: 'poLineId',
  quantity: 'quantity',
  batchNumber: 'batchNumber',
  lotNumber: 'lotNumber',
  manufacturedDate: 'manufacturedDate',
  expiryDate: 'expiryDate',
  condition: 'condition',
  unitPrice: 'unitPrice',
  storageLocation: 'storageLocation',
  serialNumbers: 'serialNumbers'
};

exports.Prisma.InvoiceScalarFieldEnum = {
  id: 'id',
  facilityId: 'facilityId',
  invoiceNumber: 'invoiceNumber',
  purchaseOrderId: 'purchaseOrderId',
  grnId: 'grnId',
  supplierId: 'supplierId',
  invoiceDate: 'invoiceDate',
  dueDate: 'dueDate',
  hasVat: 'hasVat',
  hasWithholding: 'hasWithholding',
  subtotal: 'subtotal',
  vatAmount: 'vatAmount',
  withholdingAmount: 'withholdingAmount',
  additionalCharges: 'additionalCharges',
  totalAmount: 'totalAmount',
  matchStatus: 'matchStatus',
  status: 'status',
  paidAt: 'paidAt',
  paymentMethod: 'paymentMethod',
  paymentReference: 'paymentReference',
  createdById: 'createdById',
  createdAt: 'createdAt'
};

exports.Prisma.StockIssuanceScalarFieldEnum = {
  id: 'id',
  facilityId: 'facilityId',
  issuanceNumber: 'issuanceNumber',
  issuanceDate: 'issuanceDate',
  sourceFacilityId: 'sourceFacilityId',
  destinationFacilityId: 'destinationFacilityId',
  deliveryDate: 'deliveryDate',
  deliveryReference: 'deliveryReference',
  notes: 'notes',
  status: 'status',
  createdById: 'createdById',
  createdAt: 'createdAt'
};

exports.Prisma.StockIssuanceLineScalarFieldEnum = {
  id: 'id',
  issuanceId: 'issuanceId',
  productId: 'productId',
  batchId: 'batchId',
  quantity: 'quantity',
  unit: 'unit'
};

exports.Prisma.DisposalScalarFieldEnum = {
  id: 'id',
  facilityId: 'facilityId',
  disposalNumber: 'disposalNumber',
  disposalDate: 'disposalDate',
  reason: 'reason',
  reasonNotes: 'reasonNotes',
  witness: 'witness',
  disposalMethod: 'disposalMethod',
  status: 'status',
  createdById: 'createdById',
  createdAt: 'createdAt'
};

exports.Prisma.DisposalLineScalarFieldEnum = {
  id: 'id',
  disposalId: 'disposalId',
  productId: 'productId',
  batchId: 'batchId',
  quantity: 'quantity'
};

exports.Prisma.ReferralScalarFieldEnum = {
  id: 'id',
  consultationId: 'consultationId',
  patientId: 'patientId',
  referringFacilityId: 'referringFacilityId',
  referralType: 'referralType',
  urgency: 'urgency',
  referralReason: 'referralReason',
  clinicalSummary: 'clinicalSummary',
  consentLevel: 'consentLevel',
  consentRecordedAt: 'consentRecordedAt',
  receivingFacilityId: 'receivingFacilityId',
  receivingOrgSlug: 'receivingOrgSlug',
  receivingFacilityName: 'receivingFacilityName',
  referralPacket: 'referralPacket',
  status: 'status',
  acceptedAt: 'acceptedAt',
  declinedAt: 'declinedAt',
  declineReason: 'declineReason',
  outcomeNotes: 'outcomeNotes',
  outcomeSentAt: 'outcomeSentAt',
  createdById: 'createdById',
  createdAt: 'createdAt'
};

exports.Prisma.DiseaseAlertThresholdScalarFieldEnum = {
  id: 'id',
  facilityId: 'facilityId',
  icd10Code: 'icd10Code',
  diseaseName: 'diseaseName',
  thresholdCount: 'thresholdCount',
  timeWindowDays: 'timeWindowDays',
  classification: 'classification',
  isActive: 'isActive',
  createdById: 'createdById',
  createdAt: 'createdAt'
};

exports.Prisma.DiseaseAlertScalarFieldEnum = {
  id: 'id',
  facilityId: 'facilityId',
  thresholdId: 'thresholdId',
  icd10Code: 'icd10Code',
  caseCount: 'caseCount',
  status: 'status',
  triggeredAt: 'triggeredAt',
  acknowledgedById: 'acknowledgedById',
  acknowledgedAt: 'acknowledgedAt',
  actionTaken: 'actionTaken',
  resolvedById: 'resolvedById',
  resolvedAt: 'resolvedAt',
  resolutionNotes: 'resolutionNotes'
};

exports.Prisma.NotificationScalarFieldEnum = {
  id: 'id',
  facilityId: 'facilityId',
  recipientId: 'recipientId',
  type: 'type',
  title: 'title',
  body: 'body',
  redirectRoute: 'redirectRoute',
  isRead: 'isRead',
  readAt: 'readAt',
  createdAt: 'createdAt'
};

exports.Prisma.AuditLogScalarFieldEnum = {
  id: 'id',
  userId: 'userId',
  facilityId: 'facilityId',
  action: 'action',
  tableName: 'tableName',
  recordId: 'recordId',
  oldValues: 'oldValues',
  newValues: 'newValues',
  ipAddress: 'ipAddress',
  userAgent: 'userAgent',
  tempAccessGrantId: 'tempAccessGrantId',
  createdAt: 'createdAt'
};

exports.Prisma.InstalledPluginScalarFieldEnum = {
  id: 'id',
  facilityId: 'facilityId',
  orgId: 'orgId',
  pluginId: 'pluginId',
  installedById: 'installedById',
  installedAt: 'installedAt',
  config: 'config',
  isActive: 'isActive'
};

exports.Prisma.FhsisServiceRecordScalarFieldEnum = {
  id: 'id',
  consultationId: 'consultationId',
  patientId: 'patientId',
  facilityId: 'facilityId',
  serviceType: 'serviceType',
  serviceDate: 'serviceDate',
  reportingPeriod: 'reportingPeriod',
  data: 'data',
  createdAt: 'createdAt'
};

exports.Prisma.SessionScalarFieldEnum = {
  id: 'id',
  expiresAt: 'expiresAt',
  token: 'token',
  createdAt: 'createdAt',
  updatedAt: 'updatedAt',
  ipAddress: 'ipAddress',
  userAgent: 'userAgent',
  userId: 'userId',
  facilityId: 'facilityId',
  orgId: 'orgId',
  roleName: 'roleName',
  permissions: 'permissions'
};

exports.Prisma.AccountScalarFieldEnum = {
  id: 'id',
  accountId: 'accountId',
  providerId: 'providerId',
  userId: 'userId',
  accessToken: 'accessToken',
  refreshToken: 'refreshToken',
  idToken: 'idToken',
  expiresAt: 'expiresAt',
  password: 'password',
  createdAt: 'createdAt',
  updatedAt: 'updatedAt'
};

exports.Prisma.VerificationScalarFieldEnum = {
  id: 'id',
  identifier: 'identifier',
  value: 'value',
  expiresAt: 'expiresAt',
  createdAt: 'createdAt',
  updatedAt: 'updatedAt'
};

exports.Prisma.PatientSessionScalarFieldEnum = {
  id: 'id',
  expiresAt: 'expiresAt',
  token: 'token',
  createdAt: 'createdAt',
  updatedAt: 'updatedAt',
  ipAddress: 'ipAddress',
  userAgent: 'userAgent',
  patientId: 'patientId',
  facilityId: 'facilityId',
  orgId: 'orgId'
};

exports.Prisma.PatientAccountScalarFieldEnum = {
  id: 'id',
  accountId: 'accountId',
  providerId: 'providerId',
  patientId: 'patientId',
  accessToken: 'accessToken',
  refreshToken: 'refreshToken',
  idToken: 'idToken',
  expiresAt: 'expiresAt',
  password: 'password',
  createdAt: 'createdAt',
  updatedAt: 'updatedAt'
};

exports.Prisma.PatientVerificationScalarFieldEnum = {
  id: 'id',
  identifier: 'identifier',
  value: 'value',
  expiresAt: 'expiresAt',
  createdAt: 'createdAt',
  updatedAt: 'updatedAt'
};

exports.Prisma.QueueEntryScalarFieldEnum = {
  id: 'id',
  facilityId: 'facilityId',
  visitId: 'visitId',
  patientId: 'patientId',
  ticketNumber: 'ticketNumber',
  status: 'status',
  calledRoom: 'calledRoom',
  doctorId: 'doctorId',
  createdAt: 'createdAt',
  updatedAt: 'updatedAt'
};

exports.Prisma.SortOrder = {
  asc: 'asc',
  desc: 'desc'
};

exports.Prisma.NullableJsonNullValueInput = {
  DbNull: Prisma.DbNull,
  JsonNull: Prisma.JsonNull
};

exports.Prisma.JsonNullValueInput = {
  JsonNull: Prisma.JsonNull
};

exports.Prisma.QueryMode = {
  default: 'default',
  insensitive: 'insensitive'
};

exports.Prisma.NullsOrder = {
  first: 'first',
  last: 'last'
};

exports.Prisma.JsonNullValueFilter = {
  DbNull: Prisma.DbNull,
  JsonNull: Prisma.JsonNull,
  AnyNull: Prisma.AnyNull
};


exports.Prisma.ModelName = {
  Organization: 'Organization',
  Facility: 'Facility',
  Region: 'Region',
  Province: 'Province',
  Municipality: 'Municipality',
  Barangay: 'Barangay',
  Role: 'Role',
  Permission: 'Permission',
  User: 'User',
  Patient: 'Patient',
  PatientAllergy: 'PatientAllergy',
  PatientAlert: 'PatientAlert',
  PatientDocument: 'PatientDocument',
  Household: 'Household',
  PatientRelationship: 'PatientRelationship',
  Consultations: 'Consultations',
  ConsultationType: 'ConsultationType',
  VitalSigns: 'VitalSigns',
  PhysicalExam: 'PhysicalExam',
  Diagnosis: 'Diagnosis',
  Icd10Code: 'Icd10Code',
  DoctorsOrder: 'DoctorsOrder',
  LabResult: 'LabResult',
  Prescription: 'Prescription',
  MedicationOrder: 'MedicationOrder',
  ScheduledVisit: 'ScheduledVisit',
  Product: 'Product',
  FacilityProductThreshold: 'FacilityProductThreshold',
  Warehouse: 'Warehouse',
  StorageBin: 'StorageBin',
  InventoryItem: 'InventoryItem',
  InventoryBatch: 'InventoryBatch',
  StockTransaction: 'StockTransaction',
  DispenseRecord: 'DispenseRecord',
  DispenseLine: 'DispenseLine',
  Supplier: 'Supplier',
  Requisition: 'Requisition',
  RequisitionLine: 'RequisitionLine',
  PurchaseOrder: 'PurchaseOrder',
  PurchaseOrderLine: 'PurchaseOrderLine',
  GoodsReceipt: 'GoodsReceipt',
  GoodsReceiptLine: 'GoodsReceiptLine',
  Invoice: 'Invoice',
  StockIssuance: 'StockIssuance',
  StockIssuanceLine: 'StockIssuanceLine',
  Disposal: 'Disposal',
  DisposalLine: 'DisposalLine',
  Referral: 'Referral',
  DiseaseAlertThreshold: 'DiseaseAlertThreshold',
  DiseaseAlert: 'DiseaseAlert',
  Notification: 'Notification',
  AuditLog: 'AuditLog',
  InstalledPlugin: 'InstalledPlugin',
  FhsisServiceRecord: 'FhsisServiceRecord',
  Session: 'Session',
  Account: 'Account',
  Verification: 'Verification',
  PatientSession: 'PatientSession',
  PatientAccount: 'PatientAccount',
  PatientVerification: 'PatientVerification',
  QueueEntry: 'QueueEntry'
};

/**
 * This is a stub Prisma Client that will error at runtime if called.
 */
class PrismaClient {
  constructor() {
    return new Proxy(this, {
      get(target, prop) {
        let message
        const runtime = getRuntime()
        if (runtime.isEdge) {
          message = `PrismaClient is not configured to run in ${runtime.prettyName}. In order to run Prisma Client on edge runtime, either:
- Use Prisma Accelerate: https://pris.ly/d/accelerate
- Use Driver Adapters: https://pris.ly/d/driver-adapters
`;
        } else {
          message = 'PrismaClient is unable to run in this browser environment, or has been bundled for the browser (running in `' + runtime.prettyName + '`).'
        }
        
        message += `
If this is unexpected, please open an issue: https://pris.ly/prisma-prisma-bug-report`

        throw new Error(message)
      }
    })
  }
}

exports.PrismaClient = PrismaClient

Object.assign(exports, Prisma)
