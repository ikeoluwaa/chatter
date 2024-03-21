import { useState } from "react";
import { Menu, Icon, Image, Header } from "semantic-ui-react";
import { Link, useNavigate } from "react-router-dom";
import { signOut } from "firebase/auth";
import { auth } from "../../app/config/firebase";
import SignedOutButtons from "./SignedOutButtons";
import { useAppSelector } from "../../app/store/store";

type Props = {
  className?: string;
};
export default function SideNav({ className }: Props) {
  const { currentUser, authenticated } = useAppSelector((state) => state.auth);
  const [activeItem, setActiveItem] = useState("");
  const navigate = useNavigate();

  const handleItemClick = (name: any) => setActiveItem(name);

  const handleSignOut = async () => {
    await signOut(auth);
    navigate("/");
  };

  return (
    <div
      style={{
        position: "sticky",
        top: 0,
        maxHeight: "100vh",
        display: "flex",
        alignItems: "center",
      }}
    >
      <Menu className={className} vertical>
        <Menu.Item>
          <Header
            as={Link}
            to="/"
            style={{
              color: "#543EE0",
              marginBottom: "1rem",
              border: "none",
            }}
          >
            CHATTER
          </Header>
        </Menu.Item>
        <Menu.Item>
          <Header>Overview</Header>
          <Menu.Menu>
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
              name="Bookmarks"
              active={activeItem === "Bookmarks"}
              onClick={() => handleItemClick("Bookmarks")}
              as={Link}
              to="/bookmarks"
            >
              <Icon name="bookmark" />
              Bookmarks
            </Menu.Item>
            <Menu.Item
              name="Team Blogs"
              active={activeItem === "Team Blogs"}
              onClick={() => handleItemClick("Team Blogs")}
              as={Link}
              to="/team-blogs"
            >
              <Icon name="users" />
              Team Blogs
            </Menu.Item>
            <Menu.Item
              name="Drafts"
              active={activeItem === "Drafts"}
              onClick={() => handleItemClick("Drafts")}
              as={Link}
              to="/drafts"
            >
              <Icon name="envelope open" />
              Drafts
            </Menu.Item>
            <Menu.Item
              name="Analytics"
              active={activeItem === "Analytics"}
              onClick={() => handleItemClick("Analytics")}
              as={Link}
              to="/analytics"
            >
              <Icon name="chart bar" />
              Analytics
            </Menu.Item>
          </Menu.Menu>
        </Menu.Item>
        <Menu.Item>
          <Header style={{ alignSelf: "center" }}>Personal</Header>
          <Menu.Menu>
            {authenticated ? (
              <>
                <Menu.Item
                  as={Link}
                  to="/account"
                  active={activeItem === "Account"}
                  onClick={() => handleItemClick("Account")}
                  style={{ border: "none", margin: "10px 0" }}
                >
                  <Icon name="user" />
                  Account
                </Menu.Item>
                <Menu.Item
                  as={Link}
                  to={`/profiles/${currentUser?.uid}`}
                  active={activeItem === "Profile"}
                  onClick={() => handleItemClick("Profile")}
                  style={{ margin: "10px 0" }}
                >
                  <Icon name="user circle" />
                  Profile
                </Menu.Item>
                <Menu.Item style={{ margin: "10px 0" }}>
                  <Image
                    avatar
                    spaced="right"
                    src={currentUser?.photoURL || "/user.png"}
                  />
                </Menu.Item>
                <Menu.Item
                  onClick={handleSignOut}
                  style={{ color: "red", margin: "10px 0" }}
                >
                  <Icon name="sign out" />
                  Log out
                </Menu.Item>
              </>
            ) : (
              <Menu.Item>
                <SignedOutButtons
                  loginButtonStyle={{
                    border: "none",
                    outline: "none",
                    background: "none",
                  }}
                  registerButtonStyle={{
                    border: "none",
                    outline: "none",
                    background: "none",
                  }}
                  menuItemStyle={{
                    color: "white",
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "center",
                  }}
                />
              </Menu.Item>
            )}
          </Menu.Menu>
        </Menu.Item>
      </Menu>
    </div>
  );
}
