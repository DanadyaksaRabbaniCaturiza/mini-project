-- AlterTable
ALTER TABLE `event` ADD COLUMN `type` ENUM('paid', 'free') NULL;
