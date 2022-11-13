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
    "client_id" INTEGER DEFAULT -1,
    CONSTRAINT "Appointment_driverId_fkey" FOREIGN KEY ("driverId") REFERENCES "Driver" ("id") ON DELETE SET NULL ON UPDATE CASCADE,
    CONSTRAINT "Appointment_client_id_fkey" FOREIGN KEY ("client_id") REFERENCES "Client" ("id") ON DELETE SET NULL ON UPDATE CASCADE
);
INSERT INTO "new_Appointment" ("clientName", "clientPhone", "client_id", "createdAt", "driverId", "endLocation", "endPoint", "id", "startLocation", "startPoint", "updatedAt") SELECT "clientName", "clientPhone", "client_id", "createdAt", "driverId", "endLocation", "endPoint", "id", "startLocation", "startPoint", "updatedAt" FROM "Appointment";
DROP TABLE "Appointment";
ALTER TABLE "new_Appointment" RENAME TO "Appointment";
PRAGMA foreign_key_check;
PRAGMA foreign_keys=ON;
