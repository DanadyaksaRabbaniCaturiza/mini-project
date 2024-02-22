-- CreateTable
CREATE TABLE `Ticket` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `category` VARCHAR(191) NOT NULL,
    `image` VARCHAR(191) NULL,
    `title` VARCHAR(191) NOT NULL,
    `date` DATETIME(3) NOT NULL,
    `location` VARCHAR(191) NOT NULL,
    `price` DOUBLE NOT NULL,
    `description` VARCHAR(191) NULL,
    `quantity` INTEGER NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
