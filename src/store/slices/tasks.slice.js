import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { addTask, getTasks, getUsers } from "../../services/Task.services";
const initialState = {
  tasks: null,
  users: null,
};

export const fetchTasks = createAsyncThunk("tasks/fetch all", async () => {
  const res = await getTasks();
  return res;
});

export const createTask = createAsyncThunk(
  "tasks/cretae task",
  async (data) => {
    const res = await addTask(data);
    console.log("Task created: ", res);
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
