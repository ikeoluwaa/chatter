import { NavLink } from "react-router-dom";
import { Button, Icon } from "semantic-ui-react";

function PostContentButton() {
  return (
    <Button
      style={{
        backgroundColor: "#543EE0",
        color: "white",
        borderRadius: "0.5rem",
      }}
      className="post-content-button"
      as={NavLink}
      to="/createPost"
    >
      <Icon name="pencil" />
      Post a content
    </Button>
  );
}

export default PostContentButton;
