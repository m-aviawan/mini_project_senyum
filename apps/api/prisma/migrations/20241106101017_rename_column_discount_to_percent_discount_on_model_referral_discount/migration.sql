/*
  Warnings:

  - You are about to drop the column `discount` on the `referral_discounts` table. All the data in the column will be lost.
  - Added the required column `percentDiscount` to the `referral_discounts` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `referral_discounts` DROP COLUMN `discount`,
    ADD COLUMN `percentDiscount` INTEGER NOT NULL;
