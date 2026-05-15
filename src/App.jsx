import React, { useState } from "react";
import './App.css'

const App = () => {
  const [task, setTask] = useState([]);
  const [input, setInput] = useState("");
  const [editId,setEditId] = useState(null);
  const [editbutton,setEditButton] = useState(false)

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
    
  };

  function handleEditFun(){

    const result = task.map((tasks)=>{
      if(tasks.id === editId ){
        return {...tasks,task : input}
      }
      return tasks
    })
    setTask(result)
    setEditButton(false)
    setInput(" ")
    setEditId(null)
  }
  

  const handleDelete = (id) => {
    console.log(id);
    const deleteTask = task.filter((tasks) => {
      return tasks.id !== id;
    });
    console.log(deleteTask);
    setTask(deleteTask);
  };

  const handleEdit = (id) => {
    console.log(id);
    const editTask = task.find((tasks)=>tasks.id === id)
    setEditId(id)
    console.log(editTask.task);
    setInput(editTask.task)
    setEditButton(true)
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
          className=" text-white w-22 h-10 px-10 py-2 rounded"
          onClick={editbutton ? handleEditFun : handleSubmit}
          className ={editId !==null ? "bg-pink-500 text-white w-22 h-10 px-10 py-2 rounded" 
                                    : "bg-blue-500 text-white w-22 h-10 px-10 py-2 rounded"}
        >
          {editId !==null ? "Edit" : "Sumbit"}
        </button>
      </section>
      <section className="w-full flex justify-center">
        <table className=" w-8/12 min-h-[66px] text-center  ">
        <tbody>
        {task.map((item) => (
            
              <tr className="grid grid-cols-[10%_70%_10%_10%] "
            key={item.id}
            
          >
            <td><input
              type="checkbox"
              checked={item.status}
              onChange={() => handleUpdate(item.id)}
              className="w-5 h-5 accent-blue-500"
            /></td>
            <td>
              <p
              className="text-3xl "
              onClick={() => {
                handleUpdate(item.id);
              }}
            >
              {item.task}
            </p>
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
