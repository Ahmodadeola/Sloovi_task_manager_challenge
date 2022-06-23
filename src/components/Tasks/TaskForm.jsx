import React, { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  createTask,
  fetchTasks,
  fetchUsers,
  removeTask,
  updateTask,
} from "../../store/slices/tasks.slice";
import TasksStyle from "../../views/Tasks/tasks.module.css";
import BinIcon from "../../assets/icons/bin.png";

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

  const [loading, setLoading] = useState();
  const formData = useRef();

  const getTime = (timeSec) => {
    if (!timeSec) return;
    const [h, m] = [
      (parseInt(timeSec / 3600) + "0").slice(0, 2),
      ((timeSec % 3600) / 60 + "0").slice(0, 2),
    ];
    const time = `${h}:${m}`;
    return time;
  };

  const deleteHandler = async () => {
    setLoading(true);
    const res = await dispatch(removeTask(defaultData?.id));

    if (res.payload.status !== "error") {
      await dispatch(fetchTasks());
      close();
    }
    setLoading(false);
  };

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
    setLoading(true);
    const res = !defaultData
      ? await dispatch(createTask(data))
      : await dispatch(
          updateTask({
            task_id: defaultData.id,
            data,
          })
        );

    if (res.payload.status !== "error") {
      await dispatch(fetchTasks());
      close();
    }
    setLoading(false);
  };

  //   lifecycle with useeffect
  useEffect(() => {
    if (!users) dispatch(fetchUsers());
    const { assigned_user, task_msg, task_date, task_time } = defaultData || {};
    formData.current = {
      assigned_user,
      task_msg,
      task_date,
      task_time: getTime(task_time),
    };
  }, []);

  return (
    <form className={TasksStyle.create_body}>
      {loading ? (
        <p>Loading...</p>
      ) : (
        <>
          <FormInput
            label={"Task Description"}
            name="description"
            placeholder="Write description..."
            defaultValue={defaultData?.task_msg}
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
                defaultValue={defaultData?.task_date}
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
                defaultValue={
                  defaultData ? getTime(defaultData?.task_time) : null
                }
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
              formData.current.assigned_user = e.target.value;
            }}
            defaultValue={defaultData?.assigned_user}
          />
          <div className="flex-between">
            {defaultData ? (
              <img
                src={BinIcon}
                className={TasksStyle.bin}
                onClick={deleteHandler}
              />
            ) : (
              <span></span>
            )}
            <div className="flex gap-5">
              <p className="cursor-pointer" onClick={close}>
                Cancel
              </p>
              <button className="button" onClick={saveHandler}>
                Save
              </button>
            </div>
          </div>
        </>
      )}
    </form>
  );
};

export default TaskForm;
