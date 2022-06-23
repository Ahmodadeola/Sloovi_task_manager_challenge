import React, { useEffect, useRef, useState } from "react";
import TasksStyle from "./tasks.module.css";
import { useDispatch, useSelector } from "react-redux";
import { fetchTasks } from "../../store/slices/tasks.slice";
import Task from "../../components/Tasks/Task";
import TasksHeader from "../../components/Tasks/TasksHeader";

const Tasks = () => {
  // hooks and states
  const dispatch = useDispatch();
  const { tasks, users } = useSelector((state) => state.task);
  const userOptions = users?.map((user) => ({
    label: `${user.first} ${user.last}`,
    value: user.id,
  }));

  //   lifecycle with useeffect
  useEffect(() => {
    if (!tasks) dispatch(fetchTasks());
  }, []);
  return (
    <div className={TasksStyle.wrapper}>
      <div className="">
        <TasksHeader count={tasks?.length || 0} users={userOptions} />
        {tasks?.map((task) => (
          <Task
            key={task.id}
            date={task.task_date}
            description={task.task_msg}
            data={task}
            users={userOptions}
          />
        ))}
      </div>
    </div>
  );
};

export default Tasks;
