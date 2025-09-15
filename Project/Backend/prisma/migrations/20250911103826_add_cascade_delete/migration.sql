-- DropForeignKey
ALTER TABLE "public"."Climate" DROP CONSTRAINT "Climate_userId_fkey";

-- AddForeignKey
ALTER TABLE "public"."Climate" ADD CONSTRAINT "Climate_userId_fkey" FOREIGN KEY ("userId") REFERENCES "public"."User"("user_id") ON DELETE CASCADE ON UPDATE CASCADE;
