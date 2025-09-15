/*
  Warnings:

  - You are about to drop the column `image_url` on the `News` table. All the data in the column will be lost.
  - You are about to drop the column `image_url` on the `Tips` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "public"."News" DROP COLUMN "image_url";

-- AlterTable
ALTER TABLE "public"."Tips" DROP COLUMN "image_url";

-- CreateTable
CREATE TABLE "public"."LaundryShop" (
    "laundryShop_id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "address" TEXT NOT NULL,
    "latitude" DOUBLE PRECISION NOT NULL,
    "longitude" DOUBLE PRECISION NOT NULL,

    CONSTRAINT "LaundryShop_pkey" PRIMARY KEY ("laundryShop_id")
);

-- CreateTable
CREATE TABLE "public"."Machine" (
    "machine_id" SERIAL NOT NULL,
    "type" TEXT NOT NULL,
    "sizeKg" INTEGER NOT NULL,
    "status" TEXT NOT NULL,
    "shopId" INTEGER NOT NULL,

    CONSTRAINT "Machine_pkey" PRIMARY KEY ("machine_id")
);

-- CreateTable
CREATE TABLE "public"."Image" (
    "image_id" SERIAL NOT NULL,
    "url" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "Tips_id" INTEGER,
    "News_id" INTEGER,

    CONSTRAINT "Image_pkey" PRIMARY KEY ("image_id")
);

-- AddForeignKey
ALTER TABLE "public"."Machine" ADD CONSTRAINT "Machine_shopId_fkey" FOREIGN KEY ("shopId") REFERENCES "public"."LaundryShop"("laundryShop_id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."Image" ADD CONSTRAINT "Image_Tips_id_fkey" FOREIGN KEY ("Tips_id") REFERENCES "public"."Tips"("tips_id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."Image" ADD CONSTRAINT "Image_News_id_fkey" FOREIGN KEY ("News_id") REFERENCES "public"."News"("new_id") ON DELETE SET NULL ON UPDATE CASCADE;
