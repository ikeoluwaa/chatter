import { createBrowserRouter } from "react-router-dom";
import App from "../layout/App";
import FeedsDashboard from "../../components/feeds/FeedsDashboard";
import PostForm from "../../components/feeds/PostForm.";

import PostDetailedPage from "../../components/feeds/details/PostDetailedPage";
import Scatch from "../../features/scratch/Scatch";
import AccountPage from "../../features/auth/AccountPage";
import ProfilePage from "../../features/profiles/ProfilePage";
import RequireAuth from "./RequireAuth";
import UnauthComponent from "../layout/UnauthComponent";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      {
        element: <RequireAuth />,
        children: [
          { path: "/manage/:id", element: <PostForm /> },
          { path: "/profiles/:id", element: <ProfilePage /> },
          { path: "/createPost", element: <PostForm key="create" /> },
          { path: "/account", element: <AccountPage /> },
        ],
      },
      {
        path: "/feeds",
        element: <FeedsDashboard />,
      },
      {
        path: "/CreatePost",
        element: <PostForm key="create" />,
      },
      {
        path: "/posts/:id",
        element: <PostDetailedPage />,
      },
      { path: "/Scatch", element: <Scatch /> },
      { path: "/Scatch", element: <Scatch /> },
      { path: "/Likes", element: <Scatch /> },

      { path: "/unauthorised", element: <UnauthComponent /> },
    ],
  },
]);
