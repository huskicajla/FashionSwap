import {
  createBrowserRouter,
  RouterProvider,
  useLocation,
  Outlet,
} from "react-router-dom";
import Register from "./pages/Register";
import Login from "./pages/Login";
import Home from "./pages/Home";
import Add from "./pages/Add";
import Item from "./pages/Item";
import Footer from "./components/Footer";
import Navbar from "./components/Navbar";
import UserPage from "./pages/User";
import UserAdminNavbar from "./components/UserAdminNavbar";
import EditProfile from "./pages/user_admin_pages/EditProfile";
import ManagePosts from "./pages/user_admin_pages/ManagePosts";
import ManageUsers from "./pages/user_admin_pages/ManageUsers";
import ManageReports from "./pages/user_admin_pages/ManageReports";
import SendReport from "./pages/user_admin_pages/SendReport";
import UserReports from "./pages/user_admin_pages/UserReports";
import UserPosts from "./pages/user_admin_pages/UserPosts";
import Wishlist from "./pages/user_admin_pages/Wishlist";
import AddUser from "./pages/user_admin_pages/AddUser";
import Orders from "./pages/user_admin_pages/Orders";
import "./style/style.scss";

const Layout = () => {
  const location = useLocation();
  const isUserAdminPage = location.pathname.startsWith("/user"); 

  return (
    <>
      {isUserAdminPage ? <UserAdminNavbar /> : <Navbar />}

      <Outlet />
      <Footer />
    </>
  );
};


const router = createBrowserRouter([
  {
    path: "/",
    element: <Layout />,
    children: [
      {
        path: "/",
        element: <Home />,
      },
      {
        path: "/item/:id",
        element: <Item />,
      },
      {
        path: "/add",
        element: <Add />,
      },
      {
        path: "/user",
        element: <UserPage />,
      },
      {
        path: "/user/edit_profile",
        element: <EditProfile />,
      },
      {
        path: "/user/manage_posts",
        element: <ManagePosts />,
      },
      {
        path: "/user/manage_users",
        element: <ManageUsers />,
      },
      {
        path: "/user/manage_reports",
        element: <ManageReports />,
      },
      {
        path: "/user/send_report",
        element: <SendReport />,
      },
      {
        path: "/user/reports",
        element: <UserReports />,
      },
      {
        path: "/user/posts",
        element: <UserPosts />,
      },
      {
        path: "/user/wishlist",
        element: <Wishlist />,
      },
      {
        path: "/user/orders",
        element: <Orders />,
      },
    ],
  },
  {
    path: "/register",
    element: <Register />,
  },
  {
    path: "/login",
    element: <Login />,
  },
  {
    path: "/user/add_user",
    element: <AddUser />,
  },
]);


function App() {
  return (
    <div className="app">
      <div className="container">
      <RouterProvider router={router}/>
      </div>
    </div>
  );
}

export default App;



