import { MigrateUpArgs, MigrateDownArgs, sql } from '@payloadcms/db-postgres'

export async function up({ db }: MigrateUpArgs): Promise<void> {
  await db.execute(sql`
   CREATE TABLE IF NOT EXISTS "site_settings_contact_persons" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"name" varchar NOT NULL,
  	"phone" varchar NOT NULL
  );

  DO $$ BEGIN
    ALTER TABLE "site_settings_contact_persons" ADD CONSTRAINT "site_settings_contact_persons_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."site_settings"("id") ON DELETE cascade ON UPDATE no action;
  EXCEPTION
    WHEN duplicate_object THEN null;
  END $$;

  CREATE INDEX IF NOT EXISTS "site_settings_contact_persons_order_idx" ON "site_settings_contact_persons" USING btree ("_order");
  CREATE INDEX IF NOT EXISTS "site_settings_contact_persons_parent_id_idx" ON "site_settings_contact_persons" USING btree ("_parent_id");

  INSERT INTO "site_settings_contact_persons" ("_order", "_parent_id", "id", "name", "phone")
  SELECT 1, s."id", 'migrated-merkez-' || s."id"::text, 'Merkez Hat', COALESCE(NULLIF(s."phone", ''), '05317924006')
  FROM "site_settings" s
  WHERE NOT EXISTS (
    SELECT 1 FROM "site_settings_contact_persons" cp WHERE cp."_parent_id" = s."id"
  );

  INSERT INTO "site_settings_contact_persons" ("_order", "_parent_id", "id", "name", "phone")
  SELECT 2, s."id", 'migrated-saha-' || s."id"::text, 'Saha Hat', COALESCE(NULLIF(s."whatsapp", ''), NULLIF(s."phone", ''), '05317924006')
  FROM "site_settings" s
  WHERE (
    SELECT COUNT(*) FROM "site_settings_contact_persons" cp WHERE cp."_parent_id" = s."id"
  ) = 1;

  ALTER TABLE "site_settings" DROP COLUMN IF EXISTS "phone";
  ALTER TABLE "site_settings" DROP COLUMN IF EXISTS "whatsapp";
  `)
}

export async function down({ db }: MigrateDownArgs): Promise<void> {
  await db.execute(sql`
  ALTER TABLE "site_settings" ADD COLUMN IF NOT EXISTS "phone" varchar DEFAULT '05317924006';
  ALTER TABLE "site_settings" ADD COLUMN IF NOT EXISTS "whatsapp" varchar DEFAULT '05317924006';

  UPDATE "site_settings" s
  SET
    "phone" = COALESCE((
      SELECT cp."phone" FROM "site_settings_contact_persons" cp
      WHERE cp."_parent_id" = s."id"
      ORDER BY cp."_order" ASC
      LIMIT 1
    ), '05317924006'),
    "whatsapp" = COALESCE((
      SELECT cp."phone" FROM "site_settings_contact_persons" cp
      WHERE cp."_parent_id" = s."id"
      ORDER BY cp."_order" ASC
      LIMIT 1
    ), '05317924006');

  ALTER TABLE "site_settings" ALTER COLUMN "phone" SET NOT NULL;
  ALTER TABLE "site_settings" ALTER COLUMN "whatsapp" SET NOT NULL;

  DROP TABLE IF EXISTS "site_settings_contact_persons" CASCADE;
  `)
}
