import { MenuItem } from "semantic-ui-react";
import { useAppDispatch } from "../../app/store/store";
import { openModal } from "../../app/common/modals/modalSlice";

type Props = {
  loginButtonStyle?: React.CSSProperties;
  registerButtonStyle?: React.CSSProperties;
  menuItemStyle?: React.CSSProperties;
};

export default function SignedOutButtons({
  loginButtonStyle,
  registerButtonStyle,
  menuItemStyle,
}: Props) {
  const dispatch = useAppDispatch();
  return (
    <MenuItem position="right" style={menuItemStyle}>
      <button
        className="ui button login"
        style={loginButtonStyle}
        onClick={() => dispatch(openModal({ type: "LoginForm" }))}
      >
        Log in
      </button>
      <button
        className="ui button register"
        style={registerButtonStyle}
        onClick={() => dispatch(openModal({ type: "RegisterForm" }))}
      >
        Sign up
      </button>
    </MenuItem>
  );
}
