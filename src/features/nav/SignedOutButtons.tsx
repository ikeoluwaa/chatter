import { Button, MenuItem } from "semantic-ui-react";
import { useAppDispatch } from "../../app/store/store";
import { openModal } from "../../app/common/modals/modalSlice";

export default function SignedOutButtons() {
  const dispatch = useAppDispatch();
  return (
    <MenuItem position="right">
      <Button
        basic
        content="Login"
        onClick={() => dispatch(openModal({ type: "LoginForm" }))}
      />
      <Button
        basic
        content="Register"
        style={{ marginLeft: "0.5em" }}
        onClick={() => dispatch(openModal({ type: "RegisterForm" }))}
      />
    </MenuItem>
  );
}
