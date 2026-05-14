import React, { useState } from "react";

const App = () => {
  const [task, setTask] = useState([]);
  const [input, setInput] = useState("");
  console.log(input);

  const handleSubmit = () => {
    if (input.trim() === "") {
      return;
    }
    let find = task.length + 1;

    let newTask = {
      id: find,
      task: input,
      status: false,
    };

    setInput("");
    setTask([...task, newTask]);
    console.log(task);
  };
  console.log(task);

  const handleDelete = (id) => {
    console.log(id);
    const deleteTask = task.filter((tasks) => {
      return tasks.id !== id;
    });
    console.log(deleteTask);
    setTask(deleteTask);
  };

  const handleUpdate = (id) => {
    const taskUpdate = task.map((item) => {
      if (item.id === id) {
        return { ...item, status: !item.status };
      }
      return item;
    });
    setTask(taskUpdate);
  };

  return (
    <div>
      <section className=" h-66 flex flex-row items-center justify-center w-full gap-6">
        <input
          type="text"
          value={input}
          placeholder="Enter the task"
          onChange={(e) => {
            setInput(e.target.value);
          }}
          className=" h-10 rounded text-2xl border"
        />
        <button
          className="bg-blue-500 text-white w-22 h-10 px-10 py-2 rounded"
          onClick={handleSubmit}
        >
          Submit
        </button>
      </section>
      <section className=" w-full min-h-[66px]">
        {task.map((item) => (
          <div
            key={item.id}
            className="flex  items-center justify-center gap-10 h-15"
          >
            <input
              type="checkbox"
              checked={item.status}
              onChange={() => handleUpdate(item.id)}
              className="w-5 h-5 accent-blue-500"
            />
            <p
              className="text-3xl "
              onClick={() => {
                handleUpdate(item.id);
              }}
            >
              {item.task}
            </p>
            <button
              className="bg-orange-500 text-white w-22 h-10 px-10 py-2 rounded"
              onClick={() => {
                handleDelete(item.id);
              }}
            >
              Delete
            </button>
          </div>
        ))}
      </section>
    </div>
  );
};

export default App;
