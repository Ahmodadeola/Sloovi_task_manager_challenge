import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import {
  addTask,
  deleteTask,
  getTasks,
  getUsers,
  putTask,
} from "../../services/Task.services";
const initialState = {
  tasks: null,
  users: null,
};

export const fetchTasks = createAsyncThunk("tasks/fetch all", async () => {
  const res = await getTasks();
  return res;
});

export const createTask = createAsyncThunk(
  "tasks/create task",
  async (data) => {
    const res = await addTask(data);
    return res;
  }
);

export const updateTask = createAsyncThunk(
  "tasks/update task",
  async (data) => {
    const res = await putTask(data);
    return res;
  }
);

export const removeTask = createAsyncThunk(
  "tasks/delete task",
  async (data) => {
    const res = await deleteTask(data);
    return res;
  }
);
export const fetchUsers = createAsyncThunk("tasks/fetch users", async () => {
  const res = await getUsers();
  return res;
});

const TaskSlice = createSlice({
  name: "Task",
  initialState,
  reducers: {},
  extraReducers: {
    [fetchTasks.fulfilled](state, { payload }) {
      console.log("Tasks fetched successfully: ", payload);
      state.tasks = payload.results;
    },
    [fetchUsers.fulfilled](state, { payload }) {
      console.log("users fetched successfully: ", payload);
      state.users = payload.results.data;
    },
  },
});

const { actions, reducer } = TaskSlice;

export const {} = actions;
export default reducer;
