import { Modal, Button } from "semantic-ui-react";
import PostComments from "./details/PostComments";

const CommentsModal = ({ postId, open, onClose }: any) => {
  return (
    <Modal closeIcon open={open} onClose={onClose}>
      <Modal.Header>Comments</Modal.Header>
      <Modal.Content>
        <PostComments postId={postId} />
      </Modal.Content>
      <Modal.Actions>
        <Button color="black" onClick={onClose}>
          Close
        </Button>
      </Modal.Actions>
    </Modal>
  );
};

export default CommentsModal;
