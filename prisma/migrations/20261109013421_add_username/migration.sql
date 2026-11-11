-- AlterTable: add column as nullable first
ALTER TABLE "user" ADD COLUMN "username" VARCHAR(255);

-- Backfill existing users with the local part of their email
UPDATE "user" SET "username" = split_part("email", '@', 1) WHERE "username" IS NULL;

-- Make the column required
ALTER TABLE "user" ALTER COLUMN "username" SET NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX "user_username_key" ON "user"("username");
