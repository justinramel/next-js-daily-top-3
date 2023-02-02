import Image from "next/image";
import styles from "./page.module.css";
import { prisma } from "@/lib/prisma";

async function getData() {
  const top3 = await prisma.top3.findFirst({
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

  return top3;
}

export default async function Home() {
  const top3 = await getData();

  return (
    <main className={styles.main}>
      <h1 className={styles.h1}>Top 3</h1>
      <ol>
        {top3?.todos.map((todo) => (
          <li key={todo.id} className={styles.li}>
            {todo.title}
          </li>
        ))}
      </ol>
    </main>
  );
}
