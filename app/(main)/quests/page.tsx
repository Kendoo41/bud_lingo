import FeedWrapper from "@/components/FeedWrapper";
import StickyWrapper from "@/components/StickyWrapper";
import UserProgress from "@/components/UserProgress";
import { getUserProgress } from "@/db/queries";
import { redirect } from "next/navigation";
import Image from "next/image";
import { Items } from "./items";
import { use } from "react";
import { Divide } from "lucide-react";
import { Progress } from "@/components/ui/progress";

//==================================================
// NOTE: Important technique for testing data
//==================================================
// Implement data out side of page tsx, above the page
// STATIC DATA
//==================================================
const quests = [
  {
    title: "Earn 20XP",
    value: 20,
  },
  {
    title: "Earn 50XP",
    value: 50,
  },
  {
    title: "Earn 100XP",
    value: 100,
  },
  {
    title: "Earn 500XP",
    value: 500,
  },
  {
    title: "Earn 1000XP",
    value: 1000,
  },
];

const QuestsPage = async () => {
  const userProgressData = getUserProgress();
  const [userProgress] = await Promise.all([userProgressData]);

  if (!userProgress || !userProgress.activeCourse) {
    redirect("/course");
  }

  return (
    <div className="flex flex-row-reverse gap-[48px] px-6">
      <StickyWrapper>
        <UserProgress
          activeCourse={userProgress.activeCourse}
          hearts={userProgress.hearts}
          points={userProgress.points}
          hasActiveSubscription={false}
        />
      </StickyWrapper>
      <FeedWrapper>
        <div className="w-full flex flex-col items-center">
          <Image src="/quests.svg" alt="quests" height={90} width={90} />
        </div>
        <h1 className="text-center font-bold text-neutral-800 text-2xl my-6">
          Quests
        </h1>
        <p className="text-muted-foreground text-center text-lg mb-6">
          {" "}
          Complete quests by earning points{" "}
        </p>
        <ul className="w-full mt-20">
          {quests.map((quest) => {
            const progress = (userProgress.points / quest.value) * 100;
            return (
              <div
                className="flex items-center w-full p-4 gap-x-4 border-t-3 border-slate-300"
                key={quest.title}
              >
                <Image
                  src={"/points.svg"}
                  alt={"points"}
                  width={60}
                  height={60}
                />
                <div className="flex flex-col gap-y-2 w-full">
                  {" "}
                  <p className="text-neutral-700 text-xl font-bold">
                    {quest.title}
                  </p>{" "}
                </div>
              <Progress value={progress} className="h-3"/>
              </div>
            );
          })}
        </ul>
      </FeedWrapper>
    </div>
  );
};

export default QuestsPage;
