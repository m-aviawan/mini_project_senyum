/*
  Warnings:

  - You are about to drop the column `refferalCode` on the `users` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[referralCode]` on the table `users` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `referralCode` to the `users` table without a default value. This is not possible if the table is not empty.

*/
-- DropIndex
DROP INDEX `users_refferalCode_key` ON `users`;

-- AlterTable
ALTER TABLE `users` DROP COLUMN `refferalCode`,
    ADD COLUMN `referralCode` VARCHAR(191) NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX `users_referralCode_key` ON `users`(`referralCode`);
