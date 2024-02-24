import { useState } from "react";
import { Link, NavLink } from "react-router-dom";
import { Header, Icon, Menu, Sidebar } from "semantic-ui-react";
import SignedOutButtons from "./SignedOutButtons";
import { useAppSelector } from "../../app/store/store";
import SignedInMenu from "./SignedInMenu";

export default function SideNav() {
  const [visible, setVisible] = useState(false);
  const { authenticated } = useAppSelector((state) => state.auth);

  const toggleVisibility = () => {
    setVisible(!visible);
  };

  return (
    <div className="side-nav-wrapper">
      <Sidebar
        as={Menu}
        animation="overlay"
        icon="labeled"
        onHide={() => setVisible(false)}
        vertical
        visible={visible}
        width="thin"
      >
        <Menu.Item as={NavLink} to="/">
          <Header>CHATTER</Header>
        </Menu.Item>
        <Menu.Item as={NavLink} to="/feeds">
          Feed
        </Menu.Item>

        <Menu.Item>
          <SignedOutButtons />
        </Menu.Item>
        <Menu.Item as={NavLink} to="/services">
          <Icon name="settings" />
          Services
        </Menu.Item>
        <Menu.Item as={Link} to="/contact">
          <Icon name="mail outline" />
          Contact
        </Menu.Item>

        <Menu.Item onClick={toggleVisibility}>
          {authenticated ? <SignedInMenu /> : <SignedOutButtons />}{" "}
        </Menu.Item>
      </Sidebar>

      <Sidebar.Pushable>
        <Sidebar.Pusher dimmed={visible}>
          <Menu inverted>
            <Menu.Item onClick={toggleVisibility}>
              <Icon name={visible ? "close" : "sidebar"} />
            </Menu.Item>
          </Menu>
        </Sidebar.Pusher>
      </Sidebar.Pushable>
    </div>
  );
}
