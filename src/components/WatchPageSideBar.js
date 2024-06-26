import { useSelector } from "react-redux";
import SideBarVideoCard from "./SideBarVideoCard";
import useVideoList from "../utils/useVideoList";

const WatchPageSideBar = () => {
  const videoList = useSelector((store) => store.videoSearch.videoList);

  // Adding/ getting videos into redux store
  useVideoList();

  return (
    <div>
      {videoList.slice(10, 25).map((video, index) => (
        <SideBarVideoCard
          key={video?.id?.videoId ? video?.id?.videoId : index}
          info={video}
        />
      ))}
    </div>
  );
};

export default WatchPageSideBar;
