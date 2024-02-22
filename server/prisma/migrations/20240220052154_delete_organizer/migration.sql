/*
  Warnings:

  - You are about to drop the `eventorganizer` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE `event` DROP FOREIGN KEY `Event_userId_fkey`;

-- DropForeignKey
ALTER TABLE `eventorganizer` DROP FOREIGN KEY `EventOrganizer_eventId_fkey`;

-- DropForeignKey
ALTER TABLE `eventorganizer` DROP FOREIGN KEY `EventOrganizer_userId_fkey`;

-- DropTable
DROP TABLE `eventorganizer`;

-- AddForeignKey
ALTER TABLE `Event` ADD CONSTRAINT `Event_userId_fkey` FOREIGN KEY (`userId`) REFERENCES `User`(`id`) ON DELETE NO ACTION ON UPDATE NO ACTION;
