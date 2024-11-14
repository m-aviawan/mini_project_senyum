/*
  Warnings:

  - You are about to drop the `transactions_status` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE `transactions_status` DROP FOREIGN KEY `transactions_status_transactionId_fkey`;

-- AlterTable
ALTER TABLE `transactions` ADD COLUMN `status` ENUM('WAITING_FOR_PAYMENT', 'PAID', 'CANCELLED') NOT NULL DEFAULT 'WAITING_FOR_PAYMENT';

-- DropTable
DROP TABLE `transactions_status`;
