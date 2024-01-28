"use client";

import clsx from "clsx";
import React from "react";
import { useFormState, useFormStatus } from "react-dom";
import { FormState, createTodo, deleteTodo } from "./actions";

export function AddForm() {
  // @ts-ignore
  const [formState, formAction] = useFormState(createTodo, {
    text: "",
    errors: {
      text: undefined,
    },
  } as FormState);

  return (
    <form action={formAction} className="text-left flex flex-col">
      <label className="block font-bold mb-2" htmlFor="todo">
        Enter Task
      </label>
      <input
        defaultValue={formState.todo as string}
        className="p-1.5 rounded focus:shadow-none focus:ring-0 focus:border-none border-gray-500 mb-2"
        type="text"
        id="todo"
        name="todo"
        required
      />
      <SubmitButton>Submit</SubmitButton>
      <p aria-live="polite" className="sr-only" role="status">
        {formState.errors.status}
      </p>
    </form>
  );
}

function SubmitButton({ children }: { children: React.ReactNode }) {
  const { pending } = useFormStatus();

  return (
    <button
      className={clsx(
        "bg-black text-white text-lg p-2 rounded",
        pending && "opacity-50"
      )}
      type="submit"
      aria-disabled={pending}
      disabled={pending}
    >
      {children}
    </button>
  );
}

export function DeleteForm({ _id }: { _id: string }) {
  return (
    <form action={deleteTodo}>
      <input type="hidden" name="_id" value={_id} />
      <SubmitButton>Delete</SubmitButton>
    </form>
  );
}
