import { useAppDispatch, useAppSelector } from "../../app/store/store";
import { useCallback, useEffect, useState } from "react";
import { actions } from "./feedSlice";
import { useFireStore } from "../../app/hooks/firestore/useFirestore";
import PostListItemPlaceholder from "./PostListItemPlaceholder";
import { QueryOptions } from "../../app/hooks/firestore/types";
import FeedFilters from "./FeedFilters";

export default function FeedsDashboard() {
  const dispatch = useAppDispatch();

  const {
    data: posts,
    status,
    loadedInitial,
  } = useAppSelector((state) => state.posts);
  const { loadCollection, hasMore } = useFireStore("posts");

  const [query, setQuery] = useState<QueryOptions[]>([
    { attribute: "date", operator: "<=", value: new Date().toISOString() },
  ]);

  const loadPosts = useCallback(
    async (reset?: boolean) => {
      loadCollection(actions, {
        queries: query,
        limit: 2,
        sort: { attribute: "date", order: "asc" },
        pagination: true,
        reset,
        get: true,
      });
    },
    [loadCollection, query]
  );

  useEffect(() => {
    loadPosts(true);

    return () => {
      dispatch(actions.reset());
    };
  }, [loadPosts, dispatch]);

  function loadMore() {
    loadPosts();
  }

  return (
    <div>
      {!loadedInitial ? (
        <>
          <PostListItemPlaceholder />
          <PostListItemPlaceholder />
        </>
      ) : (
        <>
          <FeedFilters
            setQuery={setQuery}
            posts={posts || []}
            hasMore={hasMore.current}
            loadMore={loadMore}
            loading={status === "loading"}
          />
        </>
      )}
    </div>
  );
}
