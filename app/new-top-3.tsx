"use client";

import { FormEvent } from "react";
import { useRouter } from "next/navigation";

export const NewTop3 = () => {
  const router = useRouter();

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const formData = new FormData(event.currentTarget);
    const todos = formData.getAll("todo");

    await fetch(`/api/top3/create`, {
      method: "POST",
      body: JSON.stringify(todos),
    });

    router.refresh();
  };

  return (
    <form onSubmit={handleSubmit}>
      <label>1.</label>
      <input type="text" name="todo" />
      <br />
      <label>2.</label>
      <input type="text" name="todo" />
      <br />
      <label>3.</label>
      <input type="text" name="todo" />
      <br />
      <button type="submit">Create</button>
    </form>
  );
};
