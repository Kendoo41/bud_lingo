import FeedWrapper from "@/components/FeedWrapper";
import StickyWrapper from "@/components/StickyWrapper";
import Header from "./header";
import UserProgress from "@/components/UserProgress";
import { getUserProgress } from "@/db/queries";
import { redirect } from "next/navigation";

const LearnPage = async () => {
  const userProgressData = getUserProgress();

  const [userProgress] = await Promise.all([userProgressData]);

  if (!userProgress || !userProgress.activeCourse) {
    redirect("/courses")
  }

  const activeCourse = userProgress.activeCourse;

  return (
    <div className="flex gap-[48px] px-6">
      <FeedWrapper>
        <Header title={activeCourse.title} />
      </FeedWrapper>
      <StickyWrapper>
        <UserProgress
          activeCourse={{ title: `${activeCourse.title}`, imageSrc: `${activeCourse.imageSrc}` }}
          hearts={5}
          points={100}
          hasActiveSubscription={false}
        />
      </StickyWrapper>
    </div>
  );
};

export default LearnPage;
