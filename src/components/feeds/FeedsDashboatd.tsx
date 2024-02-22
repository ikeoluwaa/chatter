import PostContentButton from "../PostContentButton";
import PostList from "./PostList";
import FeedNavigation from "../../features/nav/FeedNavigation";
import { useAppSelector } from "../../app/store/store";

export default function FeedsDashboard() {
const {posts}= useAppSelector(state => state.posts) 


    



 


  return (
    <div>
      <PostContentButton/>
      <FeedNavigation/>
      <div className="flex ">
          <PostList posts={posts}/>
      </div>
    </div>
  );
}
