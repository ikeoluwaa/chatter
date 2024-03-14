import InfiniteScroll from "react-infinite-scroller";
import { AppFeed } from "../../app/types/feeds";
import PostListItem from "./PostListItems";

type Props = {
  posts: AppFeed[];
  loadMore: () => void;
  hasMore: boolean | { current: boolean };
  loading: boolean;
};

export default function PostList({ posts, loadMore, hasMore, loading }: Props) {
  const hasMoreValue = typeof hasMore === "boolean" ? hasMore : hasMore.current;

  return (
    <div>
      <div
        className="feed-content"
        style={{ border: "1px solid #ADB5BD", backgroundColor: "white" }}
      >
        <div>
          {posts.length !== 0 && (
            <InfiniteScroll
              pageStart={0}
              loadMore={loadMore}
              hasMore={!loading && hasMoreValue}
              initialLoad={false}
            >
              {posts.map((post) => (
                <PostListItem key={post.id} post={post} />
              ))}
            </InfiniteScroll>
          )}
        </div>
      </div>
    </div>
  );
}
