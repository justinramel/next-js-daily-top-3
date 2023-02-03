import type { NextApiRequest, NextApiResponse } from "next";
import { prisma } from "@/lib/prisma";

const updateTodo = async (id: number, complete: boolean) => {
  return await prisma.todo.update({
    where: { id },
    data: {
      complete,
    },
  });
};

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method !== "PUT") {
    res.status(405).send({ message: "Only PUT requests allowed" });
    return;
  }

  const id = Number(req.query.id);
  const todo = JSON.parse(req.body);
  const response = await updateTodo(id, todo.complete);

  res.status(200).json(response);
}
