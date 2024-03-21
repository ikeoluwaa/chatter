import {
  Outlet,
  ScrollRestoration,
  useLocation,
  useParams,
} from "react-router-dom";
import SideNav from "../../features/nav/SideNav";
import HomePage from "../../features/home/HomePage";
import ModalManager from "../common/modals/ModalManager";
import { useEffect } from "react";
import { onAuthStateChanged } from "firebase/auth";
import { useAppDispatch } from "../store/store";
import { auth } from "../config/firebase";
import { logout, signIn } from "../../features/auth/authSlice";
import FeedNav from "../../features/nav/FeedNav";
import { Container, Grid, GridColumn } from "semantic-ui-react";
import MobileAppNav from "../../features/nav/MobileAppNav";
import { actions } from "../../features/profiles/profileSlice";
import { useFireStore } from "../hooks/firestore/useFirestore";

function App() {
  const location = useLocation();
  const dispatch = useAppDispatch();
  const { loadDocument } = useFireStore("profiles");
  const { id } = useParams();

  useEffect(() => {
    if (id) loadDocument(id, actions);
  }, [id, loadDocument]);

  useEffect(() => {
    onAuthStateChanged(auth, {
      next: (user) => {
        if (user) {
          dispatch(signIn(user));
        } else {
          dispatch(logout());
        }
      },
      error: (error) => console.log(error),
      complete: () => {},
    });
  }, [dispatch]);

  return (
    <>
      {location.pathname === "/" ? (
        <HomePage />
      ) : (
        <>
          <Grid>
            <GridColumn
              className="app-side-bar"
              computer={3}
              tablet={3}
              mobile={1}
            >
              <div></div>
              <SideNav />
            </GridColumn>
            <GridColumn computer={13} tablet={13} mobile={16}>
              <div>
                <FeedNav />
              </div>
              <ScrollRestoration />
              <Container>
                <Outlet />
                <ModalManager />
              </Container>
            </GridColumn>
          </Grid>
          <MobileAppNav />
        </>
      )}
    </>
  );
}

export default App;
