ALTER TABLE "lessons" DROP CONSTRAINT "lessons_course_id_courses_id_fk";
--> statement-breakpoint
ALTER TABLE "lessons" DROP COLUMN "course_id";