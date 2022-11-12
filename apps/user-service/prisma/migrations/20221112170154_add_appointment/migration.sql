/*
  Warnings:

  - Made the column `carLicense` on table `Driver` required. This step will fail if there are existing NULL values in that column.
  - Made the column `currentAddress` on table `Driver` required. This step will fail if there are existing NULL values in that column.
  - Made the column `name` on table `Driver` required. This step will fail if there are existing NULL values in that column.
  - Made the column `password` on table `Driver` required. This step will fail if there are existing NULL values in that column.
  - Made the column `phone` on table `Driver` required. This step will fail if there are existing NULL values in that column.

*/
-- CreateTable
CREATE TABLE "Appointment" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "name" TEXT NOT NULL,
    "phone" TEXT NOT NULL,
    "startPoint" TEXT NOT NULL,
    "startLocation" TEXT NOT NULL,
    "endPoint" TEXT NOT NULL,
    "endLocation" TEXT NOT NULL,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL,
    "driverId" TEXT,
    CONSTRAINT "Appointment_driverId_fkey" FOREIGN KEY ("driverId") REFERENCES "Driver" ("id") ON DELETE SET NULL ON UPDATE CASCADE
);

-- RedefineTables
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_Driver" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "name" TEXT NOT NULL,
    "phone" TEXT NOT NULL,
    "password" TEXT NOT NULL,
    "status" TEXT NOT NULL DEFAULT 'OFFLINE',
    "carName" TEXT NOT NULL,
    "carType" TEXT,
    "carLicense" TEXT NOT NULL,
    "currentAddress" TEXT NOT NULL,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL
);
INSERT INTO "new_Driver" ("carLicense", "carName", "carType", "createdAt", "currentAddress", "id", "name", "password", "phone", "status", "updatedAt") SELECT "carLicense", "carName", "carType", "createdAt", "currentAddress", "id", "name", "password", "phone", coalesce("status", 'OFFLINE') AS "status", "updatedAt" FROM "Driver";
DROP TABLE "Driver";
ALTER TABLE "new_Driver" RENAME TO "Driver";
CREATE UNIQUE INDEX "Driver_phone_key" ON "Driver"("phone");
PRAGMA foreign_key_check;
PRAGMA foreign_keys=ON;
