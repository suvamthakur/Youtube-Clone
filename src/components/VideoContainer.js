import VideoCard from "./VideoCard";
import { useDispatch, useSelector } from "react-redux";
import { LiveVideoCard } from "./VideoCard";
import useVideoList from "../utils/useVideoList";
import { useEffect } from "react";
import { closeMenu, openMenu } from "../utils/appSlice";
import ShimmerMain from "./ShimmerMain";

const VideoContainer = () => {
  const dispatch = useDispatch();
  const isLoading = useSelector((store) => store.app.isLoading);

  useEffect(() => {
    if (window.innerWidth > 770) {
      dispatch(openMenu());
    } else {
      dispatch(closeMenu());
    }
  }, []);

  const videoList = useSelector((store) => store.videoSearch.videoList);

  // Adding videos into redux store
  useVideoList();

  if (isLoading) {
    return (
      <div className="my-2 mx-2 flex flex-wrap justify-center md:justify-start">
        {Array.from({ length: 12 }).map((_, index) => (
          <ShimmerMain key={index} />
        ))}
      </div>
    );
  }

  return (
    <div className="my-2 mx-2 flex flex-wrap justify-center md:justify-start">
      {videoList.map((video, index) =>
        video.snippet.liveBroadcastContent === "live" ? (
          <LiveVideoCard
            key={video?.id?.videoId ? video?.id?.videoId : index}
            info={video}
          />
        ) : (
          <VideoCard
            key={video?.id?.videoId ? video?.id?.videoId : index}
            info={video}
          />
        )
      )}
    </div>
  );
};
export default VideoContainer;
