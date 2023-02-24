"use client";

import { useState, useTransition } from "react";
import { useRouter } from "next/navigation";
import { Todo as TodoType } from "@prisma/client";
import { CheckBox } from "@/app/check-box";

type Props = {
  todo: TodoType;
  index: number;
};

export const Todo = ({ todo, index }: Props) => {
  const router = useRouter();
  const [isPending, startTransition] = useTransition();
  const [isFetching, setIsFetching] = useState(false);

  // Create inline loading UI
  const isMutating = isFetching || isPending;

  async function handleChange() {
    setIsFetching(true);
    // Mutate external data source
    await fetch(`/api/todo/${todo.id}`, {
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
    <div className="relative flex" style={{ opacity: !isMutating ? 1 : 0.7 }}>
      <div className="flex items-center">
        <label htmlFor={`todo-${todo.id}`}>
          <CheckBox label={index.toString()} complete={todo.complete} />
        </label>
      </div>
      <div className="ml-3 text-lg flex items-center">
        <label
          htmlFor={`todo-${todo.id}`}
          className={`font-medium text-gray-700 ${
            todo.complete ? "line-through" : ""
          }`}
        >
          {todo.title}
        </label>
        <input
          id={`todo-${todo.id}`}
          type="checkbox"
          checked={todo.complete}
          onChange={handleChange}
          disabled={isPending}
          className="hidden"
        />
      </div>
    </div>
  );
};
