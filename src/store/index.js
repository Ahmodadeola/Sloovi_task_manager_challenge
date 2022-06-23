import { configureStore } from "@reduxjs/toolkit";
import TaskReducer from "./slices/tasks.slice";
import AuthReducer from "./slices/auth.slice";

const store = configureStore({
  reducer: {
    task: TaskReducer,
    auth: AuthReducer,
  },
});

export default store;
