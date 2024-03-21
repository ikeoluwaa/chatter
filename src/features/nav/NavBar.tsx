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

  const scrollToSection = (id: any) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
    setMenuOpen(false);
  };

  return (
    <div className="nav-container" style={{ position: "sticky" }}>
      <header>
        <h1 style={{ color: "#543EE0" }} className="font-bold text-4xl">
          CHATTER
        </h1>
      </header>
      <div className="nav-links">
        <NavLink
          to="#home"
          id="home-link"
          onClick={() => scrollToSection("home")}
        >
          Home
        </NavLink>
        <NavLink
          to="#about"
          id="about-link"
          onClick={() => scrollToSection("about")}
        >
          About us
        </NavLink>
        <NavLink
          to="#contact"
          id="contact-link"
          onClick={() => scrollToSection("contact")}
        >
          Contact
        </NavLink>
        <NavLink
          to="#blogs"
          id="blogs-link"
          onClick={() => scrollToSection("blogs")}
        >
          Blogs
        </NavLink>
      </div>
      {authenticated ? (
        <SignedInMenu />
      ) : (
        <div className="nav-btn">
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
      <button
        className="mobile-nav"
        onClick={toggleMenu}
        aria-label="Toggle mobile navigation"
        style={{
          transition: "transform 0.3s ease",
          transform: menuOpen ? "rotate(90deg)" : "rotate(0deg)",
        }}
      >
        {menuOpen ? <Icon name="close" /> : <Icon name="bars" />}
      </button>
      <MobileNavMenu isOpen={menuOpen} aria-label="Mobile navigation menu" />{" "}
      {/* Updated ARIA label */}
    </div>
  );
}
