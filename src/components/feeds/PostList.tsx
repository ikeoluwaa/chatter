import { AppFeed } from "../../app/types/feeds";
import PostListItem from "./PostListItems";

type Props = {
  posts : AppFeed[];
}

export default function PostList({posts}:Props) {
  return (
    <div className="feed-screen">
      <div className="feed-content">
        <h2>Feed</h2>
    
        
        {posts.map((post) => (
          <PostListItem post = {post} key={post.id}/>
        )
           
           )}
      
       
       
      </div>
    </div>
  );
}
