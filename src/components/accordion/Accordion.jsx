import React from "react";
import "react-circular-progressbar/dist/styles.css";
import { CircularProgressbar } from "react-circular-progressbar";
import deleteIcon from "../../assets/icons8-delete.svg";
import { confirmAlert } from "react-confirm-alert"; // Import
import "react-confirm-alert/src/react-confirm-alert.css"; // Import css
import { removeTask } from "../../axios/axios";
import arrow from "../../assets/icons8-arrow-50.png";
import { toast } from "react-hot-toast";

function Accordion({ calculateProgress, SetOpen, open, task, setallTask }) {
  const deleteTask = async () => {
    const response = await removeTask(task._id);
    if (response.status) {
      setallTask((prevTasks) => prevTasks.filter((t) => t._id !== task._id));
      toast.success("Successfully deleted");
    }
  };

  const deleteAlert = () => {
    confirmAlert({
      title: "Confirm to ",
      message: "Are you delete your post.",
      buttons: [
        {
          label: "Yes",
          onClick: () => {
            deleteTask();
          },
        },
        {
          label: "No",
        },
      ],
    });
  };

  return (
    <button
      className="group relative flex w-full items-center rounded-t-[15px] border-0 bg-white px-5 py-4 text-left text-base text-neutral-800 transition [overflow-anchor:none] hover:z-[2] focus:z-[3] focus:outline-none dark:bg-neutral-800 dark:text-white [&:not([data-te-collapse-collapsed])]:bg-white [&:not([data-te-collapse-collapsed])]:text-primary [&:not([data-te-collapse-collapsed])]:[box-shadow:inset_0_-1px_0_rgba(229,231,235)] dark:[&:not([data-te-collapse-collapsed])]:bg-neutral-800 dark:[&:not([data-te-collapse-collapsed])]:text-primary-400 dark:[&:not([data-te-collapse-collapsed])]:[box-shadow:inset_0_-1px_0_rgba(75,85,99)]"
      type="button"
    >
      {task.name}
      <div
        onClick={() => {
          SetOpen(!open);
        }}
        className="progress-bar ml-10 w-10 "
      >
        <CircularProgressbar
          value={calculateProgress()}
          text={`${calculateProgress()}%`}
        />
      </div>
      <span
        onClick={() => {
          SetOpen(!open);
        }}
        className="ml-auto mr-5 h-5 w-5 shrink-0 rotate-[-180deg] fill-[#336dec] transition-transform duration-200 ease-in-out group-[[data-te-collapse-collapsed]]:rotate-0 group-[[data-te-collapse-collapsed]]:fill-[#212529] motion-reduce:transition-none dark:fill-blue-300 dark:group-[[data-te-collapse-collapsed]]:fill-white"
      >
        {!open ? (
          <img
            onClick={() => {
              SetOpen(!open);
            }}
            className="text-xl"
            src={arrow}
            alt="arrow"
          />
        ) : (
          <img
            onClick={() => {
              SetOpen(!open);
            }}
            className="rotate-180"
            src={arrow}
            alt="arrow"
          />
        )}
      </span>
      <img onClick={deleteAlert} src={deleteIcon} alt="deleteLogo" />
    </button>
  );
}

export default Accordion;
