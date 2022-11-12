/*
  Warnings:

  - You are about to drop the column `name` on the `Appointment` table. All the data in the column will be lost.
  - You are about to drop the column `phone` on the `Appointment` table. All the data in the column will be lost.
  - Added the required column `clientName` to the `Appointment` table without a default value. This is not possible if the table is not empty.
  - Added the required column `clientPhone` to the `Appointment` table without a default value. This is not possible if the table is not empty.

*/
-- RedefineTables
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_Appointment" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "clientName" TEXT NOT NULL,
    "clientPhone" TEXT NOT NULL,
    "startPoint" TEXT NOT NULL,
    "startLocation" TEXT NOT NULL,
    "endPoint" TEXT NOT NULL,
    "endLocation" TEXT NOT NULL,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL,
    "driverId" TEXT,
    CONSTRAINT "Appointment_driverId_fkey" FOREIGN KEY ("driverId") REFERENCES "Driver" ("id") ON DELETE SET NULL ON UPDATE CASCADE
);
INSERT INTO "new_Appointment" ("createdAt", "driverId", "endLocation", "endPoint", "id", "startLocation", "startPoint", "updatedAt") SELECT "createdAt", "driverId", "endLocation", "endPoint", "id", "startLocation", "startPoint", "updatedAt" FROM "Appointment";
DROP TABLE "Appointment";
ALTER TABLE "new_Appointment" RENAME TO "Appointment";
PRAGMA foreign_key_check;
PRAGMA foreign_keys=ON;
