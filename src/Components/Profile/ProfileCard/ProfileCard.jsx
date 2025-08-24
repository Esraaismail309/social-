import { useContext } from "react"
import { AuthContext } from "../../../Context/AuthContext"

export default function ProfileCard() {
    const { userData } = useContext(AuthContext)

    //display user data => get logged user data 
    return (
        <div className="col-span-1 bg-blue-50 text-center">


            {userData &&
                <>

                    <img src={userData.photo} className="size-44 mx-auto rounded-full border border-gray-300" alt={userData.name} />

                    <h1>{userData.name}</h1>
                    <h3>{userData.email}</h3>
                    <h3>{userData.dateOfBirth}</h3>


                </>

            }
        </div>
    )
}