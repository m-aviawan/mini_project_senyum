-- AlterTable
ALTER TABLE `transactions_status` MODIFY `status` ENUM('WAITING_FOR_PAYMENT', 'PAID', 'CANCELLED') NOT NULL DEFAULT 'WAITING_FOR_PAYMENT';
