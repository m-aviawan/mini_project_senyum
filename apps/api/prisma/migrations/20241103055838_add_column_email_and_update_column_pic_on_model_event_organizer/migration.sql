/*
  Warnings:

  - Added the required column `email` to the `event_organizers` table without a default value. This is not possible if the table is not empty.
  - Made the column `pic` on table `event_organizers` required. This step will fail if there are existing NULL values in that column.

*/
-- AlterTable
ALTER TABLE `event_organizers` ADD COLUMN `email` VARCHAR(191) NOT NULL,
    MODIFY `pic` VARCHAR(191) NOT NULL;
