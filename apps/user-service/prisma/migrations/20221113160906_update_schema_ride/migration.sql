/*
  Warnings:

  - You are about to drop the `DriverOnline` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `Ride` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropIndex
DROP INDEX "DriverOnline_driver_id_key";

-- DropTable
PRAGMA foreign_keys=off;
DROP TABLE "DriverOnline";
PRAGMA foreign_keys=on;

-- DropTable
PRAGMA foreign_keys=off;
DROP TABLE "Ride";
PRAGMA foreign_keys=on;

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
    "dispatcherId" TEXT,
    CONSTRAINT "Appointment_driverId_fkey" FOREIGN KEY ("driverId") REFERENCES "Driver" ("id") ON DELETE SET NULL ON UPDATE CASCADE,
    CONSTRAINT "Appointment_clientId_fkey" FOREIGN KEY ("clientId") REFERENCES "Client" ("id") ON DELETE SET NULL ON UPDATE CASCADE,
    CONSTRAINT "Appointment_dispatcherId_fkey" FOREIGN KEY ("dispatcherId") REFERENCES "Dispatcher" ("id") ON DELETE SET NULL ON UPDATE CASCADE
);
INSERT INTO "new_Appointment" ("clientId", "clientName", "clientPhone", "createdAt", "driverId", "endLocation", "endPoint", "id", "startLocation", "startPoint", "updatedAt") SELECT "clientId", "clientName", "clientPhone", "createdAt", "driverId", "endLocation", "endPoint", "id", "startLocation", "startPoint", "updatedAt" FROM "Appointment";
DROP TABLE "Appointment";
ALTER TABLE "new_Appointment" RENAME TO "Appointment";
PRAGMA foreign_key_check;
PRAGMA foreign_keys=ON;
