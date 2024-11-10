/*
  Warnings:

  - A unique constraint covering the columns `[refferalCode]` on the table `users` will be added. If there are existing duplicate values, this will fail.
  - Made the column `refferalCode` on table `users` required. This step will fail if there are existing NULL values in that column.

*/
-- AlterTable
ALTER TABLE `users` MODIFY `refferalCode` VARCHAR(191) NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX `users_refferalCode_key` ON `users`(`refferalCode`);
