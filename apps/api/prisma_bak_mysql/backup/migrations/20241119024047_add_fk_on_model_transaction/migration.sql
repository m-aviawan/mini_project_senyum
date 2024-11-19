/*
  Warnings:

  - You are about to drop the column `profilePictureDirectory` on the `event_organizers` table. All the data in the column will be lost.
  - You are about to drop the column `profilePictureDirectory` on the `users` table. All the data in the column will be lost.
  - Added the required column `eoId` to the `transactions` table without a default value. This is not possible if the table is not empty.
  - Added the required column `eventId` to the `transactions` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "event_organizers" DROP COLUMN "profilePictureDirectory";

-- AlterTable
ALTER TABLE "events" ALTER COLUMN "isPaid" SET DEFAULT true;

-- AlterTable
ALTER TABLE "transactions" ADD COLUMN     "eoId" TEXT NOT NULL,
ADD COLUMN     "eventId" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "users" DROP COLUMN "profilePictureDirectory";

-- AddForeignKey
ALTER TABLE "transactions" ADD CONSTRAINT "transactions_eoId_fkey" FOREIGN KEY ("eoId") REFERENCES "event_organizers"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "transactions" ADD CONSTRAINT "transactions_eventId_fkey" FOREIGN KEY ("eventId") REFERENCES "events"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
