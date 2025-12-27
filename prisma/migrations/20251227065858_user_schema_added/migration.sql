/*
  Warnings:

  - You are about to drop the column `username` on the `USER` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[email]` on the table `USER` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `email` to the `USER` table without a default value. This is not possible if the table is not empty.
  - Added the required column `name` to the `USER` table without a default value. This is not possible if the table is not empty.
  - Added the required column `updatedAt` to the `USER` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "USER" DROP COLUMN "username",
ADD COLUMN     "avatarUrl" TEXT,
ADD COLUMN     "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
ADD COLUMN     "email" TEXT NOT NULL,
ADD COLUMN     "name" TEXT NOT NULL,
ADD COLUMN     "updatedAt" TIMESTAMP(3) NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX "USER_email_key" ON "USER"("email");
