import { useState, useEffect } from "react";
import {
  Button,
  Divider,
  Feed,
  Header,
  Icon,
  Image,
  Item,
  ItemContent,
  ItemGroup,
} from "semantic-ui-react";
import { Link, useLocation, useNavigate, useParams } from "react-router-dom";
import { useAppSelector } from "../../app/store/store";
import { useFireStore } from "../../app/hooks/firestore/useFirestore";
import { arrayRemove, arrayUnion } from "firebase/firestore";
import { format } from "date-fns";
import { actions } from "./feedSlice";
import CommentsModal from "./CommentsModal";
import { AppFeed } from "../../app/types/feeds";
import { useCommentCount } from "../../app/hooks/customhooks/useCommentCount ";

type Props = {
  post: AppFeed;
};

export default function PostListItem({ post }: Props) {
  const { currentUser } = useAppSelector((state) => state.auth);
  const { update } = useFireStore("posts");
  const [loading, setLoading] = useState(false);
  const [liked, setLiked] = useState(false);
  const [showComments, setShowComments] = useState(false);

  const [modalOpen, setModalOpen] = useState(false);
  const { authenticated } = useAppSelector((state) => state.auth);
  const { id } = useParams();
  const { loadDocument } = useFireStore("posts");

  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    if (!id) return;
    loadDocument(id, actions);
  }, [id, loadDocument]);

  const commentCount = useCommentCount(post.id);

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

  async function handleViews() {
    if (!currentUser || !authenticated) {
      return navigate("/unauthorised", { state: { from: location.pathname } });
    }

    try {
      if (post.isUser) {
        const user = post.views.find((x) => x.id === currentUser.uid);
        await update(post.id, {
          views: arrayRemove(user),
          viewedByIds: arrayRemove(currentUser.uid),
        });
      } else {
        navigate(`/posts/${post.id}`);
        await update(post.id, {
          views: arrayUnion({
            id: currentUser.uid,
            displayName: currentUser.displayName,
            photoURL: currentUser.photoURL,
          }),
          userIds: arrayUnion(currentUser.uid),
        });
      }
      setLoading(false);
    } catch (error) {
      console.error("Error handling views:", error);
      setLoading(false);
    }
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

  async function handleComment() {
    setShowComments(!showComments);
    setModalOpen(true);
  }

  const closeModal = () => setModalOpen(false);

  return (
    <>
      <Feed style={{ height: "auto", overflowY: "auto" }}>
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
              <p>{post.content}</p>
              <div
                style={{
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                  marginTop: "2rem",
                }}
              >
                {post.postPhotoURL && (
                  <Image
                    // style={{
                    //   width: "100%",
                    //   height: "auto",
                    //   maxHeight: "300px",
                    // }}
                    src={post.postPhotoURL}
                    alt="Post Image"
                    size="big"
                  />
                )}
                {post.postVideoURL && (
                  <video
                    style={{
                      width: "100%",
                      height: "auto",
                      maxHeight: "300px",
                    }}
                    controls
                  >
                    <source src={post.postVideoURL} type="video/mp4" />
                    Your browser does not support the video tag.
                  </video>
                )}
              </div>
            </ItemContent>
          </Item>
        </ItemGroup>
        <div className="statistics">
          <Feed.Meta onClick={handleComment}>
            <Feed>
              <Icon name="comment" />
              {commentCount}
            </Feed>
          </Feed.Meta>
          <Feed.Meta onClick={handleLikes} style={{ color: "pink" }}>
            <Feed.Like style={{ color: "black", cursor: "pointer" }}>
              <Icon name="like" color={liked ? "red" : undefined} />
              {post.likes?.length}
            </Feed.Like>
          </Feed.Meta>
          <Feed.Meta>
            <Feed>
              <Icon name="save" />
              {post.views && post.views.length} Views
            </Feed>
          </Feed.Meta>
        </div>
        <Button
          style={{
            marginTop: "1rem",
            backgroundColor: "#543EE0",
            color: "white",
            borderRadius: "0.5rem",
          }}
          onClick={handleViews}
          loading={loading}
          content="View Post"
        />
        <CommentsModal postId={post.id} open={modalOpen} onClose={closeModal} />
      </Feed>
      <Divider />
    </>
  );
}
