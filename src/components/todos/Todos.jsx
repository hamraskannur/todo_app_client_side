import React, { useState } from "react";
import ChildTodo from "../childTodo/ChildTodo";

import Accordion from "../accordion/Accordion";

function Todos({ task, setallTask}) {
  const [open, SetOpen] = useState(false);

  const [checkboxes, setCheckboxes] = useState(task?.tasks);

  const calculateProgress = () => {
    if(checkboxes.length===0){
        return 0
    }
    const checkedCount = checkboxes.filter((checkbox) => checkbox.checked ).length;
    return Math.floor((checkedCount / checkboxes.length) * 100) 
  };

  return (
    <div className="mt-2 border-2">
      <Accordion setallTask={setallTask} task={task} open={open} SetOpen={SetOpen} calculateProgress={calculateProgress}/>
      {open && (
        <ChildTodo
          task={task}
          checkboxes={checkboxes}
          setCheckboxes={setCheckboxes}
        />
      )}
    </div>
  );
}

export default Todos;
