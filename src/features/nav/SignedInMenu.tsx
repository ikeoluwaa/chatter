import { Link, useNavigate } from "react-router-dom";
import { Dropdown, Image, Menu } from "semantic-ui-react";
import { useAppSelector } from "../../app/store/store";
import { signOut } from "firebase/auth";
import { auth } from "../../app/config/firebase";

export default function SignedInMenu() {
  const { currentUser } = useAppSelector((state) => state.auth);

  const navigate = useNavigate();

  async function handleSignOut() {
    await signOut(auth);
    navigate("/");
  }

  return (
    <Menu.Item>
      <Image avatar spaced="right" src={currentUser?.photoURL || "/user.png"} />
      <Dropdown pointing="top right" text={currentUser?.displayName as string}>
        <Dropdown.Menu>
          <Dropdown.Item
            as={Link}
            to="/createPost"
            text="Post Content"
            icon="plus"
          />
          <Dropdown.Item
            text="My Account"
            icon="plus"
            as={Link}
            to="/account"
          />
          <Dropdown.Item
            as={Link}
            to={`/profiles/${currentUser?.uid}`}
            text="My profile"
            icon="settings"
          />
          <Dropdown.Item onClick={handleSignOut} text="Sign out" icon="power" />
        </Dropdown.Menu>
      </Dropdown>
    </Menu.Item>
  );
}
