import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { searchVideo } from "../utils/searchVideosSlice";

const SideBar = () => {
  const isMenuOpen = useSelector((store) => store.app.isMenuOpen);
  const dispatch = useDispatch();
  const handleClick = (searchItem) => {
    dispatch(searchVideo(searchItem));
  };

  // Early return
  if (!isMenuOpen) return null;

  return (
    <div className="px-4">
      <ul>
        <Link to="/main">
          <li className="m-1 p-2 rounded hover:bg-neutral-700">Home</li>
        </Link>
        <Link to="/main">
          <li
            className="m-1 p-2 rounded hover:bg-neutral-700"
            onClick={(e) => handleClick(e.target.innerHTML)}
          >
            Shorts
          </li>
        </Link>
      </ul>
      <hr className="border-t border-neutral-600" />
      <ul>
        <h1 className="mx-1 my-3 font-semibold">Explore</h1>
        <Link to="/main">
          <li
            className="m-1 p-2 rounded hover:bg-neutral-700"
            onClick={(e) => handleClick(e.target.innerHTML)}
          >
            Trending
          </li>
        </Link>
        <Link to="/main">
          <li
            className="m-1 p-2 rounded hover:bg-neutral-700"
            onClick={(e) => handleClick(e.target.innerHTML)}
          >
            Shopping
          </li>
        </Link>
        <Link to="/main">
          <li
            className="m-1 p-2 rounded hover:bg-neutral-700"
            onClick={(e) => handleClick(e.target.innerHTML)}
          >
            Music
          </li>
        </Link>
        <Link to="/main">
          <li
            className="m-1 p-2 rounded hover:bg-neutral-700"
            onClick={(e) => handleClick(e.target.innerHTML)}
          >
            News
          </li>
        </Link>
        <Link to="/main">
          <li
            className="m-1 p-2 rounded hover:bg-neutral-700"
            onClick={(e) => handleClick(e.target.innerHTML)}
          >
            Sports
          </li>
        </Link>
      </ul>
      <hr className="border-t border-neutral-600" />
      <ul>
        <Link to="/main">
          <li
            className="m-1 p-2 rounded hover:bg-neutral-700"
            onClick={(e) => handleClick(e.target.innerHTML)}
          >
            Gaming
          </li>
        </Link>
        <Link to="/main">
          <li
            className="m-1 p-2 rounded hover:bg-neutral-700"
            onClick={(e) => handleClick(e.target.innerHTML)}
          >
            Podcasts
          </li>
        </Link>
        <Link to="/main">
          <li
            className="m-1 p-2 rounded hover:bg-neutral-700"
            onClick={(e) => handleClick(e.target.innerHTML)}
          >
            Coding
          </li>
        </Link>
        <Link to="/main">
          <li
            className="m-1 p-2 rounded hover:bg-neutral-700"
            onClick={(e) => handleClick(e.target.innerHTML)}
          >
            Cricket
          </li>
        </Link>
      </ul>
    </div>
  );
};
export default SideBar;
