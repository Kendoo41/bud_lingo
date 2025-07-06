import { relations } from "drizzle-orm";
import { integer, pgTable, serial, text } from "drizzle-orm/pg-core";
import { HeartPlus } from "lucide-react";

export const courses = pgTable("courses", {
  //Serial is autoincrement, primary (unique)
  id: serial("id").primaryKey(),
  title: text("title").notNull(),
  imageSrc: text("image_src").notNull(),
});

// This is many to one
export const coursesRelations = relations(courses, ({ many }) => ({
  userProgress: many(userProgress),
}));

export const userProgress = pgTable("user_progress", {
  userId: text("user_id").primaryKey(),
  userName: text("user_name").notNull().default("User"),
  userImageSrc: text("user_image_src").notNull().default("/mascot.svg"),
  activeCourseId: integer("active_course_id").references(() => courses.id, {
    onDelete: "cascade",
  }),
  hearts: integer("hearts").notNull().default(5),
  points: integer("points").notNull().default(0),
});

// This is one to many
export const userProgressRelations = relations(userProgress, ({ one }) => ({
  activeCourse: one(courses, {
    fields: [userProgress.activeCourseId],
    references: [courses.id],
  }),
}));
