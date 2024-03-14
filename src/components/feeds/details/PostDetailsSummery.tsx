// PostDetailsSummary.tsx
import { useState, useEffect } from "react";
import {
  Button,
  Divider,
  Grid,
  Header,
  Icon,
  Segment,
  Transition,
} from "semantic-ui-react";
import { AppFeed } from "../../../app/types/feeds";
import PostViewList from "../PostViewList";
import PostLikeList from "./PostLikeList";
import { format } from "date-fns";

type Props = {
  post: AppFeed;
};

export default function PostDetailsSummary({ post }: Props) {
  const [likeListVisible, setLikeListVisible] = useState(false);
  const [viewListVisible, setViewListVisible] = useState(false);
  const [clickedDate, setClickedDate] = useState(new Date());
  const [liked, setLiked] = useState(false);

  useEffect(() => {
    if (liked) {
      setTimeout(() => setLiked(false), 2000);
    }
  }, [liked]);

  const toggleLikeListVisibility = () => {
    setLikeListVisible((prevVisible) => !prevVisible);
    setLiked(true);
    setClickedDate(new Date());
  };

  const toggleViewListVisibility = () => {
    setViewListVisible((prevVisible) => !prevVisible);
    setClickedDate(new Date());
  };

  const formattedDate = format(clickedDate, "MMM yyyy");

  return (
    <>
      <Segment attached="top" style={{ border: "none" }}>
        <Header content="Post Summary" />
        <p>{formattedDate} summary</p>

        <Divider style={{ border: "2px solid #543EE0" }} />

        <Grid>
          <Grid.Column width={16}>
            <Header>
              <p>
                <Icon
                  name="like"
                  style={{
                    color: "#543EE0",
                  }}
                />
                {post.likes?.length}{" "}
                {post.likes?.length === 0 || post.likes?.length === 1
                  ? "like"
                  : "likes"}
              </p>
              <Button
                style={{
                  backgroundColor: "#543EE0",
                  border: "none",
                  color: "white",
                }}
                content={
                  likeListVisible
                    ? "Hide Post Like List"
                    : "Show Post Like List"
                }
                onClick={toggleLikeListVisibility}
              />
            </Header>

            <Divider hidden />

            <Transition.Group animation="slide down" duration={600}>
              {likeListVisible && <PostLikeList key="likeList" post={post} />}
            </Transition.Group>
          </Grid.Column>

          <Grid.Column width={16}>
            <Header>
              <p>
                <Icon
                  name="eye"
                  style={{
                    color: "#543EE0",
                  }}
                />
                {post.views?.length}{" "}
                {post.views?.length === 0 || post.views?.length === 1
                  ? "view"
                  : "views"}
              </p>
            </Header>
            <Button
              style={{
                backgroundColor: "#543EE0",
                border: "none",
                color: "white",
              }}
              content={
                viewListVisible ? "Hide Post View List" : "Show Post View List"
              }
              onClick={toggleViewListVisibility}
            />
            <Divider hidden />
            <Transition.Group animation="slide down" duration={800}>
              {viewListVisible && <PostViewList key="viewList" post={post} />}
            </Transition.Group>
          </Grid.Column>
        </Grid>
      </Segment>
    </>
  );
}
