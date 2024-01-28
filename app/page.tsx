import { getTodos } from "./actions";
import { TodoForm } from "./form";

export default async function Home() {
  const todos = await getTodos();

  return (
    <div className="flex flex-col items-center justify-center min-h-screen py-2 bg-[#F1F3F1] text-black">
      <main className="flex flex-col items-center justify-center flex-1 px-4 sm:px-20 text-center">
        <TodoForm todos={todos} />
      </main>
    </div>
  );
}
