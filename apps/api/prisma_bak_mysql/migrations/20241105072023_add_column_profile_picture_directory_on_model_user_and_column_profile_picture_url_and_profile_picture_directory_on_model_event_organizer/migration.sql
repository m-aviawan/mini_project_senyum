-- AlterTable
ALTER TABLE `event_organizers` ADD COLUMN `profilePictureDirectory` VARCHAR(191) NULL,
    ADD COLUMN `profilePictureUrl` VARCHAR(191) NULL;

-- AlterTable
ALTER TABLE `users` ADD COLUMN `profilePictureDirectory` VARCHAR(191) NULL;
