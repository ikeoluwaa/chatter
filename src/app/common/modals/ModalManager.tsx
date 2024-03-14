import { useAppSelector } from "../../store/store";
import LoginForm from "../../../features/auth/LoginForm";
import TestModal from "../../../features/scratch/TestModal";
import RegisterForm from "../../../features/auth/RegisterForm";
import PostFeedComment from "../../../components/feeds/PostFeedComment";
import SignupForm from "../../../features/auth/SignupForm";

export default function ModalManager() {
  const modalLookup = {
    TestModal,
    LoginForm,
    RegisterForm,
    PostFeedComment,
    SignupForm,
  };

  const { type, data, open } = useAppSelector((state) => state.modals);

  let renderedModal;

  if (open && type) {
    const ModalComponent = (modalLookup as any)[type];
    renderedModal = <ModalComponent data={data} />;
  }
  return <span>{renderedModal}</span>;
}
