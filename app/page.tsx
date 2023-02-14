import { prisma } from "@/lib/prisma";
import { NewTop3 } from "@/app/new-top-3";
import { TodoList } from "@/app/todo-list";

async function getData() {
  return await prisma.top3.findFirst({
    where: {
      createdAt: {
        equals: new Date(),
      },
    },
    include: {
      todos: {
        orderBy: {
          id: "asc",
        },
      },
    },
  });
}

export default async function Home() {
  const top3 = await getData();

  return (
    <div className="mx-auto max-w-2xl text-center p-16">
      <h1 className="text-4xl font-bold text-gray-900">Top 3</h1>

      <div className="mt-8">
        {top3?.todos?.length ? <TodoList todos={top3.todos} /> : <NewTop3 />}
      </div>
    </div>
  );
}
