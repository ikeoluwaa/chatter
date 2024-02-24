import { useState } from "react";
import { ButtonGroup, Button } from "semantic-ui-react";

export default function FeedNavigation() {
  const [selectedFeed, setSelectedFeed] = useState("forYou");

  const handleFeedSelection = (feed: string) => {
    setSelectedFeed(feed);
    // Add logic to fetch and display the selected feed content
  };

  return (
    <div>
      <ButtonGroup>
        <Button
          toggle
          active={selectedFeed === "forYou"}
          onClick={() => handleFeedSelection("forYou")}
        >
          For You
        </Button>
        <Button
          toggle
          active={selectedFeed === "featured"}
          onClick={() => handleFeedSelection("featured")}
        >
          Featured
        </Button>
        <Button
          toggle
          active={selectedFeed === "recent"}
          onClick={() => handleFeedSelection("recent")}
        >
          Recent
        </Button>
      </ButtonGroup>
      {/* Add logic to display content based on the selected feed */}
    </div>
  );
}
