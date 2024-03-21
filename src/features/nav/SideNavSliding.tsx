import { useState, useEffect, useRef } from "react";
import { Menu, Icon, Button, Header, Image } from "semantic-ui-react";
import { Link, useNavigate, useParams } from "react-router-dom";
import { signOut } from "firebase/auth";
import { auth } from "../../app/config/firebase";
import { useAppSelector } from "../../app/store/store";
import { actions } from "../profiles/profileSlice";
import { useFireStore } from "../../app/hooks/firestore/useFirestore";

export default function SideNavSliding() {
  const { id } = useParams();
  const { currentUser, authenticated } = useAppSelector((state) => state.auth);
  const navigate = useNavigate();
  const [activeItem, setActiveItem] = useState("");
  const slidingComponentRef = useRef<HTMLDivElement>(null); // Explicitly specify the type
  const { loadDocument } = useFireStore("profiles");
  const [isVisible, setIsVisible] = useState(false);

  const handleItemClick = (name: any) => setActiveItem(name);

  const handleToggle = (event: any) => {
    event.stopPropagation();
    setIsVisible(!isVisible);
  };

  const handleSignOut = async () => {
    await signOut(auth);
    navigate("/");
  };

  const handleClickOutside = (event: any) => {
    if (
      slidingComponentRef.current &&
      !slidingComponentRef.current.contains(event.target)
    ) {
      setIsVisible(false);
    }
  };

  useEffect(() => {
    document.addEventListener("click", handleClickOutside);

    return () => {
      document.removeEventListener("click", handleClickOutside);
    };
  }, []);

  useEffect(() => {
    if (id) loadDocument(id, actions);
  }, [id, loadDocument]);

  return (
    <div className="slide-nav">
      <Button
        circular
        style={{
          boxShadow: "0px 10px 15px -3px rgba(0, 0, 0, 0.1)",
        }}
        className="toggle-button"
        onClick={handleToggle}
      >
        {isVisible ? <Icon name="close" /> : <Icon name="bars" />}
      </Button>

      <div
        ref={slidingComponentRef}
        className={`sliding-component ${isVisible ? "visible" : ""}`}
      >
        <div style={{ flex: 1, padding: "1rem", overflowY: "auto" }}>
          <Menu style={{ border: "none" }} fluid vertical>
            <Menu.Item></Menu.Item>
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
                    <Menu.Item>
                      <Image
                        avatar
                        spaced="right"
                        src={currentUser?.photoURL || "/user.png"}
                      />
                      <p>{currentUser?.displayName}</p>
                    </Menu.Item>

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
                    <Menu.Item></Menu.Item>
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
                    {/* Render your SignedOutButtons component here */}
                  </Menu.Item>
                )}
              </Menu.Menu>
            </Menu.Item>
          </Menu>
        </div>
      </div>
    </div>
  );
}
