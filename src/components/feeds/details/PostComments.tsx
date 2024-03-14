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
} from "semantic-ui-react";
import CommentForm from "./CommentForm";
import { useEffect, useState } from "react";
import { ChatComment } from "../../../app/types/feeds";
import { onChildAdded, ref } from "firebase/database";
import { fb } from "../../../app/config/firebase";
import { Link } from "react-router-dom";
import { formatDistance } from "date-fns";

type Props = {
  postId: string;
};

export default function PostComments({ postId }: Props) {
  const [comments, setComments] = useState<ChatComment[]>([]);
  const [replyForm, setReplyForm] = useState<any>({
    open: false,
    commentId: null,
  });

  useEffect(() => {
    const commentRef = ref(fb, `comments/${postId}`);
    const unsubscribe = onChildAdded(commentRef, (data) => {
      const comment = { ...data.val(), id: data.key };

      setComments((prevState) => [...prevState, comment]);
    });

    return () => unsubscribe();
  }, [postId]);
  function createCommentTree(data: ChatComment[]) {
    const table = Object.create(null);
    data.forEach((item) => (table[item.id] = { ...item, childNodes: [] }));
    const dataTree: ChatComment[] = [];
    data.forEach((item) => {
      if (item.parentId) table[item.parentId].childNodes.push(table[item.id]);
      else dataTree.push(table[item.id]);
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
          Comments
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
                          {replyForm.open &&
                            replyForm.commentId === child.id && (
                              <CommentForm
                                key={comment.id}
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
