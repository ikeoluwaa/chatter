import { useAppSelector } from "../../app/store/store";
import SignedInMenu from "./SignedInMenu";
import SignedOutButtons from "./SignedOutButtons";
import Search from "../search/Search";
import SideNavSliding from "./SideNavSliding";

export default function FeedNav() {
  const { authenticated } = useAppSelector((state) => state.auth);

  return (
    <div
      className="feed-nav"
      style={{
        display: "flex ",
        alignItems: "center",
        justifyContent: "space-around",
        marginBottom: "2rem",
      }}
    >
      <div className="app-sliding-nav">
        <SideNavSliding />
      </div>
      <div style={{ alignSelf: "" }}>
        <Search />
      </div>

      <div className="feed-nav-buttons">
        {authenticated ? (
          <SignedInMenu />
        ) : (
          <SignedOutButtons
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
        )}
      </div>
    </div>
  );
}
