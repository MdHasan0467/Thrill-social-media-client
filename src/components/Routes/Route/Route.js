import React from "react";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Notifications from "../../EXT/Notifications/Notifications";
import Main from "../../Layouts/Main/Main";
import Others from "../../Layouts/Others/Others";
import ProfileLeyar from "../../Layouts/ProfileLeyar/ProfileLeyar";
import AboutUs from "../../Pages/AboutUs/AboutUs";
import AdCenter from "../../Pages/AdCenter/AdCenter";
import ChatBox from "../../Pages/ChatBox/ChatBox";
import ChatNow from "../../Pages/ChatBox/ChatNow/ChatNow";
import DynamicChat from "../../Pages/ChatBox/DynamicChat/DynamicChat";
import { RealChat } from "../../Pages/ChatBox/RealChat/RealChat";
import CircularSliders from "../../Pages/CircularSliders/CircularSliders";
import CircularSlider from "../../Pages/CircularSliders/CircularSliders";
import DynamicFriendList from "../../Pages/DynamicFriendList/DynamicFriendList";
import DynamicFriendRequestList from "../../Pages/DynamicFriendRequestList/DynamicFriendRequestList";
import DynamicProfile from "../../Pages/DynamicProfile/DynamicProfile";
import Login from "../../Pages/Form/Login/Login";
import Signup from "../../Pages/Form/Signup/Signup";
import Friends from "../../Pages/Friends/Friends";
import Home from "../../Pages/Home/Home";
import Profile from "../../Pages/Profile/Profile";
import Quotes from "../../Pages/Quotes/Quotes";
import StopWatch from "../../Pages/StopWatch/StopWatch";

const Route = () => {
  const router = createBrowserRouter([
    {
      path: "/",
      element: <Main />,
      children: [
        {
          path: "/",
          element: <Home />,
        },
        {
          path: "/home",
          element: <Home />,
        },
      ],
    },

    //! Others
    {
      path: "/others",
      element: <Others />,
      children: [
        {
          path: "/others/quotes",
          element: <Quotes />,
        },
        {
          path: "/others/friends",
          element: <Friends />,
        },

        {
          path: "/others/chat",
          element: <ChatNow />,
        },

        {
          path: "/others/adCenter",
          element: <AdCenter />,
        },

        {
          path: "/others/stop-watch",
          element: <StopWatch />,
        },

        {
          path: "/others/notifications",
          element: <Notifications />,
        },

        {
          path: "/others/about-us",
          element: <AboutUs />,
        },

        {
          path: "/others/circularSliders",
          element: <CircularSliders />,
        },

        {
          path: "/others/:email",
          element: <DynamicProfile />,
          loader: ({ params }) =>
            fetch(`http://localhost:5001/dynamic/${params.email}`),
          // loader:({params})=>console.log(params),
        },

        {
          path: "/others/Dynamic-Friend-Request-List/:email",
          element: <DynamicFriendRequestList />,
          loader: ({ params }) =>
            fetch(
              `http://localhost:5001/Dynamic-Friend-Request-List/${params.email}`
            ),
          // loader:({params})=>console.log(params),
        },
      ],
    },

    //! Profile
    {
      path: "/profile",
      element: <ProfileLeyar />,
      children: [
        {
          path: "/profile",
          element: <Profile />,
        },

        {
          path: "/profile/Dynamic-Friend-List/:email",
          element: <DynamicFriendList />,
          loader: ({ params }) =>
            fetch(`http://localhost:5001/Dynamic-Friend-List/${params.email}`),
        },
      ],
    },

    {
      path: "/chat/:email",
      element: <DynamicChat />,
      loader: ({ params }) =>
        fetch(`http://localhost:5001/dynamic/${params.email}`),
    },

    {
      path: "/login",
      element: <Login />,
    },
    {
      path: "/signup",
      element: <Signup />,
    },
  ]);
  return <RouterProvider router={router} />;
};

export default Route;
