// PostLikeListModal.tsx
import { Modal } from "semantic-ui-react";
import { AppFeed } from "../../types/feeds";
import PostLikeList from "../../../components/feeds/details/PostLikeList";

type Props = {
  post: AppFeed;
  open: boolean;
  onClose: () => void;
};

export default function PostLikeListModal({ post, open, onClose }: Props) {
  return (
    <Modal closeIcon open={open} onClose={onClose}>
      <Modal.Header>Post Like List</Modal.Header>
      <Modal.Content>
        <PostLikeList post={post} />
      </Modal.Content>
      <Modal.Actions></Modal.Actions>
    </Modal>
  );
}
