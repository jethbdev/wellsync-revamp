import { PrismaClient as TenantPrismaClient } from './generated/tenant';

// We run the seed on the tenant database (as configured via DATABASE_URL)
const prisma = new TenantPrismaClient();

async function main() {
  console.log('🌱 Starting database seed...');

  // Clean existing tables to support multiple seed runs using TRUNCATE CASCADE
  console.log('Cleaning existing database tables...');
  const tablenames = [
    'dispense_lines',
    'dispense_records',
    'stock_transactions',
    'inventory_batches',
    'inventory_items',
    'storage_bins',
    'warehouses',
    'products',
    'users',
    'permissions',
    'roles',
    'facilities',
    'organizations'
  ];

  for (const table of tablenames) {
    try {
      await prisma.$executeRawUnsafe(`TRUNCATE TABLE "${table}" CASCADE;`);
    } catch (e) {
      console.warn(`Could not truncate table ${table}:`, e);
    }
  }

  // 1. Seed Geographic Hierarchy (PSGC)
  console.log('Seeding PSGC Geographic Hierarchy...');
  const reg7 = await prisma.region.upsert({
    where: { code: '070000000' },
    update: {},
    create: { code: '070000000', name: 'Region VII (Central Visayas)' },
  });

  const cebuProvince = await prisma.province.upsert({
    where: { code: '072200000' },
    update: {},
    create: {
      code: '072200000',
      name: 'Cebu',
      regionCode: reg7.code,
    },
  });

  const cebuCity = await prisma.municipality.upsert({
    where: { code: '072217000' },
    update: {},
    create: {
      code: '072217000',
      name: 'Cebu City',
      provinceCode: cebuProvince.code,
    },
  });

  const barangayCentral = await prisma.barangay.upsert({
    where: { code: '072217001' },
    update: {},
    create: {
      code: '072217001',
      name: 'Barangay Central',
      municipalityCode: cebuCity.code,
    },
  });

  // 2. Seed ICD-10 Medical Diagnostic Codes
  console.log('Seeding ICD-10 Codes...');
  const icd10Data = [
    { code: 'I10', description: 'Essential (primary) hypertension', category: 'Diseases of the circulatory system' },
    { code: 'E11', description: 'Type 2 diabetes mellitus', category: 'Endocrine, nutritional and metabolic diseases' },
    { code: 'J06.9', description: 'Acute upper respiratory infection, unspecified', category: 'Diseases of the respiratory system' },
    { code: 'A09', description: 'Infectious gastroenteritis and colitis, unspecified', category: 'Certain infectious and parasitic diseases' },
    { code: 'U07.1', description: 'COVID-19, virus identified', category: 'Codes for special purposes' },
    { code: 'K21.9', description: 'Gastro-esophageal reflux disease without esophagitis', category: 'Diseases of the digestive system' },
    { code: 'M54.5', description: 'Low back pain', category: 'Diseases of the musculoskeletal system and connective tissue' },
  ];

  for (const item of icd10Data) {
    await prisma.icd10Code.upsert({
      where: { code: item.code },
      update: { description: item.description, category: item.category },
      create: item,
    });
  }

  // 3. Seed Default System Roles and Permissions
  console.log('Seeding System Roles and Permissions...');
  const roles = [
    {
      name: 'System Admin',
      scope: 'ORG_WIDE',
      description: 'Platform super-administrator with full permissions',
      color: '#7c3aed',
      icon: 'shield',
      permissions: [
        'users:create', 'users:read', 'users:update', 'users:delete', 'users:manage',
        'facilities:create', 'facilities:read', 'facilities:update', 'facilities:delete',
        'roles:create', 'roles:read', 'roles:update', 'roles:delete', 'roles:manage',
        'audit:read',
        'patients:create', 'patients:read', 'patients:update', 'patients:delete',
        'consultations:create', 'consultations:read', 'consultations:update',
        'vitals:create', 'vitals:read', 'vitals:update',
        'prescriptions:create', 'prescriptions:read', 'prescriptions:update',
        'referrals:create', 'referrals:read', 'referrals:update',
        'schedules:create', 'schedules:read', 'schedules:update', 'schedules:delete', 'schedules:manage',
        'inventory:read', 'inventory:write',
        'dispense:read', 'dispense:create'
      ],
    },
    {
      name: 'Clinic Manager',
      scope: 'FACILITY',
      description: 'Facility manager responsible for operations and inventory settings',
      color: '#7c3aed',
      icon: 'shield',
      permissions: [
        'users:read',
        'facilities:read', 'facilities:update',
        'roles:read',
        'patients:read',
        'consultations:read',
        'vitals:read',
        'prescriptions:read',
        'referrals:read',
        'schedules:read',
        'inventory:read', 'inventory:write',
        'dispense:read', 'dispense:create'
      ],
    },
    {
      name: 'Attending Doctor',
      scope: 'FACILITY',
      description: 'Medical doctor performing consultations and prescribing medication',
      color: '#1d4ed8',
      icon: 'doctor',
      permissions: [
        'users:read',
        'patients:create', 'patients:read', 'patients:update',
        'consultations:create', 'consultations:read', 'consultations:update',
        'vitals:create', 'vitals:read', 'vitals:update',
        'prescriptions:create', 'prescriptions:read', 'prescriptions:update',
        'referrals:create', 'referrals:read', 'referrals:update',
        'schedules:create', 'schedules:read', 'schedules:update',
        'inventory:read'
      ],
    },
    {
      name: 'Nurse',
      scope: 'FACILITY',
      description: 'Clinical nurse entering vitals, triage data, and managing schedules',
      color: '#059669',
      icon: 'nurse',
      permissions: [
        'users:read',
        'patients:create', 'patients:read', 'patients:update',
        'consultations:read',
        'vitals:create', 'vitals:read', 'vitals:update',
        'referrals:read',
        'schedules:create', 'schedules:read', 'schedules:update', 'schedules:manage',
        'inventory:read'
      ],
    },
    {
      name: 'Pharmacist',
      scope: 'FACILITY',
      description: 'Pharmacist responsible for dispensing medicines and logging stock transfers',
      color: '#d97706',
      icon: 'pharmacist',
      permissions: [
        'users:read',
        'patients:read',
        'prescriptions:read',
        'schedules:read',
        'inventory:read', 'inventory:write',
        'dispense:read', 'dispense:create'
      ],
    },
  ];

  for (const roleDef of roles) {
    const role = await prisma.role.create({
      data: {
        name: roleDef.name,
        scope: roleDef.scope,
        description: roleDef.description,
        color: roleDef.color,
        icon: roleDef.icon,
      },
    });

    for (const permStr of roleDef.permissions) {
      await prisma.permission.create({
        data: {
          roleId: role.id,
          permission: permStr,
        },
      });
    }
  }

  // 4. Seed Default Tenant Organization and Facility
  console.log('Seeding Default Tenant Organization and Facility...');
  const org = await prisma.organization.create({
    data: {
      name: 'Cebu Family Clinic Group',
      slug: 'cebu-clinic',
      type: 'PRIVATE_CLINIC',
      status: 'ACTIVE',
      billingEmail: 'billing@cebuclinic.ph',
    },
  });

  const facility = await prisma.facility.create({
    data: {
      organizationId: org.id,
      name: 'Cebu Central Branch',
      facilityType: 'CLINIC',
      regionCode: reg7.code,
      provinceCode: cebuProvince.code,
      municipalityCode: cebuCity.code,
      barangayCode: barangayCentral.code,
      address: '123 Mango Avenue, Cebu City',
      contactNumber: '+63 32 123 4567',
      email: 'mango@cebuclinic.ph',
      isActive: true,
    },
  });

  // 5. Seed Default Admin User
  console.log('Seeding Default Admin User...');
  const adminRole = await prisma.role.findFirst({
    where: { name: 'System Admin' },
  });
  
  if (adminRole) {
    // Password hash corresponds to 'adminpass' hashed with BetterAuth
    const passwordHash = '219ef8ff4776491d2c684cbb27f8b1d7:f6cbf173bb99b9a3d264ee37baea5febf67dfa4bf2c2384d80254853ae24d2f0bd8b156c9cff4097a17dac1d3c98e9dff3b2b1fd5beded8f00a732a47bcd1466';
  
    const adminUser = await prisma.user.create({
      data: {
        email: 'admin@healthbridge.dev',
        passwordHash,
        firstName: 'System',
        lastName: 'Admin',
        displayName: 'Super Admin',
        contactNumber: '09171234567',
        roleId: adminRole.id,
        facilityId: facility.id,
        isActive: true,
        isFirstLogin: false,
      },
    });
  
    // Create BetterAuth Account credentials row
    await prisma.account.create({
      data: {
        accountId: adminUser.id,
        providerId: 'credential',
        userId: adminUser.id,
        password: passwordHash,
      },
    });
  }

  // Install the Clinical Inventory plugin for the default organization by default
  console.log('Installing Clinical Inventory plugin by default...');
  await prisma.installedPlugin.create({
    data: {
      orgId: org.id,
      facilityId: facility.id,
      pluginId: 'clinical-inventory',
      isActive: true,
      config: {}
    }
  });

  // 6. Seed Standard Products
  console.log('Seeding Standard Products...');
  const products = [
    {
      code: 'PAR-500',
      genericName: 'Paracetamol',
      brandName: 'Biogesic',
      dosageForm: 'Tablet',
      category: 'MEDICINE',
      unitOfMeasure: 'Tablet',
      reorderLevel: 500,
      minStockLevel: 200,
      maxStockLevel: 2000,
    },
    {
      code: 'MET-500',
      genericName: 'Metformin Hydrochloride',
      brandName: 'Glucophage',
      dosageForm: 'Tablet',
      category: 'MEDICINE',
      unitOfMeasure: 'Tablet',
      reorderLevel: 300,
      minStockLevel: 100,
      maxStockLevel: 1500,
    },
    {
      code: 'AML-5',
      genericName: 'Amlodipine Besilate',
      brandName: 'Norvasc',
      dosageForm: 'Tablet',
      category: 'MEDICINE',
      unitOfMeasure: 'Tablet',
      reorderLevel: 200,
      minStockLevel: 50,
      maxStockLevel: 1000,
    },
    {
      code: 'AMX-500',
      genericName: 'Amoxicillin Trihydrate',
      brandName: 'Amoxil',
      dosageForm: 'Capsule',
      category: 'MEDICINE',
      unitOfMeasure: 'Capsule',
      reorderLevel: 400,
      minStockLevel: 150,
      maxStockLevel: 1500,
    },
    {
      code: 'INS-GLAR',
      genericName: 'Insulin Glargine',
      brandName: 'Lantus',
      dosageForm: 'Injection',
      category: 'MEDICINE',
      unitOfMeasure: 'Vial',
      isBatchTracked: true,
      requiresColdChain: true,
      reorderLevel: 20,
      minStockLevel: 5,
      maxStockLevel: 100,
    },
    {
      code: 'SYR-3ML',
      genericName: 'Surgical Syringe with Needle 3mL',
      brandName: null,
      dosageForm: 'Device',
      category: 'SUPPLY',
      unitOfMeasure: 'Piece',
      reorderLevel: 100,
      minStockLevel: 30,
      maxStockLevel: 500,
    }
  ];

  for (const prod of products) {
    await prisma.product.create({
      data: prod,
    });
  }

  // 7. Seeding Storage Areas (Warehouses)
  console.log('Seeding Storage Areas (Warehouses)...');
  const mainDispensary = await prisma.warehouse.create({
    data: {
      facilityId: facility.id,
      name: 'Main Dispensary',
      isDefault: true,
      isActive: true,
    },
  });

  const vaccineColdStorage = await prisma.warehouse.create({
    data: {
      facilityId: facility.id,
      name: 'Vaccine Cold Storage',
      isDefault: false,
      isActive: true,
    },
  });

  // 8. Seeding Storage Bins
  console.log('Seeding Storage Bins...');
  const dispensaryBins = [
    { warehouseId: mainDispensary.id, binCode: 'Shelf A-1', description: 'Top shelf for fast-moving items' },
    { warehouseId: mainDispensary.id, binCode: 'Shelf A-2', description: 'Middle shelf for oral solids' },
    { warehouseId: mainDispensary.id, binCode: 'Shelf B-1', description: 'Lower shelf for liquids' },
    { warehouseId: mainDispensary.id, binCode: 'Drawer 1', description: 'Amlodipine and blood pressure meds' },
  ];

  const coldStorageBins = [
    { warehouseId: vaccineColdStorage.id, binCode: 'Vaccine Fridge-1', description: 'Main vaccine refrigerator' },
    { warehouseId: vaccineColdStorage.id, binCode: 'Cooler Box A', description: 'Backup cooler box' },
  ];

  for (const bin of [...dispensaryBins, ...coldStorageBins]) {
    await prisma.storageBin.create({
      data: bin,
    });
  }

  console.log('✅ Database seed completed successfully!');
}

main()
  .catch((e) => {
    console.error('❌ Error during seeding:', e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
