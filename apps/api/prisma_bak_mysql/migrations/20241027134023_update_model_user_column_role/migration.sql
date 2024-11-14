-- AlterTable
ALTER TABLE `users` MODIFY `role` ENUM('customer', 'eventOrganizer') NOT NULL DEFAULT 'customer';
