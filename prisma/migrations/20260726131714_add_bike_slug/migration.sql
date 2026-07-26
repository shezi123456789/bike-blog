/*
  Warnings:

  - A unique constraint covering the columns `[slug]` on the table `Bike` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `slug` to the `Bike` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Bike" ADD COLUMN     "slug" TEXT NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX "Bike_slug_key" ON "Bike"("slug");
