import React, { useState } from "react";
import PlusIcon from "../../assets/icons/plus.png";
import TasksStyle from "../../views/Tasks/tasks.module.css";
import TaskForm from "./TaskForm";

const TasksHeader = ({ count }) => {
  const [showcreate, setShowCreate] = useState();

  return (
    <>
      <div className={TasksStyle.header}>
        <p>
          Tasks <span className="gray">{count}</span>
        </p>
        <div className="left_border">
          <img
            src={PlusIcon}
            className={TasksStyle.icon}
            onClick={() => setShowCreate(true)}
          />
        </div>
      </div>
      {showcreate && <TaskForm close={() => setShowCreate(false)} />}
    </>
  );
};

export default TasksHeader;
