import { createBrowserRouter } from "react-router-dom";
import App from "../layout/App";
import FeedsDashboard from "../../components/feeds/FeedsDashboatd";
import PostForm from "../../components/feeds/PostForm.";

import PostDetailedPage from "../../components/feeds/details/PostDetailedPage";

export const router =createBrowserRouter([
 {
  
  path:'/',
  element:<App/>,
  children:[
    {
      path:'/feeds',element:<FeedsDashboard/>
    },
    {
      path:'/CreatePost',element:<PostForm key='create'/>
    },
    {
      path:'/posts/:id',element:<PostDetailedPage/>
    },
    
  ]

}
])