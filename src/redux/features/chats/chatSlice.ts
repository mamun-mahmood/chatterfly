// chatSlice
import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import type { RootState } from "../../store";
interface ChatState {
  value: Array<object>;
}
const initialState: ChatState = {
  value: [],
};
export const chatSlice = createSlice({
  name: "chat",
  initialState,
  reducers: {
    setChat: (state, action: PayloadAction<object>) => {
      state.value = action.payload;
    },
    addChat: (state, action: PayloadAction<object>) => {
      state.value.push(action.payload);
    },
    removeChat: (state, action: PayloadAction<object>) => {
      state.value = state.value.filter((chat) => chat.id !== action.payload.id);
    },
    addMessage: (state, action: PayloadAction<object>) => {
      state.value = state.value.map((chat) => {
        if (chat.id === action.payload.id) {
          return {
            ...chat,
            messages: [...chat.messages, action.payload.message],
          };
        }
        return chat;
      });
    },
  },
});
export const { setChat, addChat, removeChat, addMessage } = chatSlice.actions;
export const selectChat = (state: RootState) => state.chat.value;
export default chatSlice.reducer;
