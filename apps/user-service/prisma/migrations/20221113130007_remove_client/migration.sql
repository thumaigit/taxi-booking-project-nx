/*
  Warnings:

  - You are about to drop the column `client_id` on the `Appointment` table. All the data in the column will be lost.

*/
-- RedefineTables
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_Appointment" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "clientName" TEXT,
    "clientPhone" TEXT,
    "startPoint" TEXT NOT NULL,
    "startLocation" TEXT,
    "endPoint" TEXT NOT NULL,
    "endLocation" TEXT,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL,
    "driverId" TEXT,
    "clientId" INTEGER,
    CONSTRAINT "Appointment_driverId_fkey" FOREIGN KEY ("driverId") REFERENCES "Driver" ("id") ON DELETE SET NULL ON UPDATE CASCADE,
    CONSTRAINT "Appointment_clientId_fkey" FOREIGN KEY ("clientId") REFERENCES "Client" ("id") ON DELETE SET NULL ON UPDATE CASCADE
);
INSERT INTO "new_Appointment" ("clientName", "clientPhone", "createdAt", "driverId", "endLocation", "endPoint", "id", "startLocation", "startPoint", "updatedAt") SELECT "clientName", "clientPhone", "createdAt", "driverId", "endLocation", "endPoint", "id", "startLocation", "startPoint", "updatedAt" FROM "Appointment";
DROP TABLE "Appointment";
ALTER TABLE "new_Appointment" RENAME TO "Appointment";
PRAGMA foreign_key_check;
PRAGMA foreign_keys=ON;
