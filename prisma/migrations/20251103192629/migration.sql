/*
  Warnings:

  - You are about to alter the column `CreatedDate` on the `accountmenus` table. The data in that column could be lost. The data in that column will be cast from `Timestamp(0)` to `Timestamp`.
  - You are about to alter the column `CreatedDate` on the `accounts` table. The data in that column could be lost. The data in that column will be cast from `Timestamp(0)` to `Timestamp`.
  - You are about to alter the column `CreatedDate` on the `addresses` table. The data in that column could be lost. The data in that column will be cast from `Timestamp(0)` to `Timestamp`.
  - You are about to alter the column `CreatedDate` on the `categories` table. The data in that column could be lost. The data in that column will be cast from `Timestamp(0)` to `Timestamp`.
  - You are about to alter the column `completedAt` on the `contacts` table. The data in that column could be lost. The data in that column will be cast from `Timestamp(0)` to `Timestamp`.
  - You are about to alter the column `CreatedDate` on the `contacts` table. The data in that column could be lost. The data in that column will be cast from `Timestamp(0)` to `Timestamp`.
  - You are about to alter the column `CreatedDate` on the `lots` table. The data in that column could be lost. The data in that column will be cast from `Timestamp(0)` to `Timestamp`.
  - You are about to alter the column `CreatedDate` on the `menues` table. The data in that column could be lost. The data in that column will be cast from `Timestamp(0)` to `Timestamp`.
  - You are about to alter the column `CreatedDate` on the `paymenttypes` table. The data in that column could be lost. The data in that column will be cast from `Timestamp(0)` to `Timestamp`.
  - You are about to alter the column `CreatedDate` on the `presentations` table. The data in that column could be lost. The data in that column will be cast from `Timestamp(0)` to `Timestamp`.
  - You are about to alter the column `CreatedDate` on the `products` table. The data in that column could be lost. The data in that column will be cast from `Timestamp(0)` to `Timestamp`.
  - You are about to alter the column `CreatedDate` on the `provinces` table. The data in that column could be lost. The data in that column will be cast from `Timestamp(0)` to `Timestamp`.
  - You are about to alter the column `CreatedDate` on the `roles` table. The data in that column could be lost. The data in that column will be cast from `Timestamp(0)` to `Timestamp`.
  - You are about to alter the column `CreatedDate` on the `subcategories` table. The data in that column could be lost. The data in that column will be cast from `Timestamp(0)` to `Timestamp`.
  - You are about to alter the column `CreatedDate` on the `submenues` table. The data in that column could be lost. The data in that column will be cast from `Timestamp(0)` to `Timestamp`.
  - You are about to alter the column `CreatedDate` on the `suppliers` table. The data in that column could be lost. The data in that column will be cast from `Timestamp(0)` to `Timestamp`.
  - You are about to alter the column `CreatedDate` on the `users` table. The data in that column could be lost. The data in that column will be cast from `Timestamp(0)` to `Timestamp`.

*/
-- AlterTable
ALTER TABLE `accountmenus` MODIFY `CreatedDate` TIMESTAMP NOT NULL;

-- AlterTable
ALTER TABLE `accounts` MODIFY `CreatedDate` TIMESTAMP NOT NULL;

-- AlterTable
ALTER TABLE `addresses` MODIFY `CreatedDate` TIMESTAMP NOT NULL;

-- AlterTable
ALTER TABLE `categories` MODIFY `CreatedDate` TIMESTAMP NOT NULL;

-- AlterTable
ALTER TABLE `contacts` MODIFY `completedAt` TIMESTAMP NULL,
    MODIFY `CreatedDate` TIMESTAMP NOT NULL;

-- AlterTable
ALTER TABLE `lots` MODIFY `CreatedDate` TIMESTAMP NOT NULL;

-- AlterTable
ALTER TABLE `menues` MODIFY `CreatedDate` TIMESTAMP NOT NULL;

-- AlterTable
ALTER TABLE `paymenttypes` MODIFY `CreatedDate` TIMESTAMP NOT NULL;

-- AlterTable
ALTER TABLE `presentations` MODIFY `CreatedDate` TIMESTAMP NOT NULL;

-- AlterTable
ALTER TABLE `products` MODIFY `CreatedDate` TIMESTAMP NOT NULL;

-- AlterTable
ALTER TABLE `provinces` MODIFY `CreatedDate` TIMESTAMP NOT NULL;

-- AlterTable
ALTER TABLE `roles` MODIFY `CreatedDate` TIMESTAMP NOT NULL;

-- AlterTable
ALTER TABLE `subcategories` MODIFY `CreatedDate` TIMESTAMP NOT NULL;

-- AlterTable
ALTER TABLE `submenues` MODIFY `CreatedDate` TIMESTAMP NOT NULL;

-- AlterTable
ALTER TABLE `suppliers` MODIFY `CreatedDate` TIMESTAMP NOT NULL;

-- AlterTable
ALTER TABLE `users` MODIFY `CreatedDate` TIMESTAMP NOT NULL;
