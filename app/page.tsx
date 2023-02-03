import styles from "./page.module.css";
import { prisma } from "@/lib/prisma";
import { NewTop3 } from "@/app/new-top-3";
import { Todo } from "@/app/todo";

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
    <main className={styles.main}>
      <h1 className={styles.h1}>Top 3</h1>

      {top3?.todos?.length ? (
        <ol>
          {top3?.todos.map((todo) => (
            <Todo key={todo.id} todo={todo} />
          ))}
        </ol>
      ) : (
        <NewTop3 />
      )}
    </main>
  );
}
