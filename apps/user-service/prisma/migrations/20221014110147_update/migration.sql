/*
  Warnings:

  - You are about to drop the column `arriveAddress` on the `Ride` table. All the data in the column will be lost.
  - You are about to drop the column `carType` on the `Ride` table. All the data in the column will be lost.
  - You are about to drop the column `pickupAddress` on the `Ride` table. All the data in the column will be lost.
  - You are about to drop the column `arriveAddress` on the `User` table. All the data in the column will be lost.
  - You are about to drop the column `carType` on the `User` table. All the data in the column will be lost.
  - You are about to drop the column `fullName` on the `User` table. All the data in the column will be lost.
  - You are about to drop the column `phoneNumber` on the `User` table. All the data in the column will be lost.
  - You are about to drop the column `pickupAddress` on the `User` table. All the data in the column will be lost.
  - Added the required column `arrive_address` to the `Ride` table without a default value. This is not possible if the table is not empty.
  - Added the required column `car_type` to the `Ride` table without a default value. This is not possible if the table is not empty.
  - Added the required column `pickup_address` to the `Ride` table without a default value. This is not possible if the table is not empty.
  - Added the required column `arrive_address` to the `User` table without a default value. This is not possible if the table is not empty.
  - Added the required column `car_type` to the `User` table without a default value. This is not possible if the table is not empty.
  - Added the required column `full_name` to the `User` table without a default value. This is not possible if the table is not empty.
  - Added the required column `phone_number` to the `User` table without a default value. This is not possible if the table is not empty.
  - Added the required column `pickup_address` to the `User` table without a default value. This is not possible if the table is not empty.

*/
-- RedefineTables
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_Ride" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "user_id" TEXT NOT NULL,
    "pickup_address" TEXT NOT NULL,
    "arrive_address" TEXT NOT NULL,
    "payment" TEXT NOT NULL,
    "car_type" TEXT NOT NULL,
    "created_at" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" DATETIME NOT NULL,
    CONSTRAINT "Ride_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "User" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);
INSERT INTO "new_Ride" ("created_at", "id", "payment", "updated_at", "user_id") SELECT "created_at", "id", "payment", "updated_at", "user_id" FROM "Ride";
DROP TABLE "Ride";
ALTER TABLE "new_Ride" RENAME TO "Ride";
CREATE TABLE "new_User" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "full_name" TEXT NOT NULL,
    "phone_number" TEXT NOT NULL,
    "pickup_address" TEXT NOT NULL,
    "arrive_address" TEXT NOT NULL,
    "payment" TEXT NOT NULL,
    "car_type" TEXT NOT NULL,
    "created_at" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" DATETIME NOT NULL
);
INSERT INTO "new_User" ("created_at", "id", "payment", "updated_at") SELECT "created_at", "id", "payment", "updated_at" FROM "User";
DROP TABLE "User";
ALTER TABLE "new_User" RENAME TO "User";
PRAGMA foreign_key_check;
PRAGMA foreign_keys=ON;
