import { db } from "@/db/drizzle";
import { units } from "@/db/schema";
import { getIsAdmin } from "@/lib/admin";
import { eq } from "drizzle-orm";
import { NextRequest, NextResponse } from "next/server";

export const GET = async (
  req: Request,
  { params }: { params: { unitId: number } }
) => {
  const isAdmin = await getIsAdmin();

  if (!isAdmin) {
    return new NextResponse("Unauthorized");
  }

  const { unitId } = await params;

  const data = await db.query.units.findFirst({
    where: eq(units.id, unitId),
  });

  return NextResponse.json(data);
};

export const PUT = async (
  req: Request,
  { params }: { params: { unitId: number } }
) => {
  const isAdmin = await getIsAdmin();

  const body = await req.json();

  if (!isAdmin) {
    return new NextResponse("Unauthorized");
  }

  const { unitId } = await params;

  const data = await db
    .update(units)
    .set({
      ...body,
    })
    .where(eq(units.id, unitId))
    .returning();

  return NextResponse.json(data[0]);
};

export const DELETE = async (
  req: NextRequest,
  { params }: { params: { unitId: number } }
) => {
  const isAdmin = await getIsAdmin();

  if (!isAdmin) {
    return new NextResponse("Unauthorized");
  }

  const { unitId } = await params;

  const data = await db
    .delete(units)
    .where(eq(units.id, unitId))
    .returning();

  return NextResponse.json(data[0]);
};
