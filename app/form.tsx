"use client";

import clsx from "clsx";
import React, { useEffect, useOptimistic, useRef, useTransition } from "react";
import { useFormStatus } from "react-dom";
import { deleteTodo, saveTodo } from "./actions";

export type Todo = {
  _id?: string;
  todo: string;
};

export type TodoState = {
  newTodo: Todo;
  updatedTodo?: Todo;
  pending: boolean;
};

export function TodoForm({ todos }: { todos: Todo[] }) {
  let formRef = useRef<HTMLFormElement>(null);
  let [isPending, startTransition] = useTransition();

  let [state, mutate] = useOptimistic(
    { todos, pending: false },
    function createReducer(state, newState: TodoState) {
      if (newState.newTodo) {
        return {
          todos: [...state.todos, newState.newTodo],
          pending: newState.pending,
        };
      } else {
        return state;
      }
    }
  );

  useEffect(() => {
    function hanlder(e: BeforeUnloadEvent) {
      if (!state.pending) return;
      e.preventDefault();
    }
    window.addEventListener("beforeunload", hanlder);
    return () => {
      window.removeEventListener("beforeunload", hanlder);
    };
  }, [state.pending]);

  let todoStub = {
    todo: "", // will used value from form
  };

  let saveWithNewTodo = saveTodo.bind(null, todoStub);

  console.log(state);

  return (
    <>
      <form
        action={saveWithNewTodo}
        onSubmit={(e) => {
          e.preventDefault();
          const formData = new FormData(e.currentTarget);
          const newTodo = {
            todo: formData.get("todo") as string,
          };
          formRef.current?.reset();
          // @ts-ignore
          startTransition(async () => {
            mutate({
              newTodo,
              pending: true,
            });
            await saveTodo(newTodo, formData);
          });
        }}
        className="text-left flex flex-col"
      >
        <label className="block font-bold mb-2" htmlFor="todo">
          Enter Task
        </label>
        <input
          disabled={state.pending}
          className="p-1.5 rounded focus:shadow-none focus:ring-0 focus:border-none border-gray-500 mb-2"
          type="text"
          id="todo"
          name="todo"
          required
        />
        <SubmitButton>Submit</SubmitButton>
      </form>
      <ul className="mt-3 space-y-2 max-w-[232px] w-full">
        {state.todos.map(({ _id, todo }, i) => (
          <li
            className="w-full flex items-center border-black/20 border rounded justify-between"
            key={i}
          >
            <p className="p-2">{todo}</p> <DeleteForm _id={_id!} />
          </li>
        ))}
      </ul>
    </>
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
