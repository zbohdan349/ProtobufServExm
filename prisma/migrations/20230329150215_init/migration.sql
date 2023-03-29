-- CreateEnum
CREATE TYPE "Status" AS ENUM ('PROCESS', 'DONE');

-- CreateTable
CREATE TABLE "Order" (
    "id" TEXT NOT NULL,
    "userId" INTEGER NOT NULL,
    "subjectId" TEXT NOT NULL,
    "status" "Status" NOT NULL DEFAULT 'PROCESS',

    CONSTRAINT "Order_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Logs" (
    "id" SERIAL NOT NULL,
    "orderId" TEXT NOT NULL,
    "userId" INTEGER NOT NULL,
    "subjectId" TEXT NOT NULL,
    "status" "Status" NOT NULL DEFAULT 'PROCESS',

    CONSTRAINT "Logs_pkey" PRIMARY KEY ("id")
);
