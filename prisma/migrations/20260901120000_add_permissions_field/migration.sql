-- AlterTable
ALTER TABLE "auth"."user" ADD COLUMN     "permissions" TEXT[] DEFAULT ARRAY[]::TEXT[];
