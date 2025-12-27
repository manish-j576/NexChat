/*
  Warnings:

  - You are about to drop the column `name` on the `USER` table. All the data in the column will be lost.
  - Added the required column `username` to the `USER` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "USER" DROP COLUMN "name",
ADD COLUMN     "username" TEXT NOT NULL;
