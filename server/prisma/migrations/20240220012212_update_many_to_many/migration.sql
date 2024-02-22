/*
  Warnings:

  - You are about to drop the column `createdAt` on the `eventcategory` table. All the data in the column will be lost.
  - You are about to drop the column `updatedAt` on the `eventcategory` table. All the data in the column will be lost.
  - You are about to drop the column `createdAt` on the `eventorganizer` table. All the data in the column will be lost.
  - You are about to drop the column `updatedAt` on the `eventorganizer` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE `eventcategory` DROP COLUMN `createdAt`,
    DROP COLUMN `updatedAt`;

-- AlterTable
ALTER TABLE `eventorganizer` DROP COLUMN `createdAt`,
    DROP COLUMN `updatedAt`;
