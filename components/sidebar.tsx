import { cn } from "@/lib/utils";
import Link from "next/link";
import Image from "next/image";
import SidebarItem from "./SidebarItem";
import { ClerkLoaded, ClerkLoading, UserButton } from "@clerk/nextjs";
import { Loader } from "lucide-react";

type Props = {
  className?: string;
};
const Sidebar = ({ className }: Props) => {
  return (
    <div
      className={cn(
        "flex h-full lg:w-[256px] lg:fixed left-0 top-0 px-4 border-r-2 flex-col",
        className
      )}
    >
      <Link href="/learn">
        <div className="pt-8 pl-4 pb-7 flex items-center gap-x-3">
          <Image src="/mascot.svg" alt="Mascot" height={40} width={40} />
          <h1 className="text-2xl font-extrabold text-green-600 ">BUD</h1>
        </div>
      </Link>
      <div className="flex flex-col gap-y-2 flex-1">
        <SidebarItem
          label="Learn"
          href="/learn"
          iconSrc="/learn.svg"
        ></SidebarItem>
        <SidebarItem
          label="LeaderBoard"
          href="/leaderboard"
          iconSrc="/leaderboard.svg"
        ></SidebarItem>
        <SidebarItem
          label="quests"
          href="/quests"
          iconSrc="/quests.svg"
        ></SidebarItem>
        <SidebarItem
          label="shop"
          href="/shop"
          iconSrc="/shop.svg"
        ></SidebarItem>
      </div>
        <SidebarItem
          label="back"
          href="/"
          iconSrc="/logout.svg"
        ></SidebarItem>
    </div>
  );
};

export default Sidebar;
