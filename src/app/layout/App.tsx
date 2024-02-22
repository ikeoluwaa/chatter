import { Outlet, useLocation } from "react-router-dom";
import SideNav from "../../features/nav/SideNav";
import HomePage from "../../features/home/HomePage";


function App() {
  const location = useLocation()
  return (
    <>
 {location.pathname === '/'? <HomePage/>: (
   <>
   <div className="flex gap-16">

   <SideNav/>
       <Outlet/>
       </div>
   </>
   
 )}
   
   
    
    </>

  );
}

export default App;
