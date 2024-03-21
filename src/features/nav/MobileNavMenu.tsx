import { Image, Button } from "semantic-ui-react";
import SignedOutButtons from "./SignedOutButtons";
import { useAppSelector } from "../../app/store/store";
import { signOut } from "firebase/auth";
import { auth } from "../../app/config/firebase";
import { NavLink, useNavigate } from "react-router-dom";

type Props = {
  isOpen: boolean;
};

export default function MobileNavMenu({ isOpen }: Props) {
  const { authenticated, currentUser } = useAppSelector((state) => state.auth);
  const navigate = useNavigate();

  async function handleSignOut() {
    await signOut(auth);
    navigate("/");
  }
  const scrollToSection = (id: any) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
  };
  return (
    <div
      className="mobile-nav-menu"
      style={{
        position: "fixed",
        top: "4.5rem",
        left: isOpen ? "0" : "-100%",
        width: "100%",
        backgroundColor: "white",
        zIndex: "9999",
        transition: "left 0.3s ease",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        gap: "1rem",
        padding: "2rem",
      }}
    >
      <NavLink to="#home" onClick={() => scrollToSection("home")}>
        Home
      </NavLink>
      <NavLink to="#about" onClick={() => scrollToSection("about")}>
        About us
      </NavLink>
      <NavLink to="#contact" onClick={() => scrollToSection("contact")}>
        Contact
      </NavLink>
      <NavLink to="#blogs" onClick={() => scrollToSection("blogs")}>
        Blogs
      </NavLink>
      {authenticated ? (
        <>
          <Image
            avatar
            spaced="right"
            src={currentUser?.photoURL || "/user.png"}
          />
          <Button onClick={handleSignOut} content="Log out" icon="power" />
        </>
      ) : (
        <SignedOutButtons
          loginButtonStyle={{
            border: "none",
            outline: "none",
            background: "none",
            fontSize: "1.8rem",
          }}
          registerButtonStyle={{
            border: "none",
            outline: "none",
            background: "none",
            fontSize: "1.8rem",
          }}
          menuItemStyle={{
            display: "flex",
            flexDirection: "column",
          }}
        />
      )}
    </div>
  );
}
