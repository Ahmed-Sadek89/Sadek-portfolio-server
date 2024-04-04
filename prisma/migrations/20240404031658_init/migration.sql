-- AlterTable
ALTER TABLE `Awner_info` MODIFY `image` VARCHAR(255) NOT NULL;

-- AlterTable
ALTER TABLE `Links` MODIFY `link` VARCHAR(255) NOT NULL,
    MODIFY `icon` VARCHAR(255) NOT NULL;

-- AlterTable
ALTER TABLE `Messages` MODIFY `message` VARCHAR(255) NOT NULL;

-- AlterTable
ALTER TABLE `Project_notes` MODIFY `notes` VARCHAR(255) NOT NULL;

-- AlterTable
ALTER TABLE `Projects` MODIFY `description` VARCHAR(255) NOT NULL,
    MODIFY `live_url` VARCHAR(255) NOT NULL,
    MODIFY `repo_url` VARCHAR(255) NOT NULL,
    MODIFY `attachment` VARCHAR(255) NOT NULL;

-- AlterTable
ALTER TABLE `Skills` MODIFY `icon` VARCHAR(255) NOT NULL;

-- AlterTable
ALTER TABLE `Visitor` MODIFY `image` VARCHAR(255) NOT NULL;
