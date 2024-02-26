import { createBrowserRouter } from "react-router-dom";
import App from "../layout/App";
import FeedsDashboard from "../../components/feeds/FeedsDashboatd";
import PostForm from "../../components/feeds/PostForm.";

import PostDetailedPage from "../../components/feeds/details/PostDetailedPage";
import Scatch from "../../features/scratch/Scatch";
import AccountPage from "../../features/auth/AccountPage";
import ProfilePage from "../../features/profiles/ProfilePage";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
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

      { path: "/profiles/:id", element: <ProfilePage /> },
      { path: "/manage/:id", element: <PostForm /> },
      { path: "/account", element: <AccountPage /> },
    ],
  },
]);
