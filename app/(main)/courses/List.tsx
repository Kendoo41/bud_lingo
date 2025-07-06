"use client";

import { courses, userProgress } from "@/db/schema";
import { useRouter } from "next/navigation";
import { useTransition, useState } from "react";
import Card from "./Card";
import { upsertUserProgress } from "@/actions/user-progress";
import { toast } from "sonner";

type Props = {
  courses: (typeof courses.$inferSelect)[];
  activeCourseId: typeof userProgress.$inferSelect.activeCourseId;
};

export const List = ({ courses, activeCourseId }: Props) => {
  const router = useRouter();
  const [pending, startTransition] = useTransition();
  const [loadingId, setLoadingId] = useState<number | null>(null);

  const onClick = (id: number) => {
    if (pending) return;
    setLoadingId(id);

    if (id === activeCourseId) {
      return router.push("/learn");
    }

    startTransition(async () => {
      try {
        await upsertUserProgress(id);
      } catch (err: any) {
        if (err.message !== "NEXT_REDIRECT") {
          toast.error(err instanceof Error ? err.message : String(err));
        }
      }
    });
  };

  return (
    <div className="pt-6 grid gap-2 grid-cols-2 lg:grid-cols-[repeat(auto-fill,minmax(210px,1fr))]">
      {courses.map((course) => (
        <Card
          key={course.id}
          id={course.id}
          title={course.title}
          imageSrc={course.imageSrc}
          onClick={onClick}
          disabled={pending && loadingId !== course.id}
          active={course.id === activeCourseId}
          isLoading={pending && loadingId === course.id}
        />
      ))}
    </div>
  );
};
