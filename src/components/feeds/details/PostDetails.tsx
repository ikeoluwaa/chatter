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
import { useCommentCount } from "../../../app/hooks/customhooks/useCommentCount ";

type Props = {
  post: AppFeed;
};

export default function PostDetails({ post }: Props) {
  const { remove } = useFireStore("posts");
  const { currentUser } = useAppSelector((state) => state.auth);
  const { update } = useFireStore("posts");
  const [, setLoading] = useState(false);
  const [liked, setLiked] = useState(false);
  const [bookmarked, setBookmarked] = useState(false); // State for bookmarked status
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const scrollToSection = (id: any) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
  };

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
    if (
      currentUser &&
      post.bookmarks?.some((bookmark) => bookmark.id === currentUser.uid)
    ) {
      setBookmarked(true);
    } else {
      setBookmarked(false);
    }
  }, [currentUser, post.likes, post.bookmarks]);

  const commentCount = useCommentCount(post.id);

  async function handleBookmark() {
    if (!currentUser) {
      setLoading(false);
      return navigate("/unauthorised", { state: { from: location.pathname } });
    }

    setLoading(true);
    if (bookmarked) {
      await update(post.id, {
        bookmarks: arrayRemove({
          id: currentUser.uid,
          displayName: currentUser.displayName,
          photoURL: currentUser.photoURL,
        }),
        bookmarkedIds: arrayRemove(currentUser.uid),
      });
      setBookmarked(false); // Toggle bookmarked state
    } else {
      await update(post.id, {
        bookmarks: arrayUnion({
          id: currentUser.uid,
          displayName: currentUser.displayName,
          photoURL: currentUser.photoURL,
        }),
        bookmarkedIds: arrayUnion(currentUser.uid),
      });
      setBookmarked(true); // Toggle bookmarked state
    }
    setLoading(false);
  }

  async function handleLikes() {
    if (!currentUser) {
      setLiked(false);
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
      <Segment attached style={{ border: "none" }}>
        <Feed>
          <ItemGroup>
            <Button
              size="medium"
              floated="right"
              style={{ border: "none", backgroundColor: "transparent" }}
              onClick={handleBookmark}
            >
              <Icon
                size="big"
                name="bookmark"
                floated="right"
                style={{
                  color: bookmarked ? "#543EE0" : "rgba(0, 0, 0, 0.87)",
                }}
              />
            </Button>

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
                      as={Link}
                      to={`/profiles/${post.authorUid}`}
                    />
                    <div>
                      <Header
                        as={Link}
                        to={`/profiles/${post.authorUid}`}
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
                <p className="post-content">{post.content}</p>
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
              <Icon
                name="comment"
                onClick={() => scrollToSection("comments")}
              />
              {commentCount}
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
