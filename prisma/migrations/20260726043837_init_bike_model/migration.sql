-- CreateTable
CREATE TABLE "Bike" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "brand" TEXT NOT NULL,
    "modelYear" INTEGER NOT NULL,
    "category" TEXT NOT NULL,
    "engineCc" INTEGER NOT NULL,
    "powerHp" DOUBLE PRECISION,
    "torqueNm" DOUBLE PRECISION,
    "topSpeedKmh" INTEGER,
    "weightKg" INTEGER,
    "price" DOUBLE PRECISION,
    "description" TEXT NOT NULL,
    "status" TEXT NOT NULL DEFAULT 'draft',
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Bike_pkey" PRIMARY KEY ("id")
);
