ALTER TABLE "project" ALTER COLUMN "id" SET DATA TYPE uuid;--> statement-breakpoint
ALTER TABLE "project" ALTER COLUMN "id" SET DEFAULT gen_random_uuid();--> statement-breakpoint
ALTER TABLE "project" ALTER COLUMN "status" SET DEFAULT 'in_progress';--> statement-breakpoint
ALTER TABLE "contact" ALTER COLUMN "id" SET DATA TYPE uuid;--> statement-breakpoint
ALTER TABLE "contact" ALTER COLUMN "id" SET DEFAULT gen_random_uuid();--> statement-breakpoint
ALTER TABLE "project" ADD COLUMN "sub_heading" text;