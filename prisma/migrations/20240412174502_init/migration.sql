-- DropForeignKey
ALTER TABLE `Skills` DROP FOREIGN KEY `Skills_category_id_fkey`;

-- AddForeignKey
ALTER TABLE `Skills` ADD CONSTRAINT `Skills_category_id_fkey` FOREIGN KEY (`category_id`) REFERENCES `Category_skills`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;
