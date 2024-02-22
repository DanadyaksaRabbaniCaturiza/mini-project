/*
  Warnings:

  - You are about to drop the column `title` on the `event` table. All the data in the column will be lost.
  - Added the required column `name` to the `Event` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `event` DROP COLUMN `title`,
    ADD COLUMN `name` VARCHAR(191) NOT NULL;
