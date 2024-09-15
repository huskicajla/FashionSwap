import {
  createBrowserRouter,
  RouterProvider,
  Route,
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
import "./style/style.scss";


const Layout = () => {
  return (
    <>
      <Navbar/>
      <Outlet/>
      <Footer/>
    </>
  );
};

const router = createBrowserRouter([
  {
    path: "/",
    element: <Layout/>,
    children:[
      {
        path: "/",
        element: <Home/>
      },
      {
        path: "/item/:id",
        element: <Item/>
      },
      {
        path: "/add",
        element: <Add/>
      },
      {
        path: "/user",
        element: <UserPage/>
      }
    ]
  },
  {
    path: "/register",
    element: <Register />,
  },
  {
    path: "/login", 
    element: <Login />,
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



