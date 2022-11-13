/*
  Warnings:

  - You are about to drop the `User` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the column `endPoint` on the `Client` table. All the data in the column will be lost.
  - You are about to drop the column `name` on the `Client` table. All the data in the column will be lost.
  - You are about to drop the column `phone` on the `Client` table. All the data in the column will be lost.
  - You are about to drop the column `startPoint` on the `Client` table. All the data in the column will be lost.
  - You are about to drop the column `user_id` on the `Ride` table. All the data in the column will be lost.
  - Added the required column `full_name` to the `Client` table without a default value. This is not possible if the table is not empty.
  - Added the required column `phone_number` to the `Client` table without a default value. This is not possible if the table is not empty.
  - Added the required column `updated_at` to the `Client` table without a default value. This is not possible if the table is not empty.
  - Added the required column `user_password` to the `Client` table without a default value. This is not possible if the table is not empty.
  - Added the required column `dispatcher_id` to the `Ride` table without a default value. This is not possible if the table is not empty.

*/
-- DropIndex
DROP INDEX "User_phone_number_key";

-- DropTable
PRAGMA foreign_keys=off;
DROP TABLE "User";
PRAGMA foreign_keys=on;

-- CreateTable
CREATE TABLE "Dispatcher" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "full_name" TEXT NOT NULL,
    "phone_number" TEXT NOT NULL,
    "user_password" TEXT NOT NULL,
    "status" TEXT DEFAULT 'OFFLINE',
    "firebase_token" TEXT DEFAULT '',
    "created_at" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" DATETIME NOT NULL
);

-- RedefineTables
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_Client" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "full_name" TEXT NOT NULL,
    "phone_number" TEXT NOT NULL,
    "user_password" TEXT NOT NULL,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" DATETIME NOT NULL
);
INSERT INTO "new_Client" ("createdAt", "id") SELECT "createdAt", "id" FROM "Client";
DROP TABLE "Client";
ALTER TABLE "new_Client" RENAME TO "Client";
CREATE UNIQUE INDEX "Client_phone_number_key" ON "Client"("phone_number");
CREATE TABLE "new_Appointment" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "clientName" TEXT NOT NULL,
    "clientPhone" TEXT NOT NULL,
    "startPoint" TEXT NOT NULL,
    "startLocation" TEXT,
    "endPoint" TEXT NOT NULL,
    "endLocation" TEXT,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL,
    "driverId" TEXT,
    "client_id" INTEGER NOT NULL DEFAULT -1,
    CONSTRAINT "Appointment_driverId_fkey" FOREIGN KEY ("driverId") REFERENCES "Driver" ("id") ON DELETE SET NULL ON UPDATE CASCADE,
    CONSTRAINT "Appointment_client_id_fkey" FOREIGN KEY ("client_id") REFERENCES "Client" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);
INSERT INTO "new_Appointment" ("clientName", "clientPhone", "createdAt", "driverId", "endLocation", "endPoint", "id", "startLocation", "startPoint", "updatedAt") SELECT "clientName", "clientPhone", "createdAt", "driverId", "endLocation", "endPoint", "id", "startLocation", "startPoint", "updatedAt" FROM "Appointment";
DROP TABLE "Appointment";
ALTER TABLE "new_Appointment" RENAME TO "Appointment";
CREATE TABLE "new_Ride" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "dispatcher_id" TEXT NOT NULL,
    "pickup_address" TEXT NOT NULL,
    "arrive_address" TEXT NOT NULL,
    "payment" TEXT NOT NULL,
    "car_type" TEXT NOT NULL,
    "created_at" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" DATETIME NOT NULL,
    CONSTRAINT "Ride_dispatcher_id_fkey" FOREIGN KEY ("dispatcher_id") REFERENCES "Dispatcher" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);
INSERT INTO "new_Ride" ("arrive_address", "car_type", "created_at", "id", "payment", "pickup_address", "updated_at") SELECT "arrive_address", "car_type", "created_at", "id", "payment", "pickup_address", "updated_at" FROM "Ride";
DROP TABLE "Ride";
ALTER TABLE "new_Ride" RENAME TO "Ride";
PRAGMA foreign_key_check;
PRAGMA foreign_keys=ON;

-- CreateIndex
CREATE UNIQUE INDEX "Dispatcher_phone_number_key" ON "Dispatcher"("phone_number");
