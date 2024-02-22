/*
  Warnings:

  - You are about to drop the column `categoryId` on the `event` table. All the data in the column will be lost.
  - The primary key for the `eventorganizer` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `organizerId` on the `eventorganizer` table. All the data in the column will be lost.
  - You are about to drop the `organizer` table. If the table is not empty, all the data it contains will be lost.
  - Added the required column `userId` to the `EventOrganizer` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE `event` DROP FOREIGN KEY `Event_categoryId_fkey`;

-- DropForeignKey
ALTER TABLE `eventorganizer` DROP FOREIGN KEY `EventOrganizer_organizerId_fkey`;

-- AlterTable
ALTER TABLE `event` DROP COLUMN `categoryId`;

-- AlterTable
ALTER TABLE `eventorganizer` DROP PRIMARY KEY,
    DROP COLUMN `organizerId`,
    ADD COLUMN `userId` INTEGER NOT NULL,
    ADD PRIMARY KEY (`eventId`, `userId`);

-- AlterTable
ALTER TABLE `user` ADD COLUMN `role` ENUM('user', 'organizer') NULL DEFAULT 'user';

-- DropTable
DROP TABLE `organizer`;

-- AddForeignKey
ALTER TABLE `EventOrganizer` ADD CONSTRAINT `EventOrganizer_userId_fkey` FOREIGN KEY (`userId`) REFERENCES `User`(`id`) ON DELETE NO ACTION ON UPDATE NO ACTION;
