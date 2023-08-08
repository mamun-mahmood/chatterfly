import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import type { RootState } from "../../store";

interface Room {
  id: number;
  name: string;
  photoURL: string;
  joiningCode: string;
  createdby: string;
  members: [];
  messages: Array<{
    id: number;
    message: string;
    sender: string;
    timestamp: string;
  }>;
}

interface RoomState {
  value: Room[];
}

const initialState: RoomState = {
  value: [],
};

export const chatSlice = createSlice({
  name: "rooms",
  initialState,
  reducers: {
    setRooms: (state, action: PayloadAction<Room[]>) => {
      state.value = action.payload;
    },
    addRoom: (state, action: PayloadAction<Room>) => {
      state.value.push(action.payload);
    },
    removeRoom: (state, action: PayloadAction<number>) => {
      state.value = state.value.filter((room) => room.id !== action.payload);
    },
    addMessage: (
      state,
      action: PayloadAction<{ id: number; message: string }>
    ) => {
      state.value = state.value.map((room) => {
        if (room.id === action.payload.id) {
          return {
            ...room,
            messages: [...room.messages, action.payload.message],
          };
        }
        return room;
      });
    },
  },
});

export const { setRooms, addRoom, removeRoom, addMessage } = chatSlice.actions;
export const selectRooms = (state: RootState) => state.rooms.value;
export default chatSlice.reducer;
