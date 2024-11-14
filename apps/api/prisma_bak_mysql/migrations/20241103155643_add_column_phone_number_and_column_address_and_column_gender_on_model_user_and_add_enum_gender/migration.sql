-- AlterTable
ALTER TABLE `users` ADD COLUMN `address` LONGTEXT NULL,
    ADD COLUMN `gender` ENUM('MALE', 'FEMALE') NULL,
    ADD COLUMN `phoneNumber` VARCHAR(191) NULL;
