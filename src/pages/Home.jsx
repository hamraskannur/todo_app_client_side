import React, { useEffect, useState } from "react";
import Header from "../components/header/Header";
import Todos from "../components/todos/Todos";
import { addTask, getTask } from "../axios/axios";

function Home() {
  const [task, setTask] = useState("");
  const [error, setError] = useState("");
  const [allTask, setallTask] = useState([])

  useEffect(() => {
    (async () => {
        const task=await getTask()
        setallTask(task)
    })();
  }, []);

  const changeHandler = (e) => {
    setTask(e.target.value);
  };
  const submitHandler = async (e) => {
    if (task.trim().length > 0) {
      const {userTask} = await addTask({ task });
      setallTask([userTask,...allTask])
    } else {
      setError("please enter a task");
    }
  };

  return (
    <div>
      <Header />
      <div className="mt-10  mx-16 flex gap-2">
        <div className="w-full">
          <label  className="block mb-2 text-sm font-medium ">
            <strong>Add your todo</strong>
          </label>
          {error.length > 0 && (
            <span className="text-red-500 text-xs">{`*${error}`}</span>
          )}
          <input
            type="text"
            id="success"
            onChange={changeHandler}
            className=" border text-sm rounded-lg block w-full p-2.5 dark:bg-gray-700 "
            placeholder="Add your todo....."
          />
        </div>
        <div className="h-8 mt-7">
          <button
            onClick={submitHandler}
            className="bg-[#6f6f6f]  text-white px-6 py-2 rounded-lg hover:bg-white duration-300 border border-[#6f6f6f] hover:text-[#6f6f6f]"
          >
            AddTodo
          </button>
        </div>
      </div>
      <div className="rounded-t-lg m-10  border-neutral-200 bg-white dark:border-neutral-600 dark:bg-neutral-800">

      {allTask.length>0 && allTask.map((task) =>(
      <Todos  setallTask={setallTask} task={task} key={task._id}/>
      ))}
    </div>

    </div>
  );
}

export default Home;
