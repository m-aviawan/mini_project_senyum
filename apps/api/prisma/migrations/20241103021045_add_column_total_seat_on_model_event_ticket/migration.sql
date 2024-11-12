/*
  Warnings:

  - Added the required column `totalSeat` to the `event_tickets` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `event_tickets` ADD COLUMN `totalSeat` INTEGER NOT NULL;
