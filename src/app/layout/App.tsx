import { Outlet, ScrollRestoration, useLocation } from "react-router-dom";
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

function App() {
  const location = useLocation();
  const dispatch = useAppDispatch();

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
            <GridColumn computer={3} tablet={3} mobile={2}>
              <SideNav />
            </GridColumn>
            <GridColumn width={12} tablet={13} mobile={12}>
              <div>
                <FeedNav />
              </div>

              <ModalManager />
              <ScrollRestoration />
              <Container>
                <Outlet />
              </Container>
            </GridColumn>
          </Grid>
        </>
      )}
    </>
  );
}

export default App;
