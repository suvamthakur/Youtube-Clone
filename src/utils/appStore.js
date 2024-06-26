import { configureStore } from "@reduxjs/toolkit";
import appSlice from "./appSlice";
import searchCacheSlice from "./searchCacheSlice";
import searchVideosSlice from "./searchVideosSlice";
import chatSlice from "./chatSlice";
import userSlice from "./userSlice";

const appStore = configureStore({
  reducer: {
    app: appSlice,
    user: userSlice,
    search: searchCacheSlice,
    videoSearch: searchVideosSlice,
    chat: chatSlice,
  },
});

export default appStore;
