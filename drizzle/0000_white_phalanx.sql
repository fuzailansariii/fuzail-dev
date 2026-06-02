CREATE TABLE "users" (
	"id" serial PRIMARY KEY NOT NULL,
	"name" varchar(256) NOT NULL,
	"email" varchar(256) NOT NULL,
	"bio" text,
	"created_at" timestamp DEFAULT now() NOT NULL
);
