import { Item, Segment, Image } from "semantic-ui-react";
import { Link } from "react-router-dom";
import { AppFeed, Bookmarks } from "../../../app/types/feeds";

type Props = {
  post: AppFeed;
};

export default function PostBookmarkList({ post }: Props) {
  const bookmarksCount = post.bookmarks ? post.bookmarks.length : 0;
  post.bookmarks?.map((bookmarked: Bookmarks) =>
    console.log(
      bookmarked.photoURL || "Photo URL not available",
      bookmarked.displayName || "Display name not available"
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
        {bookmarksCount === 0
          ? "No Views yet"
          : bookmarksCount === 1
            ? "1 Person Viewed This Post"
            : `${bookmarksCount} People Viewed This Post`}
      </Segment>
      <Segment attached>
        <Item.Group relaxed divided>
          {post.bookmarks &&
            post.bookmarks.map((bookmarked: Bookmarks) => (
              <Item style={{ position: "relative" }} key={bookmarked.id}>
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
                    to={`/profiles/${bookmarked.id}`}
                    size="tiny"
                    src={bookmarked.photoURL || "/user.png"}
                    circular
                  />
                  <Item.Content>
                    <Item.Header
                      style={{ textAlign: "center", fontSize: "1.4rem" }}
                      as={Link}
                      to={`/profiles/${bookmarked.id}`}
                    >
                      <span>{bookmarked.displayName}</span>
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
