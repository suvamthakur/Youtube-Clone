import { closeMenu } from "../utils/appSlice";
import { useDispatch } from "react-redux";
import { useSearchParams } from "react-router-dom";
import CommentsContainer from "./CommentsContainer";
import WatchPageSideBar from "./WatchPageSideBar";
import { useEffect, useState } from "react";
import { SINGLE_YOUTUBE_VIDEO_API } from "../utils/constants";
import LiveChatBox from "./LiveChatBox";
import { FaUserCircle } from "react-icons/fa";
import { AiFillLike } from "react-icons/ai";
import { AiOutlineLike } from "react-icons/ai";
import { BiSolidDislike } from "react-icons/bi";
import { BiDislike } from "react-icons/bi";

const WatchPage = () => {
  const [videoData, setVideoData] = useState({});
  const [isSubscribe, setIsSubscribe] = useState(false);
  const [isLike, setIsLike] = useState(false);
  const [isDislike, setIsDislike] = useState(false);

  const [searchParams] = useSearchParams(); //Hook that returns params
  const params = searchParams.get("v"); // using .getall it will find the the given query values from the query string

  // Initially close when any video is playing
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(closeMenu());
    getVideo();
  }, [params]);

  const getVideo = async () => {
    const data = await fetch(SINGLE_YOUTUBE_VIDEO_API + params);
    const json = await data.json();
    setVideoData(json.items[0]);
  };

  if (Object.keys(videoData).length === 0) return null;

  const { snippet, statistics } = videoData;
  const { channelTitle, title } = snippet;

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

  // Inside handleLike/Dislike function. every opertaion is in reverse because after clicking like/dislike the handleLike/Dislike functions will not be called on re-render

  const handleLike = () => {
    setIsLike(!isLike);

    if (!isLike) {
      setIsDislike(isLike);
      statistics.likeCount = parseInt(statistics.likeCount) + 1;
    } else {
      statistics.likeCount = parseInt(statistics.likeCount) - 1;
    }
  };
  const handleDisLike = () => {
    setIsDislike(!isDislike);

    if (!isDislike) {
      setIsLike(isDislike);
      statistics.likeCount = parseInt(statistics.likeCount) - 1;
    } else {
      statistics.likeCount = parseInt(statistics.likeCount) + 1;
    }
  };

  return (
    <div className="py-2 px-2 md:py-4 md:px-10 flex flex-col lg:flex-row">
      <div className=" lg:w-7/12">
        <div className="h-[250px] sm:h-[350px] lg:h-[420px]">
          <iframe
            width="100%"
            height="100%"
            src={"https://www.youtube.com/embed/" + params + "?autoplay=1"}
            title="YouTube video player"
            frameBorder="0"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
            referrerPolicy="strict-origin-when-cross-origin"
            allowFullScreen
            className="rounded-xl"
          ></iframe>
        </div>

        <div className="p-1 mt-2">
          <p className="text-neutral-400 text-sm">
            {views && views + " views"}{" "}
          </p>
          <h2 className="font-semibold">{title}</h2>

          <div className="flex items-center mt-14 md:mt-3 relative">
            <div>
              <FaUserCircle className="text-3xl mr-2 mt-1" />
            </div>
            <p className="text-neutral-300 mt-1 font-semibold text-lg">
              {channelTitle}
            </p>
            <button
              className={
                (isSubscribe
                  ? "bg-neutral-900 text-white"
                  : "bg-white text-black") +
                " font-semibold  py-1.5 px-3.5 rounded-full ml-auto md:ml-4 "
              }
              onClick={() => setIsSubscribe(!isSubscribe)}
            >
              {isSubscribe ? "Subscribed" : "Subscribe"}
            </button>

            <div className="flex items-center bg-neutral-800 text-2xl py-1.5 rounded-full ml-auto cursor-pointer md:static absolute right-0 -top-12">
              <div
                className="flex items-center pl-4"
                onClick={() => {
                  handleLike();
                }}
              >
                {isLike ? <AiFillLike /> : <AiOutlineLike />}
                <p className="text-base border-r pl-1 pr-3">
                  {statistics.likeCount}
                </p>
              </div>
              <div
                className="pl-3 pr-4"
                onClick={() => {
                  handleDisLike();
                }}
              >
                {isDislike ? <BiSolidDislike /> : <BiDislike />}
              </div>
            </div>
          </div>
        </div>
        <div>
          <CommentsContainer />
        </div>
      </div>
      <div className="lg:pl-6 lg:w-5/12">
        {videoData.snippet.liveBroadcastContent === "live" && <LiveChatBox />}
        <WatchPageSideBar />
      </div>
    </div>
  );
};
export default WatchPage;
