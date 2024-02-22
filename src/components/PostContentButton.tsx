import { NavLink } from "react-router-dom";
import { Button } from "semantic-ui-react";



function PostContentButton() {
  return (
    <Button className="post-content-button" as={NavLink} to='/createPost'>
      Post a content
    </Button >
  );
}

export default PostContentButton;
