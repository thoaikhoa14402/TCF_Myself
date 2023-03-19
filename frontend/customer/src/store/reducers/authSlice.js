import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  fullName: null,
  email: null,
  photo: null,
  phoneNumber: null,
  birthday: null,
  gender: null,
  address: null,
  userRole: null,
  active: null,
  accessToken: null,
  resetPasswordToken: null,
};

export const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setAuth: (state, action) => {
      state.accessToken = action.payload.accessToken || "";
      state.email = action.payload.email || "";
      state.fullName = action.payload.fullName || "";
      state.phoneNumber = action.payload.phoneNumber || "";
      state.birthday = action.payload.birthday || "";
      state.gender = action.payload.gender || "";
      state.address = action.payload.address || "";
      state.userRole = action.payload.userRole || "";
      state.active = action.payload.active || "";
      state.resetPasswordToken = action.payload.resetPasswordToken || "";
    },
  },
});

export const { setAuth } = authSlice.actions;
export const authSelector = (state) => state.auth;
export default authSlice.reducer;
