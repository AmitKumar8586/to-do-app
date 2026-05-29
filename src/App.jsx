import { useEffect, useState } from "react";

function App() {
  const [todos, setTodos] = useState([]);
  const [input, setInput] = useState("");

  // Fetch todos
  const fetchTodos = async () => {
    const res = await fetch("http://localhost:5000/todos");
    const data = await res.json();

    setTodos(data);
  };

  useEffect(() => {
    fetchTodos();
  }, []);

  // Add todo
  const addTodo = async () => {
    if (!input.trim()) return;

    const res = await fetch("http://localhost:5000/todos", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        text: input,
      }),
    });

    const newTodo = await res.json();

    setTodos([...todos, newTodo]);
    setInput("");
  };

  // Delete todo
  const deleteTodo = async (id) => {
    await fetch(`http://localhost:5000/todos/${id}`, {
      method: "DELETE",
    });

    setTodos(todos.filter((todo) => todo._id !== id));
  };

  return (
    <section className="min-h-screen w-full flex items-center justify-center bg-gradient-to-br from-slate-900 via-black to-slate-800 px-4">
      <div
        className="
          w-full
          max-w-2xl
          backdrop-blur-lg
          bg-white/10
          border
          border-white/20
          rounded-3xl
          shadow-2xl
          p-5
          sm:p-8
        "
      >
        <h1
          className="
            text-3xl
            sm:text-4xl
            md:text-5xl
            font-bold
            text-center
            text-white
            mb-8
            tracking-wide
          "
        >
          Todo App
        </h1>

        {/* Input Section */}
        <div className="flex flex-col sm:flex-row gap-4">
          <input
            type="text"
            placeholder="Add a new todo..."
            value={input}
            onChange={(e) => setInput(e.target.value)}
            className="
              flex-1
              px-5
              py-4
              rounded-2xl
              bg-white/10
              border
              border-white/20
              text-white
              placeholder-gray-300
              focus:outline-none
              focus:ring-2
              focus:ring-cyan-400
              text-sm
              sm:text-base
            "
          />

          <button
            onClick={addTodo}
            className="
              w-full
              sm:w-auto
              px-7
              py-4
              rounded-2xl
              bg-cyan-500
              hover:bg-cyan-400
              transition-all
              duration-300
              text-white
              font-semibold
              shadow-lg
            "
          >
            Add
          </button>
        </div>

        {/* Todo List */}
        <div className="mt-8 space-y-4">
          {todos.map((todo) => (
            <div
              key={todo._id}
              className="
                flex
                flex-col
                sm:flex-row
                sm:items-center
                sm:justify-between
                gap-3
                bg-white/10
                border
                border-white/10
                p-4
                rounded-2xl
              "
            >
              <p className="text-white text-base sm:text-lg break-words">
                {todo.text}
              </p>

              <button
                onClick={() => deleteTodo(todo._id)}
                className="
                  text-red-400
                  hover:text-red-300
                  transition
                  self-start
                  sm:self-auto
                "
              >
                Delete
              </button>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

export default App;
