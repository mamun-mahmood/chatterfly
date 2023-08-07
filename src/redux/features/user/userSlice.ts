import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";
import type { RootState } from "../../store";

interface UserState {
  value: object;
}

const initialState: UserState = {
  value: {},
};

// Load state from localStorage
const loadState = () => {
  try {
    const serializedState = localStorage.getItem("chatterflyusersate");
    if (serializedState === null) {
      return undefined;
    }
    return {
      value: JSON.parse(serializedState),
    };
  } catch (error) {
    return undefined;
  }
};

// Save state to localStorage
const saveState = (state: any) => {
  try {
    const serializedState = JSON.stringify(state);
    localStorage.setItem("chatterflyusersate", serializedState);
  } catch (error) {
    // Handle errors if necessary
  }
};

export const userSlice = createSlice({
  name: "user",
  initialState: loadState() || initialState, // Load from localStorage if available
  reducers: {
    setUser: (state, action: PayloadAction<object>) => {
      saveState(action.payload); // Save state to localStorage
      state.value = action.payload;
    },
    logout: (state) => {
      saveState(state); // Save state to localStorage
      state.value = {};
    },
  },
});

export const { setUser, logout } = userSlice.actions;
export const selectUser = (state: RootState) => state.user.value;

export default userSlice.reducer;
