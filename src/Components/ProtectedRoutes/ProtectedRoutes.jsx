import { Navigate } from "react-router-dom"
import Login from "../../Pages/Login/Login"


export default function ProtectedRoutes({children}) {
  
    if(localStorage.getItem('token')){
        // selected Page (chilred)
        return children
    }else{
        return <Navigate to={'/login'}/>

         // redirect login
    }
}


