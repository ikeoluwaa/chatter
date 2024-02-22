import { Button } from "semantic-ui-react";
import { useAppDispatch } from "../../app/store/store";
import { openModal } from "../../app/common/modals/modalSlice";

export default function SignedOutButtons() {
  const dispatch = useAppDispatch();
  return (
    <div className="nav-btn">
      <Button
        onClick={() => dispatch(openModal({ type: "LoginForm" }))}
        content="Login"
      />

      <Button content="Register" />
    </div>
  );
}
