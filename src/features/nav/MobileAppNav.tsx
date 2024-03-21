import { useState } from "react";
import { Menu, Icon, Button } from "semantic-ui-react";
import { Link, useNavigate } from "react-router-dom";
import { signOut } from "firebase/auth";
import { auth } from "../../app/config/firebase";
import { useAppDispatch, useAppSelector } from "../../app/store/store";
import { openModal } from "../../app/common/modals/modalSlice";

export default function MobileAppNav() {
  const { currentUser, authenticated } = useAppSelector((state) => state.auth);
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const [activeItem, setActiveItem] = useState("");

  const handleItemClick = (name: any) => setActiveItem(name);

  const handleSignOut = async () => {
    await signOut(auth);
    navigate("/");
  };

  return (
    <div
      className="mobile-app-nav"
      style={{ position: "fixed", bottom: 0, width: "100%", zIndex: 1000 }}
    >
      <Menu
        fixed="bottom"
        fluid
        widths={5}
        style={{ backgroundColor: "#ffffff", borderTop: "1px solid #ddd" }}
      >
        <Menu.Item
          name="Home"
          active={activeItem === "Home"}
          onClick={() => handleItemClick("Home")}
          as={Link}
          to="/"
        >
          <Icon name="home" />
          Home
        </Menu.Item>
        <Menu.Item
          name="Feed"
          active={activeItem === "Feed"}
          onClick={() => handleItemClick("Feed")}
          as={Link}
          to="/feeds"
        >
          <Icon name="feed" />
          Feed
        </Menu.Item>
        <Menu.Item
          name="Profile"
          active={activeItem === "Profile"}
          onClick={() => handleItemClick("Profile")}
          as={Link}
          to={`/profiles/${currentUser?.uid}`}
        >
          <Icon name="user circle" />
          Profile
        </Menu.Item>
        {!authenticated && (
          <Menu.Item>
            <Button
              style={{
                border: "none",
                background: "transparent",
                color: "#2185d0",
              }}
              onClick={() => dispatch(openModal({ type: "SignupForm" }))}
            >
              <Icon name="sign in" />
              Sign In
            </Button>
          </Menu.Item>
        )}
        {authenticated && (
          <Menu.Item
            name="Sign Out"
            onClick={handleSignOut}
            style={{ color: "red" }}
          >
            <Icon name="sign out" />
            Sign Out
          </Menu.Item>
        )}
      </Menu>
    </div>
  );
}
