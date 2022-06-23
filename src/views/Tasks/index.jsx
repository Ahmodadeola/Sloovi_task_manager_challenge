import React, { useEffect, useRef, useState } from "react";
import TasksStyle from "./tasks.module.css";
import PlusIcon from "../../assets/icons/plus.png";
import PersonIcon from "../../assets/icons/person.png";
import TickIcon from "../../assets/icons/tick.png";
import BellIcon from "../../assets/icons/bell.png";
import { useDispatch, useSelector } from "react-redux";
import {
  createTask,
  fetchTasks,
  fetchUsers,
} from "../../store/slices/tasks.slice";

const FormInput = ({ label, name = "", ...props }) => {
  return (
    <div className={TasksStyle.forminput}>
      <label htmlFor="description">{label}</label> <br />
      <input name={name} {...props} />
    </div>
  );
};

const FormSelect = ({ label, name = "", options = [], ...props }) => {
  return (
    <div className={TasksStyle.forminput}>
      <label htmlFor="description">{label}</label> <br />
      <select name={name} defaultValue="" {...props}>
        <option value={""}>Pick user</option>
        {options.map(({ label, value }, idx) => (
          <option key={value}>{label}</option>
        ))}
      </select>
    </div>
  );
};

const TaskForm = ({ defaultData, close = () => null }) => {
  // hooks and states
  const dispatch = useDispatch();
  const { users } = useSelector((state) => state.task);
  const userOptions = users?.map((user) => ({
    label: `${user.first} ${user.last}`,
    value: user.id,
  }));

  const formData = useRef();
  console.log(formData.current);

  const saveHandler = async (e) => {
    e.preventDefault();
    // calculate the task time in seconds
    const [h, m] = formData.current.task_time
      .split(":")
      .map((t) => parseInt(t));
    const task_time = h * 3600 + m * 60;
    const data = {
      ...formData.current,
      is_completed: 0,
      time_zone: -60,
      task_time,
    };
    console.log("Form data: ", data);
    const res = await dispatch(createTask(data));
    console.log("Task created: ", res);

    if (res.payload.status !== "error") {
      await dispatch(fetchTasks());
      close();
    }
  };

  //   lifecycle with useeffect
  useEffect(() => {
    if (!users) dispatch(fetchUsers());
    formData.current = {};
  }, []);

  useEffect(() => {
    console.log("Form ref: ", formData.current);
  }, [formData.current]);
  return (
    <form className={TasksStyle.create_body}>
      <FormInput
        label={"Task Description"}
        name="description"
        placeholder="Write description..."
        onChange={(e) => {
          formData.current.task_msg = e.target.value;
        }}
      />
      <div className="flex-between">
        <div className="w-45">
          <FormInput
            label={"Date"}
            name="date"
            type="date"
            onChange={(e) => {
              formData.current.task_date = e.target.value;
            }}
          />
        </div>
        <div className="w-45">
          <FormInput
            label={"time"}
            name="time"
            type="time"
            onChange={(e) => {
              formData.current.task_time = e.target.value;
            }}
          />
        </div>
      </div>
      <FormSelect
        label={"Assign user"}
        options={userOptions}
        onChange={(e) => {
          console.log("Changed:", e.target.value);
          formData.current.assigned_user = e.target.value;
        }}
      />
      <div className="flex justify-end gap-5">
        <p className="cursor-pointer" onClick={close}>
          Cancel
        </p>
        <button className="button" onClick={saveHandler}>
          Save
        </button>
      </div>
    </form>
  );
};

const TasksHeader = ({ count, tasks = [] }) => {
  const [showcreate, setShowCreate] = useState();
  const userOptions = tasks?.map((task) => ({
    label: task,
    value: task,
  }));
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

const Task = ({ description = "", date = "" }) => {
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
        <img src={BellIcon} className={TasksStyle.icon} />
        <img src={TickIcon} className={TasksStyle.icon} />
      </div>
    </div>
  );
};

const Tasks = () => {
  // hooks and states
  const dispatch = useDispatch();
  const { tasks, users } = useSelector((state) => state.task);
  const userOptions = users?.map((user) => ({
    label: `${user.first} ${user.last}`,
    value: user.id,
  }));
  console.log("The tasks: ", tasks, users);

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
            users={userOptions}
          />
        ))}
      </div>
    </div>
  );
};

export default Tasks;
