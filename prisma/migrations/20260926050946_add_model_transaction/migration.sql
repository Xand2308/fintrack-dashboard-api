-- CreateEnum
CREATE TYPE "TransactionType" AS ENUM ('DEPOSIT', 'EXPENSE', 'INVESTIMENT');

-- CreateEnum
CREATE TYPE "TransactionCategory" AS ENUM ('HOUSTING', 'TRANSPORTATION', 'FOOD', 'ENTERTAINMENT', 'HEALT', 'UTILITY', 'SALARY', 'EDUCATION', 'OTHER');

-- CreateEnum
CREATE TYPE "TransactionPaymentMethod" AS ENUM ('CREDIT_CARD', 'DEBIT_CARD', 'BANK_TRANSFER', 'BANK_SLIP', 'CASH', 'PIX', 'OTHER');

-- CreateTable
CREATE TABLE "Transactions" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "type" "TransactionType" NOT NULL,
    "amount" DECIMAL(65,30) NOT NULL,
    "category" "TransactionCategory" NOT NULL,
    "payment_method" "TransactionPaymentMethod" NOT NULL,
    "date" TIMESTAMP(3) NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "update_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Transactions_pkey" PRIMARY KEY ("id")
);
