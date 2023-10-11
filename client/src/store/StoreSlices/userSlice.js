import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { statuses } from "../constants/statuses";

const userSlice = createSlice({
  name: "user",
  initialState: {
    profileUrl: [],
    userDetails: [],
    userName:[],
    status: statuses.idle,
  },
  reducers: {
    setProfileUrl(state, action) {
      state.profileUrl =
        state.profileUrl.length > 1 ? state.profileUrl.pop() : [];
      state.profileUrl.push(action.payload);
      console.log(state.profileUrl);
    },
    setUserData(state, action) {
      console.log("Func callded");
      state.userDetails = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(userData.pending, (state, action) => {
        state.status = statuses.loading;
      })
      .addCase(userData.fulfilled, (state, action) => {
        state.status = statuses.idle;
        state.userDetails = action.payload?.other;
        state.profileUrl = action.payload?.other?.profilePicture;
        state.userName = action.payload?.other?.userName;
        console.log("User Data:",state.userName);
      })
      .addCase(userData.rejected, (state, action) => {
        state.status = statuses.error;
        state.userDetails = [];
      });
  },
});

export const userData = createAsyncThunk("users/fetch", async () => {
  const userId = localStorage.getItem("userId");
  if (!localStorage.getItem("userId")) {
    return null;
  }
  const res = await axios.get(
    `http://localhost:8001/api/users/getUserDetails/${userId}`
  );
  const data = res.data;
  return data;
});

export const { setProfileUrl, setUserData, setUserId } = userSlice.actions;

export default userSlice.reducer;
