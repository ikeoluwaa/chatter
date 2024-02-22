import { NavLink } from "react-router-dom";
import { Button } from "semantic-ui-react";


const FeedButton = () => {
  return (
    <Button className="feed-button" as={NavLink} to='/feeds'>
      Feed
    </Button>
  );
};

export default FeedButton;
