import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";
import type { RootState } from "../../store";
interface UserState {
  value: object;
}
const initialState: UserState = {
  value: {
    name: "John Doe",
    email: "johndoe@gmail.com",
    role: "shipper",
    isVerified: true,
    isLoggedin: true,
    isSubscribed: true,
    isSubactive: true,
    subscription: {
      type: "free",
      expiresAt: "2021-12-31",
      subscriptionPlan: {
        name: "Free",
        price: 0,
        description: "Free plan",
        features: [
          "Lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam, voluptatum.",
          "Lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam, voluptatum.",
          "Lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam, voluptatum.",
        ],
        expiresAt: "2021-12-31",
        paidAt: "2021-12-31",
        paymentInfo: {},
      },
    },
  },
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
