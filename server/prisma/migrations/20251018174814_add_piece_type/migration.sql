/*
  Warnings:

  - Added the required column `type` to the `pieces` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `pieces` ADD COLUMN `type` ENUM('Text', 'Video', 'Audio', 'Separator', 'Image') NOT NULL;
