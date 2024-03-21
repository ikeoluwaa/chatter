// PostViewListModal.tsx
import { Modal } from "semantic-ui-react";
import { AppFeed } from "../../types/feeds";
import PostBookmarkList from "../../../components/feeds/details/PostBookmarkList";

type Props = {
  post: AppFeed;
  open: boolean;
  onClose: () => void;
};

export default function PostBookmarkListModal({ post, open, onClose }: Props) {
  return (
    <Modal closeIcon open={open} onClose={onClose}>
      <Modal.Header>Post Bookmarks</Modal.Header>
      <Modal.Content>
        <PostBookmarkList post={post} />
      </Modal.Content>
      <Modal.Actions></Modal.Actions>
    </Modal>
  );
}
