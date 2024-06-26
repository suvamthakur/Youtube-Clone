import { RxHamburgerMenu } from "react-icons/rx";
import { IoSearch } from "react-icons/io5";
import { useDispatch, useSelector } from "react-redux";
import { toggleMenu } from "../utils/appSlice";
import { useEffect, useState } from "react";
import { YOUTUBE_SEARCH_SUGGESTION_API } from "../utils/constants";
import { addToCache } from "../utils/searchCacheSlice";
import { searchVideo } from "../utils/searchVideosSlice";
import { Link, useNavigate } from "react-router-dom";
import { onAuthStateChanged, signOut } from "firebase/auth";
import { auth } from "./firebase";
import { addUser, removeUser } from "../utils/userSlice";

const Header = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [searchQuery, setSearchQuery] = useState("");
  const [suggestions, setSuggestions] = useState([]);
  const [showSuggestions, setShowSuggestions] = useState(false);
  const [isPopUp, setIsPopUp] = useState(false);

  const searchCache = useSelector((store) => store.search);
  const user = useSelector((store) => store.user);

  const handleToggleMenu = () => {
    dispatch(toggleMenu());
  };

  useEffect(() => {
    const timer = setTimeout(() => {
      if (searchCache[searchQuery]) {
        setSuggestions(searchCache[searchQuery]);
      } else {
        getSearchSuggetions();
      }
    }, 200);

    return () => {
      clearTimeout(timer);
    };
  }, [searchQuery]);

  const getSearchSuggetions = async () => {
    const data = await fetch(YOUTUBE_SEARCH_SUGGESTION_API + searchQuery);
    const json = await data.json();
    setSuggestions(json[1]);

    dispatch(
      addToCache({
        [searchQuery]: json[1],
      })
    );
  };

  // Now calling searching app from video container
  const handleSearchClick = (searchItem) => {
    setShowSuggestions(false);
    setSearchQuery(searchItem);
    dispatch(searchVideo(searchItem));
  };

  // On Auth State Change
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        const { uid, displayName, email, photoURL } = user;
        dispatch(
          addUser({
            uid: uid,
            displayName: displayName,
            email: email,
            photoURL: photoURL,
          })
        );
        navigate("/main");
      } else {
        dispatch(removeUser());
        navigate("/");
      }
    });

    return () => unsubscribe();
  }, []);

  // Sign out
  const handleSignOut = () => {
    signOut(auth)
      .then(() => {})
      .catch((error) => {
        // An error happened.
      });
  };

  return (
    <div className="sticky top-0 flex flex-col md:flex-row md:items-center justify-between px-5 py-3 bg-neutral-950 z-20">
      <div className="flex items-center">
        {user && (
          <RxHamburgerMenu
            className="text-white text-3xl cursor-pointer"
            onClick={() => handleToggleMenu()}
          />
        )}

        <a href={user ? "/main" : "/"} className="ml-4 md:ml-0">
          <div className="flex items-center ml-4">
            <img
              src="https://static.vecteezy.com/system/resources/previews/023/986/704/non_2x/youtube-logo-youtube-logo-transparent-youtube-icon-transparent-free-free-png.png"
              alt=""
              className="w-11"
            />
            <span className="text-white text-2xl font-semibold tracking-tighter">
              YouTube
            </span>
          </div>
        </a>
      </div>
      {user && (
        <>
          <div className="relative my-3 mx-auto md:mx-0 md:my-0 w-full md:w-[440px]">
            <div className="flex items-center w-full">
              <input
                type="text"
                name=""
                placeholder="Search"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                onFocus={() => setShowSuggestions(true)}
                onBlur={() => setTimeout(() => setShowSuggestions(false), 100)} // Without setTimeOut api is unable to call
                className="bg-zinc-900 border border-zinc-900 w-full text-white py-2 px-4 rounded-s-full focus:border focus:outline-0 focus:border-blue-500"
              />
              <Link to="/main/search">
                <button
                  className="bg-zinc-800 border border-zinc-800 px-4 py-2 rounded-e-full"
                  onClick={() => handleSearchClick(searchQuery)}
                >
                  <IoSearch className="text-white text-2xl" />
                </button>
              </Link>
            </div>
            {suggestions.length !== 0 && showSuggestions && (
              <div className="absolute bg-zinc-800 w-[440px] rounded-xl py-2 m-1">
                <ul>
                  {suggestions.map((suggestion, index) => (
                    <Link to="/main/search" key={index}>
                      <li
                        className="flex items-center px-4 py-2 hover:bg-zinc-700 cursor-default"
                        onClick={() => handleSearchClick(suggestion)}
                      >
                        <IoSearch className="text-white text-lg mr-2" />
                        {suggestion}
                      </li>
                    </Link>
                  ))}
                </ul>
              </div>
            )}
          </div>

          <div className="flex items-center absolute top-4 right-0 md:top-0 md:relative">
            <div
              className="w-9 mr-5 rounded-full cursor-pointer"
              onClick={() => setIsPopUp(!isPopUp)}
            >
              <img src={user.photoURL} alt="" className="w-full rounded-full" />
            </div>
            {isPopUp && (
              <div className="absolute bg-neutral-900 p-4 right-16 top-1 rounded">
                <p className="font-semibold">{user.displayName}</p>
                <p className="font-semibold my-1">{user.email}</p>
                <button
                  className="bg-red-500 w-full mt-2 py-1.5 rounded font-semibold"
                  onClick={() => handleSignOut()}
                >
                  Sign out
                </button>
              </div>
            )}
          </div>
        </>
      )}
    </div>
  );
};
export default Header;
