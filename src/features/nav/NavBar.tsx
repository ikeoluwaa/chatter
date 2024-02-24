import { Button, MenuItem } from "semantic-ui-react";
import { FiAlignJustify } from "react-icons/fi";
import { IoMdClose } from "react-icons/io";
import SignedInMenu from "./SignedInMenu";
import SignedOutButtons from "./SignedOutButtons";
import { NavLink } from "react-router-dom";
import { useAppSelector } from "../../app/store/store";
import { sampleData } from "../../app/api/sampleData";
import { doc, setDoc } from "firebase/firestore";
import { db } from "../../app/config/firebase";

export default function NavBar() {
  const { authenticated } = useAppSelector((state) => state.auth);

  function seedData() {
    sampleData.forEach(async (post) => {
      const { id, ...rest } = post;
      await setDoc(doc(db, "posts", id), {
        ...rest,
      });
    });
  }

  return (
    <div className="nav-container">
      <header>
        <h1 className="font-bold text-7xl	"> CHATTER</h1>
      </header>
      <nav className="main-nav">
        <div className="nav-links">
          <MenuItem>Home</MenuItem>
          <MenuItem>About us</MenuItem>
          <MenuItem>Contact</MenuItem>
          <MenuItem>Blogs</MenuItem>
          <MenuItem name="/Scatch" as={NavLink} to="scatch" />
        </div>
      </nav>
      {import.meta.env.DEV && (
        <MenuItem>
          <Button
            inverted={true}
            color="teal"
            content="seed data"
            onClick={seedData}
          />
        </MenuItem>
      )}
      {authenticated ? <SignedInMenu /> : <SignedOutButtons />}

      <button className="mobile-nav ">
        <FiAlignJustify className="icon-mobile-nav menu" />
        <IoMdClose className="icon-mobile-nav close" />
      </button>
    </div>
  );
}
