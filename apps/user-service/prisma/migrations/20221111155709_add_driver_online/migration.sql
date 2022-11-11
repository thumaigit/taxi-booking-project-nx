-- CreateTable
CREATE TABLE "DriverOnline" (
    "driver_id" TEXT NOT NULL,
    "current_address" TEXT,
    "car_type" TEXT,
    "status" TEXT DEFAULT 'READY'
);

-- CreateIndex
CREATE UNIQUE INDEX "DriverOnline_driver_id_key" ON "DriverOnline"("driver_id");
