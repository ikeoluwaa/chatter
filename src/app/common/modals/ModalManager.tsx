import { useAppSelector } from "../../store/store";
import LoginForm from "../../../features/auth/LoginForm";
import TestModal from "../../../features/scratch/TestModal";
import RegisterForm from "../../../features/auth/RegisterForm";
import PostFeedComment from "../../../components/feeds/CommentsModal";
import SignupForm from "../../../features/auth/SignupForm";
import PostComments from "../../../components/feeds/details/PostComments";
import ConfirmationMessage from "../../../features/auth/ConfirmationMessage";

export default function ModalManager() {
  const modalLookup = {
    TestModal,
    LoginForm,
    RegisterForm,
    PostFeedComment,
    SignupForm,
    PostComments,
    ConfirmationMessage,
  };

  const { type, data, open } = useAppSelector((state) => state.modals);

  let renderedModal;

  if (open && type) {
    const ModalComponent = (modalLookup as any)[type];
    renderedModal = <ModalComponent data={data} />;
  }
  return <span>{renderedModal}</span>;
}
