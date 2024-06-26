import { Outlet, useLocation } from "react-router-dom";
import SideBar from "./SideBar";
import Header from "./Header";
import { useSelector } from "react-redux";

const Body = () => {
  const isMenuOpen = useSelector((store) => store.app.isMenuOpen);

  // Checking the route for [position: absolute <SideBar/>]
  const location = useLocation();

  return (
    <div>
      <Header />
      <div className="flex">
        <div
          className={
            isMenuOpen
              ? location.pathname === "/main/watch"
                ? "fixed bg-neutral-950 md:w-1/6 z-30"
                : "z-30 md:w-1/6 "
              : "w-0"
          }
        >
          <div
            className={
              (location.pathname === "/main/watch"
                ? "md:w-1/6"
                : "fixed md:sticky w-5/12 ") +
              " md:w-full top-[65px] bg-neutral-950"
            }
          >
            <SideBar />
          </div>
        </div>
        <div
          className={
            isMenuOpen
              ? location.pathname === "/main/watch"
                ? "w-full"
                : " w-full md:w-5/6"
              : "w-full"
          }
        >
          <Outlet />
        </div>
      </div>
    </div>
  );
};
export default Body;
