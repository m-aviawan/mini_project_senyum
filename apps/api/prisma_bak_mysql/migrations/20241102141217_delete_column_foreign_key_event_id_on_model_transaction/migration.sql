/*
  Warnings:

  - You are about to drop the column `eventId` on the `transactions` table. All the data in the column will be lost.

*/
-- DropForeignKey
ALTER TABLE `transactions` DROP FOREIGN KEY `transactions_eventId_fkey`;

-- AlterTable
ALTER TABLE `transactions` DROP COLUMN `eventId`;
