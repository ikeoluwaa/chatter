// PostViewListModal.tsx
import { Modal } from "semantic-ui-react";
import { AppFeed } from "../../types/feeds";
import PostViewList from "../../../components/feeds/PostViewList";

type Props = {
  post: AppFeed;
  open: boolean;
  onClose: () => void;
};

export default function PostViewListModal({ post, open, onClose }: Props) {
  return (
    <Modal closeIcon open={open} onClose={onClose}>
      <Modal.Header>Post View List</Modal.Header>
      <Modal.Content>
        <PostViewList post={post} />
      </Modal.Content>
      <Modal.Actions></Modal.Actions>
    </Modal>
  );
}
