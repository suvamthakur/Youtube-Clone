import "./App.css";
import Body from "./components/Body";
import { Provider } from "react-redux";
import appStore from "./utils/appStore";
import { RouterProvider, createBrowserRouter } from "react-router-dom";
import MainContainer from "./components/MainContainer";
import WatchPage from "./components/WatchPage";
import SearchPage from "./components/SearchPage";
import Login from "./components/Login";

const appRouter = createBrowserRouter([
  {
    path: "/",
    element: <Login />,
  },
  {
    path: "/main",
    element: <Body />,
    children: [
      {
        path: "",
        element: <MainContainer />,
      },
      {
        path: "watch",
        element: <WatchPage />,
      },
      {
        path: "search",
        element: <SearchPage />,
      },
    ],
  },
]);

function App() {
  return (
    <Provider store={appStore}>
      <RouterProvider router={appRouter}></RouterProvider>
    </Provider>
  );
}

export default App;
