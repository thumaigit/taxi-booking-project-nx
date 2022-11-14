/*
  Warnings:

  - You are about to drop the column `endLocation` on the `Appointment` table. All the data in the column will be lost.
  - You are about to drop the column `startLocation` on the `Appointment` table. All the data in the column will be lost.

*/
-- RedefineTables
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_Appointment" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "clientName" TEXT,
    "clientPhone" TEXT,
    "startPoint" TEXT NOT NULL,
    "endPoint" TEXT NOT NULL,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL,
    "driverId" TEXT,
    "clientId" INTEGER,
    "dispatcherId" TEXT,
    "carType" TEXT NOT NULL DEFAULT 'any type',
    "payment" TEXT NOT NULL DEFAULT 'cash',
    CONSTRAINT "Appointment_driverId_fkey" FOREIGN KEY ("driverId") REFERENCES "Driver" ("id") ON DELETE SET NULL ON UPDATE CASCADE,
    CONSTRAINT "Appointment_clientId_fkey" FOREIGN KEY ("clientId") REFERENCES "Client" ("id") ON DELETE SET NULL ON UPDATE CASCADE,
    CONSTRAINT "Appointment_dispatcherId_fkey" FOREIGN KEY ("dispatcherId") REFERENCES "Dispatcher" ("id") ON DELETE SET NULL ON UPDATE CASCADE
);
INSERT INTO "new_Appointment" ("carType", "clientId", "clientName", "clientPhone", "createdAt", "dispatcherId", "driverId", "endPoint", "id", "payment", "startPoint", "updatedAt") SELECT "carType", "clientId", "clientName", "clientPhone", "createdAt", "dispatcherId", "driverId", "endPoint", "id", "payment", "startPoint", "updatedAt" FROM "Appointment";
DROP TABLE "Appointment";
ALTER TABLE "new_Appointment" RENAME TO "Appointment";
PRAGMA foreign_key_check;
PRAGMA foreign_keys=ON;
