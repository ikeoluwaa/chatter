import { Item, Segment, Image } from "semantic-ui-react";
import { AppFeed, View } from "../../app/types/feeds";
import { Link } from "react-router-dom";

type Props = {
  post: AppFeed;
};

export default function PostViewList({ post }: Props) {
  const viewsCount = post.views ? post.views.length : 0;
  post.views?.map((viewer: View) =>
    console.log(
      viewer.photoURL || "Photo URL not available",
      viewer.displayName || "Display name not available"
    )
  );
  return (
    <>
      <Segment
        textAlign="center"
        style={{
          border: "none",
          overflowY: "scroll",
          color: "black",
          backgroundColor: "#fff",
        }}
        attached="top"
        secondary
        inverted
      >
        {viewsCount === 0
          ? "No Views yet"
          : viewsCount === 1
            ? "1 Person Viewed This Post"
            : `${viewsCount} People Viewed This Post`}
      </Segment>
      <Segment attached>
        <Item.Group relaxed divided>
          {post.views &&
            post.views.map((viewer: View) => (
              <Item style={{ position: "relative" }} key={viewer.id}>
                <div
                  style={{
                    display: "flex",
                    alignItems: "center",
                    gap: "0.6rem",
                  }}
                >
                  <Image
                    className="analysis-profile-image"
                    as={Link}
                    to={`/profiles/${viewer.id}`}
                    size="tiny"
                    src={viewer.photoURL || "/user.png"}
                    circular
                  />
                  <Item.Content>
                    <Item.Header
                      style={{ textAlign: "center", fontSize: "1.4rem" }}
                      as={Link}
                      to={`/profiles/${viewer.id}`}
                    >
                      <span>{viewer.displayName}</span>
                    </Item.Header>
                  </Item.Content>
                </div>
              </Item>
            ))}
        </Item.Group>
      </Segment>
    </>
  );
}
