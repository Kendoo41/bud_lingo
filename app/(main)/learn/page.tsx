import FeedWrapper from "@/components/FeedWrapper";
import StickyWrapper from "@/components/StickyWrapper";
import Header from "./header";
import UserProgress from "@/components/UserProgress";
import {
  getCourseProgress,
  getLesson,
  getLessonPercentage,
  getUnits,
  getUserProgress,
} from "@/db/queries";
import { redirect } from "next/navigation";
import Unit from "./unit";
import { auth } from "@clerk/nextjs/server";
import { Promo } from "@/components/promo";
import { userProgressRelations } from "@/db/schema";
import { Quests } from "@/components/quests";
import { quests } from "@/app/common/constant";

const LearnPage = async () => {
  const userId = await auth();

  if (!userId) {
    redirect("/sign-in");
  }

  const courseProgressData = getCourseProgress();
  const userProgressData = getUserProgress();
  const unitsData = getUnits();
  const lessonPercentageData = getLessonPercentage();

  const [userProgress, units, courseProgress, lessonPercentage] =
    await Promise.all([
      userProgressData,
      unitsData,
      courseProgressData,
      lessonPercentageData,
    ]);

  // NOTE: this guard technique is IMPORTANT to remove the undefined
  if (!userProgress || !userProgress.activeCourse) {
    redirect("/courses");
  }

  if (!courseProgress) {
    redirect("/courses");
  }

  const activeCourse = userProgress.activeCourse;

  return (
    <div className="flex gap-[48px] px-6">
      <FeedWrapper>
        <Header title={activeCourse.title} />
        {units.map((unit) => (
          <div key={unit.id} className="mb-10">
            <Unit
              id={unit.id}
              order={unit.order}
              description={unit.description}
              title={unit.title}
              lessons={unit.lessons}
              activeLesson={courseProgress.activeLesson}
              activeLessonPercentage={lessonPercentage}
            />
          </div>
        ))}
      </FeedWrapper>
      <StickyWrapper>
        <UserProgress
          activeCourse={activeCourse}
          hearts={userProgress.hearts}
          points={userProgress.points}
          hasActiveSubscription={false}
        />
        <Promo />
        <Quests points={userProgress.points} />
      </StickyWrapper>
    </div>
  );
};

export default LearnPage;
