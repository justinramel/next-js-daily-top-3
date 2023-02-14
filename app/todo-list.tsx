"use client";

import { Todo as TodoType } from "@prisma/client";
import { Todo } from "@/app/todo";

type Props = {
  todos: TodoType[];
};

export const TodoList = ({ todos }: Props) => {
  return (
    <div className="space-y-6 sm:px-6 lg:col-span-9 lg:px-0">
      <div className="shadow sm:overflow-hidden sm:rounded-md">
        <div className="bg-white py-6 px-4 sm:p-6">
          <fieldset className="space-y-5 flex flex-col gap-4">
            {todos.map((todo, index) => (
              <Todo key={todo.id} todo={todo} index={index + 1} />
            ))}
          </fieldset>
        </div>
      </div>
    </div>
  );
};
