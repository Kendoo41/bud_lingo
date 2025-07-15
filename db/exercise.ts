import { cache } from "react";
import { db } from "./drizzle";
import { auth } from "@clerk/nextjs/server";
import {
  courses,
  units,
  userProgress,
  lessons,
  challengeOptions,
  challengeProgress,
  challenges,
  lessonsRelations,
} from "./schema";
import { eq, and, sql } from "drizzle-orm";
import { AwardIcon } from "lucide-react";

//EX1: DONE
export const getCourses = cache(async () => {
  //const dataAPI = await db.query.courses.findMany();
  const dataSQL = await db.select().from(courses);
  return dataSQL;
});

//EX2: DONE
export const getUserProgress = cache(async () => {
  const { userId } = await auth();
  if (!userId) {
    return null;
  }

  const dataSQL = await db
    .select()
    .from(userProgress)
    .where(eq(userProgress.userId, userId))
    .limit(1);

  return dataSQL[0];
});

//EX3: DONE
export const getCoursesById = cache(async (courseId: number) => {
  const { userId } = await auth();
  if (!userId) {
    return null;
  }

  const data = db
    .select()
    .from(courses)
    .where(eq(courses.id, courseId))
    .limit(1);

  return data;
});

// NOTE: important technique
// What is it usage? what do we want to get: from unit -> lessons -> challenges: with completed status
// INPUT
export const getUnits = cache(async () => {
  const { userId } = await auth();
  const userProgress = await getUserProgress();

  if (!userProgress?.activeCourseId || !userId) {
    return [];
  }

  const lessonsData = await getLessonsWithCompletionStatus(
    userId,
    userProgress.activeCourseId
  );
  const unitsData = groupLessonsByUnit(lessonsData);

  return unitsData;

  // OUTPUT:
  // return normalizedData;
});

async function getLessonsWithCompletionStatus(
  userId: string,
  courseId: number
) {
  return await db
    .select({
      unitId: units.id,
      unitTitle: units.title,
      unitDescription: units.description,
      unitOrder: units.order,
      lessonId: lessons.id,
      lessonTitle: lessons.title,
      lessonOrder: lessons.order,
      totalChallenges: sql<number>`COUNT(${challenges.id})`.as(
        "totalChallenges"
      ),
      completedChallenges:
        sql<number>`COUNT(CASE WHEN ${challengeProgress.completed} = true THEN 1 END)`.as(
          "completedChallenges"
        ),
    })
    .from(units)
    .innerJoin(lessons, eq(lessons.unitId, units.id))
    .innerJoin(challenges, eq(challenges.lessonId, lessons.id))
    .leftJoin(
      challengeProgress,
      and(
        eq(challengeProgress.challengeId, challenges.id),
        eq(challengeProgress.userId, userId)
      )
    )
    .where(eq(units.courseId, courseId))
    .groupBy(
      units.id,
      units.title,
      units.description,
      units.order,
      lessons.id,
      lessons.title,
      lessons.order
    )
    .orderBy(units.order, lessons.order);
}

function groupLessonsByUnit(lessonsData: any[]) {
  const unitsMap = new Map();

  lessonsData.forEach((row) => {
    if (!unitsMap.has(row.unitId)) {
      unitsMap.set(row.unitId, {
        id: row.unitId,
        title: row.unitTitle,
        description: row.unitDescription,
        order: row.unitOrder,
        lessons: [],
      });
    }

    const unit = unitsMap.get(row.unitId);
    unit.lessons.push({
      id: row.lessonId,
      title: row.lessonTitle,
      order: row.lessonOrder,
      completed:
        row.completedChallenges === row.totalChallenges &&
        row.totalChallenges > 0,
    });
  });

  return Array.from(unitsMap.values())
    .sort((a, b) => a.order - b.order)
    .map((unit) => ({
      ...unit,
      lessons: unit.lessons.sort((a: { order: number; }, b: { order: number; }) => a.order - b.order)
    }));
}
// TODO
// export const getCourseProgress = cache(async () => {
//   return {
//     activeLesson: firstUncompleteLesson,
//     activeLessonId: firstUncompleteLesson?.id,
//   };
// });
//
// export const getLesson = cache(async (id?: number) => {});
