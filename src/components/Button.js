import { useDispatch } from "react-redux";
import { searchVideo } from "../utils/searchVideosSlice";

const Button = ({ buttonName }) => {
  const dispatch = useDispatch();

  const handleSearch = (searchQuery) => {
    dispatch(searchVideo(searchQuery));
  };

  return (
    <button
      className="bg-zinc-800 px-3 py-1 mx-1.5 rounded-md focus:bg-white focus:text-black"
      onClick={() => handleSearch(buttonName)}
    >
      {buttonName}
    </button>
  );
};
export default Button;
