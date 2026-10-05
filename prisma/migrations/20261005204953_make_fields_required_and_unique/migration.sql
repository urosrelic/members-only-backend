/*
  Warnings:

  - A unique constraint covering the columns `[name]` on the table `role` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[email]` on the table `user` will be added. If there are existing duplicate values, this will fail.
  - Made the column `owner_id` on table `clubhouse` required. This step will fail if there are existing NULL values in that column.
  - Made the column `post_id` on table `comment` required. This step will fail if there are existing NULL values in that column.
  - Made the column `user_id` on table `comment` required. This step will fail if there are existing NULL values in that column.
  - Made the column `user_id` on table `post` required. This step will fail if there are existing NULL values in that column.
  - Made the column `clubhouse_id` on table `post` required. This step will fail if there are existing NULL values in that column.
  - Made the column `name` on table `role` required. This step will fail if there are existing NULL values in that column.

*/
-- AlterTable
ALTER TABLE "clubhouse" ALTER COLUMN "owner_id" SET NOT NULL;

-- AlterTable
ALTER TABLE "comment" ALTER COLUMN "post_id" SET NOT NULL,
ALTER COLUMN "user_id" SET NOT NULL;

-- AlterTable
ALTER TABLE "post" ALTER COLUMN "user_id" SET NOT NULL,
ALTER COLUMN "clubhouse_id" SET NOT NULL;

-- AlterTable
ALTER TABLE "role" ALTER COLUMN "name" SET NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX "role_name_key" ON "role"("name");

-- CreateIndex
CREATE UNIQUE INDEX "user_email_key" ON "user"("email");
