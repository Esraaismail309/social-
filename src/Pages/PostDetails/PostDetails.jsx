import axios from "axios"
import { useContext, useEffect, useState } from "react"
import { useParams } from "react-router-dom"
import { AuthContext } from "../../Context/AuthContext"
import PostCard from "../../Components/PostCard/PostCard"
import Loader from "../../Components/Loader/Loader"
import { useFetch } from "../../Hooks/useFetch"

export default function PostDetails() {


    let { id } = useParams()




    const { userToken } = useContext(AuthContext)


    // function getSinglePost() {
    //     axios.get(`https://linked-posts.routemisr.com/posts/${id}`, {

    //         headers: {
    //             token: userToken
    //         }
    //     }).then((res) => {
    //         console.log(res.data.post);

    //         setPostDetails(res.data.post);

    //     }).catch((err) => {
    //         console.log(err);
    //     })
    // }



    const { data, error, isLoading } = useFetch('get', `https://linked-posts.routemisr.com/posts/${id}`, null, {
        token: userToken
    })


    useEffect(() => {
        document.title = 'details'
    }, [])



    return (
        <div className="w-1/2 mx-auto">
            {/* <title>details</title> */}
            {data && <PostCard post={data.post} from='details' />


            }
        </div>
    )



}