/*
  Warnings:

  - The values [MBTI,Enneagram,StrengthsFinder] on the enum `assessments_type` will be removed. If these variants are still used in the database, this will fail.

*/
-- AlterTable
ALTER TABLE `assessments` MODIFY `type` ENUM('BIG_FIVE', 'SIXTEEN_PF', 'HOLLAND_CODE', 'DISC', 'TALENTSMART_EQ', 'CAREER_VALUES') NOT NULL;
