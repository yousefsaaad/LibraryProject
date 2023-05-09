import { createBrowserRouter } from "react-router-dom";

import Adminhomepage from "./admin_component/adminhomepage";
import Contact from "./mycomponet/contact";
import Userhomepage from "./mycomponet/userhomepage";
import InputFields from "./admin_component/admin_add_new_book";
import InputForm from "./admin_component/updatedata";
import Updatestatus from "./admin_component/updatestatus";
import Login from "./mycomponet/Login";
import Index2 from "./mycomponet/Index2";
import Signup from "./mycomponet/Signup";
import Userlist from "./mycomponet/userlist"
import BookList from "./admin_component/BookList";
import BodyCard from "./mycomponet/Body-card";
import Books from "./mycomponet/Books";
import BorrowRequests from "./mycomponet/BorrowRequests"
import Requests from "./mycomponet/Requests.JS"

const router = createBrowserRouter([
  {
    path: "/",
    element: <Index2 />,
  },
  {
    path: "/Requests",
    element: <Requests />,
  },
  {
    path: "/BorrowRequests",
    element: <BorrowRequests />,
  },
  {
    path: "/books",
    element: <Books />,
  },
  {
    path: "/body-card",
    element: <BodyCard />,
  },

  {
    path: "/userhomepage",
    element: <Userhomepage />,
  },
  {
    path: "/admin",
    element: <Adminhomepage />,
  },
  {
    path: "/contact",
    element: <Contact />,
  },
  {
    path: "/admin-managebooks",
    element: <InputFields />,
  },
  {
    path: "/updatedata",
    element: <InputForm />,
  },
  {
    path: "/updatestatus",
    element: <Updatestatus />,
  },
  {
    path: "/login",
    element: <Login />,
  },
  {
    path: "/signup",
    element: <Signup />,
  },
  {
    path: "/userlist",
    element: <Userlist />,
  },
  {
    path: "/booklist",
    element: <BookList />,
  },
  
]);
export default router;
