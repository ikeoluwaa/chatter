import { useState } from "react";
import { Icon } from "semantic-ui-react";
import SignedOutButtons from "./SignedOutButtons";
import MobileNavMenu from "./MobileNavMenu";
import { NavLink } from "react-router-dom";
import { useAppSelector } from "../../app/store/store";
import SignedInMenu from "./SignedInMenu";

export default function NavBar() {
  const { authenticated } = useAppSelector((state) => state.auth);
  const [menuOpen, setMenuOpen] = useState(false);

  const toggleMenu = () => {
    setMenuOpen(!menuOpen);
  };

  return (
    <div className="nav-container" style={{ position: "sticky" }}>
      <header>
        <h1 className="font-bold text-4xl">CHATTER</h1>
      </header>
      <nav className="main-nav">
        <div className="nav-links">
          <NavLink to="/">Home</NavLink>
          <NavLink to="/about">About us</NavLink>
          <NavLink to="/contact">Contact</NavLink>
          <NavLink to="/blogs">Blogs</NavLink>
          <NavLink to="/scatch">Scatch</NavLink>
        </div>
        {authenticated ? (
          <SignedInMenu />
        ) : (
          <div className="nav-buttons">
            <SignedOutButtons
              menuItemStyle={{
                display: "flex",
                gap: "1rem",
              }}
              registerButtonStyle={{
                border: " 1px solid #543ee0",
                backgroundColor: "#543ee0",
                color: "white",
                padding: "0.8rem 2rem ",
              }}
              loginButtonStyle={{
                border: " 1px solid #543ee0",
                backgroundColor: "#FFF",
                color: "#543ee0",
                padding: "0.8rem 2rem ",
              }}
            />
          </div>
        )}
      </nav>
      <button
        className="mobile-nav"
        onClick={toggleMenu}
        style={{
          transition: "transform 0.3s ease",
          transform: menuOpen ? "rotate(90deg)" : "rotate(0deg)",
        }}
      >
        {menuOpen ? <Icon name="close" /> : <Icon name="align justify" />}
      </button>
      <MobileNavMenu isOpen={menuOpen} />
    </div>
  );
}
