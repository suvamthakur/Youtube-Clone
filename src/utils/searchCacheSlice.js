import { createSlice } from "@reduxjs/toolkit";

const searchCacheSlice = createSlice({
  name: "search",
  initialState: {},
  reducers: {
    addToCache: (state, action) => {
      // If the object length is 50 then, removing data from first and adding new data at last position
      if (Object.keys(state).length === 50) {
        const key = Object.keys(state)[0]; // Got the first key

        delete state[key]; // deleting the first data

        state = Object.assign(state, action.payload); // adding new data
      } else {
        state = Object.assign(state, action.payload);
      }
    },
  },
});

export const { addToCache } = searchCacheSlice.actions;
export default searchCacheSlice.reducer;
