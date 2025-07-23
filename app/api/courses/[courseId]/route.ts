import { db } from "@/db/drizzle";
import { courses } from "@/db/schema";
import { getIsAdmin } from "@/lib/admin";
import { eq } from "drizzle-orm";
import { NextRequest, NextResponse } from "next/server";

export const GET = async (
  req: Request,
  { params }: { params: { courseId: number } }
) => {
  const isAdmin = await getIsAdmin();

  if (!isAdmin) {
    return new NextResponse("Unauthorized");
  }

  const { courseId } = await params;

  const data = await db.query.courses.findFirst({
    where: eq(courses.id, courseId),
  });

  return NextResponse.json(data);
};

export const PUT = async (
  req: Request,
  { params }: { params: { courseId: number } }
) => {
  const isAdmin = await getIsAdmin();

  const body = await req.json();

  if (!isAdmin) {
    return new NextResponse("Unauthorized");
  }

  const { courseId } = await params;

  const data = await db
    .update(courses)
    .set({
      ...body,
    })
    .where(eq(courses.id, courseId))
    .returning();

  return NextResponse.json(data[0]);
};

export const DELETE = async (
  req: NextRequest,
  { params }: { params: { courseId: number } }
) => {
  const isAdmin = await getIsAdmin();

  if (!isAdmin) {
    return new NextResponse("Unauthorized");
  }

  const { courseId } = await params;

  const data = await db
    .delete(courses)
    .where(eq(courses.id, courseId))
    .returning();

  return NextResponse.json(data[0]);
};
