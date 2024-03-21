import { useEffect, useState } from "react";
import {
  CommentText,
  CommentMetadata,
  CommentContent,
  CommentAvatar,
  CommentActions,
  CommentAction,
  CommentAuthor,
  Comment,
  Header,
  Segment,
  CommentGroup,
  Button,
} from "semantic-ui-react";
import CommentForm from "./CommentForm";
import { formatDistance } from "date-fns";
import { Link } from "react-router-dom";
import { ChatComment } from "../../../app/types/feeds";
import { get, onChildAdded, ref, remove } from "firebase/database";
import { fb } from "../../../app/config/firebase";
import { auth } from "../../../app/config/firebase";
import { useCommentCount } from "../../../app/hooks/customhooks/useCommentCount ";

type Props = {
  postId: string;
};

export default function PostComments({ postId }: Props) {
  const [comments, setComments] = useState<ChatComment[]>([]);
  const [replyForm, setReplyForm] = useState<any>({
    open: false,
    commentId: null,
  });
  const currentUser = auth.currentUser;
  const commentCount = useCommentCount(postId);

  useEffect(() => {
    const commentRef = ref(fb, `comments/${postId}`);
    const fetchComments = async () => {
      try {
        const snapshot = await get(commentRef);
        const commentsData = snapshot.val();
        if (commentsData) {
          const commentsArray = Object.keys(commentsData).map((key) => ({
            id: key,
            ...commentsData[key],
          }));
          setComments(commentsArray);
        }
      } catch (error) {
        console.error("Error fetching comments:", error);
      }
    };

    fetchComments(); // Call fetchComments when the component mounts
  }, [postId]);

  const handleDeleteComment = async (commentId: string, commentUid: string) => {
    try {
      if (currentUser && currentUser.uid === commentUid) {
        await remove(ref(fb, `comments/${postId}/${commentId}`));
        setComments((prevComments) =>
          prevComments.filter((comment) => comment.id !== commentId)
        );
      } else {
        console.log("You are not authorized to delete this comment.");
      }
    } catch (error) {
      console.error("Error deleting comment:", error);
    }
  };

  function createCommentTree(data: ChatComment[]) {
    const table = Object.create(null);
    data.forEach((item) => (table[item.id] = { ...item, childNodes: [] }));
    const dataTree: ChatComment[] = [];
    data.forEach((item) => {
      if (item.parentId && table[item.parentId]) {
        table[item.parentId].childNodes.push(table[item.id]);
      } else {
        dataTree.push(table[item.id]);
      }
    });
    return dataTree;
  }

  return (
    <>
      <Segment
        textAlign="center"
        attached="top"
        inverted
        style={{ border: "none", backgroundColor: "#543EE0" }}
      >
        <Header as="h3" dividing>
          Comments ({commentCount})
        </Header>
      </Segment>
      <Segment attached style={{ height: 400, overflowY: "scroll" }}>
        <CommentForm postId={postId} />
        <CommentGroup style={{ paddingBottom: 0, marginBottom: 0 }}>
          {createCommentTree(comments)
            .reverse()
            .map((comment) => (
              <Comment key={comment.id}>
                <CommentAvatar src={comment.photoURL || "/user.png"} />
                <CommentContent>
                  <CommentAuthor as={Link} to={`/profiles/${comment.uid}`}>
                    {comment.displayName}
                  </CommentAuthor>
                  <CommentMetadata>
                    <div>{formatDistance(comment.date, new Date())} ago</div>
                  </CommentMetadata>
                  <CommentText>{comment.text}</CommentText>
                  <CommentActions>
                    <CommentAction
                      onClick={() =>
                        setReplyForm({ open: true, commentId: comment.id })
                      }
                    >
                      Reply
                    </CommentAction>
                    {currentUser &&
                      currentUser.uid === comment.uid && ( // Only show delete button if current user is the owner of the comment
                        <Button
                          icon="trash"
                          size="mini"
                          color="red"
                          onClick={() =>
                            handleDeleteComment(comment.id, comment.uid)
                          }
                        />
                      )}
                    {replyForm.open && replyForm.commentId === comment.id && (
                      <CommentForm
                        key={comment.id}
                        postId={postId}
                        parentId={comment.id}
                        setReplyForm={setReplyForm}
                      />
                    )}
                  </CommentActions>
                </CommentContent>

                <CommentGroup style={{ paddingBottom: 0 }}>
                  {comment.childNodes.map((child) => (
                    <Comment key={child.id}>
                      <CommentAvatar src={child.photoURL || "/user.png"} />
                      <CommentContent>
                        <CommentAuthor as={Link} to={`/profiles/${child.uid}`}>
                          {child.displayName}
                        </CommentAuthor>
                        <CommentMetadata>
                          <div>
                            {formatDistance(child.date, new Date())} ago
                          </div>
                        </CommentMetadata>
                        <CommentText>{child.text}</CommentText>
                        <CommentActions>
                          <CommentAction
                            onClick={() =>
                              setReplyForm({ open: true, commentId: child.id })
                            }
                          >
                            Reply
                          </CommentAction>
                          {currentUser && currentUser.uid === child.uid && (
                            <Button
                              icon="trash"
                              size="mini"
                              color="red"
                              onClick={() =>
                                handleDeleteComment(child.id, child.uid)
                              }
                            />
                          )}
                          {replyForm.open &&
                            replyForm.commentId === child.id && (
                              <CommentForm
                                key={child.id}
                                postId={postId}
                                parentId={child.id}
                                setReplyForm={setReplyForm}
                              />
                            )}
                        </CommentActions>
                      </CommentContent>
                    </Comment>
                  ))}
                </CommentGroup>
              </Comment>
            ))}
        </CommentGroup>
      </Segment>
    </>
  );
}
