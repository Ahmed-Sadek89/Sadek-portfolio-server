/*
  Warnings:

  - The primary key for the `Visitor` table will be changed. If it partially fails, the table could be left without primary key constraint.

*/
-- DropForeignKey
ALTER TABLE `Messages` DROP FOREIGN KEY `Messages_vistor_id_fkey`;

-- DropForeignKey
ALTER TABLE `Project_notes` DROP FOREIGN KEY `Project_notes_visitor_id_fkey`;

-- AlterTable
ALTER TABLE `Messages` MODIFY `vistor_id` VARCHAR(191) NOT NULL;

-- AlterTable
ALTER TABLE `Project_notes` MODIFY `visitor_id` VARCHAR(191) NOT NULL;

-- AlterTable
ALTER TABLE `Visitor` DROP PRIMARY KEY,
    MODIFY `id` VARCHAR(191) NOT NULL,
    ADD PRIMARY KEY (`id`);

-- AddForeignKey
ALTER TABLE `Project_notes` ADD CONSTRAINT `Project_notes_visitor_id_fkey` FOREIGN KEY (`visitor_id`) REFERENCES `Visitor`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Messages` ADD CONSTRAINT `Messages_vistor_id_fkey` FOREIGN KEY (`vistor_id`) REFERENCES `Visitor`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;
