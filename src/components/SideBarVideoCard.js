import { Link } from "react-router-dom";
import useCalculateViews from "../utils/useCalculateViews";

const SideBarVideoCard = ({ info }) => {
  const { snippet, statistics, id } = info;
  const { channelTitle, title, thumbnails } = snippet;

  const views = useCalculateViews(statistics);

  return (
    // refreshing the whole page to check again if the video is live or not
    <Link
      to={"/main/watch?v=" + (id.videoId ? id.videoId : id)}
      onClick={() =>
        window.scrollTo({
          top: 0,
          behavior: "smooth", // for smooth scrolling
        })
      }
    >
      <div className="my-8 md:my-5 mx-2 rounded-lg flex sm:flex-row flex-col">
        <div className="h-full">
          <div className="w-full sm:w-40 h-full rounded-lg">
            <img
              src={thumbnails?.medium?.url}
              alt=""
              className="w-full h-full rounded-lg"
            />
          </div>
        </div>
        <div className="px-2 mt-2 sm:mt-0">
          <div>
            <h2 className="font-semibold">
              {title.length > 50 ? title.substring(0, 50) + "..." : title}
            </h2>
            <p className="text-neutral-400 mt-1 font-semibold">
              {channelTitle}
            </p>
            <p className="text-neutral-400">{views && views + " views"} </p>
          </div>
        </div>
      </div>
    </Link>
  );
};

export default SideBarVideoCard;
