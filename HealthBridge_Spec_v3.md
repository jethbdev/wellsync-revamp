# HealthBridge
## Product Specification — Version 3.0

**Date:** May 2026  
**Status:** Living Document  
**Classification:** Internal — Product & Engineering

---

## Table of Contents

1. [What HealthBridge Is](#1-what-healthbridge-is)
2. [Core Thesis](#2-core-thesis)
3. [Architecture](#3-architecture)
4. [Organization & Deployment Model](#4-organization--deployment-model)
5. [Authentication](#5-authentication)
6. [Plugin System](#6-plugin-system)
7. [Patient & Clinical](#7-patient--clinical)
8. [Pharmacy & Dispensing](#8-pharmacy--dispensing)
9. [Inventory & Logistics](#9-inventory--logistics)
10. [Procurement](#10-procurement)
11. [Referral Network](#11-referral-network)
12. [Appointments](#12-appointments)
13. [Disease Surveillance](#13-disease-surveillance)
14. [Reporting](#14-reporting)
15. [Patient Portal](#15-patient-portal)
16. [Access Control](#16-access-control)
17. [Audit & Compliance](#17-audit--compliance)
18. [Control Plane](#18-control-plane)
19. [Database Schema](#19-database-schema)
20. [API Design](#20-api-design)
21. [Sidebar Navigation](#21-sidebar-navigation)

---

## 1. What HealthBridge Is

HealthBridge is a unified health information and logistics management platform for any health organization operating one or more facilities in the Philippines — LGUs, private clinics, hospital networks, NGOs, and pharmacy chains.

It replaces the fragmented combinations of systems (like iClinicSys and eLMIS in government health centers, or separate EMR and Point-of-Sale/Inventory systems in private clinics) that most Philippine health organizations currently run. These systems do not communicate. A clinician records an event in the clinical system, but someone has to manually reconcile inventory or billing in the other system.

HealthBridge eliminates that gap by design. The patient record and the stock ledger are not two systems trying to talk to each other. They are one system that has always known they are the same thing.

---

## 2. Core Thesis

> One dispensing event — recorded once — simultaneously updates the patient clinical record, the stock ledger, and any downstream reporting/billing systems (such as government FHSIS/LMIS compliance reports or private revenue/ledger syncs).

Every architectural decision in this document exists to protect and enable this thesis.

---

## 3. Architecture

### 3.1 Technology Stack

| Layer | Technology |
|---|---|
| Frontend (Staff) | Next.js, TypeScript, Tailwind CSS, shadcn/ui |
| Frontend (Patient) | Next.js, TypeScript, Tailwind CSS, shadcn/ui |
| Frontend (Ops) | Next.js, TypeScript, Tailwind CSS, shadcn/ui |
| Backend API | NestJS (Node.js), TypeScript |
| ORM | Prisma |
| Database | PostgreSQL 15+ |
| Authentication | BetterAuth (three separate instances) |
| Validation | Zod (shared via packages/contracts) |
| Queue | Redis + BullMQ |
| File Storage | S3-compatible |
| Monorepo | Turborepo |

### 3.2 Monorepo Structure

```
healthbridge/
├── apps/
│   ├── control-plane/
│   │   ├── ops/          # Control plane frontend — Next.js
│   │   └── api/          # Control plane backend — NestJS
│   └── tenant/
│       ├── web/          # Staff app — Next.js
│       ├── patient/      # Patient portal — Next.js
│       └── api/          # Tenant backend API — NestJS
├── packages/
│   ├── contracts/        # Zod schemas shared across all apps
│   ├── core/             # Shared utilities and types
│   └── ui/               # Shared component library
└── tools/
    └── migrate/          # CLI migration tools — ops team only
        ├── iclinicsys/
        ├── elmis/
        └── generic/
```

### 3.3 API Surfaces

The NestJS application in `apps/tenant/api` exposes two completely separate API surfaces on different subdomains:

```
api.{org-slug}.healthbridge.ph          Staff API — internal network only
patient-api.{org-slug}.healthbridge.ph  Patient API — public internet
```

Same application. Same database connection. Completely different route sets, auth instances, and exposure levels. The patient API is severely limited in scope — a patient can only access their own records and cannot perform any clinical or operational write operations.

### 3.4 Network Topology Per Deployment

```
Internal Network (VPN or facility network)
├── staff.{org}.healthbridge.ph     Staff app
└── api.{org}.healthbridge.ph       Staff API

Public Internet
├── patient.{org}.healthbridge.ph   Patient portal
└── patient-api.{org}.healthbridge.ph  Patient API

IP Whitelisted
└── ops.healthbridge.ph             Control plane
```

The staff app and staff API are never exposed to the public internet. This is enforced at the network level, not just at the application level.

### 3.5 Shared API Contracts

All request and response shapes are defined once in `packages/contracts` using Zod and shared between the NestJS backend and all Next.js frontends.

```
packages/contracts/src/
├── auth.contract.ts
├── patient.contract.ts
├── consultation.contract.ts
├── pharmacy.contract.ts
├── inventory.contract.ts
├── procurement.contract.ts
├── referral.contract.ts
├── appointment.contract.ts
├── surveillance.contract.ts
├── reports.contract.ts
├── users.contract.ts
├── facilities.contract.ts
├── plugins.contract.ts
├── notifications.contract.ts
├── patient-portal/
│   ├── portal-auth.contract.ts
│   ├── portal-records.contract.ts
│   └── portal-appointments.contract.ts
└── ops/
    ├── organizations.contract.ts
    ├── deployments.contract.ts
    ├── access-grants.contract.ts
    ├── plugin-directory.contract.ts
    └── incidents.contract.ts
```

Each contract file defines: entity schemas, request schemas, response schemas, and inferred TypeScript types. NestJS uses Zod schemas directly for validation via a custom `ZodValidationPipe`. Next.js imports types for API call functions and hook return types. Never duplicate schema definitions.

### 3.6 Data Fetching Pattern (Frontend)

All data fetching follows a strict two-layer pattern:

#### Layer 1 — Raw API Fetch Layer (`lib/api/`)
* Contains pure asynchronous functions that only perform fetch calls.
* No React, no hooks, no UI dependencies.
* Fully typed using shared validation contracts.
* **Example (`lib/api/users.ts`):**
  ```typescript
  import { User, CreateUserDto, UpdateUserDto } from '@healthbridge/contracts';

  export async function fetchUsers(): Promise<User[]> {
    const res = await fetch('/api/users');
    if (!res.ok) throw new Error('Failed to fetch users');
    return res.json();
  }

  export async function fetchUser(id: string): Promise<User> {
    const res = await fetch(`/api/users/${id}`);
    if (!res.ok) throw new Error('Failed to fetch user');
    return res.json();
  }

  export async function createUser(data: CreateUserDto): Promise<User> {
    const res = await fetch('/api/users', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data),
    });
    if (!res.ok) throw new Error('Failed to create user');
    return res.json();
  }

  export async function updateUser(id: string, data: UpdateUserDto): Promise<User> {
    const res = await fetch(`/api/users/${id}`, {
      method: 'PATCH',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data),
    });
    if (!res.ok) throw new Error('Failed to update user');
    return res.json();
  }

  export async function deleteUser(id: string): Promise<void> {
    const res = await fetch(`/api/users/${id}`, {
      method: 'DELETE',
    });
    if (!res.ok) throw new Error('Failed to delete user');
  }
  ```

#### Layer 2 — React Query Hook Layer (`lib/hooks/api/`)
* Custom React Query hooks wrapping Layer 1 fetch calls.
* Enforces caching rules and mutation strategies.
* Avoids automatic/heavy refetching (`queryClient.invalidateQueries`) after mutation where possible. Instead, it manually updates the React Query cache in `onSuccess` handlers.
* **Example (`lib/hooks/api/useUsers.ts`):**
  ```typescript
  import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
  import { fetchUsers, fetchUser, createUser, updateUser, deleteUser } from '../../api/users';
  import { User } from '@healthbridge/contracts';

  export function useUsers() {
    return useQuery({
      queryKey: ['users'],
      queryFn: fetchUsers,
    });
  }

  export function useUser(id: string) {
    return useQuery({
      queryKey: ['users', id],
      queryFn: () => fetchUser(id),
      enabled: !!id,
    });
  }

  export function useCreateUser() {
    const queryClient = useQueryClient();
    return useMutation({
      mutationFn: createUser,
      onSuccess: (newUser) => {
        // Prepend to list cache directly
        queryClient.setQueryData<User[]>(['users'], (old = []) => [newUser, ...old]);
        // Seed individual detail cache
        queryClient.setQueryData(['users', newUser.id], newUser);
      },
    });
  }

  export function useUpdateUser() {
    const queryClient = useQueryClient();
    return useMutation({
      mutationFn: ({ id, data }: { id: string; data: any }) => updateUser(id, data),
      onSuccess: (updatedUser) => {
        // Update individual detail cache
        queryClient.setQueryData(['users', updatedUser.id], updatedUser);
        // Update item inside list cache
        queryClient.setQueryData<User[]>(['users'], (old = []) =>
          old.map((user) => (user.id === updatedUser.id ? updatedUser : user))
        );
      },
    });
  }

  export function useDeleteUser() {
    const queryClient = useQueryClient();
    return useMutation({
      mutationFn: deleteUser,
      onSuccess: (_, id) => {
        // Remove from list cache
        queryClient.setQueryData<User[]>(['users'], (old = []) =>
          old.filter((user) => user.id !== id)
        );
        // Clear individual detail cache
        queryClient.removeQueries({ queryKey: ['users', id] });
      },
    });
  }
  ```

#### Mutation Cache Update Rules
These rules are strictly enforced across all entities to maintain instant UI response and prevent unnecessary server load:
* **`create`**: Prepend to list cache + seed detail cache.
* **`update`**: Update record in list cache + update detail cache.
* **`delete`**: Remove from list cache + clear detail cache.
* **`status change`**: Update status field of the record inside list cache + update detail cache.
* **Refetching Policy**: `queryClient.invalidateQueries` is **never** used in mutation `onSuccess` handlers unless backend mutation side-effects are too complex to predict on the client.

---

## 4. Organization & Deployment Model

### 4.0 Self-Serve Signup (SaaS Onboarding)

HealthBridge is a **self-serve SaaS product**. Any clinic or facility can sign up at the landing page and be fully operational within seconds — no manual ops intervention required.

#### 4.0.1 Signup Flow

```
Landing /signup
  → User provides: org name, EMR profile type, admin first name, admin last name, email, password
  → POST http://localhost:4001/api/provision  (Control Plane API, public endpoint)
  → Control Plane provisions everything automatically
  → Redirect → Staff EMR /login?tenant=<slug>&registered=true
```

#### 4.0.2 What Happens During Provision

The `POST /api/provision` endpoint (no auth required) performs these steps atomically:

1. **Slug generation** — org name is normalized to a URL-safe slug (e.g. `"Cebu Clinic"` → `cebu-clinic`). Uniqueness is checked before any DB work begins.
2. **Tenant DB creation** — `CREATE DATABASE healthbridge_tenant_<slug>` is executed against the PostgreSQL server.
3. **Schema push** — `prisma db push` runs against the new DB using the tenant schema (`packages/database/prisma/tenant.schema.prisma`).
4. **Seed** — the tenant DB seed script runs, creating the default `Organization` row, default `Facility`, and default roles.
5. **Admin user creation** — BetterAuth `signUpEmail` is called on the new tenant DB. The resulting user is assigned the `System Admin` role and bound to the default facility.
6. **Control Plane record** — `CpOrganization` is created with `status: ACTIVE`, `billingPlan: FREE_TRIAL`, and the `dbConnectionUri` pointing to the new DB.
7. **Response** — returns `{ slug, loginUrl }` and the frontend redirects.

#### 4.0.3 One Organization Per Account

Each signup creates exactly one organization. There is no multi-org per account at this time. An admin who needs to manage multiple facilities does so through the `Facility` model within their single organization.

#### 4.0.4 Control Plane Role After Self-Serve

The Ops portal (`apps/control-plane/ops`) is now a **management and monitoring layer**, not an onboarding tool:
- View all provisioned organizations
- Suspend / reactivate orgs
- Approve temporary DB access grants
- Review audit trails

Ops admins can still manually provision orgs via the Ops UI (calls the same `OrganizationsService.create()` method, but behind `OpsAuthGuard`). The public `/api/provision` endpoint bypasses ops auth intentionally.

#### 4.0.5 Local Development

In local dev, tenant databases are named `healthbridge_tenant_<slug>` on the local PostgreSQL instance. The tenant slug is passed as `?tenant=<slug>` in the URL instead of a subdomain.

The `TenantConnectionManager` resolves slugs to connection URIs from environment config (e.g. `TENANT_cebu_clinic_URL=postgresql://localhost/healthbridge_tenant_cebu_clinic`), falling back to the naming convention for local dev.

### 4.1 Shared Application Server with Isolated Database Instances

To optimize hosting efficiency and version consistency, HealthBridge utilizes a shared multi-tenant application server setup where only data storage is strictly isolated:

- **Shared Application Instances:** All subdomains (e.g., `cebu-city.healthbridge.ph`, `manila.healthbridge.ph`) route to the same shared, autoscaling application cluster running the latest release.
- **Isolated PostgreSQL Databases:** Each organization gets its own completely isolated database instance or logical database schema, guaranteeing data isolation at the storage level. No cross-tenant database connections are permitted.
- **Dedicated File Storage Buckets:** Organization attachments (vitals logs, scanned documents, clinic assets) are uploaded to storage folders/buckets isolated by organization ID.
- **Shared BetterAuth Middleware:** Multi-tenant authentication middleware dynamically resolves organization boundaries based on subdomain headers and redirects to tenant-isolated login scopes.

No data from one organization is ever accessible from another organization's database. This is guaranteed by isolation at the database layer, not just application logic.

### 4.2 Automated Subdomain & Custom Domain Routing

To automate tenant provisioning and eliminate manual DNS configurations, HealthBridge uses wildcard DNS and dynamic SSL termination:

- **Wildcard Subdomain Resolution:** The main DNS zone is configured with a wildcard record: `*.healthbridge.ph CNAME ingress.healthbridge.ph`. When a new tenant is onboarded with a slug (e.g. `valenzuela`), they instantly access the app at `valenzuela.healthbridge.ph` without any DNS registration delay.
- **Custom Domains:** Enterprise or premium tenants can bind custom domains (e.g., `health.valenzuela.gov.ph`).
- **CNAME & TXT Record Verification:**
  - The tenant creates a CNAME pointing to `ingress.healthbridge.ph` and a TXT record with a unique `dns_verification_token`.
  - A background DNS-check worker in the Control Plane verifies these records. Upon discovery, it sets `custom_domain_status` to `VERIFIED`.
- **Dynamic SSL Termination (On-Demand TLS):**
  - The Ingress Ingress controller / Reverse Proxy (e.g., Caddy or Cloudflare for SaaS) intercepts incoming HTTP requests.
  - For custom domains, the proxy queries the Control Plane: `GET /api/v1/domains/validate?domain=health.valenzuela.gov.ph`.
  - If verified, the proxy dynamically generates and terminates an SSL/TLS certificate via ACME (Let's Encrypt / ZeroSSL).

### 4.3 Organization Types

```
LGU                 Local Government Unit (city, municipality)
PRIVATE_CLINIC      Single or multi-branch private clinic
HOSPITAL_NETWORK    Hospital group with multiple facilities
NGO                 Non-government health organization
PHARMACY_CHAIN      Pharmacy chain with multiple branches
```

### 4.4 Organization Status

```
TRIAL       Onboarded, evaluating (time-limited)
ACTIVE      Paying, full access
SUSPENDED   Non-payment or violation — read-only access
CHURNED     Terminated — data retained per retention policy
```

### 4.5 Facility

The facility is the atomic operational unit in HealthBridge. All clinical and logistics data is scoped to a facility:

- Patients register at a facility
- Consultations happen at a facility
- Stock belongs to a facility
- Users are assigned to a facility (or org-wide for admin roles)

An organization has one or more facilities. An LGU might have one RHU and five barangay health stations — all under the same org, each a separate facility. A hospital network might have three hospital branches across different cities.

```
Facility Types:
RHU         Rural Health Unit
HC          Health Center
BHS         Barangay Health Station
CLINIC      Private clinic
HOSPITAL    Hospital
PHARMACY    Standalone pharmacy
```

### 4.6 Organization Deployment Profiles

To serve different operational models, HealthBridge core application adapts dynamically using **Deployment Profiles** determined by `organization.type`.

#### 4.6.1 Government/Public Sector Profile (LGU, NGO)
* **Clinical Focus:** Public health programs, epidemiological tracking, demographic profiling.
* **Logistics Focus:** DOH-allocated stocks, donor supplies, inter-facility public transfers.
* **Fields Enabled:** PSGC geolocation mappings (Region/Province/Municipality/Barangay) are mandatory; government linkages (PhilHealth PIN, NHTS/4Ps, Pantawid ID) are prominent.
* **Compliance Integration:** FHSIS and LMIS compliance hooks enabled.

#### 4.6.2 Private/Commercial Profile (Private Clinic, Hospital Network, Pharmacy Chain)
* **Clinical Focus:** General consultations, diagnostics, HMO/Corporate wellness packages.
* **Logistics Focus:** Purchase orders, direct inventory acquisition, consignment inventory, cashier/billing workflows.
* **Fields Enabled:** Insurance & HMO details (HMO Card Number, Group ID, Policy Holder, Pre-Authorization codes) are prominent; public-only fields (NHTS/4Ps) are hidden.
* **Compliance Integration:** FDA compliance logs and BIR CAS/EIS e-receipting and tax auditing hooks.

### 4.7 Temporary Access for Support

The HealthBridge ops team has no standing access to any org's data. When debugging is needed:

```
1. Ops team requests access in Control Plane
   - Organization, reason, scope (READ_ONLY / READ_WRITE), duration (max 24h)

2. Org admin receives notification — approves or denies

3. If approved:
   - Time-limited token issued, scoped to that org only
   - All actions tagged with temp_access_grant_id in audit logs
   - Org admin can view full audit trail in real time
   - Org admin can revoke at any time
   - Token auto-expires — no manual cleanup

4. If denied:
   - Request closed, no access granted
```

---

## 5. Authentication

### 5.1 Three Separate BetterAuth Instances

HealthBridge runs three completely separate BetterAuth instances. They share no session store, no database, no secret, no cookie namespace.

| Instance | App | Users | Cookie Name | MFA |
|---|---|---|---|---|
| Staff | apps/tenant/api (staff routes) | Nurses, doctors, admins | `hb-staff-session` | Optional |
| Patient | apps/tenant/api (patient routes) | Patients | `hb-patient-session` | Optional |
| Ops | apps/control-plane/api | HealthBridge ops team | `hb-ops-session` | Mandatory |

### 5.2 Staff Auth

- Configured in `apps/tenant/api/src/auth/staff-auth.ts`
- Session payload: `userId`, `facilityId`, `orgId`, `permissions[]`
- First-login forced password change before accessing any route
- Session timeout: 30 minutes of inactivity
- Max 5 failed attempts → 15-minute account lockout
- Password minimum: 8 characters, strength enforced
- MFA: optional, configurable per org

### 5.3 Patient Auth

- Configured in `apps/tenant/api/src/auth/patient-auth.ts`
- Session payload: `patientId`, `facilityId`, `orgId`
- Two registration paths:
  - **Staff-initiated**: nurse registers patient, system sends SMS/email invite to claim account
  - **Self-registration**: patient enters name, birthdate, registered contact → system finds existing record → sends verification code → patient sets password
- Patients cannot create new patient records through the portal — they can only claim existing ones
- Session timeout: 60 minutes

### 5.4 Ops Auth

- Configured in `apps/control-plane/api/src/auth/ops-auth.ts`
- Completely separate database from all org instances
- MFA mandatory — enforced before any route is accessible
- IP whitelist enforced at middleware level
- Ops users have zero access to org data without an approved TempAccessGrant

---

## 6. Plugin System

### 6.1 Definition

HealthBridge ships with a complete core feature set available to every org on day one. Plugins are additional capabilities — beyond core — that org admins can install freely from the plugin directory without any approval from the HealthBridge team.

### 6.2 How It Works

The HealthBridge team builds, validates, and publishes plugins to the plugin directory. Once published, any org admin can install them. Installation is immediate — no deployment required.

```
HealthBridge team builds plugin
    ↓
Plugin validated and published to directory
    ↓
Org admin browses directory in Settings → Plugins
    ↓
Org admin installs plugin — one click
    ↓
Plugin active immediately — new sidebar items,
new form fields, new report types appear
    ↓
Org admin can uninstall at any time
```

### 6.3 Plugin Directory (Initial)

| Plugin | Description | Primary Users |
|---|---|---|
| Inventory & Logistics | Multi-warehouse inventory, product catalog thresholds, batch ledger, FEFO checks, and inter-facility stock transfers. | Both |
| Pharmacy Dispensing | Fulfills EMR prescriptions, manages the pharmacy queue, and runs the atomic dispensing stock deduction. | Both |
| Procurement | Requisitions, PO generation (with PDF sending), GRN matching, invoices, and Accounts Payable aging. | Both |
| FHSIS Reporting | DOH-mandated monthly, quarterly, annual reports auto-generated from consultation data | LGU |
| LMIS Reporting | Stock and consumption reports per DOH LMIS format | LGU |
| PhilHealth Billing | PCB1/PCB2 claim generation and tracking | Both |
| Cold Chain | Temperature-sensitive asset management and monitoring | Both |
| SMS Reminders | Appointment reminders and stock alerts via SMS gateway | Both |
| DOH Integrations | NOSIRS, MNDRS, ITIS, DHIS-2 connections | LGU |
| Revenue & POS Billing | Payment queueing, cashier billing, invoice receipt printing, and BIR CAS/EIS integration. | Private |
| Custom Report Builder | Visual builder for custom analytical reports | Both |
| Cross-Org Referrals | Consent-gated secure patient record packets sent between isolated organization deployments. | Both |
| Disease Surveillance | Automated ICD-10 threshold monitors and household-level contact tracing alerts. | Both |
| Specialized Dental Pack | Interactive adult/child dental charting, individual tooth procedure histories, and charting logs. | Both |
| Maternal & Prenatal | Pregnancy calculators (EDC, AOG), fetal heart/fundal height tracking, tetanus toxoid schedule, and MCH records. | Both |
| Pediatrics & Vaccines | WHO child growth charts, automated vaccination schedules, and growth percentiles. | Both |
| TB DOTS Control | DOTS enrollment cards, daily medication administration logs, and sputum test tracking. | Both |
| Specialty Diagnostics | Refraction logs (visual acuity) for Eye clinics, range of motion mapping for Physical Therapy. | Both |
| LIS Integration | Automatic bidirectional sync between EMR laboratory orders and physical lab analyzers (HL7). | Both |
| PACS / DICOM Viewer | Native DICOM image viewing directly inside clinical consultation and patient record screens. | Both |
| Telehealth Consultations | Embedded secure WebRTC video consults, virtual waiting rooms, and portal scheduling. | Both |
| Queue TV Display Board | Browser-based TV dashboard for smart TVs in physical waiting rooms. | Both |
| e-MedCert & Doc Signer | Secure MedCert and clearance generation with cryptographic digital signatures and verification QR codes. | Both |
| BHW Field PWA App | Offline-first Progressive Web App for Barangay Health Workers conducting home profiling visits. | LGU |
| BHS Sneakernet Sync | Local database instances running on low-cost hardware for remote areas, syncing via USB drives. | LGU |
| PhilHealth Capitation Tracker | Financial analytical dashboard matching PhilHealth Konsulta capitation revenue against actual care cost. | LGU |
| Clinical Decision Support | AI-assisted drug-drug interaction warning systems and customized clinical protocol alerts. | Both |

### 6.4 Plugin Architecture

Plugins hook into core events via the `PluginRegistry`:

```typescript
export interface HealthBridgePlugin {
  id: string
  name: string
  version: string
  hooks?: {
    afterDispense?: (ctx: DispenseContext) => Promise<void>
    afterConsultation?: (ctx: ConsultationContext) => Promise<void>
    afterGoodsReceipt?: (ctx: GoodsReceiptContext) => Promise<void>
    afterPatientRegister?: (ctx: PatientContext) => Promise<void>
    onScheduledJob?: (jobName: string) => Promise<void>
  }
  routes?: PluginRoute[]
  navItems?: NavItem[]
  permissions?: string[]
}
```

Hook emits are always async and non-blocking — they fire after the core transaction commits, never inside it. A plugin failure never affects core functionality.

---

## 7. Patient & Clinical

### 7.1 Patient Registration

Every patient has one record per facility. Staff registers the patient on their first visit.

**Demographics:**
- Name (prefix, first, middle, last, suffix)
- Sex, date of birth, birth place
- Civil status, blood type, nationality, religion
- Ethnic group, indigenous flag
- Photo

**Address (PSGC-linked):**
- Region, province, municipality, barangay
- Street address, zip code

**Contact:**
- Primary contact number
- Email address
- Emergency contact (name, relationship, phone)

**Profile-Specific Identity & Linkages:**
- **Government Profile:** PhilHealth PIN, PhilHealth category, NHTS/4Ps status, Pantawid ID, Family Serial Number.
- **Private/Commercial Profile:** Primary Insurance/HMO Provider, HMO Card/Policy Number, Policy Holder Name, Group ID, and Pre-authorization Status.

**Clinical baseline:**
- Known allergies (allergen type, name, reaction, severity)
- Patient alerts (disability, special conditions)

**Patient ID:**
Auto-generated PIN scoped to the facility. Format configurable per org. Unique within facility.

**Duplicate detection:**
On save, system runs a fuzzy match against existing records (name + birthdate + sex). If potential duplicates found, staff sees a list and can either proceed with new registration or select the existing record. Records can be merged by authorized staff — one record becomes the canonical record, the other's history is transferred and it's marked as merged.

### 7.2 Family Tree

Patients can be linked in a household structure. This enables contact tracing, family health history, and household-level disease surveillance.

**Household:**
A household is a group of patients sharing the same address or family unit. One patient is designated as the head of household.

**Relationships:**
- Spouse
- Parent / Child
- Sibling
- Grandparent / Grandchild
- Guardian
- Household member (same address, no blood relation)

**What the family tree enables:**
- View all household members and their active conditions from any member's record
- When a TB, dengue, or other communicable disease is diagnosed — system flags all household members as contacts for screening
- Navigate between family member records with one click
- Community health worker home visits linked to the household, not just an individual patient
- Disease surveillance at household level — "3 of 5 dengue cases this week are from the same household"

**Cross-org referrals and family tree:**
Family tree stays in the originating org. When a cross-org referral is sent, the referral packet includes relevant family history as clinical context only — not the full tree structure. The receiving org creates a standalone patient record. If the patient becomes a regular patient at the receiving org, staff can build their family tree there independently.

### 7.3 Consultation

Every patient visit produces a consultation record. Consultations are the clinical source of truth — everything that happens to a patient clinically flows from a consultation.

**Consultation types:**
General, Prenatal, Post-Partum, Family Planning, Dental, TB DOTS, Child Care, Sick Children, Child Immunization, Child Nutrition, Adult Immunization, Injury, Firecracker Injury

**Nature of visit:** New Case, Follow-up

**On every consultation:**
- Date, time, attending provider
- Nature of visit, consultation type
- Mode of transaction (Walk-in, Referral-in)
- Auto-computed patient age (years, months, days) from birthdate
- Patient consent recorded

**Vital signs:**
Blood pressure (systolic/diastolic) with assessment, respiratory rate, body temperature, heart rate, pulse rate, oxygen saturation, height, weight, BMI (auto-computed), BMI category, height-for-age, weight-for-age

**Physical examination:**
Per body system (HEENT, Chest, Abdomen, Extremities, Neurological, etc.) with findings and normal/abnormal flag

**Diagnosis:**
ICD-10 code search and selection. Multiple diagnoses per consultation. Each classified as Primary, Secondary, Provisional, or Working.

**Doctor's orders:**
Lab requests, imaging requests, procedure orders — each linked to the consultation. Lab results entered when available, linked to the originating order.

**Medication orders:**
Doctor writes medication orders during the consultation. Each order specifies product, dose, frequency, duration, quantity, and instructions. Medication orders appear immediately in the pharmacy queue for fulfillment.

**Clinical notes:**
Chief complaint, history of present illness, treatment plan, follow-up instructions.

**Consultation status flow:**
```
DRAFT → IN_PROGRESS → COMPLETED
```
A consultation can only be edited while in DRAFT or IN_PROGRESS. Completed consultations are locked and immutable to protect clinical integrity.

**Specialty Clinic Customizations:**
Specialized clinic plugins (e.g., Dental, Maternal Care, Pediatrics) extend the standard consultation view dynamically. Depending on the consultation type and installed plugins, the EMR Core renders custom tab views (like dental charts or WHO growth graphs) inside the consultation UI. Specialty data is saved dynamically in a JSONB `metadata` field on the consultation record or in dedicated plugin tables, linking back to the consultation ID.

**FHSIS service records (FHSIS Reporting plugin):**
When the FHSIS Reporting plugin is installed, each consultation type generates a corresponding FHSIS service record alongside the consultation. The FHSIS data is structured per DOH program requirements and stored in a JSONB field indexed by facility, service type, and reporting period. Monthly FHSIS reports are compiled from these records automatically.

### 7.4 Prescriptions

A prescription is a formalized subset of the medication orders on a consultation — specifically the medicines to be dispensed to the patient to take home.

- Linked to a consultation and medication order
- Product (from inventory), dose, frequency, duration, quantity, instructions
- Valid until date
- Status: ACTIVE → DISPENSED / PARTIALLY_DISPENSED / CANCELLED
- **e-Prescription Verification:** Every prescription is assigned a unique, secure cryptographic short-token/hash on generation. This token is encoded as a QR code and barcode.
- **Printed/Digital QR code:** Included on the printed PDF prescription slip and rendered on the patient portal active prescription screen.

Prescriptions flow directly into the pharmacy queue. The pharmacist does not re-enter any prescription data — she fulfills what the doctor already entered.

### 7.5 Referrals

See Section 11 — Referral Network.

### 7.6 Scheduled Visits

A consultation can produce a scheduled follow-up visit — a date and purpose for the patient's next visit.

The scheduled visit is a lightweight record:
- Patient, facility, date, purpose
- Status: PENDING / CONFIRMED / CANCELLED / COMPLETED

When the SMS Reminders plugin is installed, patients receive an SMS reminder a configurable number of days before the scheduled visit. Patients can confirm or cancel via the patient portal.

When the patient arrives for their scheduled visit, staff opens a new consultation linked to the scheduled visit — marking it as COMPLETED.

---

## 8. Pharmacy & Dispensing

### 8.1 Philosophy

Dispensing is not a standalone module. It is the conclusion of a clinical encounter — the moment a doctor's medication order becomes medicine in a patient's hands. The dispensing workflow is built around this reality.

The pharmacist or nurse does not create a dispensing record. She fulfills a medication order that the doctor already created. Her primary interface is a queue, not a form.

### 8.2 The Dispensing Bridge

The dispensing bridge is the atomic transaction at the heart of HealthBridge. When a pharmacist confirms a dispense:

```
BEGIN TRANSACTION
  1. Validate batch(es) — FEFO order, sufficient quantity, 
     ACTIVE status, not expired
  2. INSERT dispense_record
  3. For each medicine:
     a. INSERT dispense_line
     b. UPDATE inventory_batches SET quantity_on_hand -= qty
     c. UPDATE inventory_items SET quantity_on_hand -= qty
     d. INSERT stock_transaction (type=DISPENSE, 
        patient_id, consultation_id)
  4. UPDATE prescription SET status = DISPENSED
COMMIT

After commit (non-blocking):
  5. pluginRegistry.emit('afterDispense', ctx)
     — FHSIS hook: queue FHSIS consumption entry (Government Profile)
     — LMIS hook: queue LMIS consumption entry (Government Profile)
     — Billing hook: queue invoice/cashier payment entry (Private Profile)
     — Surveillance hook: check diagnosis thresholds (All Profiles)
```

On any failure: `ROLLBACK`. Nothing is written. No partial state. The pharmacist sees a clear error and can retry.

This transaction is the single most important piece of code in HealthBridge. It must never be compromised.

### 8.3 FEFO Batch Selection

First Expired, First Out. When a pharmacist dispenses a product:

1. System queries `inventory_batches` for this product at this facility
2. Filters: status = ACTIVE, quantity_on_hand > 0, expiry_date > TODAY
3. Orders by: expiry_date ASC (soonest expiry first)
4. Auto-selects batch(es) covering the required quantity
5. If one batch is insufficient, system cascades to the next soonest-expiry batch

The pharmacist sees which batch was selected but does not need to manually choose. She can override the selection if there is a legitimate reason (documented in notes).

### 8.4 Pharmacy Queue

The pharmacist's primary view. A real-time list of all pending medication orders across the facility, ordered by time of consultation.

**Queue Retrieval Methods:**
* **Queue List:** The default list of pending medication orders, filterable by name or waiting duration.
* **Barcode/QR Code Scanner Input:** A text/scanner input at the top of the queue screen. Scanning the printed prescription barcode or the patient portal mobile QR code decodes the prescription token, instantly retrieving and loading that specific prescription details screen.

Each queue item shows:
- Patient name, age, sex
- Time waiting
- Medicines ordered (product, dose, frequency, quantity)
- Prescribing doctor
- Consultation type
- Allergy alerts (if patient has allergies relevant to ordered medicines)

The pharmacist reviews the scanned or selected order, confirms quantities, and clicks Dispense. FEFO batch selection is shown. One action fires the dispensing bridge.

**Partial dispense:**
If stock is insufficient for the full order, the pharmacist can dispense what is available. The prescription is marked PARTIALLY_DISPENSED. The remaining quantity stays in the queue. When stock is replenished, the patient's order reappears with the remaining quantity. The stock shortage that caused the partial dispense automatically triggers a stock alert.

**Dispense revert:**
If a dispense was recorded in error, an authorized user can revert it. Revert requires a reason. Revert is an equal and opposite stock transaction — it does not delete the original dispense record. Both the dispense and the revert are permanently visible in the audit trail.

### 8.5 Program Dispense

Not all medicine goes to individual patients. Some goes to community programs:
- Immunization campaigns (vaccines to a session, not individual patients)
- Nutrition programs (micronutrient supplementation distributed by barangay)
- TB DOTS (medicines handed to community health workers for home administration)

Program dispenses are created directly — not from a medication order queue. The staff member specifies: product, batch (FEFO auto-selected), quantity, program name, recipient (CHW name or station), date, and notes.

Program dispenses still go through the dispensing bridge — stock decrements atomically, LMIS consumption records, FHSIS records if applicable. The difference is context: program rather than patient.

### 8.6 Station Issuance

Stock issued to a ward, ER, or internal station for general use. Not patient-specific. This is a logistics operation — it belongs in the Logistics section, not the Pharmacy section. It creates a stock transaction of type ISSUE, referencing the destination station.

---

## 9. Inventory & Logistics

### 9.1 Product Catalogue

The product catalogue defines what medicines, vaccines, supplies, and equipment exist in the system. It is the reference used by procurement, inventory, dispensing, and reporting.

**Product:**
- Generic name, brand name (optional)
- Dosage form (tablet, capsule, syrup, injection, etc.)
- Category: MEDICINE, VACCINE, SUPPLY, EQUIPMENT
- Unit of measure
- Batch tracking flag (most medicines yes, some supplies no)
- Cold chain required flag
- VVM required flag (for vaccines)
- Reorder level, minimum stock level, maximum stock level
- Storage requirements
- NOSIRS code (if NOSIRS integration plugin installed)

**Per-facility threshold overrides:**
Each facility can override the product's global reorder, minimum, and maximum stock levels. A large RHU may set higher thresholds than a small BHS for the same medicine.

### 9.2 Inventory

Stock is tracked at the batch level within a facility's warehouse.

**Warehouse:**
Each facility has one default warehouse. Additional warehouses can be created for facilities with genuinely separate storage areas (e.g., a main pharmacy and a cold chain room). Most facilities will only ever need one.

**Inventory Item:**
The total quantity on hand for a product at a specific warehouse. This is the aggregate — the sum of all active batches for that product.

**Inventory Batch:**
The granular record — a specific physical batch of a product with its own lot number, expiry date, quantity, and location. This is what FEFO operates on.

```
inventory_items  (product + warehouse = 1 record, total qty)
    └── inventory_batches  (1 record per physical batch received)
```

**Batch fields:**
- Batch number, lot number
- Quantity on hand
- Manufactured date, expiry date
- Days till expiry (auto-computed, always current)
- VVM status (for vaccines)
- Manufacturer
- Unit price (at time of receipt / purchase cost)
- Funding source / Ownership (Government: DOH, LGU budget, PhilHealth capitation; Private: DIRECT_PURCHASE, CONSIGNMENT, DONATION)
- Storage location (text label — optional)
- Status: ACTIVE, EXPIRED, QUARANTINED, DISPOSED

### 9.3 Stock Transactions

Every stock movement in HealthBridge — without exception — creates a stock transaction record. This is the permanent, immutable ledger of everything that has ever happened to stock at a facility.

```
Transaction types:
RECEIVE         Goods received from supplier or donation
ISSUE           Issued to internal station/ward
DISPENSE        Dispensed to patient or program
TRANSFER_OUT    Sent to another facility
TRANSFER_IN     Received from another facility
DISPOSAL        Removed due to expiry, damage, or contamination
RETURN          Returned to supplier
```

Each transaction records: facility, warehouse, product, batch, type, quantity, quantity before, quantity after, reference type, reference ID (PO, dispense record, issuance, etc.), patient ID (if patient-specific), consultation ID (if from clinical), date, and who recorded it.

This ledger is the source of truth for all inventory reports — stock movement history, consumption analysis, LMIS reports. No separate "movements module" — the ledger IS the movements. It's surfaced as a filtered view within the Inventory section.

### 9.4 Stock Alerts

The system continuously monitors inventory levels and fires alerts automatically:

| Alert | Trigger | Severity |
|---|---|---|
| Out of stock | quantity_on_hand = 0 | Critical |
| Below minimum | quantity_on_hand < min_stock_level | Critical |
| Reorder point | quantity_on_hand <= reorder_level | Warning |
| Near expiry | expiry_date <= today + 90 days | Warning |
| Expiring soon | expiry_date <= today + 30 days | Critical |
| Expired | expiry_date < today | Critical |

Critical stock alerts surface in the operations dashboard and trigger in-app notifications. When the SMS Reminders plugin is installed, critical alerts also send SMS to authorized staff.

A partial dispense that caused a stock-out triggers an immediate critical alert — directly linking the clinical event to the logistics consequence.

A stock-out or reorder alert automatically creates a draft requisition — pre-filled with the product and suggested quantity (based on average daily consumption). The storekeeper reviews and submits.

### 9.5 Stock Adjustments

Only two legitimate adjustment types exist in HealthBridge:

**Disposal:**
Removing stock from inventory for a documented reason. Reasons: Expired, Physically Damaged, Contaminated, Failed Quality Inspection, Other (requires text). Requires witness for controlled medicines. Creates a stock transaction of type DISPOSAL. Generates a disposal report entry for regulatory and audit compliance (DOH compliance for government profile; FDA and internal financial audit for private profile).

Quantity adjustments for unexplained discrepancies do not exist in HealthBridge. If the dispensing bridge is working correctly, stock levels are always accurate. If a discrepancy is discovered, it indicates a process failure that should be investigated, not silently corrected with a quantity adjustment.

**Location Transfer:**
Moving stock from one storage location to another within the same facility. No change in total quantity — two equal and opposite transactions. Used when reorganizing storage or moving stock to the cold chain room.

### 9.6 Inter-Facility Stock Issuances

Facilities within the same organization can transfer stock to each other. This is how the supply chain works for LGUs — the Municipal Health Office distributes stock to RHUs, which distribute to Barangay Health Stations.

**Stock Issuance:**
- Source facility, destination facility
- Products, batches, quantities (batch integrity preserved — expiry dates and batch numbers travel with the stock)
- Delivery date and reference

When the destination facility records the receipt, inventory is updated at both ends atomically:
- Source facility: stock transaction TRANSFER_OUT
- Destination facility: stock transaction TRANSFER_IN + new inventory_batch record

---

## 10. Procurement

### 10.1 Philosophy

Procurement in HealthBridge follows standard Procure-to-Pay (P2P) flow. It is not invented from scratch — it follows what works in established procurement systems. The goal is to connect procurement to clinical demand — stock is ordered because patients need medicine, not because a storekeeper happened to notice the shelf was empty.

### 10.2 P2P Flow

```
Stock hits reorder level
    ↓
System creates draft requisition (auto-suggested)
    ↓
Storekeeper reviews and submits requisition
    ↓
Authorized approver approves requisition
    ↓
Procurement officer creates Purchase Order from requisition
    ↓
PO sent to supplier (email from system)
    ↓
Goods arrive — storekeeper records Goods Receipt (GRN)
    ↓
System performs three-way match (PO + GRN + Invoice)
    ↓
Clean match → Invoice auto-approved, queued for payment
Discrepancy → Flagged for manual review
    ↓
Payment recorded (method, reference, date)
    ↓
Payable closed
```

### 10.3 Requisition

An internal document requesting medicines be procured.

- Products, quantities, unit of measure
- Reason (reorder, program, new item)
- Preferred delivery date
- Auto-suggested from stock alert (pre-filled with product and estimated quantity based on average daily consumption)
- Approval by authorized staff (RBAC-gated)

Once approved, the requisition is the basis for one or more Purchase Orders.

### 10.4 Purchase Order

Created by procurement staff from an approved requisition.

- Supplier selection
- Line items: product, quantity, negotiated unit price, discount
- Expected delivery date
- Payment terms (30/60/90 days or custom)
- Funding source (for LGUs)
- Total amount (auto-computed)
- PO sent to supplier via email directly from the system — formatted PDF attachment

Approval required above a configurable spend threshold (org-defined via RBAC permissions).

**Supplier record:**
Name, contact person, email, address, phone. Tax type (VAT/NON-VAT) and withholding tax rate recorded at the supplier level — applied automatically to invoices. Credit terms and credit limit for outstanding payables tracking.

### 10.5 Goods Receipt (GRN)

Records what physically arrived at the facility. No approval workflow — receiving is a factual record, not a decision.

Per line item:
- Product, quantity received (may differ from PO quantity)
- Batch number, lot number
- Manufactured date, expiry date
- Condition (Good, Damaged, Short delivery)
- Storage location (optional)
- Serial numbers (for serialized items)
- Barcode scanning support

DR (delivery receipt) document attachment.

On save: inventory updated immediately. Stock transactions of type RECEIVE created. New inventory_batch records created per received batch.

Short deliveries flagged automatically — remaining quantity stays on the PO as outstanding.

### 10.6 Three-Way Match

Automatic comparison of PO, GRN, and Invoice:

| Match Type | Condition | Result |
|---|---|---|
| Clean | Quantities and prices match within tolerance | Invoice auto-approved |
| Quantity discrepancy | GRN quantity differs from PO quantity | Flagged for review |
| Price discrepancy | Invoice price differs from PO price | Flagged for review |
| Missing GRN | Invoice received before goods | Held pending receipt |

Tolerance for price matching is configurable per org (e.g., within 1% is acceptable). Flagged discrepancies require manual review and resolution before the invoice can be approved.

### 10.7 Invoice

Created when the supplier sends their invoice.

- Reference PO and GRN
- Invoice number, date, due date
- Line items (auto-populated from PO)
- VAT (12% if applicable, supplier-level setting)
- Withholding tax (rate from supplier record)
- Additional charges (freight, handling)
- Total amount

Three-way match runs automatically on save. Clean match → status moves to APPROVED automatically. Discrepancy → status FLAGGED, notification sent to reviewer.

### 10.8 Payment

When an invoice is paid:
- Payment method (check, bank transfer, cash, online)
- Payment reference number
- Date paid
- Invoice marked PAID

**Outstanding Payables view:**
All unpaid invoices ordered by due date. Aging buckets (current, 30 days, 60 days, 90+ days overdue). This is the accounts payable aging report — no separate module needed, it's a filtered view of invoices.

---

## 11. Referral Network

### 11.1 Intra-Org Referrals

Within the same organization (same database, same deployment):

- A referral is a flag on the originating consultation linking to a new consultation at another facility
- Patient record is the same — no data transfer needed
- Receiving facility staff opens a new consultation for the patient, linked to the referral
- Full patient history visible at both facilities (same org, same database)
- No consent required (same org, already under the org's data agreement with the patient)

### 11.2 Cross-Org Referrals

Between different organizations (different deployments, different databases).

**Prerequisites:**
- Both orgs must opt-in to the cross-org referral network (configured in org settings)
- Opted-in orgs specify: accepted referral types, current capacity status (Accepting/Limited/Not Accepting), geographic scope (e.g., same province only)

**Consent:**
Before sending a cross-org referral, the patient must explicitly consent. Two consent levels:

- **Basic** (required): Share demographics and current consultation summary with the receiving facility
- **Extended** (optional): Also share full consultation history

Consent is recorded permanently on the referral record.

**Referral packet:**
Built based on consent level. Sent to receiving org's deployment via the HealthBridge referral network API.

**What receiving org sees in their queue before accepting:**
- Patient age and sex (not full name — minimize PII before acceptance)
- Referral reason and urgency (Routine, Urgent, Emergency)
- Diagnosis from originating consultation
- Known allergies
- Referring facility and doctor
- Consent level granted

**On acceptance:**
- Patient record created in receiving org's database from the referral packet
- Full demographics written at this point
- Referral linked to the new patient record
- Referring org notified of acceptance

**On decline:**
- Referral packet discarded
- Nothing written to receiving org's database
- Patient data does not persist in any facility that did not accept
- Referring org notified — can search for another receiving facility

**Outcome feedback:**
When care is completed at the receiving org, staff sends an outcome back to the referring org (with patient consent):
- Diagnosis at receiving org
- Treatment provided
- Outcome (Resolved, Ongoing, Admitted, Further Referred)
- Discharge summary

The referring org sees the outcome linked to the original referral. Loop closed.

**Family tree in cross-org referrals:**
Family tree stays in originating org. Referral packet includes relevant family members as clinical context (names, relationships, active conditions) — not the full tree structure. Receiving org creates a standalone patient record.

### 11.3 Referral Slip

Any referral (intra or cross-org) can produce a printed referral slip — a formatted PDF the patient carries to the receiving facility. Contains: patient name, age, sex, referring facility, receiving facility, urgency, diagnosis, clinical summary, referring doctor's name and signature line.

---

## 12. Appointments

### 12.1 Scheduled Follow-Up

A consultation can produce a scheduled follow-up visit. The doctor records: date, time, purpose. The scheduled visit is linked to the originating consultation.

When the patient arrives, staff opens a new consultation linked to the scheduled visit — marking it as completed.

### 12.2 SMS Reminders (SMS Reminders Plugin)

When the SMS Reminders plugin is installed:
- Patients receive an SMS reminder a configurable number of days before their scheduled visit
- Patients can reply to confirm or cancel (or confirm/cancel via the patient portal)
- Staff sees confirmed vs unconfirmed appointments

### 12.3 Patient Portal Appointment Management

Via the patient portal, patients can:
- View upcoming appointments
- Confirm or cancel a scheduled visit
- View appointment history

---

## 13. Disease Surveillance

### 13.1 How It Works

Disease surveillance is not a separate data entry workflow. It is an automatic consequence of consultations happening.

Every consultation records ICD-10 diagnoses. Every diagnosis is timestamped, facility-scoped, and patient-linked. The surveillance engine continuously watches this data against configured thresholds.

Staff do not log surveillance data separately. The surveillance data IS the consultation data.

### 13.2 Alert Thresholds

Authorized staff configure alert thresholds per facility:
- ICD-10 code (specific disease)
- Case count (e.g., 5 cases)
- Time window in days (e.g., within 7 days)
- Classification filter (Suspected / Probable / Confirmed / Any)

When a new diagnosis is saved and the threshold is crossed, an alert is created automatically.

### 13.3 Alert Workflow

```
TRIGGERED → ACKNOWLEDGED → RESOLVED
```

- **Triggered**: threshold crossed, alert created, notified via in-app notification (routes to Municipal Health Officer/CESU for government profile; Medical Director/Clinic Manager for private profile)
- **Acknowledged**: authorized staff acknowledges the alert, records initial action taken
- **Resolved**: situation managed, resolution notes recorded

### 13.4 Household-Level Surveillance

When a communicable disease case is diagnosed, the system checks the patient's family tree. All household members are flagged as contacts — not just members of the same barangay, but members of the same household. Contact tracing list available for CHW follow-up.

### 13.5 FHSIS Surveillance Records (FHSIS Plugin)

When the FHSIS Reporting plugin is installed, specific consultation types generate additional surveillance data fields required by DOH:
- Case classification (Suspected, Probable, Confirmed)
- Case outcome (Recovered, Died, Unknown)
- Onset date, death date (if applicable)
- Laboratory result, specimen type, collection date

This data feeds directly into FHSIS morbidity and mortality reports.

---

## 14. Reporting

### 14.1 Three Types of Reports

**Live Dashboards** — always current, never generated. Built into the modules they belong to. The operations dashboard, pharmacy queue, and stock alert view are not reports — they are live views of real-time data.

**Compliance Reports** — auto-generated on schedule. FHSIS monthly reports generated on the last day of the month. LMIS quarterly reports generated at quarter end. Authorized staff review and submit. No manual generation, no parameter configuration. DOH defines the format; HealthBridge fills it in.

**Analytical Reports** — generated on demand with date range and filter parameters. Answering specific operational questions.

### 14.2 Analytical Report List

**Stock & Inventory:**
- Stock Status — current on-hand per product per facility
- Stock Count — system balances for compliance audit (replaces physical inventory)
- Expiry Report — batches expiring within a configurable window
- Stock Movement — all transactions for a product or period
- Stock Performance — consumption vs ASL vs EOP per product
- Disposal Report — what was disposed, when, why, by whom

**Procurement:**
- Purchase Order Status
- Supplier Performance — delivery lead time, fill rate per supplier
- Outstanding Payables — unpaid invoices by due date (aging)
- Procurement vs Consumption — was procurement driven by actual patient demand

**Clinical & Dispensing:**
- Dispensing Report — what was dispensed, to whom, when, from which batch
- Prescription vs Dispense Variance — prescribed but not dispensed (shortage indicator)
- Morbidity Report — top diagnoses by period and facility
- Consumption vs Morbidity — disease incidence vs medicine usage
- Patient Visit Report — consultation volume by type, period, facility
- Referral Report — referrals sent and received, outcomes

**Compliance (auto-generated, FHSIS/LMIS plugins):**
- FHSIS Monthly Reports (all programs)
- FHSIS Quarterly Reports
- FHSIS Annual Reports
- LMIS Monthly Report
- LMIS Quarterly Report

**Billing (PhilHealth Billing plugin):**
- PhilHealth Claims Report — PCB1/PCB2 by period and status
- Claims Reimbursement Status

**Revenue (Revenue Dashboard plugin):**
- Revenue Summary by period
- Revenue by department

### 14.3 Report Output

All analytical reports support:
- View in browser (paginated table)
- Export as CSV
- Export as PDF (with facility header and configurable signatories)

Signatories (Prepared By, Approved By) are configured at download time — a dialog asks who should appear before generating the PDF. This varies by report and by who is generating it.

### 14.4 Report Header

Facility name, address, logo, and seals are configured once in **Settings → Facility** and applied automatically to all PDF exports. Not a separate report configuration page.

---

## 15. Patient Portal

### 15.1 Overview

A separate public-facing application giving patients read-only access to their own health records. Accessible via the org-specific subdomain:

```
patient.{org-slug}.healthbridge.ph
```

Custom domain supported — an org can point their own domain here.

### 15.2 Patient Account Creation

**Staff-initiated (preferred):**
When a patient is registered, staff can optionally send an SMS or email invitation. Patient clicks the link, sets a password, and their account is linked to their existing patient record.

**Self-registration:**
Patient visits the portal, enters name, birthdate, and registered contact number. System finds the matching patient record. Sends a verification code to the registered contact. Patient verifies and sets a password. No new patient record is created — the patient is claiming their existing record.

Patients cannot create new patient records through the portal.

### 15.3 What Patients Can See

- Their own consultation history (visit date, type, attending provider, diagnosis — in plain language where possible)
- Medicines received (product name, date, quantity, prescribing doctor)
- Prescriptions (active and past, including dynamic QR codes for each active prescription to present at the pharmacy counter)
- Lab results
- Active and past referrals and their status
- Upcoming appointments
- Their own documents (uploaded by staff)
- Basic profile information

### 15.4 What Patients Can Do

- Confirm or cancel scheduled appointments
- Update contact information (subject to staff review)
- Download their own records
- Record cross-org referral consent decisions

### 15.5 What Patients Cannot Do

- Edit clinical records
- Access any other patient's records
- Perform any administrative operations
- Access staff app routes or staff API endpoints

### 15.6 Security

Patient portal sessions use a separate BetterAuth instance (`hb-patient-session`). Patient session tokens are not valid on staff API routes. Staff session tokens are not valid on the patient portal. The patient API exposes only the `/me/*` route namespace — no other data is accessible regardless of what a patient sends in a request.

---

## 16. Access Control

### 16.1 Pure RBAC

HealthBridge does not ship with predefined roles. Every organization defines their own roles with their own names and assigns permissions as they see fit.

This is intentional. An RHU in a remote municipality might have one nurse handling everything — clinical, pharmacy, and logistics. A private hospital network might have dedicated procurement officers, pharmacy staff, and clinical teams with no overlap. Forcing both into the same role definitions would not serve either.

### 16.2 Permission Structure

Permissions follow the pattern `resource:action`:

```
patients:view               patients:create
patients:update             patients:merge
patients:delete (soft)

consultations:view          consultations:create
consultations:update        consultations:complete

pharmacy:queue:view         pharmacy:dispense
pharmacy:program_dispense   pharmacy:revert_dispense

inventory:view              inventory:dispose
inventory:transfer_location inventory:adjust

procurement:requisition:create   procurement:requisition:approve
procurement:po:create            procurement:po:approve
procurement:grn:create
procurement:invoice:view         procurement:invoice:approve
procurement:payment:record

referrals:send              referrals:receive
referrals:manage_network

appointments:view           appointments:create
appointments:manage

surveillance:view           surveillance:manage_thresholds
surveillance:acknowledge    surveillance:resolve

reports:analytics:view      reports:compliance:view
reports:compliance:submit   reports:export

settings:org:manage         settings:facilities:manage
settings:users:manage       settings:roles:manage
settings:plugins:manage     settings:thresholds:manage
```

Plugins add their own permission strings to this list when installed.

### 16.3 Role Creation

Org admins create roles in **Settings → Roles**. The permission matrix groups permissions by domain (Clinical, Pharmacy, Inventory, Procurement, etc.) with expand/collapse per domain and grant/revoke all per domain.

### 16.4 Protected Admin

At least one user must always have `settings:users:manage` and `settings:roles:manage` permissions. The system prevents an org from removing these permissions from all users — it would be impossible to recover without ops team intervention.

### 16.5 User Assignment

Each user is assigned:
- One role
- One facility (or org-wide for admin roles)

An org-wide role can access all facilities under the org. A facility-scoped role can only access data from their assigned facility.

---

## 17. Audit & Compliance

### 17.1 Audit Log

Every write operation in HealthBridge creates an audit log entry:
- User who performed the action
- Action type (CREATE, UPDATE, DELETE, STATUS_CHANGE, APPROVE, DENY, DISPENSE, etc.)
- Table and record affected
- Old values and new values (JSONB diff)
- IP address, user agent
- Timestamp
- `temp_access_grant_id` (set when action performed under ops team temporary access)

Audit logs are immutable. They are never deleted. They are retained for a minimum of 7 years per DOH data retention requirements.

### 17.2 Activity Timeline

Every major document (consultation, purchase order, dispense record, referral, etc.) has an activity timeline — a chronological list of everything that happened to that record, surfaced in the document's detail view. This is a filtered view of the audit log, not a separate data structure.

### 17.3 Data Privacy (R.A. 10173)

- Patient records are soft-deleted — never hard-deleted
- PII fields encrypted at rest (PhilHealth numbers, contact information)
- Each org deployment is fully isolated — no cross-org data access possible by design
- Cross-org referral data transfers are consent-gated and logged
- PHO/DOH access (when integrated) is aggregate/statistical — no individual patient PII
- Ops team access to org data requires explicit org admin approval via the TempAccessGrant system

---

## 18. Control Plane

### 18.1 Purpose

The Control Plane (`apps/control-plane/ops` for frontend, `apps/control-plane/api` for backend) is the HealthBridge team's internal operations tool. It manages organizations at the platform level. It has no access to clinical data, patient records, or any org-level operational data.

As a SaaS platform administration suite, the Control Plane orchestrates billing tiers, usage metrics, feature toggling, domain binding, and white-label overrides for all tenants.

**Tenant Tiers, Subscription & Billing:**
- **SaaS Plan Management:** Assign and update tenant subscription tiers:
  - `FREE_TRIAL`: Limited-time evaluation, restricted capacity.
  - `CLINIC_STANDARD`: Single-branch clinic profile, limited staff seats.
  - `CLINIC_PRO`: Multi-branch clinic profile, advanced plugins, unlimited staff.
  - `LGU_BASIC`: Local municipal government setup with basic DOH reporting.
  - `LGU_ENTERPRISE`: Unified city-wide health network, advanced analytics.
  - `HOSPITAL_ENTERPRISE`: Hospital group with deep LIS/PACS system integrations.
- **Payment Gateway Integration:** Manage mappings to Stripe/Xendit customers, active subscriptions, billing schedules, and automated invoicing.
- **Dunning & Grace Periods:** Track unpaid subscriptions, trigger automatic suspension workflows (read-only state locks), and configure recovery grace periods.

**Usage Quotas & Metering:**
- **Metered Resource Monitoring:** Track tenant usage metrics in real time against plan limits:
  - Active Clinicians/Staff Seats: Prevents adding new users if quota is exceeded.
  - Registered Patients database size.
  - Total File Storage (medical imaging, vital sign attachments, audit trails).
  - Outgoing Transactional Alerts (SMS/Viber notifications).
- **Overages Configurator:** Configure pricing and billing rules for overages (e.g., pricing per extra 10GB storage or per 1,000 SMS).

**Feature Toggles & System Configurations:**
- **Core Module Feature Flags:** Enable/disable advanced product modules dynamically per organization (e.g., toggle Telehealth consultation rooms, PACS DICOM viewers, electronic doctor certificates, or PhilHealth Konsulta trackers).
- **White-Labeling & Branding Configurator:** Manage customizable assets and design overrides:
  - Theme colors primary/secondary HSL tokens.
  - Organization branding logos, seals, and report templates.
- **Domain Binding & SSL:** Monitor custom domains (`custom_domain` CNAME verification status) and check status logs for automated ACME SSL certificate renewals.

**Plugin Directory:**
- Publish new plugins (after internal security and performance validation)
- Manage plugin versions
- View plugin adoption across orgs

**Schema Upgrades & Maintenance:**
- **Automated Database Provisioning:** Initialize isolated PostgreSQL schemas/instances during onboarding.
- **Tenant Schema Migrations:** Orchestrate and track database migration tasks across all tenant databases to match the global shared app version.
- **Migration Logs & Rollbacks:** Monitor completion, failures, and execution timings per database instance.

**Temporary Access:**
- Request access to an org's deployment (ops team)
- View pending, approved, expired, and revoked grants
- Access org via time-limited portal after approval
- Full audit trail per grant

**Migrations:**
- View migration history per org (read-only — migrations are run via CLI, not the Control Plane UI)
- Migration status, record counts, errors

**Incidents:**
- Log and track platform incidents
- Link to affected orgs
- Track resolution

**Platform Metrics (aggregate only — no PII):**
- Active organizations and facilities
- Deployment version distribution
- Plugin adoption rates
- Platform-level error rates
- SaaS MRR (Monthly Recurring Revenue) and LTV (Lifetime Value) metrics

### 18.3 Control Plane Auth

Separate BetterAuth instance. Mandatory MFA. IP whitelist enforced at middleware. Ops users have no access to org data without an approved TempAccessGrant.

---

## 19. Database Schema

### 19.1 Core Tables

```sql
-- Organizations (in org instance database)
CREATE TABLE organizations (
  id                UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name              VARCHAR(300) NOT NULL,
  slug              VARCHAR(100) UNIQUE NOT NULL,
  type              VARCHAR(30) NOT NULL,
  status            VARCHAR(20) DEFAULT 'TRIAL',
  billing_email     VARCHAR(200),
  created_at        TIMESTAMPTZ DEFAULT NOW(),
  updated_at        TIMESTAMPTZ DEFAULT NOW()
);

-- Facilities
CREATE TABLE facilities (
  id                     UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  organization_id        UUID NOT NULL REFERENCES organizations(id),
  nhfr_code              VARCHAR(50) UNIQUE,
  name                   VARCHAR(300) NOT NULL,
  facility_type          VARCHAR(20) NOT NULL,
  region_code            VARCHAR(10) REFERENCES regions(code),
  province_code          VARCHAR(10) REFERENCES provinces(code),
  municipality_code      VARCHAR(10) REFERENCES municipalities(code),
  barangay_code          VARCHAR(10) REFERENCES barangays(code),
  address                TEXT,
  contact_number         VARCHAR(50),
  email                  VARCHAR(200),
  logo_url               VARCHAR(500),
  left_seal_url          VARCHAR(500),
  right_seal_url         VARCHAR(500),
  report_header_province VARCHAR(200),
  report_header_office   VARCHAR(200),
  is_active              BOOLEAN DEFAULT true,
  created_at             TIMESTAMPTZ DEFAULT NOW()
);

-- Geographic Hierarchy (PSGC)
CREATE TABLE regions (code VARCHAR(10) PRIMARY KEY, name VARCHAR(200) NOT NULL);
CREATE TABLE provinces (code VARCHAR(10) PRIMARY KEY, name VARCHAR(200) NOT NULL, region_code VARCHAR(10) REFERENCES regions(code));
CREATE TABLE municipalities (code VARCHAR(10) PRIMARY KEY, name VARCHAR(200) NOT NULL, province_code VARCHAR(10) REFERENCES provinces(code));
CREATE TABLE barangays (code VARCHAR(10) PRIMARY KEY, name VARCHAR(200) NOT NULL, municipality_code VARCHAR(10) REFERENCES municipalities(code));

-- Roles & Users
CREATE TABLE roles (
  id          UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name        VARCHAR(100) NOT NULL,
  description TEXT,
  scope       VARCHAR(20) NOT NULL  -- FACILITY, ORG_WIDE
);

CREATE TABLE permissions (
  id          UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  role_id     UUID NOT NULL REFERENCES roles(id) ON DELETE CASCADE,
  permission  VARCHAR(100) NOT NULL,
  UNIQUE(role_id, permission)
);

CREATE TABLE users (
  id                  UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  email               VARCHAR(200) UNIQUE NOT NULL,
  password_hash       VARCHAR(300) NOT NULL,
  first_name          VARCHAR(100) NOT NULL,
  last_name           VARCHAR(100) NOT NULL,
  display_name        VARCHAR(200),
  contact_number      VARCHAR(30),
  role_id             UUID NOT NULL REFERENCES roles(id),
  facility_id         UUID REFERENCES facilities(id),
  is_active           BOOLEAN DEFAULT true,
  is_first_login      BOOLEAN DEFAULT true,
  last_login_at       TIMESTAMPTZ,
  mfa_enabled         BOOLEAN DEFAULT false,
  created_by          UUID REFERENCES users(id),
  created_at          TIMESTAMPTZ DEFAULT NOW()
);

-- Patients
CREATE TABLE patients (
  id                    UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  facility_id           UUID NOT NULL REFERENCES facilities(id),
  pin                   VARCHAR(20) NOT NULL,
  prefix                VARCHAR(10),
  first_name            VARCHAR(100) NOT NULL,
  last_name             VARCHAR(100) NOT NULL,
  middle_name           VARCHAR(100),
  suffix                VARCHAR(10),
  sex                   VARCHAR(10) NOT NULL,
  birth_date            DATE NOT NULL,
  birth_place           VARCHAR(200),
  civil_status          VARCHAR(30),
  blood_type            VARCHAR(5),
  nationality           VARCHAR(50),
  religion              VARCHAR(50),
  ethnic_group          VARCHAR(50),
  is_indigenous         BOOLEAN DEFAULT false,
  region_code           VARCHAR(10),
  province_code         VARCHAR(10),
  municipality_code     VARCHAR(10),
  barangay_code         VARCHAR(10),
  street_address        VARCHAR(255),
  zip_code              VARCHAR(10),
  contact_number        VARCHAR(30),
  email                 VARCHAR(200),
  emergency_contact_name VARCHAR(200),
  emergency_contact_phone VARCHAR(30),
  emergency_contact_relationship VARCHAR(50),
  philhealth_number     VARCHAR(30),  -- Government Profile
  philhealth_category   VARCHAR(50),
  philhealth_status     VARCHAR(30),
  nhts_id               VARCHAR(50),
  is_nhts_member        BOOLEAN DEFAULT false,
  pantawid_id           VARCHAR(50),
  is_4ps_member         BOOLEAN DEFAULT false,
  family_serial_number  VARCHAR(50),
  insurance_provider    VARCHAR(200),  -- Private/General Profile
  insurance_number      VARCHAR(100),
  hmo_card_number       VARCHAR(100),
  hmo_policy_holder     VARCHAR(200),
  hmo_approval_code     VARCHAR(100),
  photo_url             VARCHAR(500),
  status                VARCHAR(20) DEFAULT 'ACTIVE',
  is_merged             BOOLEAN DEFAULT false,
  merged_into_id        UUID REFERENCES patients(id),
  portal_account_id     VARCHAR(200),
  created_by            UUID REFERENCES users(id),
  created_at            TIMESTAMPTZ DEFAULT NOW(),
  updated_at            TIMESTAMPTZ DEFAULT NOW(),
  UNIQUE(facility_id, pin)
);

CREATE TABLE patient_allergies (
  id            UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  patient_id    UUID NOT NULL REFERENCES patients(id) ON DELETE CASCADE,
  allergen_type VARCHAR(50) NOT NULL,
  allergen_name VARCHAR(200) NOT NULL,
  reaction      TEXT,
  severity      VARCHAR(20),
  created_by    UUID REFERENCES users(id),
  created_at    TIMESTAMPTZ DEFAULT NOW()
);

CREATE TABLE patient_alerts (
  id            UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  patient_id    UUID NOT NULL REFERENCES patients(id),
  alert_type    VARCHAR(50) NOT NULL,
  description   TEXT,
  is_active     BOOLEAN DEFAULT true,
  created_by    UUID REFERENCES users(id),
  created_at    TIMESTAMPTZ DEFAULT NOW()
);

-- Family Tree
CREATE TABLE households (
  id             UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  facility_id    UUID NOT NULL REFERENCES facilities(id),
  household_code VARCHAR(50),
  address        TEXT,
  barangay_code  VARCHAR(10),
  created_at     TIMESTAMPTZ DEFAULT NOW()
);

CREATE TABLE patient_relationships (
  id                 UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  patient_id         UUID NOT NULL REFERENCES patients(id),
  related_patient_id UUID NOT NULL REFERENCES patients(id),
  relationship_type  VARCHAR(50) NOT NULL,
  household_id       UUID REFERENCES households(id),
  is_head            BOOLEAN DEFAULT false,
  created_at         TIMESTAMPTZ DEFAULT NOW(),
  UNIQUE(patient_id, related_patient_id)
);

-- Consultations
CREATE TABLE consultations (
  id                    UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  facility_id           UUID NOT NULL REFERENCES facilities(id),
  patient_id            UUID NOT NULL REFERENCES patients(id),
  consultation_number   VARCHAR(30),
  consultation_date     DATE NOT NULL,
  consultation_time     TIME NOT NULL,
  nature_of_visit       VARCHAR(30) NOT NULL,
  mode_of_transaction   VARCHAR(30) NOT NULL,
  patient_age_years     INT,
  patient_age_months    INT,
  patient_age_days      INT,
  attending_provider_id UUID REFERENCES users(id),
  patient_consent       BOOLEAN DEFAULT true,
  chief_complaint       TEXT,
  history_of_illness    TEXT,
  treatment_plan        TEXT,
  follow_up_instructions TEXT,
  status                VARCHAR(20) DEFAULT 'DRAFT',
  scheduled_visit_id    UUID,
  referral_id           UUID,
  created_by            UUID REFERENCES users(id),
  created_at            TIMESTAMPTZ DEFAULT NOW(),
  updated_at            TIMESTAMPTZ DEFAULT NOW()
);

CREATE TABLE consultation_types (
  id              UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  consultation_id UUID NOT NULL REFERENCES consultations(id) ON DELETE CASCADE,
  type_code       VARCHAR(50) NOT NULL,
  is_primary      BOOLEAN DEFAULT false
);

CREATE TABLE vital_signs (
  id                       UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  consultation_id          UUID NOT NULL REFERENCES consultations(id) ON DELETE CASCADE,
  bp_systolic              INT,
  bp_diastolic             INT,
  bp_assessment            VARCHAR(30),
  respiratory_rate         INT,
  temperature_celsius      DECIMAL(4,1),
  heart_rate               INT,
  pulse_rate               INT,
  oxygen_saturation        DECIMAL(5,2),
  height_cm                DECIMAL(5,2),
  weight_kg                DECIMAL(5,2),
  bmi                      DECIMAL(4,2),
  bmi_category             VARCHAR(30),
  height_for_age           VARCHAR(30),
  weight_for_age           VARCHAR(30),
  created_by               UUID REFERENCES users(id),
  created_at               TIMESTAMPTZ DEFAULT NOW()
);

CREATE TABLE physical_exams (
  id              UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  consultation_id UUID NOT NULL REFERENCES consultations(id) ON DELETE CASCADE,
  system_name     VARCHAR(50) NOT NULL,
  findings        TEXT,
  is_normal       BOOLEAN DEFAULT true,
  created_by      UUID REFERENCES users(id),
  created_at      TIMESTAMPTZ DEFAULT NOW()
);

CREATE TABLE diagnoses (
  id              UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  consultation_id UUID NOT NULL REFERENCES consultations(id) ON DELETE CASCADE,
  icd10_code      VARCHAR(10) NOT NULL,
  icd10_description VARCHAR(300),
  diagnosis_type  VARCHAR(20) NOT NULL,
  is_primary      BOOLEAN DEFAULT true,
  remarks         TEXT,
  created_by      UUID REFERENCES users(id),
  created_at      TIMESTAMPTZ DEFAULT NOW()
);

CREATE TABLE icd10_codes (
  code        VARCHAR(10) PRIMARY KEY,
  description VARCHAR(500) NOT NULL,
  category    VARCHAR(100),
  is_active   BOOLEAN DEFAULT true
);

CREATE TABLE doctors_orders (
  id              UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  consultation_id UUID NOT NULL REFERENCES consultations(id) ON DELETE CASCADE,
  order_type      VARCHAR(30) NOT NULL,
  order_details   TEXT NOT NULL,
  ordered_by      UUID REFERENCES users(id),
  status          VARCHAR(20) DEFAULT 'PENDING',
  created_at      TIMESTAMPTZ DEFAULT NOW()
);

CREATE TABLE lab_results (
  id               UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  doctors_order_id UUID REFERENCES doctors_orders(id),
  consultation_id  UUID NOT NULL REFERENCES consultations(id),
  lab_type         VARCHAR(50) NOT NULL,
  result_data      JSONB,
  result_date      DATE,
  performed_by     VARCHAR(200),
  created_by       UUID REFERENCES users(id),
  created_at       TIMESTAMPTZ DEFAULT NOW()
);

CREATE TABLE prescriptions (
  id                  UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  consultation_id     UUID NOT NULL REFERENCES consultations(id) ON DELETE CASCADE,
  patient_id          UUID NOT NULL REFERENCES patients(id),
  prescription_token  VARCHAR(100) UNIQUE NOT NULL, -- Secure token for QR/barcode scanning
  valid_until         DATE,
  status              VARCHAR(20) DEFAULT 'ACTIVE',
  prescribed_by       UUID REFERENCES users(id),
  created_at          TIMESTAMPTZ DEFAULT NOW()
);

CREATE TABLE medication_orders (
  id              UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  consultation_id UUID NOT NULL REFERENCES consultations(id) ON DELETE CASCADE,
  patient_id      UUID NOT NULL REFERENCES patients(id),
  prescription_id UUID REFERENCES prescriptions(id) ON DELETE CASCADE, -- Linked grouped prescription
  product_id      UUID REFERENCES products(id),
  medicine_name   VARCHAR(300),
  dose            VARCHAR(100),
  frequency       VARCHAR(50),
  duration        VARCHAR(100),
  quantity        DECIMAL(10,2) NOT NULL,
  unit            VARCHAR(30),
  instructions    TEXT,
  status          VARCHAR(20) DEFAULT 'PENDING',
  prescribed_by   UUID REFERENCES users(id),
  created_at      TIMESTAMPTZ DEFAULT NOW()
);


-- Scheduled Visits
CREATE TABLE scheduled_visits (
  id            UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  patient_id    UUID NOT NULL REFERENCES patients(id),
  facility_id   UUID NOT NULL REFERENCES facilities(id),
  consultation_id UUID REFERENCES consultations(id),
  scheduled_date DATE NOT NULL,
  scheduled_time TIME,
  purpose       TEXT,
  status        VARCHAR(20) DEFAULT 'PENDING',
  sms_sent      BOOLEAN DEFAULT false,
  created_by    UUID REFERENCES users(id),
  created_at    TIMESTAMPTZ DEFAULT NOW()
);

-- Products
CREATE TABLE products (
  id                  UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  code                VARCHAR(50) UNIQUE NOT NULL,
  generic_name        VARCHAR(300) NOT NULL,
  brand_name          VARCHAR(300),
  dosage_form         VARCHAR(100),
  category            VARCHAR(20) NOT NULL,
  unit_of_measure     VARCHAR(30) NOT NULL,
  is_batch_tracked    BOOLEAN DEFAULT true,
  is_vaccine          BOOLEAN DEFAULT false,
  requires_cold_chain BOOLEAN DEFAULT false,
  vvm_required        BOOLEAN DEFAULT false,
  reorder_level       DECIMAL(12,3),
  min_stock_level     DECIMAL(12,3),
  max_stock_level     DECIMAL(12,3),
  storage_requirements TEXT,
  nosirs_code         VARCHAR(50),
  is_active           BOOLEAN DEFAULT true,
  created_at          TIMESTAMPTZ DEFAULT NOW()
);

CREATE TABLE facility_product_thresholds (
  id              UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  facility_id     UUID NOT NULL REFERENCES facilities(id),
  product_id      UUID NOT NULL REFERENCES products(id),
  reorder_level   DECIMAL(12,3),
  min_stock_level DECIMAL(12,3),
  max_stock_level DECIMAL(12,3),
  UNIQUE(facility_id, product_id)
);

-- Warehouses & Inventory
CREATE TABLE warehouses (
  id            UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  facility_id   UUID NOT NULL REFERENCES facilities(id),
  name          VARCHAR(200) NOT NULL,
  is_default    BOOLEAN DEFAULT false,
  is_active     BOOLEAN DEFAULT true
);

CREATE TABLE inventory_items (
  id               UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  facility_id      UUID NOT NULL REFERENCES facilities(id),
  warehouse_id     UUID NOT NULL REFERENCES warehouses(id),
  product_id       UUID NOT NULL REFERENCES products(id),
  quantity_on_hand DECIMAL(12,3) NOT NULL DEFAULT 0,
  last_updated     TIMESTAMPTZ DEFAULT NOW(),
  UNIQUE(warehouse_id, product_id)
);

CREATE TABLE inventory_batches (
  id                UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  inventory_item_id UUID NOT NULL REFERENCES inventory_items(id),
  warehouse_id      UUID NOT NULL REFERENCES warehouses(id),
  product_id        UUID NOT NULL REFERENCES products(id),
  batch_number      VARCHAR(100) NOT NULL,
  lot_number        VARCHAR(100),
  quantity_on_hand  DECIMAL(12,3) NOT NULL DEFAULT 0,
  manufactured_date DATE,
  expiry_date       DATE,
  days_till_expiry  INT GENERATED ALWAYS AS (
    CASE WHEN expiry_date IS NOT NULL 
    THEN (expiry_date - CURRENT_DATE) 
    ELSE NULL END
  ) STORED,
  vvm_status        VARCHAR(10),
  manufacturer      VARCHAR(200),
  unit_price        DECIMAL(10,4), -- Purchase unit price/cost
  funding_source    VARCHAR(100),  -- Gov: LGU/DOH; Private: DIRECT_PURCHASE/CONSIGNMENT
  storage_location  VARCHAR(200),
  status            VARCHAR(20) DEFAULT 'ACTIVE',
  created_by        UUID REFERENCES users(id),
  created_at        TIMESTAMPTZ DEFAULT NOW()
);

CREATE INDEX idx_batches_fefo ON inventory_batches(product_id, expiry_date ASC) WHERE status = 'ACTIVE';

-- Stock Transactions
CREATE TYPE stock_tx_type AS ENUM (
  'RECEIVE', 'ISSUE', 'DISPENSE',
  'TRANSFER_OUT', 'TRANSFER_IN',
  'DISPOSAL', 'RETURN'
);

CREATE TABLE stock_transactions (
  id               UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  facility_id      UUID NOT NULL REFERENCES facilities(id),
  warehouse_id     UUID NOT NULL REFERENCES warehouses(id),
  product_id       UUID NOT NULL REFERENCES products(id),
  batch_id         UUID REFERENCES inventory_batches(id),
  transaction_type stock_tx_type NOT NULL,
  quantity         DECIMAL(12,3) NOT NULL,
  quantity_before  DECIMAL(12,3) NOT NULL,
  quantity_after   DECIMAL(12,3) NOT NULL,
  reference_type   VARCHAR(50),
  reference_id     UUID,
  patient_id       UUID REFERENCES patients(id),
  consultation_id  UUID REFERENCES consultations(id),
  transaction_date DATE NOT NULL,
  notes            TEXT,
  created_by       UUID REFERENCES users(id),
  created_at       TIMESTAMPTZ DEFAULT NOW()
);

CREATE INDEX idx_stock_tx_facility_date ON stock_transactions(facility_id, transaction_date);
CREATE INDEX idx_stock_tx_product ON stock_transactions(product_id);
CREATE INDEX idx_stock_tx_patient ON stock_transactions(patient_id);

-- Dispensing
CREATE TABLE dispense_records (
  id              UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  facility_id     UUID NOT NULL REFERENCES facilities(id),
  dispense_number VARCHAR(100),
  consultation_id UUID REFERENCES consultations(id),
  patient_id      UUID REFERENCES patients(id),
  dispense_type   VARCHAR(30) NOT NULL,
  destination     VARCHAR(200),
  program_name    VARCHAR(200),
  dispense_date   DATE NOT NULL,
  dispense_time   TIME NOT NULL,
  dispensed_by    UUID NOT NULL REFERENCES users(id),
  notes           TEXT,
  status          VARCHAR(30) DEFAULT 'COMPLETED',
  created_at      TIMESTAMPTZ DEFAULT NOW()
);

CREATE TABLE dispense_lines (
  id                   UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  dispense_record_id   UUID NOT NULL REFERENCES dispense_records(id) ON DELETE CASCADE,
  medication_order_id  UUID REFERENCES medication_orders(id),
  product_id           UUID NOT NULL REFERENCES products(id),
  batch_id             UUID NOT NULL REFERENCES inventory_batches(id),
  quantity_dispensed   DECIMAL(12,3) NOT NULL,
  unit_of_measure      VARCHAR(30),
  dose                 VARCHAR(100),
  frequency            VARCHAR(50),
  duration             VARCHAR(100),
  instructions         TEXT,
  stock_before         DECIMAL(12,3) NOT NULL,
  stock_after          DECIMAL(12,3) NOT NULL,
  stock_transaction_id UUID REFERENCES stock_transactions(id),
  reverted_at          TIMESTAMPTZ,
  revert_reason        TEXT,
  reverted_by          UUID REFERENCES users(id)
);

-- Procurement
CREATE TABLE suppliers (
  id               UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name             VARCHAR(300) NOT NULL,
  contact_person   VARCHAR(200),
  email            VARCHAR(200),
  phone            VARCHAR(50),
  address          TEXT,
  tax_type         VARCHAR(20),
  withholding_tax_rate DECIMAL(5,2),
  credit_terms_days INT,
  credit_limit     DECIMAL(14,2),
  status           VARCHAR(20) DEFAULT 'ACTIVE',
  created_at       TIMESTAMPTZ DEFAULT NOW()
);

CREATE TABLE requisitions (
  id              UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  facility_id     UUID NOT NULL REFERENCES facilities(id),
  req_number      VARCHAR(100) UNIQUE NOT NULL,
  req_date        DATE NOT NULL,
  reason          VARCHAR(50) NOT NULL,
  preferred_delivery_date DATE,
  status          VARCHAR(20) DEFAULT 'DRAFT',
  auto_suggested  BOOLEAN DEFAULT false,
  notes           TEXT,
  created_by      UUID REFERENCES users(id),
  created_at      TIMESTAMPTZ DEFAULT NOW()
);

CREATE TABLE requisition_lines (
  id             UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  requisition_id UUID NOT NULL REFERENCES requisitions(id) ON DELETE CASCADE,
  product_id     UUID NOT NULL REFERENCES products(id),
  quantity       DECIMAL(12,3) NOT NULL,
  unit           VARCHAR(30)
);

CREATE TABLE purchase_orders (
  id              UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  facility_id     UUID NOT NULL REFERENCES facilities(id),
  po_number       VARCHAR(100) UNIQUE NOT NULL,
  requisition_id  UUID REFERENCES requisitions(id),
  supplier_id     UUID NOT NULL REFERENCES suppliers(id),
  order_date      DATE NOT NULL,
  expected_delivery DATE,
  payment_terms_days INT,
  funding_source  VARCHAR(100),
  total_amount    DECIMAL(14,2),
  status          VARCHAR(20) DEFAULT 'DRAFT',
  notes           TEXT,
  created_by      UUID REFERENCES users(id),
  created_at      TIMESTAMPTZ DEFAULT NOW()
);

CREATE TABLE purchase_order_lines (
  id                UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  purchase_order_id UUID NOT NULL REFERENCES purchase_orders(id) ON DELETE CASCADE,
  product_id        UUID NOT NULL REFERENCES products(id),
  quantity_ordered  DECIMAL(12,3) NOT NULL,
  quantity_received DECIMAL(12,3) DEFAULT 0,
  unit_price        DECIMAL(10,4),
  discount_percent  DECIMAL(5,2),
  net_amount        DECIMAL(14,2)
);

CREATE TABLE goods_receipts (
  id                UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  facility_id       UUID NOT NULL REFERENCES facilities(id),
  grn_number        VARCHAR(100) UNIQUE NOT NULL,
  purchase_order_id UUID REFERENCES purchase_orders(id),
  issuance_id       UUID REFERENCES stock_issuances(id),
  receipt_date      DATE NOT NULL,
  source_type       VARCHAR(20) NOT NULL,
  supplier_id       UUID REFERENCES suppliers(id),
  dr_number         VARCHAR(100),
  dr_attachment_url VARCHAR(500),
  notes             TEXT,
  received_by       UUID REFERENCES users(id),
  created_at        TIMESTAMPTZ DEFAULT NOW()
);

CREATE TABLE goods_receipt_lines (
  id              UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  grn_id          UUID NOT NULL REFERENCES goods_receipts(id) ON DELETE CASCADE,
  product_id      UUID NOT NULL REFERENCES products(id),
  po_line_id      UUID REFERENCES purchase_order_lines(id),
  quantity        DECIMAL(12,3) NOT NULL,
  batch_number    VARCHAR(100),
  lot_number      VARCHAR(100),
  manufactured_date DATE,
  expiry_date     DATE,
  condition       VARCHAR(20) DEFAULT 'GOOD',
  unit_price      DECIMAL(10,4),
  storage_location VARCHAR(200),
  serial_numbers  TEXT[]
);

CREATE TABLE invoices (
  id                UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  facility_id       UUID NOT NULL REFERENCES facilities(id),
  invoice_number    VARCHAR(100) NOT NULL,
  purchase_order_id UUID REFERENCES purchase_orders(id),
  grn_id            UUID REFERENCES goods_receipts(id),
  supplier_id       UUID REFERENCES suppliers(id),
  invoice_date      DATE NOT NULL,
  due_date          DATE,
  has_vat           BOOLEAN DEFAULT false,
  has_withholding   BOOLEAN DEFAULT false,
  subtotal          DECIMAL(14,2),
  vat_amount        DECIMAL(14,2),
  withholding_amount DECIMAL(14,2),
  additional_charges DECIMAL(14,2),
  total_amount      DECIMAL(14,2),
  match_status      VARCHAR(20) DEFAULT 'PENDING',
  status            VARCHAR(20) DEFAULT 'PENDING',
  paid_at           TIMESTAMPTZ,
  payment_method    VARCHAR(50),
  payment_reference VARCHAR(100),
  created_by        UUID REFERENCES users(id),
  created_at        TIMESTAMPTZ DEFAULT NOW()
);

-- Stock Issuances
CREATE TABLE stock_issuances (
  id                      UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  facility_id             UUID NOT NULL REFERENCES facilities(id),
  issuance_number         VARCHAR(100) UNIQUE NOT NULL,
  issuance_date           DATE NOT NULL,
  source_facility_id      UUID NOT NULL REFERENCES facilities(id),
  destination_facility_id UUID NOT NULL REFERENCES facilities(id),
  delivery_date           DATE,
  delivery_reference      VARCHAR(100),
  notes                   TEXT,
  status                  VARCHAR(20) DEFAULT 'PENDING',
  created_by              UUID REFERENCES users(id),
  created_at              TIMESTAMPTZ DEFAULT NOW()
);

CREATE TABLE stock_issuance_lines (
  id          UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  issuance_id UUID NOT NULL REFERENCES stock_issuances(id) ON DELETE CASCADE,
  product_id  UUID NOT NULL REFERENCES products(id),
  batch_id    UUID NOT NULL REFERENCES inventory_batches(id),
  quantity    DECIMAL(12,3) NOT NULL,
  unit        VARCHAR(30)
);

-- Disposals
CREATE TABLE disposals (
  id              UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  facility_id     UUID NOT NULL REFERENCES facilities(id),
  disposal_number VARCHAR(100) UNIQUE NOT NULL,
  disposal_date   DATE NOT NULL,
  reason          VARCHAR(50) NOT NULL,
  reason_notes    TEXT,
  witness         VARCHAR(200),
  disposal_method VARCHAR(50),
  status          VARCHAR(20) DEFAULT 'DRAFT',
  created_by      UUID REFERENCES users(id),
  created_at      TIMESTAMPTZ DEFAULT NOW()
);

CREATE TABLE disposal_lines (
  id          UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  disposal_id UUID NOT NULL REFERENCES disposals(id) ON DELETE CASCADE,
  product_id  UUID NOT NULL REFERENCES products(id),
  batch_id    UUID NOT NULL REFERENCES inventory_batches(id),
  quantity    DECIMAL(12,3) NOT NULL
);

-- Referrals
CREATE TABLE referrals (
  id                     UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  consultation_id        UUID NOT NULL REFERENCES consultations(id),
  patient_id             UUID NOT NULL REFERENCES patients(id),
  referring_facility_id  UUID NOT NULL REFERENCES facilities(id),
  referral_type          VARCHAR(20) NOT NULL,
  urgency                VARCHAR(20) NOT NULL,
  referral_reason        TEXT NOT NULL,
  clinical_summary       TEXT,
  consent_level          VARCHAR(20),
  consent_recorded_at    TIMESTAMPTZ,
  -- For intra-org referrals
  receiving_facility_id  UUID REFERENCES facilities(id),
  -- For cross-org referrals
  receiving_org_slug     VARCHAR(100),
  receiving_facility_name VARCHAR(300),
  referral_packet        JSONB,
  status                 VARCHAR(20) DEFAULT 'PENDING',
  accepted_at            TIMESTAMPTZ,
  declined_at            TIMESTAMPTZ,
  decline_reason         TEXT,
  outcome_notes          TEXT,
  outcome_sent_at        TIMESTAMPTZ,
  created_by             UUID REFERENCES users(id),
  created_at             TIMESTAMPTZ DEFAULT NOW()
);

-- Disease Surveillance
CREATE TABLE disease_alert_thresholds (
  id              UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  facility_id     UUID NOT NULL REFERENCES facilities(id),
  icd10_code      VARCHAR(10) NOT NULL,
  disease_name    VARCHAR(200),
  threshold_count INT NOT NULL DEFAULT 5,
  time_window_days INT NOT NULL DEFAULT 7,
  classification  VARCHAR(20) DEFAULT 'ANY',
  is_active       BOOLEAN DEFAULT true,
  created_by      UUID REFERENCES users(id),
  created_at      TIMESTAMPTZ DEFAULT NOW()
);

CREATE TABLE disease_alerts (
  id               UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  facility_id      UUID NOT NULL REFERENCES facilities(id),
  threshold_id     UUID REFERENCES disease_alert_thresholds(id),
  icd10_code       VARCHAR(10) NOT NULL,
  case_count       INT NOT NULL,
  status           VARCHAR(20) DEFAULT 'TRIGGERED',
  triggered_at     TIMESTAMPTZ DEFAULT NOW(),
  acknowledged_by  UUID REFERENCES users(id),
  acknowledged_at  TIMESTAMPTZ,
  action_taken     TEXT,
  resolved_by      UUID REFERENCES users(id),
  resolved_at      TIMESTAMPTZ,
  resolution_notes TEXT
);

-- Notifications
CREATE TABLE notifications (
  id             UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  facility_id    UUID REFERENCES facilities(id),
  recipient_id   UUID REFERENCES users(id),
  type           VARCHAR(50) NOT NULL,
  title          VARCHAR(300) NOT NULL,
  body           TEXT NOT NULL,
  redirect_route VARCHAR(300),
  is_read        BOOLEAN DEFAULT false,
  read_at        TIMESTAMPTZ,
  created_at     TIMESTAMPTZ DEFAULT NOW()
);

-- Audit Log
CREATE TABLE audit_logs (
  id                   BIGSERIAL PRIMARY KEY,
  user_id              UUID REFERENCES users(id),
  facility_id          UUID REFERENCES facilities(id),
  action               VARCHAR(50) NOT NULL,
  table_name           VARCHAR(100),
  record_id            UUID,
  old_values           JSONB,
  new_values           JSONB,
  ip_address           INET,
  user_agent           VARCHAR(500),
  temp_access_grant_id VARCHAR(100),
  created_at           TIMESTAMPTZ DEFAULT NOW()
);

-- Plugins
CREATE TABLE installed_plugins (
  id            UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  facility_id   UUID REFERENCES facilities(id),
  org_id        UUID REFERENCES organizations(id),
  plugin_id     VARCHAR(100) NOT NULL,
  installed_by  UUID REFERENCES users(id),
  installed_at  TIMESTAMPTZ DEFAULT NOW(),
  config        JSONB DEFAULT '{}',
  is_active     BOOLEAN DEFAULT true,
  UNIQUE(org_id, plugin_id)
);

-- FHSIS Service Records (FHSIS Plugin)
CREATE TABLE fhsis_service_records (
  id              UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  consultation_id UUID NOT NULL REFERENCES consultations(id),
  patient_id      UUID NOT NULL REFERENCES patients(id),
  facility_id     UUID NOT NULL REFERENCES facilities(id),
  service_type    VARCHAR(50) NOT NULL,
  service_date    DATE NOT NULL,
  reporting_period VARCHAR(7) NOT NULL,
  data            JSONB NOT NULL,
  created_at      TIMESTAMPTZ DEFAULT NOW()
);

CREATE INDEX idx_fhsis_facility_type_period
  ON fhsis_service_records(facility_id, service_type, reporting_period);

-- Cold Chain Assets (Cold Chain Plugin)
CREATE TABLE cold_chain_assets (
  id                UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  facility_id       UUID NOT NULL REFERENCES facilities(id),
  asset_code        VARCHAR(50) UNIQUE NOT NULL,
  name              VARCHAR(200) NOT NULL,
  asset_type        VARCHAR(50),
  manufacturer      VARCHAR(200),
  model             VARCHAR(100),
  serial_number     VARCHAR(100),
  capacity_liters   DECIMAL(8,2),
  min_temp_celsius  DECIMAL(5,2),
  max_temp_celsius  DECIMAL(5,2),
  installation_date DATE,
  last_service_date DATE,
  next_service_date DATE,
  status            VARCHAR(20) DEFAULT 'ACTIVE',
  location          VARCHAR(200),
  created_at        TIMESTAMPTZ DEFAULT NOW()
);

CREATE TABLE cold_chain_logs (
  id            UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  asset_id      UUID NOT NULL REFERENCES cold_chain_assets(id),
  recorded_at   TIMESTAMPTZ NOT NULL,
  temperature_c DECIMAL(5,2) NOT NULL,
  is_alarm      BOOLEAN DEFAULT false,
  alarm_reason  VARCHAR(100),
  recorded_by   UUID REFERENCES users(id)
);

-- Control Plane (separate database)
CREATE TABLE cp_organizations (
  id                     UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name                   VARCHAR(300) NOT NULL,
  slug                   VARCHAR(100) UNIQUE NOT NULL,
  type                   VARCHAR(30) NOT NULL,
  status                 VARCHAR(20) DEFAULT 'TRIAL',
  billing_email          VARCHAR(200),
  billing_plan           VARCHAR(50) NOT NULL DEFAULT 'FREE_TRIAL',
  stripe_customer_id     VARCHAR(100),
  stripe_subscription_id VARCHAR(100),
  max_staff_seats        INT NOT NULL DEFAULT 5,
  max_patient_records    INT NOT NULL DEFAULT 500,
  max_storage_mb         BIGINT NOT NULL DEFAULT 1024,
  custom_domain          VARCHAR(255),
  custom_domain_status   VARCHAR(20) DEFAULT 'NONE',
  dns_verification_token VARCHAR(100),
  ssl_status             VARCHAR(20) DEFAULT 'NONE',
  primary_color          VARCHAR(7) DEFAULT '#0f766e',
  secondary_color        VARCHAR(7) DEFAULT '#111827',
  logo_url               VARCHAR(500),
  db_connection_uri      VARCHAR(500),
  db_schema_version      VARCHAR(50),
  trial_ends_at          TIMESTAMPTZ,
  contract_start         DATE,
  contract_end           DATE,
  created_at             TIMESTAMPTZ DEFAULT NOW()
);

CREATE TABLE cp_feature_flags (
  org_id                 UUID NOT NULL REFERENCES cp_organizations(id) ON DELETE CASCADE,
  feature_key            VARCHAR(100) NOT NULL,
  is_enabled             BOOLEAN DEFAULT false,
  configured_at          TIMESTAMPTZ DEFAULT NOW(),
  configured_by          UUID,
  PRIMARY KEY (org_id, feature_key)
);

CREATE TABLE cp_usage_metrics (
  id                     UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  org_id                 UUID NOT NULL REFERENCES cp_organizations(id) ON DELETE CASCADE,
  recorded_at            TIMESTAMPTZ DEFAULT NOW(),
  active_staff_count     INT NOT NULL DEFAULT 0,
  patient_records_count  INT NOT NULL DEFAULT 0,
  storage_bytes_used     BIGINT NOT NULL DEFAULT 0,
  sms_sent_this_month    INT NOT NULL DEFAULT 0,
  api_requests_count     INT NOT NULL DEFAULT 0
);

CREATE TABLE cp_plugin_directory (
  id          UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  plugin_id   VARCHAR(100) UNIQUE NOT NULL,
  name        VARCHAR(200) NOT NULL,
  description TEXT,
  version     VARCHAR(50) NOT NULL,
  is_published BOOLEAN DEFAULT false,
  published_at TIMESTAMPTZ,
  created_at  TIMESTAMPTZ DEFAULT NOW()
);

CREATE TABLE cp_temp_access_grants (
  id             UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  org_id         UUID NOT NULL REFERENCES cp_organizations(id),
  requested_by   UUID NOT NULL,
  reason         TEXT NOT NULL,
  scope          VARCHAR(20) NOT NULL,
  duration_hours INT NOT NULL,
  status         VARCHAR(20) DEFAULT 'PENDING',
  requested_at   TIMESTAMPTZ DEFAULT NOW(),
  approved_at    TIMESTAMPTZ,
  approved_by    VARCHAR(200),
  expires_at     TIMESTAMPTZ,
  revoked_at     TIMESTAMPTZ,
  revoked_by     VARCHAR(200)
);

CREATE TABLE cp_tenant_db_upgrades (
  id             UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  org_id         UUID NOT NULL REFERENCES cp_organizations(id) ON DELETE CASCADE,
  schema_version VARCHAR(50) NOT NULL,
  status         VARCHAR(20) NOT NULL, -- 'PENDING', 'RUNNING', 'COMPLETED', 'FAILED'
  started_at     TIMESTAMPTZ,
  completed_at   TIMESTAMPTZ,
  error_log      TEXT
);

CREATE TABLE cp_incidents (
  id          UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  org_id      UUID REFERENCES cp_organizations(id),
  title       VARCHAR(300) NOT NULL,
  description TEXT,
  severity    VARCHAR(20),
  status      VARCHAR(20) DEFAULT 'OPEN',
  created_by  UUID,
  created_at  TIMESTAMPTZ DEFAULT NOW(),
  resolved_at TIMESTAMPTZ
);

CREATE TABLE cp_migrations (
  id            UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  org_id        UUID NOT NULL REFERENCES cp_organizations(id),
  source_system VARCHAR(50) NOT NULL,
  status        VARCHAR(20) NOT NULL,
  total_records INT,
  success_count INT,
  failed_count  INT,
  run_by        VARCHAR(200),
  run_at        TIMESTAMPTZ DEFAULT NOW(),
  notes         TEXT
);
```

---

## 20. API Design

### 20.1 Base URLs

```
Staff API:   https://api.{org-slug}.healthbridge.ph/v1
Patient API: https://patient-api.{org-slug}.healthbridge.ph/v1
Ops API:     https://api.ops.healthbridge.ph/v1
```

### 20.2 Staff API Routes

```
Auth
POST   /auth/login
POST   /auth/logout
POST   /auth/refresh
POST   /auth/forgot-password
POST   /auth/reset-password
POST   /auth/change-password

Patients
GET    /facilities/:fid/patients
POST   /facilities/:fid/patients
GET    /patients/:id
PUT    /patients/:id
POST   /patients/:id/merge
GET    /patients/:id/family
POST   /patients/:id/family/members
DELETE /patients/:id/family/members/:relId

Consultations
GET    /patients/:id/consultations
POST   /patients/:id/consultations
GET    /consultations/:id
PUT    /consultations/:id
POST   /consultations/:id/complete
POST   /consultations/:id/vital-signs
POST   /consultations/:id/physical-exams
POST   /consultations/:id/diagnoses
POST   /consultations/:id/lab-results
POST   /consultations/:id/medication-orders
GET    /prescriptions/token/:token

Pharmacy
GET    /facilities/:fid/pharmacy/queue
POST   /pharmacy/dispense
POST   /pharmacy/program-dispense
POST   /pharmacy/dispense/:id/revert
GET    /facilities/:fid/pharmacy/history

Inventory
GET    /facilities/:fid/inventory
GET    /facilities/:fid/inventory/:productId/batches
GET    /facilities/:fid/inventory/alerts
GET    /facilities/:fid/stock-transactions

Goods Receipts
GET    /facilities/:fid/goods-receipts
POST   /facilities/:fid/goods-receipts
GET    /goods-receipts/:id

Stock Issuances
GET    /facilities/:fid/issuances
POST   /facilities/:fid/issuances
GET    /issuances/:id
POST   /issuances/:id/receive

Disposals
GET    /facilities/:fid/disposals
POST   /facilities/:fid/disposals
GET    /disposals/:id
POST   /disposals/:id/confirm

Procurement
GET    /facilities/:fid/requisitions
POST   /facilities/:fid/requisitions
GET    /requisitions/:id
PUT    /requisitions/:id
POST   /requisitions/:id/approve
POST   /requisitions/:id/reject

GET    /facilities/:fid/purchase-orders
POST   /facilities/:fid/purchase-orders
GET    /purchase-orders/:id
PUT    /purchase-orders/:id
POST   /purchase-orders/:id/approve
POST   /purchase-orders/:id/send
GET    /purchase-orders/:id/grns

GET    /facilities/:fid/invoices
POST   /facilities/:fid/invoices
GET    /invoices/:id
POST   /invoices/:id/approve
POST   /invoices/:id/record-payment

GET    /facilities/:fid/suppliers
POST   /facilities/:fid/suppliers
GET    /suppliers/:id
PUT    /suppliers/:id

Referrals
POST   /consultations/:id/referral
GET    /facilities/:fid/referrals/outgoing
GET    /facilities/:fid/referrals/incoming
POST   /referrals/:id/accept
POST   /referrals/:id/decline
POST   /referrals/:id/outcome
GET    /referral-network/facilities

Scheduled Visits
GET    /facilities/:fid/scheduled-visits
POST   /consultations/:id/scheduled-visit
PUT    /scheduled-visits/:id

Disease Surveillance
GET    /facilities/:fid/surveillance/alerts
POST   /surveillance/alerts/:id/acknowledge
POST   /surveillance/alerts/:id/resolve
GET    /facilities/:fid/surveillance/thresholds
POST   /facilities/:fid/surveillance/thresholds
PUT    /surveillance/thresholds/:id
DELETE /surveillance/thresholds/:id
GET    /facilities/:fid/surveillance/map

Reports
GET    /facilities/:fid/reports/operations-dashboard
GET    /facilities/:fid/reports/analytics/:reportType
POST   /facilities/:fid/reports/generate
GET    /facilities/:fid/reports/:id/download
GET    /facilities/:fid/reports/compliance (FHSIS/LMIS plugin)

Products
GET    /products
POST   /products
GET    /products/:id
PUT    /products/:id
GET    /products/search
GET    /icd10/search

Notifications
GET    /notifications
PUT    /notifications/:id/read
PUT    /notifications/read-all
DELETE /notifications/:id
GET    /sse/notifications/stream
GET    /sse/alerts/stream

Settings
GET    /settings/org
PUT    /settings/org
GET    /settings/facility
PUT    /settings/facility
GET    /settings/plugins
POST   /settings/plugins/:pluginId/install
DELETE /settings/plugins/:pluginId/uninstall
GET    /settings/users
POST   /settings/users
GET    /settings/users/:id
PUT    /settings/users/:id
GET    /settings/roles
POST   /settings/roles
GET    /settings/roles/:id
PUT    /settings/roles/:id
DELETE /settings/roles/:id

Audit
GET    /audit-logs
```

### 20.3 Patient API Routes

```
Auth
POST   /auth/login
POST   /auth/logout
POST   /auth/register
POST   /auth/forgot-password
POST   /auth/reset-password

Records (own records only)
GET    /me
PUT    /me/contact
GET    /me/consultations
GET    /me/prescriptions
GET    /me/dispenses
GET    /me/lab-results
GET    /me/referrals
GET    /me/documents
GET    /me/appointments
PUT    /me/appointments/:id/confirm
PUT    /me/appointments/:id/cancel
POST   /me/consent
```

### 20.4 Ops API Routes

```
Auth
POST   /auth/login
POST   /auth/logout
POST   /auth/mfa/verify

Organizations
GET    /organizations
POST   /organizations
GET    /organizations/:id
PUT    /organizations/:id
POST   /organizations/:id/suspend
POST   /organizations/:id/activate

Plugin Directory
GET    /plugins
POST   /plugins
PUT    /plugins/:id
POST   /plugins/:id/publish
POST   /plugins/:id/unpublish

Access Grants
GET    /access-grants
POST   /access-grants
POST   /access-grants/:id/approve
POST   /access-grants/:id/revoke
GET    /access-grants/:id/audit-trail

Deployments
GET    /deployments
POST   /deployments
GET    /deployments/:id
POST   /deployments/:id/rollback

Migrations
GET    /migrations
GET    /migrations/:id

Incidents
GET    /incidents
POST   /incidents
PUT    /incidents/:id
POST   /incidents/:id/resolve

Metrics
GET    /metrics/platform
GET    /metrics/plugins
```

---

## 21. Sidebar Navigation

### 21.1 Staff App (`apps/web`)

Navigation items are the same for all orgs. RBAC determines which items a specific user can access — if a user has no permissions for a section, that section is hidden for them. Plugin-added nav items appear only if the plugin is installed.

```
─── Clinical
    Patients
    Consultations
    Referrals
    Appointments

─── Pharmacy
    Queue
    Program Dispense
    History

─── Logistics
    Inventory
    Goods Receiving
    Stock Issuances
    Disposals

─── Procurement
    Requisitions
    Purchase Orders
    Invoices & Payments
    Suppliers

─── Reports
    Operations Dashboard
    Analytics
    Compliance            [FHSIS Plugin / LMIS Plugin]

─── Plugins
    FHSIS Reports         [FHSIS Plugin]
    LMIS Reports          [LMIS Plugin]
    Cold Chain            [Cold Chain Plugin]
    PhilHealth Billing    [PhilHealth Billing Plugin]
    Revenue               [Revenue Dashboard Plugin]
    Custom Reports        [Custom Report Builder Plugin]

─── Settings
    Organization
    Facilities
    Products
    Users
    Roles
    Plugins
    Thresholds

*Note: Sidebar items and table fields render dynamically depending on whether the deployment is profiled as a Government (LGU/NGO) or Private/Commercial health organization.*
```

### 21.2 Patient Portal (`apps/patient`)

```
─── My Health
    Overview
    Visits
    Prescriptions
    Medicines Received
    Lab Results
    Documents

─── Care
    Referrals
    Appointments

─── Profile
    Personal Information
    Emergency Contact
    Insurance
```

### 21.3 Control Plane (`apps/control-plane/ops`)

```
─── Tenants & SaaS
    All Organizations
    Subscription & Billing
    Usage & Metering
    Feature Flags

─── White-Labeling
    Custom Domains
    Branding Config

─── Plugins
    Plugin Directory

─── Access
    Access Grants
    Audit Trail

─── DB Schema Upgrades
    Upgrade Tasks

─── Migrations
    Migration History

─── Incidents
    Open
    Resolved

─── Platform
    Metrics
    Plugin Adoption
    SaaS Revenue
```

---

*HealthBridge Product Specification v3.0*  
*May 2026 — Living Document*  
*Next update: After POC completion*
