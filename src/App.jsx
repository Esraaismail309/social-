import { createBrowserRouter, RouterProvider } from "react-router-dom"
import MainLayout from "./Components/MainLayout/MainLayout"
import Home from "./Pages/Home/Home"
import About from "./Pages/About/About"
import Register from "./Pages/Register/Register"
import Login from "./Pages/Login/Login"
import NotFound from "./Pages/NotFound/NotFound"
import Posts from "./Pages/Posts/Posts"
import ProtectedRoutes from "./Components/ProtectedRoutes/ProtectedRoutes"



export default function App() {
  const routes = createBrowserRouter([
    {
      path: '', element: <MainLayout />, children: [
        { index: true, element: <Home /> },
        { path: 'login', element: <Login /> },
        { path: 'register', element: <Register /> },
        {
          path: 'posts', element: <ProtectedRoutes>
            <Posts />
          </ProtectedRoutes>
        },

        { path: '/about', element: <ProtectedRoutes><About /></ProtectedRoutes> }, {
          path: '*', element: <NotFound />
        }
      ]
    }
  ])
  return (
    <RouterProvider router={routes}>


    </RouterProvider>
  )
}