/*
  Warnings:

  - Added the required column `address` to the `event_organizers` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `event_organizers` ADD COLUMN `address` VARCHAR(191) NOT NULL;
