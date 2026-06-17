-- CreateTable
CREATE TABLE "cp_organizations" (
    "id" UUID NOT NULL DEFAULT gen_random_uuid(),
    "name" VARCHAR(300) NOT NULL,
    "slug" VARCHAR(100) NOT NULL,
    "type" VARCHAR(30) NOT NULL,
    "status" VARCHAR(20) NOT NULL DEFAULT 'TRIAL',
    "billing_email" VARCHAR(200),
    "billing_plan" VARCHAR(50) NOT NULL DEFAULT 'FREE_TRIAL',
    "stripe_customer_id" VARCHAR(100),
    "stripe_subscription_id" VARCHAR(100),
    "max_staff_seats" INTEGER NOT NULL DEFAULT 5,
    "max_patient_records" INTEGER NOT NULL DEFAULT 500,
    "max_storage_mb" BIGINT NOT NULL DEFAULT 1024,
    "custom_domain" VARCHAR(255),
    "custom_domain_status" VARCHAR(20) NOT NULL DEFAULT 'NONE',
    "dns_verification_token" VARCHAR(100),
    "ssl_status" VARCHAR(20) NOT NULL DEFAULT 'NONE',
    "primary_color" VARCHAR(7) NOT NULL DEFAULT '#0f766e',
    "secondary_color" VARCHAR(7) NOT NULL DEFAULT '#111827',
    "logo_url" VARCHAR(500),
    "deployment_url" VARCHAR(500),
    "db_connection_uri" VARCHAR(500),
    "db_schema_version" VARCHAR(50),
    "trial_ends_at" TIMESTAMPTZ,
    "contract_start" DATE,
    "contract_end" DATE,
    "created_at" TIMESTAMPTZ NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "allow_cross_org_referrals" BOOLEAN NOT NULL DEFAULT false,
    "referral_capacity_status" VARCHAR(30) NOT NULL DEFAULT 'ACCEPTING',
    "referral_geographic_scope" VARCHAR(50) NOT NULL DEFAULT 'ANY',
    "accepted_referral_types" VARCHAR(200) NOT NULL DEFAULT 'ALL',

    CONSTRAINT "cp_organizations_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "cp_feature_flags" (
    "org_id" UUID NOT NULL,
    "feature_key" VARCHAR(100) NOT NULL,
    "is_enabled" BOOLEAN NOT NULL DEFAULT false,
    "configured_at" TIMESTAMPTZ NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "configured_by" UUID,

    CONSTRAINT "cp_feature_flags_pkey" PRIMARY KEY ("org_id","feature_key")
);

-- CreateTable
CREATE TABLE "cp_usage_metrics" (
    "id" UUID NOT NULL DEFAULT gen_random_uuid(),
    "org_id" UUID NOT NULL,
    "recorded_at" TIMESTAMPTZ NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "active_staff_count" INTEGER NOT NULL DEFAULT 0,
    "patient_records_count" INTEGER NOT NULL DEFAULT 0,
    "storage_bytes_used" BIGINT NOT NULL DEFAULT 0,
    "sms_sent_this_month" INTEGER NOT NULL DEFAULT 0,
    "api_requests_count" INTEGER NOT NULL DEFAULT 0,

    CONSTRAINT "cp_usage_metrics_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "cp_plugin_directory" (
    "id" UUID NOT NULL DEFAULT gen_random_uuid(),
    "plugin_id" VARCHAR(100) NOT NULL,
    "name" VARCHAR(200) NOT NULL,
    "description" TEXT,
    "version" VARCHAR(50) NOT NULL,
    "is_published" BOOLEAN NOT NULL DEFAULT false,
    "published_at" TIMESTAMPTZ,
    "created_at" TIMESTAMPTZ NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "cp_plugin_directory_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "cp_temp_access_grants" (
    "id" UUID NOT NULL DEFAULT gen_random_uuid(),
    "org_id" UUID NOT NULL,
    "requested_by" UUID NOT NULL,
    "reason" TEXT NOT NULL,
    "scope" VARCHAR(20) NOT NULL,
    "duration_hours" INTEGER NOT NULL,
    "status" VARCHAR(20) NOT NULL DEFAULT 'PENDING',
    "requested_at" TIMESTAMPTZ NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "approved_at" TIMESTAMPTZ,
    "approved_by" VARCHAR(200),
    "expires_at" TIMESTAMPTZ,
    "revoked_at" TIMESTAMPTZ,
    "revoked_by" VARCHAR(200),

    CONSTRAINT "cp_temp_access_grants_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "cp_tenant_db_upgrades" (
    "id" UUID NOT NULL DEFAULT gen_random_uuid(),
    "org_id" UUID NOT NULL,
    "schema_version" VARCHAR(50) NOT NULL,
    "status" VARCHAR(20) NOT NULL,
    "started_at" TIMESTAMPTZ,
    "completed_at" TIMESTAMPTZ,
    "error_log" TEXT,

    CONSTRAINT "cp_tenant_db_upgrades_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "cp_incidents" (
    "id" UUID NOT NULL DEFAULT gen_random_uuid(),
    "org_id" UUID,
    "title" VARCHAR(300) NOT NULL,
    "description" TEXT,
    "severity" VARCHAR(20),
    "status" VARCHAR(20) NOT NULL DEFAULT 'OPEN',
    "created_by" UUID,
    "created_at" TIMESTAMPTZ NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "resolved_at" TIMESTAMPTZ,

    CONSTRAINT "cp_incidents_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "cp_migrations" (
    "id" UUID NOT NULL DEFAULT gen_random_uuid(),
    "org_id" UUID NOT NULL,
    "source_system" VARCHAR(50) NOT NULL,
    "status" VARCHAR(20) NOT NULL,
    "total_records" INTEGER,
    "success_count" INTEGER,
    "failed_count" INTEGER,
    "run_by" VARCHAR(200),
    "run_at" TIMESTAMPTZ NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "notes" TEXT,

    CONSTRAINT "cp_migrations_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "cp_users" (
    "id" UUID NOT NULL DEFAULT gen_random_uuid(),
    "email" VARCHAR(200) NOT NULL,
    "name" VARCHAR(200),
    "email_verified" BOOLEAN NOT NULL DEFAULT false,
    "image" VARCHAR(500),
    "password_hash" VARCHAR(300),
    "mfa_enabled" BOOLEAN NOT NULL DEFAULT false,
    "is_active" BOOLEAN NOT NULL DEFAULT true,
    "created_at" TIMESTAMPTZ NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMPTZ NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "cp_users_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "cp_sessions" (
    "id" UUID NOT NULL DEFAULT gen_random_uuid(),
    "expires_at" TIMESTAMPTZ NOT NULL,
    "token" VARCHAR(500) NOT NULL,
    "created_at" TIMESTAMPTZ NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMPTZ NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "ip_address" VARCHAR(100),
    "user_agent" VARCHAR(500),
    "user_id" UUID NOT NULL,

    CONSTRAINT "cp_sessions_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "cp_accounts" (
    "id" UUID NOT NULL DEFAULT gen_random_uuid(),
    "account_id" VARCHAR(255) NOT NULL,
    "provider_id" VARCHAR(100) NOT NULL,
    "user_id" UUID NOT NULL,
    "access_token" TEXT,
    "refresh_token" TEXT,
    "id_token" TEXT,
    "expires_at" TIMESTAMPTZ,
    "password" VARCHAR(300),
    "created_at" TIMESTAMPTZ NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMPTZ NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "cp_accounts_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "cp_verifications" (
    "id" UUID NOT NULL DEFAULT gen_random_uuid(),
    "identifier" VARCHAR(255) NOT NULL,
    "value" VARCHAR(255) NOT NULL,
    "expires_at" TIMESTAMPTZ NOT NULL,
    "created_at" TIMESTAMPTZ DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMPTZ DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "cp_verifications_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "cp_patient_index" (
    "id" UUID NOT NULL DEFAULT gen_random_uuid(),
    "patient_pin" VARCHAR(50) NOT NULL,
    "first_name" VARCHAR(100) NOT NULL,
    "last_name" VARCHAR(100) NOT NULL,
    "birth_date" DATE NOT NULL,
    "sex" VARCHAR(10) NOT NULL,
    "org_id" UUID NOT NULL,
    "org_slug" VARCHAR(100) NOT NULL,
    "created_at" TIMESTAMPTZ NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "cp_patient_index_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "cp_organizations_slug_key" ON "cp_organizations"("slug");

-- CreateIndex
CREATE UNIQUE INDEX "cp_plugin_directory_plugin_id_key" ON "cp_plugin_directory"("plugin_id");

-- CreateIndex
CREATE UNIQUE INDEX "cp_users_email_key" ON "cp_users"("email");

-- CreateIndex
CREATE UNIQUE INDEX "cp_sessions_token_key" ON "cp_sessions"("token");

-- CreateIndex
CREATE UNIQUE INDEX "cp_accounts_provider_id_account_id_key" ON "cp_accounts"("provider_id", "account_id");

-- CreateIndex
CREATE UNIQUE INDEX "cp_patient_index_patient_pin_key" ON "cp_patient_index"("patient_pin");

-- CreateIndex
CREATE INDEX "cp_patient_index_first_name_last_name_birth_date_idx" ON "cp_patient_index"("first_name", "last_name", "birth_date");

-- AddForeignKey
ALTER TABLE "cp_feature_flags" ADD CONSTRAINT "cp_feature_flags_org_id_fkey" FOREIGN KEY ("org_id") REFERENCES "cp_organizations"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "cp_usage_metrics" ADD CONSTRAINT "cp_usage_metrics_org_id_fkey" FOREIGN KEY ("org_id") REFERENCES "cp_organizations"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "cp_temp_access_grants" ADD CONSTRAINT "cp_temp_access_grants_org_id_fkey" FOREIGN KEY ("org_id") REFERENCES "cp_organizations"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "cp_tenant_db_upgrades" ADD CONSTRAINT "cp_tenant_db_upgrades_org_id_fkey" FOREIGN KEY ("org_id") REFERENCES "cp_organizations"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "cp_incidents" ADD CONSTRAINT "cp_incidents_org_id_fkey" FOREIGN KEY ("org_id") REFERENCES "cp_organizations"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "cp_migrations" ADD CONSTRAINT "cp_migrations_org_id_fkey" FOREIGN KEY ("org_id") REFERENCES "cp_organizations"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "cp_sessions" ADD CONSTRAINT "cp_sessions_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "cp_users"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "cp_accounts" ADD CONSTRAINT "cp_accounts_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "cp_users"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "cp_patient_index" ADD CONSTRAINT "cp_patient_index_org_id_fkey" FOREIGN KEY ("org_id") REFERENCES "cp_organizations"("id") ON DELETE CASCADE ON UPDATE CASCADE;

