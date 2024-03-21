import { useState } from "react";
import {
  Button,
  Divider,
  Header,
  Segment,
  Transition,
} from "semantic-ui-react";
import { AppFeed } from "../../../app/types/feeds";
import { format } from "date-fns";
import PostLikeListModal from "../../../app/common/modals/PostLikeListModal";
import PostViewListModal from "../../../app/common/modals/PostViewListModal";
import PostBookmarkListModal from "../../../app/common/modals/PostBookmarkListModal";

type Props = {
  post: AppFeed;
};

export default function PostDetailsSummary({ post }: Props) {
  const [likeListVisible, setLikeListVisible] = useState(false);
  const [viewListVisible, setViewListVisible] = useState(false);
  const [bookmarksVisible, setBookmarksVisible] = useState(false);
  const [clickedDate, setClickedDate] = useState(new Date());

  const toggleLikeListVisibility = () => {
    setLikeListVisible((prevVisible) => !prevVisible);
    setClickedDate(new Date());
  };

  const toggleViewListVisibility = () => {
    setViewListVisible((prevVisible) => !prevVisible);
    setClickedDate(new Date());
  };

  const toggleBookmarksVisibility = () => {
    setBookmarksVisible((prevVisible) => !prevVisible);
    setClickedDate(new Date());
  };

  const formattedDate = format(clickedDate, "MMM yyyy");

  return (
    <>
      <Segment attached="top" style={{ border: "none" }}>
        <Header content="Post Summary" />
        <p>{formattedDate} summary</p>

        <Divider style={{ border: "2px solid #543EE0" }} />

        <div>
          <div>
            <Header>
              <p>Post likes</p>
              <div style={{ display: "flex", gap: "1rem" }}>
                <p>
                  {post.likes?.length}{" "}
                  <span>
                    {post.likes?.length === 0 || post.likes?.length === 1
                      ? "like"
                      : "likes"}
                  </span>
                </p>
                <span>
                  <Button
                    icon="angle down"
                    style={{
                      backgroundColor: "#543EE0",
                      border: "none",
                      color: "white",
                    }}
                    circular
                    onClick={toggleLikeListVisibility}
                  />
                </span>
              </div>
            </Header>

            <Divider hidden />

            <Transition.Group animation="slide down" duration={600}>
              {likeListVisible && (
                <PostLikeListModal
                  post={post}
                  open={likeListVisible}
                  onClose={() => setLikeListVisible(false)}
                />
              )}
            </Transition.Group>
          </div>
          <div>
            <Header>
              <p>Post views</p>
              <div style={{ display: "flex", gap: "1rem" }}>
                <p>
                  {post.views?.length}{" "}
                  <span>
                    {post.views?.length === 0 || post.views?.length === 1
                      ? "view"
                      : "views"}
                  </span>
                </p>
                <span>
                  <Button
                    icon="angle down"
                    style={{
                      backgroundColor: "#543EE0",
                      border: "none",
                      color: "white",
                    }}
                    circular
                    onClick={toggleViewListVisibility}
                  />
                </span>
              </div>
            </Header>

            <Divider hidden />

            <Transition.Group animation="slide down" duration={600}>
              {viewListVisible && (
                <PostViewListModal
                  post={post}
                  open={viewListVisible}
                  onClose={() => setViewListVisible(false)}
                />
              )}
            </Transition.Group>
          </div>
          <div>
            <Header>
              <p>Bookmarks</p>
              <div style={{ display: "flex", gap: "1rem" }}>
                <p>
                  {post.bookmarks?.length}{" "}
                  <span>
                    {post.bookmarks?.length === 0 ||
                    post.bookmarks?.length === 1
                      ? "Bookmark"
                      : "Bookmarks"}
                  </span>
                </p>
                <span>
                  <Button
                    icon="angle down"
                    style={{
                      backgroundColor: "#543EE0",
                      border: "none",
                      color: "white",
                    }}
                    circular
                    onClick={toggleBookmarksVisibility}
                  />
                </span>
              </div>
              <Divider hidden />
              <Transition.Group animation="slide down" duration={800}>
                {bookmarksVisible && (
                  <PostBookmarkListModal
                    post={post}
                    open={bookmarksVisible}
                    onClose={() => setBookmarksVisible(false)}
                  />
                )}
              </Transition.Group>
            </Header>
          </div>
        </div>
      </Segment>
    </>
  );
}
