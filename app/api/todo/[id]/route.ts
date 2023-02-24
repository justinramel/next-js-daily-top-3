import { prisma } from "@/lib/prisma";
import { NextRequest, NextResponse } from "next/server";

const updateTodo = async (id: number, complete: boolean) => {
  return await prisma.todo.update({
    where: { id },
    data: {
      complete,
    },
  });
};

export async function PUT(req: NextRequest, { params: { id = 0 } }) {
  const todo = await req.json();
  const response = await updateTodo(Number(id), todo.complete);
  return NextResponse.json(response);
}
