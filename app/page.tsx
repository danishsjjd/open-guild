"use client";

import { FormEvent, useEffect, useMemo, useState } from "react";

type Filter = "all" | "active" | "completed";

type Todo = {
  id: string;
  title: string;
  completed: boolean;
  createdAt: number;
};

const STORAGE_KEY = "devops.todos.v1";

export default function Home() {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [draft, setDraft] = useState("");
  const [filter, setFilter] = useState<Filter>("all");
  const [editingId, setEditingId] = useState<string | null>(null);
  const [editingTitle, setEditingTitle] = useState("");
  const [hasLoaded, setHasLoaded] = useState(false);

  useEffect(() => {
    try {
      const stored = window.localStorage.getItem(STORAGE_KEY);

      if (stored) {
        const parsed = JSON.parse(stored) as Todo[];
        setTodos(Array.isArray(parsed) ? parsed : []);
      }
    } finally {
      setHasLoaded(true);
    }
  }, []);

  useEffect(() => {
    if (!hasLoaded) {
      return;
    }

    window.localStorage.setItem(STORAGE_KEY, JSON.stringify(todos));
  }, [hasLoaded, todos]);

  const activeCount = todos.filter((todo) => !todo.completed).length;
  const completedCount = todos.length - activeCount;

  const filteredTodos = useMemo(() => {
    if (filter === "active") {
      return todos.filter((todo) => !todo.completed);
    }

    if (filter === "completed") {
      return todos.filter((todo) => todo.completed);
    }

    return todos;
  }, [filter, todos]);

  function addTodo(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();

    const title = draft.trim();
    if (!title) {
      return;
    }

    setTodos((current) => [
      {
        id: `${Date.now()}-${Math.random().toString(36).slice(2)}`,
        title,
        completed: false,
        createdAt: Date.now(),
      },
      ...current,
    ]);
    setDraft("");
    setFilter("all");
  }

  function toggleTodo(id: string) {
    setTodos((current) =>
      current.map((todo) =>
        todo.id === id ? { ...todo, completed: !todo.completed } : todo,
      ),
    );
  }

  function removeTodo(id: string) {
    setTodos((current) => current.filter((todo) => todo.id !== id));
  }

  function beginEdit(todo: Todo) {
    setEditingId(todo.id);
    setEditingTitle(todo.title);
  }

  function saveEdit(id: string) {
    const title = editingTitle.trim();

    if (!title) {
      removeTodo(id);
      setEditingId(null);
      return;
    }

    setTodos((current) =>
      current.map((todo) => (todo.id === id ? { ...todo, title } : todo)),
    );
    setEditingId(null);
  }

  return (
    <main className="min-h-screen bg-[#f6f7f9] text-[#1b1f24]">
      <section className="mx-auto flex min-h-screen w-full max-w-5xl flex-col gap-8 px-4 py-6 sm:px-6 lg:px-8">
        <header className="flex flex-col gap-5 border-b border-[#dfe3e8] pb-6 sm:flex-row sm:items-end sm:justify-between">
          <div className="space-y-2">
            <p className="text-sm font-semibold uppercase tracking-[0.16em] text-[#396a54]">
              Local workspace!
            </p>
            <h1 className="text-4xl font-semibold tracking-normal text-[#111418] sm:text-5xl">
              Todo App
            </h1>
            <p className="max-w-2xl text-base leading-7 text-[#5a6470]">
              Tasks are saved in this browser with localStorage and survive
              refreshes.
            </p>
          </div>

          <div className="grid grid-cols-3 gap-2 rounded-lg border border-[#dfe3e8] bg-white p-2 shadow-sm">
            <Stat label="Total" value={todos.length} />
            <Stat label="Active" value={activeCount} />
            <Stat label="Done" value={completedCount} />
          </div>
        </header>

        <form
          onSubmit={addTodo}
          className="grid gap-3 rounded-lg border border-[#dfe3e8] bg-white p-3 shadow-sm sm:grid-cols-[1fr_auto]"
        >
          <label className="sr-only" htmlFor="new-task">
            New task
          </label>
          <input
            id="new-task"
            value={draft}
            onChange={(event) => setDraft(event.target.value)}
            placeholder="Add a task"
            className="h-12 min-w-0 rounded-md border border-[#ccd3da] bg-white px-4 text-base outline-none transition focus:border-[#2f6f56] focus:ring-4 focus:ring-[#2f6f56]/15"
          />
          <button
            type="submit"
            className="h-12 rounded-md bg-[#1e6048] px-5 text-sm font-semibold text-white transition hover:bg-[#174c3a] focus:outline-none focus:ring-4 focus:ring-[#1e6048]/20"
          >
            Add task
          </button>
        </form>

        <section className="flex flex-1 flex-col overflow-hidden rounded-lg border border-[#dfe3e8] bg-white shadow-sm">
          <div className="flex flex-col gap-3 border-b border-[#e4e7eb] p-3 sm:flex-row sm:items-center sm:justify-between">
            <div className="flex rounded-md border border-[#d8dee4] bg-[#f8fafb] p-1">
              {(["all", "active", "completed"] as const).map((item) => (
                <button
                  key={item}
                  type="button"
                  onClick={() => setFilter(item)}
                  className={`h-9 rounded px-3 text-sm font-medium capitalize transition ${
                    filter === item
                      ? "bg-white text-[#111418] shadow-sm"
                      : "text-[#67727e] hover:text-[#1b1f24]"
                  }`}
                >
                  {item}
                </button>
              ))}
            </div>

            <button
              type="button"
              onClick={() =>
                setTodos((current) => current.filter((todo) => !todo.completed))
              }
              disabled={completedCount === 0}
              className="h-9 rounded-md border border-[#d8dee4] px-3 text-sm font-medium text-[#5a6470] transition hover:border-[#b6c0ca] hover:text-[#1b1f24] disabled:cursor-not-allowed disabled:opacity-45"
            >
              Clear completed
            </button>
          </div>

          {filteredTodos.length > 0 ? (
            <ul className="divide-y divide-[#edf0f2]">
              {filteredTodos.map((todo) => (
                <li
                  key={todo.id}
                  className="grid min-h-16 grid-cols-[auto_1fr_auto] items-center gap-3 px-3 py-3 sm:px-4"
                >
                  <button
                    type="button"
                    onClick={() => toggleTodo(todo.id)}
                    aria-label={
                      todo.completed ? "Mark task active" : "Mark task done"
                    }
                    className={`flex size-6 items-center justify-center rounded border transition ${
                      todo.completed
                        ? "border-[#1e6048] bg-[#1e6048] text-white"
                        : "border-[#aeb8c2] text-transparent hover:border-[#1e6048]"
                    }`}
                  >
                    <CheckIcon />
                  </button>

                  {editingId === todo.id ? (
                    <form
                      onSubmit={(event) => {
                        event.preventDefault();
                        saveEdit(todo.id);
                      }}
                      className="min-w-0"
                    >
                      <input
                        value={editingTitle}
                        onChange={(event) =>
                          setEditingTitle(event.target.value)
                        }
                        onBlur={() => saveEdit(todo.id)}
                        onKeyDown={(event) => {
                          if (event.key === "Escape") {
                            setEditingId(null);
                          }
                        }}
                        autoFocus
                        className="h-10 w-full min-w-0 rounded-md border border-[#ccd3da] px-3 outline-none focus:border-[#2f6f56] focus:ring-4 focus:ring-[#2f6f56]/15"
                      />
                    </form>
                  ) : (
                    <button
                      type="button"
                      onClick={() => beginEdit(todo)}
                      className={`min-w-0 text-left text-base leading-6 ${
                        todo.completed
                          ? "text-[#8a949e] line-through"
                          : "text-[#1b1f24]"
                      }`}
                    >
                      {todo.title}
                    </button>
                  )}

                  <button
                    type="button"
                    onClick={() => removeTodo(todo.id)}
                    aria-label={`Delete ${todo.title}`}
                    className="flex size-9 items-center justify-center rounded-md border border-transparent text-[#7c8792] transition hover:border-[#f0c4bd] hover:bg-[#fff4f1] hover:text-[#a73424]"
                  >
                    <TrashIcon />
                  </button>
                </li>
              ))}
            </ul>
          ) : (
            <div className="flex flex-1 flex-col items-center justify-center gap-2 px-6 py-20 text-center">
              <h2 className="text-xl font-semibold text-[#1b1f24]">
                {todos.length === 0 ? "No tasks yet" : "Nothing matches"}
              </h2>
              <p className="max-w-sm text-sm leading-6 text-[#68737f]">
                {todos.length === 0
                  ? "Add your first task above to start tracking work in this browser."
                  : "Switch filters to see the rest of your tasks."}
              </p>
            </div>
          )}
        </section>
      </section>
    </main>
  );
}

function Stat({ label, value }: { label: string; value: number }) {
  return (
    <div className="min-w-16 rounded-md bg-[#f8fafb] px-3 py-2 text-center">
      <div className="text-xl font-semibold text-[#111418]">{value}</div>
      <div className="text-xs font-medium uppercase tracking-[0.12em] text-[#68737f]">
        {label}
      </div>
    </div>
  );
}

function CheckIcon() {
  return (
    <svg aria-hidden="true" viewBox="0 0 20 20" className="size-4" fill="none">
      <path
        d="m5 10 3 3 7-7"
        stroke="currentColor"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth="2"
      />
    </svg>
  );
}

function TrashIcon() {
  return (
    <svg aria-hidden="true" viewBox="0 0 20 20" className="size-4" fill="none">
      <path
        d="M4 6h12M8 6V4h4v2m-6 0 1 10h6l1-10"
        stroke="currentColor"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth="1.8"
      />
    </svg>
  );
}
