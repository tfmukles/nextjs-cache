"use server";

import { revalidatePath, unstable_cache } from "next/cache";
import { Todo as TTodo } from "../form";
import { connect } from "../libs/connect";
import { Todo } from "../models/todo.model";

export const getTodos = unstable_cache(async () => {
  connect();
  const todos = await Todo.find();
  return todos;
});

export type FormState = {
  todo: string;
  errors: {
    status: string | undefined;
  };
};

export async function createTodo(previousState: FormState, formData: FormData) {
  const { todo } = Object.fromEntries(formData.entries());
  try {
    connect();
    await Todo.create({ todo });
    revalidatePath("/");
    return {
      todo: "",
      errors: {
        status: "",
      },
    };
  } catch (error) {
    return {
      todo,
      errors: {
        status: error instanceof Error ? error.message : undefined,
      },
    };
  }
}

export async function deleteTodo(formData: FormData) {
  const { _id } = Object.fromEntries(formData.entries());
  try {
    connect();
    await Todo.deleteOne({ _id });
    revalidatePath("/");
  } catch (error) {
    console.log(error);
  }
}

export async function saveTodo(todo: TTodo, formData: FormData) {
  let newTodo = {
    ...todo,
    todo: formData.get("todo") as string,
  };

  connect();
  await Todo.create({ ...newTodo });
  revalidatePath("/");
}
