import { Link, useNavigate } from "react-router-dom";
import { Menu, Image, Dropdown } from "semantic-ui-react";
import { signOut } from "firebase/auth";
import { useAppSelector } from "../../app/store/store";
import { auth } from "../../app/config/firebase";

export default function SignedInMenu() {
  const { currentUser } = useAppSelector((state) => state.auth);
  const navigate = useNavigate();

  async function handleSignOut() {
    await signOut(auth);
    navigate("/");
  }

  return (
    <Menu.Item position="right">
      <Image avatar spaced="right" src={currentUser?.photoURL || "/user.png"} />
      <Dropdown pointing="top right" text={currentUser?.displayName as string}>
        <Dropdown.Menu>
          <Dropdown.Item
            as={Link}
            to="/createPost"
            text="Publish Post"
            icon="plus"
          />
          <Dropdown.Item
            as={Link}
            to={`/profiles/${currentUser?.uid}`}
            text="My profile"
            icon="user"
          />
          <Dropdown.Item
            as={Link}
            to="/account"
            text="My account"
            icon="settings"
          />
          <Dropdown.Item onClick={handleSignOut} text="Sign out" icon="power" />
        </Dropdown.Menu>
      </Dropdown>
    </Menu.Item>
  );
}
