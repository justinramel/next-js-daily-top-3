import { prisma } from "@/lib/prisma";
import { NextRequest, NextResponse } from "next/server";

const createTop3 = async (data: string[]) => {
  return await prisma.top3.create({
    data: {
      todos: {
        create: data.map((title) => ({ title, complete: false })),
      },
    },
  });
};

export async function POST(req: NextRequest) {
  const top3 = await req.json();
  const response = await createTop3(top3);
  return NextResponse.json(response);
}
