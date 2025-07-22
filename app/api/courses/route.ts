import { NextResponse } from "next/server";

import { db } from "@/db/drizzle";
import { courses } from "@/db/schema";

export const GET = async () => {
  const data = await db.query.courses.findMany();
  // const data = [
  //   { id: 1, title: "Course 1" },
  //   { id: 2, title: "Course 2" },
  // ];
  return NextResponse.json(data);
};
