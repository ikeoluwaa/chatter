import { useEffect } from "react";
import { useParams } from "react-router-dom";
import ModalWrapper from "../../app/common/modals/ModalWrapper";
import { useFireStore } from "../../app/hooks/firestore/useFirestore";
import { useAppSelector } from "../../app/store/store";
import PostComments from "./details/PostComments";
import { actions } from "./feedSlice";

export default function PostFeedComment() {
  const { id } = useParams();
  const post = useAppSelector((state) =>
    state.posts.data.find((e) => e.id === id)
  );
  const { loadDocument } = useFireStore("posts");

  useEffect(() => {
    if (!id) return;
    loadDocument(id, actions);
  }, [id, loadDocument]);

  return (
    <ModalWrapper>
      <PostComments postId={post?.id && post.id} />
    </ModalWrapper>
  );
}
