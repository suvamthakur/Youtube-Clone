import { createSlice } from "@reduxjs/toolkit";

const chatSlice = createSlice({
  name: "chart",
  initialState: {
    messages: [],
  },
  reducers: {
    addMessage: (state, action) => {
      state.messages.splice(20, 1);
      state.messages.unshift(action.payload);
    },
  },
});

export const { addMessage } = chatSlice.actions;
export default chatSlice.reducer;
