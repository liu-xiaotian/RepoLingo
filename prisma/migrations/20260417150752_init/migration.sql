-- CreateTable
CREATE TABLE `apikey` (
    `id` VARCHAR(191) NOT NULL,
    `userId` VARCHAR(191) NOT NULL,
    `provider` VARCHAR(191) NOT NULL DEFAULT 'openrouter',
    `encryptedKey` TEXT NOT NULL,
    `isActive` BOOLEAN NOT NULL DEFAULT true,
    `defaultModel` VARCHAR(191) NULL,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updatedAt` DATETIME(3) NOT NULL,

    INDEX `ApiKey_userId_idx`(`userId`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `repoconfig` (
    `id` VARCHAR(191) NOT NULL,
    `repositoryId` VARCHAR(191) NOT NULL,
    `baseLanguage` VARCHAR(191) NOT NULL DEFAULT 'zh-CN',
    `targetLanguages` JSON NOT NULL,
    `includePaths` JSON NULL,
    `excludePaths` JSON NULL,
    `translationBranch` VARCHAR(191) NOT NULL DEFAULT 'translations',
    `aiModel` VARCHAR(191) NULL,
    `autoTranslate` BOOLEAN NOT NULL DEFAULT false,
    `webhookId` INTEGER NULL,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updatedAt` DATETIME(3) NOT NULL,

    UNIQUE INDEX `RepoConfig_repositoryId_key`(`repositoryId`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `repository` (
    `id` VARCHAR(191) NOT NULL,
    `userId` VARCHAR(191) NOT NULL,
    `githubRepoId` INTEGER NOT NULL,
    `owner` VARCHAR(191) NOT NULL,
    `name` VARCHAR(191) NOT NULL,
    `fullName` VARCHAR(191) NOT NULL,
    `description` TEXT NULL,
    `defaultBranch` VARCHAR(191) NOT NULL DEFAULT 'main',
    `isPrivate` BOOLEAN NOT NULL DEFAULT false,
    `lastSyncedAt` DATETIME(3) NULL,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updatedAt` DATETIME(3) NOT NULL,

    UNIQUE INDEX `Repository_githubRepoId_key`(`githubRepoId`),
    INDEX `Repository_fullName_idx`(`fullName`),
    INDEX `Repository_userId_idx`(`userId`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `systemconfig` (
    `id` VARCHAR(191) NOT NULL,
    `key` VARCHAR(191) NOT NULL,
    `value` TEXT NOT NULL,
    `description` VARCHAR(191) NULL,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updatedAt` DATETIME(3) NOT NULL,

    UNIQUE INDEX `SystemConfig_key_key`(`key`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `translatedfile` (
    `id` VARCHAR(191) NOT NULL,
    `translationTaskId` VARCHAR(191) NOT NULL,
    `sourcePath` VARCHAR(191) NOT NULL,
    `targetPath` VARCHAR(191) NOT NULL,
    `targetLanguage` VARCHAR(191) NOT NULL,
    `status` ENUM('PENDING', 'TRANSLATING', 'COMPLETED', 'FAILED', 'SKIPPED') NOT NULL DEFAULT 'PENDING',
    `sourceContent` LONGTEXT NULL,
    `translatedContent` LONGTEXT NULL,
    `tokensUsed` INTEGER NULL,
    `errorMessage` TEXT NULL,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updatedAt` DATETIME(3) NOT NULL,

    INDEX `TranslatedFile_status_idx`(`status`),
    INDEX `TranslatedFile_translationTaskId_idx`(`translationTaskId`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `translationtask` (
    `id` VARCHAR(191) NOT NULL,
    `userId` VARCHAR(191) NOT NULL,
    `repositoryId` VARCHAR(191) NOT NULL,
    `status` ENUM('PENDING', 'RUNNING', 'COMPLETED', 'FAILED', 'CANCELLED') NOT NULL DEFAULT 'PENDING',
    `type` ENUM('FULL', 'INCREMENTAL') NOT NULL DEFAULT 'FULL',
    `targetLanguages` JSON NOT NULL,
    `totalFiles` INTEGER NOT NULL DEFAULT 0,
    `completedFiles` INTEGER NOT NULL DEFAULT 0,
    `failedFiles` INTEGER NOT NULL DEFAULT 0,
    `progress` DOUBLE NOT NULL DEFAULT 0,
    `errorMessage` TEXT NULL,
    `pullRequestUrl` VARCHAR(191) NULL,
    `pullRequestNumber` INTEGER NULL,
    `startedAt` DATETIME(3) NULL,
    `completedAt` DATETIME(3) NULL,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updatedAt` DATETIME(3) NOT NULL,

    INDEX `TranslationTask_repositoryId_idx`(`repositoryId`),
    INDEX `TranslationTask_status_idx`(`status`),
    INDEX `TranslationTask_userId_idx`(`userId`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `user` (
    `id` VARCHAR(191) NOT NULL,
    `githubId` INTEGER NOT NULL,
    `login` VARCHAR(191) NOT NULL,
    `name` VARCHAR(191) NULL,
    `email` VARCHAR(191) NULL,
    `avatarUrl` VARCHAR(191) NULL,
    `accessToken` TEXT NOT NULL,
    `installationId` INTEGER NULL,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updatedAt` DATETIME(3) NOT NULL,

    UNIQUE INDEX `User_githubId_key`(`githubId`),
    INDEX `User_githubId_idx`(`githubId`),
    INDEX `User_login_idx`(`login`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `userusage` (
    `id` VARCHAR(191) NOT NULL,
    `userId` VARCHAR(191) NOT NULL,
    `date` VARCHAR(191) NOT NULL,
    `count` INTEGER NOT NULL DEFAULT 0,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updatedAt` DATETIME(3) NOT NULL,

    INDEX `UserUsage_date_idx`(`date`),
    INDEX `UserUsage_userId_idx`(`userId`),
    UNIQUE INDEX `UserUsage_userId_date_key`(`userId`, `date`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `apikey` ADD CONSTRAINT `ApiKey_userId_fkey` FOREIGN KEY (`userId`) REFERENCES `user`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `repoconfig` ADD CONSTRAINT `RepoConfig_repositoryId_fkey` FOREIGN KEY (`repositoryId`) REFERENCES `repository`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `repository` ADD CONSTRAINT `Repository_userId_fkey` FOREIGN KEY (`userId`) REFERENCES `user`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `translatedfile` ADD CONSTRAINT `TranslatedFile_translationTaskId_fkey` FOREIGN KEY (`translationTaskId`) REFERENCES `translationtask`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `translationtask` ADD CONSTRAINT `TranslationTask_repositoryId_fkey` FOREIGN KEY (`repositoryId`) REFERENCES `repository`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `translationtask` ADD CONSTRAINT `TranslationTask_userId_fkey` FOREIGN KEY (`userId`) REFERENCES `user`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `userusage` ADD CONSTRAINT `UserUsage_userId_fkey` FOREIGN KEY (`userId`) REFERENCES `user`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;
