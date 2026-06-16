# Repository Guidelines for AI Coding Agents

Welcome! To keep iteration cycles fast, prevent unnecessary wait times, and handle the multi-tenant database architecture correctly in this repository, please follow these guidelines:

---

## ⚡ Fast Type-Checking & Verification

Do **NOT** run the global production build (`npm run build` or `turbo run build`) during intermediate development steps. It triggers a full workspace Next.js production bundling cycle, which takes a significant amount of time.

Instead, perform local TypeScript type checks within the specific package/app directory:

### For the Staff EMR Frontend (`web`)
```bash
# Cwd: apps/tenant/web
npx tsc --noEmit
```

### For the Patient Portal Frontend (`patient`)
```bash
# Cwd: apps/tenant/patient
npx tsc --noEmit
```

### For the Tenant API Backend (`api`)
```bash
# Cwd: apps/tenant/api
npx tsc --noEmit
```

### For the Shared UI Component Package (`packages/ui`)
```bash
# Cwd: packages/ui
npx tsc --noEmit
```
*Note: If you make changes to the shared `@healthbridge/ui` library, compile it locally using `npm run build` in `packages/ui` to refresh the `dist/` distribution files.*

---

## 🗄️ Database Migrations (Multi-Tenant)

This application uses a multi-tenant database model. Running `prisma db push` on the default schema will only update the main template tenant database.

To synchronize **all** active tenant databases (e.g. Cavite Clinic, Cebu City, Lapu-Lapu City, Cebu Family Clinic Group, etc.) with new schema changes, run:

```bash
# Cwd: packages/database
npx ts-node src/migrate-all.ts
```

This script queries the control plane database, resolves the DB connection URIs for all active tenants, and pushes schema changes to all of them.

---

## 🚀 Running Local Servers

To start the local development environment (with hot-reloading active for all apps):
```bash
# Cwd: root directory
npm run dev
```
