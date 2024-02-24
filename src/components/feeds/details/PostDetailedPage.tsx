import { useParams } from "react-router-dom";
import { useAppSelector } from "../../../app/store/store";
import PostDetails from "./PostDetails";
import PostComments from "./PostComments";
import { useEffect } from "react";
import { actions } from "../feedSlice";
import LoadingComponent from "../../../app/layout/LoadingComponent";
import { Grid, GridRow } from "semantic-ui-react";
import { useFireStore } from "../../../app/hooks/firestore/useFirestore";

export default function PostDetailedPage() {
  const { id } = useParams();
  const post = useAppSelector((state) =>
    state.posts.data.find((e) => e.id === id)
  );
  const { status } = useAppSelector((state) => state.posts);
  const { loadDocument } = useFireStore("posts");

  useEffect(() => {
    if (!id) return;
    loadDocument(id, actions);
  }, [id, loadDocument]);

  if (status === "loading") return <LoadingComponent />;

  if (!post) return <h2>Post not found</h2>;

  return (
    <>
      <Grid>
        <GridRow>
          <PostDetails post={post} />
        </GridRow>
        <GridRow>
          <PostComments />
        </GridRow>
      </Grid>
    </>
  );
}
