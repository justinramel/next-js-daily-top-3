// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from "next";
import { prisma } from "@/lib/prisma";

const createTop3 = async (data: string[]) => {
  return await prisma.top3.create({
    data: {
      todos: {
        create: data.map((title) => ({ title, complete: false })),
      },
    },
  });
};

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method !== "POST") {
    res.status(405).send({ message: "Only POST requests allowed" });
    return;
  }

  const top3 = JSON.parse(req.body);
  const response = await createTop3(top3);

  res.status(200).json(response);
}
