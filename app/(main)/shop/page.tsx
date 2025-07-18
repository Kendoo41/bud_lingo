import FeedWrapper from "@/components/FeedWrapper";
import StickyWrapper from "@/components/StickyWrapper";
import UserProgress from "@/components/UserProgress";
import { getUserProgress } from "@/db/queries";
import { redirect } from "next/navigation";
import Image from "next/image";
import { Items } from "./items";
import { use } from "react";

const ShopPage = async () => {
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
          <Image src="/shop.svg" alt="shop" height={90} width={90} />
        </div>
        <h1 className="text-center font-bold text-neutral-800 text-2xl my-6">
          Shop
        </h1>
        <p className="text-muted-foreground text-center text-lg mb-6">
          {" "}
          Spend your points on cool stuff{" "}
        </p>
        <Items
          hearts={userProgress.hearts}
          points={userProgress.points}
          hasActiveSubscription={false} //TODO: add subscription
        />
      </FeedWrapper>
    </div>
  );
};

export default ShopPage;
