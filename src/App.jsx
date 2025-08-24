import { createBrowserRouter, RouterProvider } from "react-router-dom"
import MainLayout from "./Components/MainLayout/MainLayout"
import Home from "./Pages/Home/Home"
import About from "./Pages/About/About"
import Register from "./Pages/Register/Register"
import Login from "./Pages/Login/Login"
import NotFound from "./Pages/NotFound/NotFound"
import Posts from "./Pages/Posts/Posts"
import ProtectedRoutes from "./Components/ProtectedRoutes/ProtectedRoutes"
import { CounterContextProvider } from "./Context/CounterContext"
import { useContext, useState } from "react"
import { AuthContextProvider } from "./Context/AuthContext"
import PostDetails from "./Pages/PostDetails/PostDetails"
import {
  QueryClient,
  QueryClientProvider,
} from '@tanstack/react-query'
import { Toaster } from "react-hot-toast"
import Profile from "./Pages/Profile/Profile"


export default function App() {


  const [isDark, setIsDark] = useState(false)

  function handleDarkMood() {
    setIsDark(!isDark)
  }

  const routes = createBrowserRouter([
    {
      path: '', element: <MainLayout handleDarkMood={handleDarkMood} />, children: [
        { index: true, element: <Home /> },
        { path: 'login', element: <Login /> },
        { path: 'register', element: <Register /> },
        {
          path: 'posts', element: <ProtectedRoutes>
            <Posts />
          </ProtectedRoutes>
        },
        {
          path: 'details/:id', element: <ProtectedRoutes>
            <PostDetails />
          </ProtectedRoutes>
        },
        { path: '/profile', element: <ProtectedRoutes><Profile /></ProtectedRoutes> },

        { path: '/about', element: <ProtectedRoutes><About /></ProtectedRoutes> }, {
          path: '*', element: <NotFound />
        }
      ]
    }
  ])


  const client = new QueryClient()


  return (

    <div className={`${isDark ? 'dark' : ''}`}>
      <AuthContextProvider>
        <QueryClientProvider client={client} >
          <CounterContextProvider>
            <Toaster />
            <div className="bg-gray-400 fixed bottom-0 right-1 text-2xl m-3">
            </div>
            <RouterProvider router={routes}>

            </RouterProvider>
          </CounterContextProvider>
        </QueryClientProvider>
      </AuthContextProvider>
    </div>
  )
}
