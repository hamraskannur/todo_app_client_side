import React, { useState } from "react";
import { addSubTask, updatedCheckboxe } from "../../axios/axios";

const ChildTodo = ({ checkboxes, setCheckboxes, task }) => {
  const [subTask, setSubTask] = useState("");
  const [error, setError] = useState("");

  const changeHandler = (e) => {
    setSubTask(e.target.value);
  };

  const submitHandler = async () => {
    if (subTask.trim().length > 0) {
      const response = await addSubTask({ subTask, id: task._id });
      setCheckboxes(response.updatedTask);
    } else {
      setError("please enter a task name");
    }
  };

  const handleCheckboxChange = async (id,checkedType) => {
    const response = await updatedCheckboxe({
      taskId: task._id,
      subTaskId: id,
      checkedType:!checkedType
    });
    
    if (response.status) {
      const updatedCheckboxes = checkboxes.map((checkbox) => {
        if (checkbox._id === id) {
          return {
            ...checkbox,
            checked: !checkbox.checked,
          };
        }
        return checkbox;
      });
      setCheckboxes(updatedCheckboxes);
    }
  };

  return (
    <div>
      <div className="mt-5 mx-16 flex gap-2">
        <div className="w-full">
          <label className="block mb-2 text-sm font-medium ">
            <strong>Add your task</strong>
          </label>
          {error.length > 0 && (
            <span className="text-red-500 text-xs">{`*${error}`}</span>
          )}
          <input
            type="text"
            id="success"
            onChange={changeHandler}
            className=" border text-sm rounded-lg block w-full p-2.5 dark:bg-gray-700 "
            placeholder="Add your task....."
          />
        </div>
        <div className="h-8 mt-7">
          <button
            onClick={submitHandler}
            className="bg-[#6f6f6f]  text-white px-6 py-2 rounded-lg hover:bg-white duration-300 border border-[#6f6f6f] hover:text-[#6f6f6f]"
          >
            AddTask
          </button>
        </div>
      </div>
      <div className="accordion ml-14 m-5   ">
        {checkboxes.map((checkbox) => (
          <div className="accordion-item" key={checkbox._id}>
            <input
              type="checkbox"
              id={`checkbox-${checkbox._id}`}
              checked={checkbox.checked}
              onChange={() => handleCheckboxChange(checkbox._id,checkbox.checked)}
            />
            <label htmlFor={`checkbox-${checkbox._id}`}>
              {checkbox.taskName}
            </label>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ChildTodo;
