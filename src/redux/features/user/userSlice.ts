import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";
import type { RootState } from "../../store";
interface UserState {
  value: object;
}
const initialState: UserState = {
  value: {},
};
export const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    setUser: (state, action: PayloadAction<object>) => {
      state.value = action.payload;
    },
    logout: (state) => {
      state.value = {};
    },
  },
});
export const { setUser, logout } = userSlice.actions;
export const selectUser = (state: RootState) => state.user.value;
export default userSlice.reducer;
