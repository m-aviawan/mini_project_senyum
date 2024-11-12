/*
  Warnings:

  - You are about to drop the column `artist` on the `events` table. All the data in the column will be lost.
  - You are about to drop the column `endEvent` on the `events` table. All the data in the column will be lost.
  - You are about to drop the column `eventCategory` on the `events` table. All the data in the column will be lost.
  - You are about to drop the column `eventName` on the `events` table. All the data in the column will be lost.
  - You are about to drop the column `eventStatus` on the `events` table. All the data in the column will be lost.
  - You are about to drop the column `eventType` on the `events` table. All the data in the column will be lost.
  - You are about to drop the column `imageUrl` on the `events` table. All the data in the column will be lost.
  - You are about to drop the column `startEvent` on the `events` table. All the data in the column will be lost.
  - You are about to drop the column `userId` on the `events` table. All the data in the column will be lost.
  - You are about to drop the column `pointId` on the `transactions` table. All the data in the column will be lost.
  - You are about to drop the column `refferalDiscountId` on the `transactions` table. All the data in the column will be lost.
  - You are about to drop the column `ticketId` on the `transactions` table. All the data in the column will be lost.
  - You are about to drop the column `total_price` on the `transactions` table. All the data in the column will be lost.
  - You are about to drop the column `birthDate` on the `users` table. All the data in the column will be lost.
  - You are about to drop the column `firstName` on the `users` table. All the data in the column will be lost.
  - You are about to drop the column `gender` on the `users` table. All the data in the column will be lost.
  - You are about to drop the column `idCardNumber` on the `users` table. All the data in the column will be lost.
  - You are about to drop the column `lastName` on the `users` table. All the data in the column will be lost.
  - You are about to drop the column `referralCode` on the `users` table. All the data in the column will be lost.
  - You are about to drop the column `role` on the `users` table. All the data in the column will be lost.
  - You are about to drop the `points` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `refferal_discounts` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `tickets` table. If the table is not empty, all the data it contains will be lost.
  - Added the required column `capacity` to the `events` table without a default value. This is not possible if the table is not empty.
  - Added the required column `categoryId` to the `events` table without a default value. This is not possible if the table is not empty.
  - Added the required column `endDate` to the `events` table without a default value. This is not possible if the table is not empty.
  - Added the required column `eoId` to the `events` table without a default value. This is not possible if the table is not empty.
  - Added the required column `locationName` to the `events` table without a default value. This is not possible if the table is not empty.
  - Added the required column `name` to the `events` table without a default value. This is not possible if the table is not empty.
  - Added the required column `startDate` to the `events` table without a default value. This is not possible if the table is not empty.
  - Added the required column `type` to the `events` table without a default value. This is not possible if the table is not empty.
  - Added the required column `eventId` to the `transactions` table without a default value. This is not possible if the table is not empty.
  - Added the required column `totalPrice` to the `transactions` table without a default value. This is not possible if the table is not empty.
  - Added the required column `password` to the `users` table without a default value. This is not possible if the table is not empty.
  - Added the required column `username` to the `users` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE `events` DROP FOREIGN KEY `Events_userId_fkey`;

-- DropForeignKey
ALTER TABLE `points` DROP FOREIGN KEY `points_userId_fkey`;

-- DropForeignKey
ALTER TABLE `refferal_discounts` DROP FOREIGN KEY `refferal_discounts_userId_fkey`;

-- DropForeignKey
ALTER TABLE `tickets` DROP FOREIGN KEY `Tickets_eventsId_fkey`;

-- DropForeignKey
ALTER TABLE `transactions` DROP FOREIGN KEY `transactions_pointId_fkey`;

-- DropForeignKey
ALTER TABLE `transactions` DROP FOREIGN KEY `transactions_refferalDiscountId_fkey`;

-- DropForeignKey
ALTER TABLE `transactions` DROP FOREIGN KEY `transactions_ticketId_fkey`;

-- AlterTable
ALTER TABLE `events` DROP COLUMN `artist`,
    DROP COLUMN `endEvent`,
    DROP COLUMN `eventCategory`,
    DROP COLUMN `eventName`,
    DROP COLUMN `eventStatus`,
    DROP COLUMN `eventType`,
    DROP COLUMN `imageUrl`,
    DROP COLUMN `startEvent`,
    DROP COLUMN `userId`,
    ADD COLUMN `capacity` INTEGER NOT NULL,
    ADD COLUMN `categoryId` INTEGER NOT NULL,
    ADD COLUMN `endDate` DATETIME(3) NOT NULL,
    ADD COLUMN `eoId` VARCHAR(191) NOT NULL,
    ADD COLUMN `isPaid` BOOLEAN NOT NULL DEFAULT false,
    ADD COLUMN `locationName` VARCHAR(191) NOT NULL,
    ADD COLUMN `name` VARCHAR(191) NOT NULL,
    ADD COLUMN `startDate` DATETIME(3) NOT NULL,
    ADD COLUMN `type` ENUM('ONLINE', 'OFFLINE') NOT NULL,
    ADD COLUMN `url` VARCHAR(191) NULL,
    MODIFY `description` VARCHAR(191) NULL;

-- AlterTable
ALTER TABLE `transactions` DROP COLUMN `pointId`,
    DROP COLUMN `refferalDiscountId`,
    DROP COLUMN `ticketId`,
    DROP COLUMN `total_price`,
    ADD COLUMN `eventId` VARCHAR(191) NOT NULL,
    ADD COLUMN `totalPrice` INTEGER NOT NULL;

-- AlterTable
ALTER TABLE `users` DROP COLUMN `birthDate`,
    DROP COLUMN `firstName`,
    DROP COLUMN `gender`,
    DROP COLUMN `idCardNumber`,
    DROP COLUMN `lastName`,
    DROP COLUMN `referralCode`,
    DROP COLUMN `role`,
    ADD COLUMN `password` VARCHAR(191) NOT NULL,
    ADD COLUMN `profilePictureUrl` VARCHAR(191) NULL,
    ADD COLUMN `refferalCode` VARCHAR(191) NULL,
    ADD COLUMN `totalPoint` INTEGER NOT NULL DEFAULT 0,
    ADD COLUMN `username` VARCHAR(191) NOT NULL;

-- DropTable
DROP TABLE `points`;

-- DropTable
DROP TABLE `refferal_discounts`;

-- DropTable
DROP TABLE `tickets`;

-- CreateTable
CREATE TABLE `event_organizers` (
    `id` VARCHAR(191) NOT NULL,
    `companyName` VARCHAR(191) NOT NULL,
    `phoneNumber` VARCHAR(191) NOT NULL,
    `pic` VARCHAR(191) NULL,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updatedAt` DATETIME(3) NOT NULL,
    `deletedAt` DATETIME(3) NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `referral_points` (
    `id` VARCHAR(191) NOT NULL,
    `point` INTEGER NOT NULL,
    `expiry` DATETIME(3) NOT NULL,
    `userId` VARCHAR(191) NOT NULL,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updatedAt` DATETIME(3) NOT NULL,
    `deletedAt` DATETIME(3) NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `referral_discounts` (
    `id` VARCHAR(191) NOT NULL,
    `discount` INTEGER NOT NULL,
    `expiry` DATETIME(3) NOT NULL,
    `isUsed` BOOLEAN NOT NULL DEFAULT false,
    `userId` VARCHAR(191) NOT NULL,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updatedAt` DATETIME(3) NOT NULL,
    `deletedAt` DATETIME(3) NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `event_tickets` (
    `id` VARCHAR(191) NOT NULL,
    `name` VARCHAR(191) NOT NULL,
    `price` INTEGER NOT NULL,
    `available` INTEGER NOT NULL,
    `bookSeat` INTEGER NOT NULL,
    `discount` INTEGER NOT NULL DEFAULT 0,
    `discountStart` DATETIME(3) NULL,
    `discountExpiry` DATETIME(3) NULL,
    `startDate` DATETIME(3) NOT NULL,
    `endDate` DATETIME(3) NOT NULL,
    `eventId` VARCHAR(191) NOT NULL,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updatedAt` DATETIME(3) NOT NULL,
    `deletedAt` DATETIME(3) NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `categories` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `name` VARCHAR(191) NOT NULL,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updatedAt` DATETIME(3) NOT NULL,
    `deletedAt` DATETIME(3) NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `event_images` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `url` VARCHAR(191) NOT NULL,
    `eventId` VARCHAR(191) NOT NULL,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updatedAt` DATETIME(3) NOT NULL,
    `deletedAt` DATETIME(3) NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `transaction_details` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `price` INTEGER NOT NULL,
    `qty` INTEGER NOT NULL,
    `transactionId` VARCHAR(191) NOT NULL,
    `ticketId` VARCHAR(191) NOT NULL,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updatedAt` DATETIME(3) NOT NULL,
    `deletedAt` DATETIME(3) NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `transactions_status` (
    `id` VARCHAR(191) NOT NULL,
    `status` ENUM('WAITING_FOR_PAYMENT', 'PAID', 'CANCELLED') NOT NULL,
    `transactionId` VARCHAR(191) NOT NULL,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updatedAt` DATETIME(3) NOT NULL,
    `deletedAt` DATETIME(3) NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `reviews` (
    `comments` VARCHAR(191) NULL,
    `rating` INTEGER NOT NULL,
    `feedback` VARCHAR(191) NULL,
    `userId` VARCHAR(191) NOT NULL,
    `eventId` VARCHAR(191) NOT NULL,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updatedAt` DATETIME(3) NOT NULL,
    `deletedAt` DATETIME(3) NULL,

    PRIMARY KEY (`userId`, `eventId`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `referral_points` ADD CONSTRAINT `referral_points_userId_fkey` FOREIGN KEY (`userId`) REFERENCES `users`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `referral_discounts` ADD CONSTRAINT `referral_discounts_userId_fkey` FOREIGN KEY (`userId`) REFERENCES `users`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `events` ADD CONSTRAINT `events_categoryId_fkey` FOREIGN KEY (`categoryId`) REFERENCES `categories`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `events` ADD CONSTRAINT `events_eoId_fkey` FOREIGN KEY (`eoId`) REFERENCES `event_organizers`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `event_tickets` ADD CONSTRAINT `event_tickets_eventId_fkey` FOREIGN KEY (`eventId`) REFERENCES `events`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `event_images` ADD CONSTRAINT `event_images_eventId_fkey` FOREIGN KEY (`eventId`) REFERENCES `events`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `transactions` ADD CONSTRAINT `transactions_eventId_fkey` FOREIGN KEY (`eventId`) REFERENCES `events`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `transaction_details` ADD CONSTRAINT `transaction_details_transactionId_fkey` FOREIGN KEY (`transactionId`) REFERENCES `transactions`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `transaction_details` ADD CONSTRAINT `transaction_details_ticketId_fkey` FOREIGN KEY (`ticketId`) REFERENCES `event_tickets`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `transactions_status` ADD CONSTRAINT `transactions_status_transactionId_fkey` FOREIGN KEY (`transactionId`) REFERENCES `transactions`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `reviews` ADD CONSTRAINT `reviews_userId_fkey` FOREIGN KEY (`userId`) REFERENCES `users`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `reviews` ADD CONSTRAINT `reviews_eventId_fkey` FOREIGN KEY (`eventId`) REFERENCES `events`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;
