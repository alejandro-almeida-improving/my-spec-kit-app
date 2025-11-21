import Image from "next/image";
import TodoList from "./components/todo/TodoList";

export default function Home() {
  return (
    <div className="flex min-h-screen items-center justify-center bg-zinc-50 font-sans dark:bg-black">
      <main className="flex min-h-screen w-full max-w-3xl flex-col items-center justify-start py-12 px-6 bg-white dark:bg-black sm:items-start">
        <div className="w-full">
          <header className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <Image className="dark:invert" src="/next.svg" alt="Next.js logo" width={80} height={18} priority />
              <h1 className="text-xl font-semibold">Todo List (MVP)</h1>
            </div>
          </header>

          <section className="mt-6">
            <TodoList />
          </section>
        </div>
      </main>
    </div>
  );
}
