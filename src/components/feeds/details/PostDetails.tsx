import { useState, useEffect } from "react";
import {
  Button,
  Feed,
  Header,
  Icon,
  Image,
  Item,
  ItemContent,
  ItemGroup,
  Segment,
} from "semantic-ui-react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { arrayRemove, arrayUnion } from "firebase/firestore";

import { useFireStore } from "../../../app/hooks/firestore/useFirestore";
import { format } from "date-fns";
import { AppFeed } from "../../../app/types/feeds";
import { useAppDispatch, useAppSelector } from "../../../app/store/store";
import { openModal } from "../../../app/common/modals/modalSlice";

type Props = {
  post: AppFeed;
};

export default function PostDetails({ post }: Props) {
  const { remove } = useFireStore("posts");
  const { currentUser } = useAppSelector((state) => state.auth);
  const { update } = useFireStore("posts");
  const [, setLoading] = useState(false);
  const [liked, setLiked] = useState(false);
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const handleDelete = async (postId: string) => {
    await remove(postId);
    navigate("/feeds");
  };

  const location = useLocation();

  useEffect(() => {
    if (
      currentUser &&
      post.likes?.some((liker) => liker.id === currentUser.uid)
    ) {
      setLiked(true);
    } else {
      setLiked(false);
    }
  }, [currentUser, post.likes]);

  async function handleLikes() {
    if (!currentUser) {
      setLiked(false); // Reset liked state
      setLoading(false);
      return navigate("/unauthorised", { state: { from: location.pathname } });
    }

    setLoading(true);
    if (liked) {
      await update(post.id, {
        likes: arrayRemove({
          id: currentUser.uid,
          displayName: currentUser.displayName,
          photoURL: currentUser.photoURL,
        }),
        likerIds: arrayRemove(currentUser.uid),
      });
      setLiked(false);
    } else {
      await update(post.id, {
        likes: arrayUnion({
          id: currentUser.uid,
          displayName: currentUser.displayName,
          photoURL: currentUser.photoURL,
        }),
        likerIds: arrayUnion(currentUser.uid),
      });
      setLiked(true);
    }
    setLoading(false);
  }

  return (
    <>
      <Segment attached style={{ border: "none", width: "70%" }}>
        <Feed>
          <ItemGroup>
            <Item>
              <ItemContent>
                <Item.Header className="post-content-header">
                  <div className="author-info">
                    <Image
                      alt="Author Avatar"
                      src={post.authorPhotoURL || "/user.png"}
                      size="tiny"
                      circular
                      className="author-avatar"
                    />
                    <div>
                      <Header
                        as={Link}
                        to={`/profiles/${post.id}`}
                        style={{ marginBottom: "0.5rem", fontSize: "1.5rem" }}
                      >
                        {post.author}
                      </Header>
                      <Header.Subheader style={{ color: "#495057" }}>
                        {post.occupation}
                        {post.date &&
                          typeof post.date === "string" &&
                          format(new Date(post.date), "dd MMM yyyy HH:mm")}
                      </Header.Subheader>
                    </div>
                  </div>
                </Item.Header>
                <ItemContent className="post-title">{post.title}</ItemContent>
                <p>{post.content}</p>
                {post.postPhotoURL && (
                  <Image src={post.postPhotoURL} alt="Post Image" />
                )}
                {post.postVideoURL && (
                  <video controls>
                    <source src={post.postVideoURL} type="video/mp4" />
                    Your browser does not support the video tag.
                  </video>
                )}
              </ItemContent>
            </Item>
          </ItemGroup>
          <div className="statistics">
            <Feed.Meta
              onClick={() => dispatch(openModal({ type: "PostFeedComment" }))}
            >
              <Icon name="comment" />
              {post.comments && post.comments.length}
            </Feed.Meta>
            <Feed.Meta onClick={handleLikes} style={{ color: "pink" }}>
              <Feed.Like style={{ color: "black", cursor: "pointer" }}>
                <Icon name="like" color={liked ? "red" : undefined} />
                {post.likes?.length}
              </Feed.Like>
            </Feed.Meta>
            <Feed.Meta>
              <Feed.Like>
                <Icon name="save" />
                {post.views && post.views.length} Views
              </Feed.Like>
            </Feed.Meta>
          </div>
          {post.isAuthor ? (
            <>
              <Button
                style={{
                  marginTop: "1rem",
                  backgroundColor: "#543EE0",
                  color: "white",
                  borderRadius: "0.5rem",
                }}
                onClick={() => handleDelete(post.id)}
                content="Delete post"
              />
              <Button
                as={Link}
                to={`/manage/${post.id}`}
                floated="right"
                style={{
                  marginTop: "1rem",
                  backgroundColor: "#543EE0",
                  color: "white",
                  borderRadius: "0.5rem",
                }}
              >
                Edit Post
              </Button>
            </>
          ) : (
            <Button
              content="Feeds"
              as={Link}
              to="/feeds"
              style={{
                marginTop: "1rem",
                backgroundColor: "#543EE0",
                color: "white",
                borderRadius: "0.5rem",
              }}
            />
          )}
        </Feed>
      </Segment>
    </>
  );
}
