"use client";

import { useState, useTransition } from "react";
import { useRouter } from "next/navigation";
import { Todo as TodoType } from "@prisma/client";

type Props = {
  todo: TodoType;
};

export const Todo = ({ todo }: Props) => {
  const router = useRouter();
  const [isPending, startTransition] = useTransition();
  const [isFetching, setIsFetching] = useState(false);

  // Create inline loading UI
  const isMutating = isFetching || isPending;

  async function handleChange() {
    setIsFetching(true);
    // Mutate external data source
    await fetch(`/api/todo/${todo.id}/update`, {
      method: "PUT",
      body: JSON.stringify({ complete: !todo.complete }),
    });
    setIsFetching(false);

    startTransition(() => {
      // Refresh the current route and fetch new data from the server without
      // losing client-side browser or React state.
      router.refresh();
    });
  }
  return (
    <li style={{ opacity: !isMutating ? 1 : 0.7 }}>
      <input
        id={`todo-${todo.id}`}
        type="checkbox"
        checked={todo.complete}
        onChange={handleChange}
        disabled={isPending}
      />
      <label htmlFor={`todo-${todo.id}`}>{todo.title}</label>
    </li>
  );
};