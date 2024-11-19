/*
  Warnings:

  - Added the required column `eventId` to the `transactions` table without a default value. This is not possible if the table is not empty.
  - Added the required column `eventOrganizerId` to the `transactions` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "transactions" ADD COLUMN     "eventId" TEXT NOT NULL,
ADD COLUMN     "eventOrganizerId" TEXT NOT NULL;
