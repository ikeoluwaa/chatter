import { Item, Segment, Image } from "semantic-ui-react";
import { Link } from "react-router-dom";
import { AppFeed } from "../../../app/types/feeds";

type Props = {
  post: AppFeed;
};

export default function PostLikeList({ post }: Props) {
  const likesCount = post.likes ? post.likes.length : 0;

  return (
    <>
      <Segment
        textAlign="center"
        style={{
          border: "none",
          overflowY: "auto",
          color: "#000",
          backgroundColor: "#fff",
        }}
        attached="top"
        secondary
        inverted
      >
        {likesCount === 0
          ? "No Likes Yet"
          : likesCount === 1
            ? "1 Person Liked This Post"
            : `${likesCount} People Liked This Post`}
      </Segment>
      <Segment attached>
        <Item.Group divided>
          {post.likes &&
            post.likes.map((liker) => (
              <Item key={liker.id}>
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
                    to={`/profiles/${liker.id}`}
                    size="tiny"
                    src={liker.photoURL || "/user.png"}
                    circular
                  />
                  <Item.Content verticalAlign="middle">
                    <Item.Header
                      as={Link}
                      to={`/profiles/${liker.id}`}
                      style={{ color: "#000", fontWeight: "bold" }}
                    >
                      {liker.displayName}
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
