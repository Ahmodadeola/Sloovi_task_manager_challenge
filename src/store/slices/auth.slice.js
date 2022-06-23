import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { setRequestToken } from "../../core/apis/axios";
import { loginUser } from "../../services/Auth.service";

export const login = createAsyncThunk("auth/login", async (_, { dispatch }) => {
  try {
    const res = await loginUser();
    return res;
  } catch (error) {
    console.log("Error fecthing login: ", error);
  }
});

const initialState = {
  authInfo: null,
};

const authSlice = createSlice({
  name: "Auth",
  initialState,
  reducers: {
    setUserInfo(state) {
      // This action sets up the auth data required the app
      const userInfo = JSON.parse(localStorage.getItem("user_data"));
      state.authInfo = userInfo;
      setRequestToken(userInfo?.token);
    },
  },
  extraReducers: {
    [login.fulfilled](state, { payload }) {
      // upon login success, save token in localstorage and set token in axios instance
      const { token } = payload.results;
      localStorage.setItem("sloovi_user_token", token);
      localStorage.setItem("user_data", JSON.stringify(payload.results));
      setRequestToken(token);
      state.authInfo = payload.results;
    },
  },
});

const { actions, reducer } = authSlice;

export const { setUserInfo } = actions;

export default reducer;
