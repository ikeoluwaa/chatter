import { push, ref, set } from "firebase/database";
import { KeyboardEvent } from "react";
import { FieldValues, useForm } from "react-hook-form";
import { toast } from "react-toastify";
import { Form, Loader } from "semantic-ui-react";
import { auth, fb } from "../../../app/config/firebase";
import { useNavigate, useLocation } from "react-router-dom";
import { useAppSelector } from "../../../app/store/store";

type Props = {
  postId: string;
  parentId?: string | null;
  setReplyForm?: (values: any) => void;
};

export default function CommentForm({ postId, parentId, setReplyForm }: Props) {
  const {
    register,
    handleSubmit,
    reset,
    formState: { isSubmitting },
  } = useForm({ mode: "onTouched", defaultValues: { Comment: "" } });

  const { authenticated } = useAppSelector((state) => state.auth);
  const navigate = useNavigate();
  const location = useLocation();

  async function onSubmit(data: FieldValues) {
    if (!authenticated)
      return navigate("/unauthorised", { state: { from: location.pathname } });

    try {
      if (!auth.currentUser) {
        throw new Error("You must be logged in to leave a comment.");
      }

      const commentRef = ref(fb, `comments/${postId}`);
      const newCommentRef = push(commentRef);
      await set(newCommentRef, {
        displayName: auth.currentUser.displayName,
        photoURL: auth.currentUser.photoURL,
        uid: auth.currentUser.uid,
        text: data.Comment,
        date: Date.now(),
        parentId: parentId || null,
      });
      if (parentId && setReplyForm)
        setReplyForm({ open: false, commentId: null });
      reset();
    } catch (error: any) {
      toast.error(error.message);
    }
  }

  return (
    <Form onSubmit={handleSubmit(onSubmit)}>
      <Form.TextArea
        {...register("Comment", { required: true })}
        placeholder="Enter your comment (Enter to Submit, Shift + Enter to add new line)"
        onKeyDown={(e: KeyboardEvent<HTMLTextAreaElement>) => {
          if (e.key === "Enter" && e.shiftKey) {
            return;
          }
          if (e.key === "Enter" && !e.shiftKey) {
            e.preventDefault();
            handleSubmit(onSubmit)();
          }
        }}
      />
      <Loader active={isSubmitting} />
    </Form>
  );
}
