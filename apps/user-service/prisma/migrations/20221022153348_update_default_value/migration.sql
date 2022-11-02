-- RedefineTables
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_User" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "full_name" TEXT NOT NULL,
    "phone_number" TEXT NOT NULL,
    "user_password" TEXT NOT NULL,
    "user_type" TEXT NOT NULL,
    "status" TEXT NOT NULL,
    "current_address" TEXT NOT NULL,
    "created_at" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" DATETIME NOT NULL
);
INSERT INTO "new_User" ("created_at", "current_address", "full_name", "id", "phone_number", "status", "updated_at", "user_password", "user_type") SELECT "created_at", "current_address", "full_name", "id", "phone_number", "status", "updated_at", "user_password", "user_type" FROM "User";
DROP TABLE "User";
ALTER TABLE "new_User" RENAME TO "User";
CREATE UNIQUE INDEX "User_phone_number_key" ON "User"("phone_number");
PRAGMA foreign_key_check;
PRAGMA foreign_keys=ON;
