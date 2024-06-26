import { createSlice } from "@reduxjs/toolkit";

const searchVideosSlice = createSlice({
  name: "videoSearch",
  initialState: {
    searchItem: null,
    videoList: [],
  },
  reducers: {
    searchVideo: (state, action) => {
      state.searchItem = action.payload;
    },
    addVideos: (state, action) => {
      state.videoList = action.payload;
    },
  },
});

export const { searchVideo, addVideos } = searchVideosSlice.actions;
export default searchVideosSlice.reducer;
