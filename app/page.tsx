import { getTodos } from "./actions";
import { AddForm, DeleteForm } from "./form";

export default async function Home() {
  const todos = await getTodos();

  return (
    <div className="flex flex-col items-center justify-center min-h-screen py-2 bg-[#F1F3F1] text-black">
      <main className="flex flex-col items-center justify-center flex-1 px-4 sm:px-20 text-center">
        <AddForm />
        <ul className="mt-3 space-y-2 max-w-[232px] w-full">
          {todos.map(({ _id, todo }, i) => (
            <li
              className="w-full flex items-center border-black/20 border rounded justify-between"
              key={_id}
            >
              <p className="p-2">{todo}</p> <DeleteForm _id={_id} />
            </li>
          ))}
        </ul>
      </main>
    </div>
  );
}
