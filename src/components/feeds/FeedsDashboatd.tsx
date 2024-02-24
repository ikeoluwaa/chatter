import PostContentButton from "../PostContentButton";
import PostList from "./PostList";
import FeedNavigation from "../../features/nav/FeedNavigation";
import { useAppSelector } from "../../app/store/store";
import { useEffect } from "react";
import NavBar from "../../features/nav/NavBar";
import LoadingComponent from "../../app/layout/LoadingComponent";
import { actions } from "./feedSlice";
import { useFireStore } from "../../app/hooks/firestore/useFirestore";

export default function FeedsDashboard() {
  const { data: posts, status } = useAppSelector((state) => state.posts);
  const { loadCollection } = useFireStore("posts");

  useEffect(() => {
    loadCollection(actions);
  }, [loadCollection]);

  if (status === "loading") return <LoadingComponent />;

  return (
    <div>
      <NavBar />
      <PostContentButton />
      <FeedNavigation />
      <div className="flex ">
        <PostList posts={posts} />
      </div>
    </div>
  );
}
