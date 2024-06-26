import { useEffect } from "react";
import { YOUTUBE_API, YOUTUBE_SEARCH_VIDEOS_API } from "../utils/constants";
import { addVideos } from "../utils/searchVideosSlice";
import { useDispatch, useSelector } from "react-redux";
import { setLoading } from "./appSlice";

const useVideoList = () => {
  const searchItem = useSelector((store) => store.videoSearch.searchItem);
  const isLoading = useSelector((store) => store.app.isLoading);

  const dispatch = useDispatch();

  // Component will render with new videos every time serchItem (Redux) changes
  useEffect(() => {
    getVideos();
  }, [searchItem]);

  const getVideos = async () => {
    let data;

    dispatch(setLoading()); // for shimmer effect

    // If searchItem is null then call default api otherwise call the youtubeVidoesSearchAPI
    if (searchItem !== null) {
      data = await fetch(YOUTUBE_SEARCH_VIDEOS_API + searchItem);
    } else {
      data = await fetch(YOUTUBE_API);
    }
    const jsonData = await data.json();
    dispatch(addVideos(jsonData.items));

    dispatch(setLoading()); // for shimmer effect
  };
};

export default useVideoList;
