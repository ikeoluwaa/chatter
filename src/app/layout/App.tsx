import { Outlet, useLocation } from "react-router-dom";
import SideNav from "../../features/nav/SideNav";
import HomePage from "../../features/home/HomePage";
import ModalManager from "../common/modals/ModalManager";
import { useEffect } from "react";
import { onAuthStateChanged } from "firebase/auth";
import { useAppDispatch } from "../store/store";
import { auth } from "../config/firebase";
import { logOut, signIn } from "../../features/auth/authSlice";

function App() {
  const location = useLocation();
  const dispatch = useAppDispatch();

  useEffect(() => {
    onAuthStateChanged(auth, {
      next: (user) => {
        if (user) {
          dispatch(signIn(user));
        } else {
          dispatch(logOut());
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
          <div className="flex gap-16">
            <ModalManager />
            <SideNav />
            <Outlet />
          </div>
        </>
      )}
    </>
  );
}

export default App;
