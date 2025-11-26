CREATE TYPE "public"."gender" AS ENUM('L', 'P');--> statement-breakpoint
CREATE TYPE "public"."patient_class" AS ENUM('Kelas 3', 'Kelas 2', 'Kelas 1', 'VIP');--> statement-breakpoint
CREATE TYPE "public"."patient_type" AS ENUM('Umum', 'Asuransi', 'Rujukan');--> statement-breakpoint
CREATE TYPE "public"."priority" AS ENUM('Normal', 'Urgent', 'Emergency');--> statement-breakpoint
CREATE TYPE "public"."queue_status" AS ENUM('Draft', 'Waiting', 'Called', 'On-Hold', 'Done', 'Cancelled');--> statement-breakpoint
CREATE TYPE "public"."queue_type" AS ENUM('Reservasi', 'Walk-In');--> statement-breakpoint
CREATE TYPE "public"."reference_type" AS ENUM('Konsultasi', 'Checkup', 'Perawatan', 'Lab', 'Radiologi', 'Vaksin', 'Operasi');--> statement-breakpoint
CREATE TYPE "public"."service_type" AS ENUM('Rawat Jalan', 'Rawat Inap', 'UGD');--> statement-breakpoint
CREATE TABLE "clinics" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"code" varchar NOT NULL,
	"name" varchar NOT NULL,
	"description" text,
	"is_active" boolean DEFAULT true NOT NULL,
	"created_at" timestamp DEFAULT now() NOT NULL,
	"updated_at" timestamp,
	"deleted_at" timestamp,
	CONSTRAINT "clinics_code_unique" UNIQUE("code")
);
--> statement-breakpoint
CREATE TABLE "doctors" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"code" varchar NOT NULL,
	"name" varchar NOT NULL,
	"specialization" varchar,
	"phone" varchar,
	"day_of_week" integer NOT NULL,
	"start_time" time NOT NULL,
	"end_time" time NOT NULL,
	"quota" integer DEFAULT 30 NOT NULL,
	"is_active" boolean DEFAULT true NOT NULL,
	"created_at" timestamp DEFAULT now() NOT NULL,
	"updated_at" timestamp,
	"deleted_at" timestamp,
	CONSTRAINT "doctors_code_unique" UNIQUE("code")
);
--> statement-breakpoint
CREATE TABLE "patients" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"code" varchar NOT NULL,
	"registration_number" varchar NOT NULL,
	"nik" varchar NOT NULL,
	"name" varchar NOT NULL,
	"birth_date" date NOT NULL,
	"gender" "gender" NOT NULL,
	"phone" varchar NOT NULL,
	"address" text NOT NULL,
	"patient_type" varchar NOT NULL,
	"patient_class" varchar NOT NULL,
	"have_assurance" boolean NOT NULL,
	"assuranceCode" varchar,
	"created_at" timestamp DEFAULT now() NOT NULL,
	"updated_at" timestamp,
	"deleted_at" timestamp,
	CONSTRAINT "patients_code_unique" UNIQUE("code"),
	CONSTRAINT "patients_registration_number_unique" UNIQUE("registration_number"),
	CONSTRAINT "patients_nik_unique" UNIQUE("nik"),
	CONSTRAINT "patients_assuranceCode_unique" UNIQUE("assuranceCode")
);
--> statement-breakpoint
CREATE TABLE "staff" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"clinic_id" uuid,
	"code" varchar NOT NULL,
	"loket_number" varchar NOT NULL,
	"nik" varchar,
	"name" varchar NOT NULL,
	"username" varchar NOT NULL,
	"email" varchar NOT NULL,
	"password_hash" varchar NOT NULL,
	"phone" varchar NOT NULL,
	"address" text,
	"last_login_at" timestamp,
	"is_active" boolean DEFAULT true NOT NULL,
	"created_at" timestamp DEFAULT now() NOT NULL,
	"updated_at" timestamp,
	"deleted_at" timestamp,
	CONSTRAINT "staff_code_unique" UNIQUE("code"),
	CONSTRAINT "staff_nik_unique" UNIQUE("nik"),
	CONSTRAINT "staff_username_unique" UNIQUE("username"),
	CONSTRAINT "staff_email_unique" UNIQUE("email")
);
--> statement-breakpoint
CREATE TABLE "queue_calls" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"queue_id" uuid NOT NULL,
	"staff_id" uuid NOT NULL,
	"called_at" timestamp DEFAULT now(),
	"response_time" integer,
	"created_at" timestamp DEFAULT now() NOT NULL,
	"updated_at" timestamp,
	"deleted_at" timestamp
);
--> statement-breakpoint
CREATE TABLE "queues" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"patient_id" uuid NOT NULL,
	"clinic_id" uuid NOT NULL,
	"doctor_id" uuid NOT NULL,
	"staff_id" uuid NOT NULL,
	"queue_number" varchar NOT NULL,
	"queue_type" "queue_type" NOT NULL,
	"priority" "priority" DEFAULT 'Normal' NOT NULL,
	"service_type" "service_type" NOT NULL,
	"reference_type" "reference_type" NOT NULL,
	"chief_complaint" text NOT NULL,
	"symptoms" text NOT NULL,
	"symptoms_start_date" date NOT NULL,
	"previous_treatment" text,
	"reservation_date" date NOT NULL,
	"preferred_time" time NOT NULL,
	"status" "queue_status" DEFAULT 'Waiting' NOT NULL,
	"called_at" timestamp,
	"completed_at" timestamp,
	"staff_notes" text,
	"cancellation_reason" text,
	"created_at" timestamp DEFAULT now() NOT NULL,
	"updated_at" timestamp,
	"deleted_at" timestamp,
	CONSTRAINT "queues_queue_number_unique" UNIQUE("queue_number")
);
--> statement-breakpoint
ALTER TABLE "staff" ADD CONSTRAINT "staff_clinic_id_clinics_id_fk" FOREIGN KEY ("clinic_id") REFERENCES "public"."clinics"("id") ON DELETE set null ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "queue_calls" ADD CONSTRAINT "queue_calls_queue_id_queues_id_fk" FOREIGN KEY ("queue_id") REFERENCES "public"."queues"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "queue_calls" ADD CONSTRAINT "queue_calls_staff_id_staff_id_fk" FOREIGN KEY ("staff_id") REFERENCES "public"."staff"("id") ON DELETE set null ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "queues" ADD CONSTRAINT "queues_patient_id_patients_id_fk" FOREIGN KEY ("patient_id") REFERENCES "public"."patients"("id") ON DELETE set null ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "queues" ADD CONSTRAINT "queues_clinic_id_clinics_id_fk" FOREIGN KEY ("clinic_id") REFERENCES "public"."clinics"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "queues" ADD CONSTRAINT "queues_doctor_id_doctors_id_fk" FOREIGN KEY ("doctor_id") REFERENCES "public"."doctors"("id") ON DELETE set null ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "queues" ADD CONSTRAINT "queues_staff_id_staff_id_fk" FOREIGN KEY ("staff_id") REFERENCES "public"."staff"("id") ON DELETE set null ON UPDATE no action;--> statement-breakpoint
CREATE INDEX "clinics_code_idx" ON "clinics" USING btree ("code");--> statement-breakpoint
CREATE INDEX "clinics_active_idx" ON "clinics" USING btree ("is_active");--> statement-breakpoint
CREATE INDEX "doctors_code_idx" ON "doctors" USING btree ("code");--> statement-breakpoint
CREATE INDEX "doctors_active_idx" ON "doctors" USING btree ("is_active");--> statement-breakpoint
CREATE UNIQUE INDEX "patients_nik_idx" ON "patients" USING btree ("nik");--> statement-breakpoint
CREATE INDEX "patients_reg_number_idx" ON "patients" USING btree ("registration_number");--> statement-breakpoint
CREATE INDEX "staff_clinic_idx" ON "staff" USING btree ("clinic_id");--> statement-breakpoint
CREATE INDEX "staff_code_idx" ON "staff" USING btree ("code");--> statement-breakpoint
CREATE INDEX "staff_active_idx" ON "staff" USING btree ("is_active");--> statement-breakpoint
CREATE INDEX "queue_calls_queue_idx" ON "queue_calls" USING btree ("queue_id");--> statement-breakpoint
CREATE INDEX "queue_calls_staff_idx" ON "queue_calls" USING btree ("staff_id");--> statement-breakpoint
CREATE UNIQUE INDEX "queues_queue_number_idx" ON "queues" USING btree ("queue_number");--> statement-breakpoint
CREATE INDEX "queues_status_idx" ON "queues" USING btree ("status");--> statement-breakpoint
CREATE INDEX "queues_type_idx" ON "queues" USING btree ("queue_type");--> statement-breakpoint
CREATE INDEX "queues_priority_idx" ON "queues" USING btree ("priority");--> statement-breakpoint
CREATE INDEX "queues_clinic_idx" ON "queues" USING btree ("clinic_id");--> statement-breakpoint
CREATE INDEX "queues_date_idx" ON "queues" USING btree ("created_at");--> statement-breakpoint
CREATE INDEX "queues_status_clinic_idx" ON "queues" USING btree ("status","clinic_id");--> statement-breakpoint
CREATE INDEX "queues_reservation_date_idx" ON "queues" USING btree ("reservation_date");--> statement-breakpoint
CREATE MATERIALIZED VIEW "public"."dashboard_summary" AS (select COUNT(*) FILTER (WHERE status = 'Waiting') as "total_waiting", COUNT(*) FILTER (WHERE status = 'Called') as "total_called", COUNT(*) FILTER (WHERE status = 'Done') as "total_done", COUNT(*) FILTER (WHERE status = 'Cancelled') as "total_cancelled", COUNT(*) FILTER (WHERE queue_type = 'Reservasi') as "total_reservation", COUNT(*) FILTER (WHERE queue_type = 'Walk-In') as "total_walkin", 
      AVG(EXTRACT(EPOCH FROM (completed_at - called_at))/60) 
      FILTER (WHERE completed_at IS NOT NULL AND called_at IS NOT NULL)
     as "avg_service_time_minutes", NOW() as "last_updated" from "queues" where DATE(created_at) = CURRENT_DATE);--> statement-breakpoint
CREATE MATERIALIZED VIEW "public"."hourly_queue_distribution" AS (select EXTRACT(HOUR FROM created_at) as "hour", COUNT(*) FILTER (WHERE queue_type = 'Reservasi') as "total_reservation", COUNT(*) FILTER (WHERE queue_type = 'Walk-In') as "total_walkin", COUNT(*) as "total_queues", 
      AVG(EXTRACT(EPOCH FROM (completed_at - called_at))/60) 
      FILTER (WHERE completed_at IS NOT NULL)
     as "avg_processing_minutes" from "queues" where DATE(created_at) = CURRENT_DATE group by EXTRACT(HOUR FROM created_at) order by hour);--> statement-breakpoint
CREATE MATERIALIZED VIEW "public"."queue_stats_by_clinic" AS (select "clinics"."id", "clinics"."code", "clinics"."name", COUNT(*) FILTER (WHERE "queues"."status" = 'Waiting') as "total_waiting", COUNT(*) FILTER (WHERE "queues"."status" = 'Called') as "total_called", COUNT(*) FILTER (WHERE "queues"."status" = 'Done') as "total_done", COUNT(*) as "total_queues", 
          AVG(EXTRACT(EPOCH FROM (COALESCE("queues"."called_at", NOW()) - "queues"."created_at"))/60)
         as "avg_waiting_time_minutes", NOW() as "last_updated" from "clinics" left join "queues" on "queues"."clinic_id" = "clinics"."id" AND DATE("queues"."created_at") = CURRENT_DATE group by "clinics"."id", "clinics"."code", "clinics"."name");--> statement-breakpoint
CREATE MATERIALIZED VIEW "public"."staff_performance" AS (select "staff"."id", "staff"."code", "staff"."name" as "staff_name", "staff"."loket_number", "clinics"."name" as "clinic_name", COUNT("queues"."id") as "total_served", 
      AVG(EXTRACT(EPOCH FROM ("queues"."completed_at" - "queues"."called_at"))/60)
     as "avg_service_time_minutes", COUNT("queue_calls"."id") as "total_call_attempts", MAX("queues"."completed_at") as "last_service_at", NOW() as "last_updated" from "staff" left join "clinics" on "staff"."clinic_id" = "clinics"."id" left join "queues" on "queues"."staff_id" = "staff"."id" AND "queues"."status" = 'Done' AND DATE("queues"."created_at") = CURRENT_DATE left join "queue_calls" on "queue_calls"."queue_id" = "queues"."id" where "staff"."is_active" = true group by "staff"."id", "staff"."code", "staff"."name", "staff"."loket_number", "clinics"."name");