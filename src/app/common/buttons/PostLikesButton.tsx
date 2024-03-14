import React, { useState } from "react";
import { Modal } from "semantic-ui-react";

type Props = {
  likes: LikedBy[];
};

const PostLikesButton: React.FC<Props> = ({ likes }) => {
  const [showLikesModal, setShowLikesModal] = useState(false);

  const handleLikesTextClick = () => {
    setShowLikesModal(true);
  };

  const handleCloseLikesModal = () => {
    setShowLikesModal(false);
  };

  return (
    <>
      <span onClick={handleLikesTextClick} style={{ cursor: "pointer" }}>
        Likes
      </span>
      {showLikesModal && (
        <Modal open onClose={handleCloseLikesModal} trigger={null}>
          <Modal.Header>Likes</Modal.Header>
          <Modal.Content>
            <PostLikeList likes={likes} />
          </Modal.Content>
        </Modal>
      )}
    </>
  );
};

export default PostLikesButton;
