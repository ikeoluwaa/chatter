import { useState } from "react";
import { Menu, Header, Icon, Image } from "semantic-ui-react";
import { Link, useNavigate } from "react-router-dom";
import { signOut } from "firebase/auth";
import { auth } from "../../app/config/firebase";
import SignedOutButtons from "./SignedOutButtons";
import { useAppSelector } from "../../app/store/store";

export default function SideNav() {
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
      <Menu
        vertical
        style={{
          display: "flex",
          alignItems: "center",
          border: "none",
        }}
      >
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
            />
            <Menu.Item style={{ margin: "10px 0" }}>
              <a>
                <Icon name="bookmark" style={{ marginRight: "0.5em" }} />
                Bookmarks
              </a>
            </Menu.Item>
            <Menu.Item style={{ margin: "10px 0" }}>
              {" "}
              <a>
                <Icon name="users" style={{ marginRight: "0.5em" }} />
                Team Blogs
              </a>
            </Menu.Item>
            <Menu.Item style={{ margin: "10px 0" }}>
              <a>
                <Icon name="envelope open" style={{ marginRight: "0.5em" }} />
                Drafts
              </a>
            </Menu.Item>
            <Menu.Item style={{ margin: "10px 0" }}>
              <a>
                <Icon name="chart bar" style={{ marginRight: "0.5em" }} />
                Analytics
              </a>
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
                  <a>
                    <Icon name="user" style={{ marginRight: "0.5em" }} />
                    Account
                  </a>
                </Menu.Item>
                <Menu.Item
                  as={Link}
                  to={`/profiles/${currentUser?.uid}`}
                  active={activeItem === "Profile"}
                  onClick={() => handleItemClick("Profile")}
                  style={{ margin: "10px 0" }}
                >
                  <a>
                    <Icon name="user circle" style={{ marginRight: "0.5em" }} />
                    Profile
                  </a>
                </Menu.Item>
                <Menu.Item style={{ margin: "10px 0" }}>
                  <Image
                    avatar
                    spaced="right"
                    src={currentUser?.photoURL || "/user.png"}
                  />
                </Menu.Item>
                <Menu.Item
                  style={{ color: "red", margin: "10px 0" }}
                  onClick={handleSignOut}
                  active={activeItem === "Logout"}
                >
                  <a>
                    <Icon name="sign out" style={{ marginRight: "0.5em" }} />
                    Log out
                  </a>
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
