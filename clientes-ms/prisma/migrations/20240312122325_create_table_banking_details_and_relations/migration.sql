-- CreateTable
CREATE TABLE "banking_details" (
    "id" TEXT NOT NULL,
    "agency" INTEGER NOT NULL,
    "current_account" INTEGER NOT NULL,
    "balance" DOUBLE PRECISION NOT NULL,
    "user_id" TEXT NOT NULL,

    CONSTRAINT "banking_details_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "banking_details_user_id_key" ON "banking_details"("user_id");

-- AddForeignKey
ALTER TABLE "banking_details" ADD CONSTRAINT "banking_details_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
