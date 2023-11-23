import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  username: "",
  phoneNumber: "",
  email: "",
  firstName: "",
  lastName: "",
  password: "",
  confirmPassword: "",
};

export const userSlice = createSlice({
  name: "register",
  initialState: {
    users: [],
    // user: initialState,
  },
  reducers: {
    setregister: (state, action) => {
      console.log(action.payload, "Action");
      state.users.push(action.payload);
    },
  },
});

// Action creators are generated for each case reducer function
export const { setregister } = userSlice.actions;

export default userSlice.reducer;
