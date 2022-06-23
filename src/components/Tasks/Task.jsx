import React, { useState } from "react";
import TaskForm from "./TaskForm";
import TasksStyle from "../../views/Tasks/tasks.module.css";
import BellIcon from "../../assets/icons/bell.png";
import PenIcon from "../../assets/icons/pencil.png";
import TickIcon from "../../assets/icons/tick.png";
import PersonIcon from "../../assets/icons/person.png";

const Task = ({ description = "", date = "", data }) => {
  const [showcreate, setShowCreate] = useState();

  if (showcreate)
    return <TaskForm close={() => setShowCreate(false)} defaultData={data} />;
  return (
    <div className={TasksStyle.entry}>
      <div className="flex gap-4">
        <img src={PersonIcon} className={TasksStyle.avatar} />
        <div className="flexcol">
          <p className="">{description}</p>
          <span className={TasksStyle.time}>
            {new Date(date).toLocaleDateString()}
          </span>
        </div>
      </div>

      <div className={TasksStyle.entry_util}>
        <img src={PenIcon} onClick={() => setShowCreate(true)} />
        <img src={BellIcon} />
        <img src={TickIcon} />
      </div>
    </div>
  );
};

export default Task;
