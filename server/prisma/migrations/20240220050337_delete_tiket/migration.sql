/*
  Warnings:

  - You are about to drop the `ticket` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE `ticket` DROP FOREIGN KEY `Ticket_eventId_fkey`;

-- DropForeignKey
ALTER TABLE `ticket` DROP FOREIGN KEY `Ticket_userId_fkey`;

-- AlterTable
ALTER TABLE `event` ADD COLUMN `userId` INTEGER NULL;

-- DropTable
DROP TABLE `ticket`;

-- AddForeignKey
ALTER TABLE `Event` ADD CONSTRAINT `Event_userId_fkey` FOREIGN KEY (`userId`) REFERENCES `User`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;
