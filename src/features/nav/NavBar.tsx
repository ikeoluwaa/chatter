import { MenuItem } from "semantic-ui-react";
import { FiAlignJustify } from "react-icons/fi";
import { IoMdClose } from "react-icons/io";
// import SignedOutButtons from "./SignedOutButtons";
import SignedInMenu from "./SignedInMenu";
import { useState } from "react";
import SignedOutButtons from "./SignedOutButtons";

export default function NavBar() {
const [auth,setAuth]=useState(false)

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
        </div>
      </nav>
   {auth ? <SignedInMenu setAuth={setAuth}/> : <SignedOutButtons setAuth={setAuth}/>}

      <button className="mobile-nav ">
        <FiAlignJustify className="icon-mobile-nav menu" />
        <IoMdClose className="icon-mobile-nav close" />
      </button>
    </div>
  );
}
