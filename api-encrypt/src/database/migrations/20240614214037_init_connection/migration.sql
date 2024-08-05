-- CreateTable
CREATE TABLE "Task" (
    "id" UUID NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "title" VARCHAR(50) NOT NULL,
    "description" VARCHAR(250) NOT NULL,

    CONSTRAINT "Task_pkey" PRIMARY KEY ("id")
);
