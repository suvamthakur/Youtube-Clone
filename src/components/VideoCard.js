import { Link } from "react-router-dom";
import { FaUserCircle } from "react-icons/fa";

const VideoCard = ({ info }) => {
  const { snippet, statistics, id } = info;
  const { channelTitle, title, thumbnails } = snippet;

  let views;
  if (statistics) {
    const view = statistics.viewCount;
    const viewLength = view.length;

    const viewNum = parseFloat(view);
    if (viewLength >= 4 && viewLength < 6) {
      views = (viewNum / 1000).toFixed(2) + "K";
    } else if (viewLength >= 6 && viewLength < 9) {
      views = (viewNum / 100000).toFixed(2) + "M";
    } else if (viewLength >= 9) {
      views = (viewNum / 100000000).toFixed(2) + "B";
    }
  }

  return (
    <Link to={"/main/watch?v=" + (id.videoId ? id.videoId : id)}>
      <div className="w-[310px] my-2 mx-2 rounded-lg">
        <div className="w-full rounded-lg">
          <img
            src={thumbnails?.medium?.url}
            alt=""
            className="w-full rounded-lg"
          />
        </div>
        <div className="p-1 flex">
          <div>
            <FaUserCircle className="text-3xl mr-2 mt-1" />
          </div>
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

export const LiveVideoCard = ({ info }) => {
  return (
    <div className="relative">
      <span className="absolute bottom-2 right-4 px-2 rounded bg-red-700">
        Live
      </span>
      <VideoCard info={info} />
    </div>
  );
};

export default VideoCard;
