-- CreateTable
CREATE TABLE `Category_skills` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `category_name` VARCHAR(50) NOT NULL,

    UNIQUE INDEX `Category_skills_category_name_key`(`category_name`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Skills` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `title` VARCHAR(20) NOT NULL,
    `icon` VARCHAR(191) NOT NULL,
    `category_id` INTEGER NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Category_projects` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `category_name` VARCHAR(60) NOT NULL,

    UNIQUE INDEX `Category_projects_category_name_key`(`category_name`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Projects` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `title` VARCHAR(30) NOT NULL,
    `description` VARCHAR(191) NOT NULL,
    `live_url` VARCHAR(191) NOT NULL,
    `repo_url` VARCHAR(191) NOT NULL,
    `status` VARCHAR(20) NOT NULL,
    `created_at` DATETIME(3) NOT NULL,
    `ended_at` DATETIME(3) NOT NULL,
    `attachment` VARCHAR(191) NOT NULL,
    `category_project_id` INTEGER NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Project_notes` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `notes` VARCHAR(191) NOT NULL,
    `react` VARCHAR(10) NOT NULL,
    `project_id` INTEGER NOT NULL,
    `visitor_id` INTEGER NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Visitor` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `name` VARCHAR(30) NOT NULL,
    `email` VARCHAR(40) NOT NULL,
    `image` VARCHAR(191) NOT NULL,
    `login_by` VARCHAR(20) NOT NULL,

    UNIQUE INDEX `Visitor_email_key`(`email`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Messages` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `subject` VARCHAR(70) NOT NULL,
    `message` VARCHAR(191) NOT NULL,
    `vistor_id` INTEGER NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `Skills` ADD CONSTRAINT `Skills_category_id_fkey` FOREIGN KEY (`category_id`) REFERENCES `Category_skills`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Projects` ADD CONSTRAINT `Projects_category_project_id_fkey` FOREIGN KEY (`category_project_id`) REFERENCES `Category_projects`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Project_notes` ADD CONSTRAINT `Project_notes_project_id_fkey` FOREIGN KEY (`project_id`) REFERENCES `Projects`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Project_notes` ADD CONSTRAINT `Project_notes_visitor_id_fkey` FOREIGN KEY (`visitor_id`) REFERENCES `Visitor`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Messages` ADD CONSTRAINT `Messages_vistor_id_fkey` FOREIGN KEY (`vistor_id`) REFERENCES `Visitor`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;
