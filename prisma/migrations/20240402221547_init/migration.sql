-- CreateTable
CREATE TABLE `Awner_info` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `name` VARCHAR(30) NOT NULL,
    `email` VARCHAR(40) NOT NULL,
    `description` VARCHAR(191) NOT NULL,
    `image` VARCHAR(191) NOT NULL,

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
    `link` VARCHAR(191) NOT NULL,
    `icon` VARCHAR(191) NOT NULL,
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
