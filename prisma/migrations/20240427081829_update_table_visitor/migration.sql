-- CreateTable
CREATE TABLE `Awner` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `email` VARCHAR(191) NOT NULL,
    `password` VARCHAR(191) NOT NULL,

    UNIQUE INDEX `Awner_email_key`(`email`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Awner_info` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `name` VARCHAR(30) NOT NULL,
    `email` VARCHAR(40) NOT NULL,
    `description` VARCHAR(255) NOT NULL,
    `image` VARCHAR(255) NOT NULL,

    UNIQUE INDEX `Awner_info_name_key`(`name`),
    UNIQUE INDEX `Awner_info_email_key`(`email`),
    UNIQUE INDEX `Awner_info_description_key`(`description`),
    UNIQUE INDEX `Awner_info_image_key`(`image`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Links` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `title` VARCHAR(30) NOT NULL,
    `link` VARCHAR(255) NOT NULL,
    `icon` VARCHAR(255) NOT NULL,
    `type` VARCHAR(40) NOT NULL,

    UNIQUE INDEX `Links_title_key`(`title`),
    UNIQUE INDEX `Links_link_key`(`link`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `phones` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `phone` VARCHAR(30) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `job_titles` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `title` VARCHAR(30) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `colors_setting` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `main_color` VARCHAR(20) NOT NULL,
    `color1` VARCHAR(20) NOT NULL,
    `color2` VARCHAR(20) NOT NULL,

    UNIQUE INDEX `colors_setting_main_color_key`(`main_color`),
    UNIQUE INDEX `colors_setting_color1_key`(`color1`),
    UNIQUE INDEX `colors_setting_color2_key`(`color2`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

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
    `icon` VARCHAR(255) NOT NULL,
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
    `description` VARCHAR(255) NOT NULL,
    `live_url` VARCHAR(255) NOT NULL,
    `repo_url` VARCHAR(255) NOT NULL,
    `status` VARCHAR(20) NOT NULL,
    `created_at` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `ended_at` VARCHAR(30) NOT NULL,
    `attachment` VARCHAR(255) NOT NULL,
    `category_project_id` INTEGER NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Project_notes` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `notes` VARCHAR(255) NOT NULL,
    `react` VARCHAR(10) NOT NULL,
    `project_id` INTEGER NOT NULL,
    `visitor_id` VARCHAR(191) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Visitor` (
    `id` VARCHAR(191) NOT NULL,
    `name` VARCHAR(30) NOT NULL,
    `email` VARCHAR(40) NOT NULL,
    `image` VARCHAR(255) NOT NULL,
    `login_by` VARCHAR(20) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Messages` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `subject` VARCHAR(70) NOT NULL,
    `message` VARCHAR(255) NOT NULL,
    `vistor_id` VARCHAR(191) NOT NULL,

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
