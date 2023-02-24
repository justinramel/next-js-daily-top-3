"use client";

import { FormEvent } from "react";
import { useRouter } from "next/navigation";
import { CheckBox } from "@/app/check-box";

export const NewTop3 = () => {
  const router = useRouter();

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const formData = new FormData(event.currentTarget);
    const todos = formData.getAll("todo");

    await fetch(`/api/top3`, {
      method: "POST",
      body: JSON.stringify(todos),
    });

    router.refresh();
  };

  return (
    <div className="space-y-6 sm:px-6 lg:col-span-9 lg:px-0">
      <div className="shadow sm:overflow-hidden sm:rounded-md">
        <div className="bg-white py-6 px-4 sm:p-6">
          <form onSubmit={handleSubmit} className="flex flex-col gap-4">
            <div className="flex flex-row gap-4 items-center">
              <label>
                <CheckBox label="1" complete={false} />
              </label>
              <input
                type="text"
                name="todo"
                autoFocus
                className="block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm"
              />
            </div>
            <div className="flex flex-row gap-4 items-center">
              <label>
                <CheckBox label="2" complete={false} />
              </label>
              <input
                type="text"
                name="todo"
                className="block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm"
              />
            </div>
            <div className="flex flex-row gap-4 items-center">
              <label>
                <CheckBox label="3" complete={false} />
              </label>
              <input
                type="text"
                name="todo"
                className="block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm"
              />
            </div>
            <div className="text-right">
              <button
                type="submit"
                className="inline-flex items-center rounded border border-transparent bg-blue-600 px-2.5 py-1.5 text-xs font-medium text-white shadow-sm hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
              >
                Create
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};
