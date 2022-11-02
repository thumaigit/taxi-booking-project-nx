/*
  Warnings:

  - You are about to drop the column `arrive_address` on the `User` table. All the data in the column will be lost.
  - You are about to drop the column `car_type` on the `User` table. All the data in the column will be lost.
  - You are about to drop the column `payment` on the `User` table. All the data in the column will be lost.
  - You are about to drop the column `pickup_address` on the `User` table. All the data in the column will be lost.

*/
-- RedefineTables
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_User" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "full_name" TEXT NOT NULL,
    "phone_number" TEXT NOT NULL,
    "created_at" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" DATETIME NOT NULL
);
INSERT INTO "new_User" ("created_at", "full_name", "id", "phone_number", "updated_at") SELECT "created_at", "full_name", "id", "phone_number", "updated_at" FROM "User";
DROP TABLE "User";
ALTER TABLE "new_User" RENAME TO "User";
PRAGMA foreign_key_check;
PRAGMA foreign_keys=ON;
