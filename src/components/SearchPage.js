import { useDispatch, useSelector } from "react-redux";
import ButtonList from "./ButtonList";
import useVideoList from "../utils/useVideoList";
import SearchBarVideoCard from "./SearchPageVideoCard";
import { useEffect } from "react";
import { closeMenu, openMenu } from "../utils/appSlice";
import ShimmerSearchPage from "./ShimmerSearchPage";

const SearchPage = () => {
  const dispatch = useDispatch();

  const videoList = useSelector((store) => store.videoSearch.videoList);
  const isLoading = useSelector((store) => store.app.isLoading);

  // Call dispatch inside useEffect otherwise it will give warning (unable to re-render the sidebar (due to state (isMenuOpen) change))
  useEffect(() => {
    if (window.innerWidth > 770) {
      dispatch(openMenu());
    } else {
      dispatch(closeMenu());
    }
  }, []);

  // Adding videos into redux store
  useVideoList();

  if (isLoading) {
    return (
      <div>
        <ButtonList />
        {Array.from({ length: 10 }).map((_, index) => (
          <ShimmerSearchPage key={index} />
        ))}
      </div>
    );
  }

  return (
    <div>
      <ButtonList />
      {videoList.map((video, index) => (
        <SearchBarVideoCard
          key={video?.id?.videoId ? video?.id?.videoId : index}
          info={video}
        />
      ))}
    </div>
  );
};
export default SearchPage;
