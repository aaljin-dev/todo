import React, { useEffect, useState } from "react";
import "./App.css";

const App = () => {
  const [task, setTask] = useState([]);
  const [input, setInput] = useState("");
  const [editId, setEditId] = useState(null);
  const [editbutton, setEditButton] = useState(false);
  const [open, setOpen] = useState(null);

  const handleSubmit = () => {
    if (input.trim() === "") {
      return;
    }
    let find = task.length + 1;

    let newTask = {
      id: find,
      task: input,
      status: "pending",
    };

    setInput("");
    let set = [...task, newTask];
    localSetFunction(set);
  };

  function handleEditFun() {
    const result = task.map((tasks) => {
      if (tasks.id === editId) {
        return { ...tasks, task: input };
      }
      return tasks;
    });
    setTask(result);
    console.log(result);

    setEditButton(false);
    setInput("");
    setEditId(null);
    localSetFunction(result);
  }
  const setFun = () => {};

  const handleDelete = (id) => {
    console.log(id);
    const deleteTask = task.filter((tasks) => {
      return tasks.id !== id;
    });

    // setTask(deleteTask);
    localSetFunction(deleteTask);
  };

  const handleEdit = (id) => {
    console.log(id);
    const editTask = task.find((tasks) => tasks.id === id);
    setEditId(id);
    console.log(editTask.task);
    setInput(editTask.task);
    setEditButton(true);
  };

  const handleUpdate = (id, value) => {
    const result = task.map((tasks) => {
      if (tasks.id === id) {
        return { ...tasks, status: value };
      }
      return tasks;
    });

    localSetFunction(result);
    setOpen(null);
  };

  const localSetFunction = (data) => {
    localStorage.setItem("aaljin", JSON.stringify(data));
    localGetFunction();
  };
  const localGetFunction = () => {
    const data = localStorage.getItem("aaljin");
    console.log(data);
    setTask(JSON.parse(data));
  };
  useEffect(() => {
    localGetFunction();
  }, []);

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
          className=" text-white w-22 h-10 px-10 py-2 rounded"
          onClick={editbutton ? handleEditFun : handleSubmit}
          className={
            editId !== null
              ? "bg-pink-500 text-white w-22 h-10 px-10 py-2 rounded"
              : "bg-blue-500 text-white w-22 h-10 px-10 py-2 rounded"
          }
        >
          {editId !== null ? "Edit" : "Sumbit"}
        </button>
      </section>
      <section className="w-full flex justify-center">
        <table className=" w-8/12 min-h-[66px] text-center  ">
          <tbody>
            {task.map((item) => (
              <tr
                className="grid grid-cols-[10%_70%_10%_10%] h-15"
                key={item.id}
              >
                <td>
                  <div className="relative inline-block ">
                    {/* Button */}
                    <button
                      onClick={() => setOpen(open === item.id ? null : item.id)}
                      className={
                        item.status === "pending"
                          ? "bg-yellow-500 text-white w-30 h-8 px-20 py-5 rounded-lg"
                          : item.status === "In progress"
                            ? "bg-green-500 text-white w-30 h-8 px-20 py-5 rounded-lg"
                            : "bg-red-500 text-white w-30 h-8 px-20 py-5 rounded-lg"
                      }
                    >
                      {item.status}
                    </button>

                    {/* Menu */}
                    {open === item.id && (
                      <div className="absolute left-3 mt-10 w-40   bg-white rounded-lg shadow-lg border overflow-hidden z-50">
                        <button
                          className="block w-full text-center border h-10 p-5  bg-yellow-500"
                          onClick={() => {
                            handleUpdate(item.id, "pending");
                          }}
                        >
                          Pending
                        </button>

                        <button
                          className="block w-full text-center border h-10 p-5  bg-green-500"
                          onClick={() => {
                            handleUpdate(item.id, "In progress");
                          }}
                        >
                          In Progress
                        </button>

                        <button
                          className="block w-full text-center border h-10 p-5 bg-red-500"
                          onClick={() => {
                            handleUpdate(item.id, "Completed");
                          }}
                        >
                          Completed
                        </button>
                      </div>
                    )}
                  </div>
                </td>
                <td>
                  <p className="text-3xl ">{item.task}</p>
                </td>
                <td>
                  <button
                    className="bg-pink-500 text-white w-22 h-10 px-10 py-2 rounded"
                    onClick={() => {
                      handleEdit(item.id);
                    }}
                  >
                    Edit
                  </button>
                </td>
                <td>
                  <button
                    className="bg-orange-500 text-white w-22 h-10 px-10 py-2 rounded"
                    onClick={() => {
                      handleDelete(item.id);
                    }}
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </section>
    </div>
  );
};

export default App;
