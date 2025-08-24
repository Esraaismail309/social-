
// import styles from './Posts.module.css'

import axios from "axios";
import { useContext, useEffect, useState } from "react";
import { AuthContext } from "../../Context/AuthContext";

import PostCard from "../../Components/PostCard/PostCard";
import Loader from "../../Components/Loader/Loader";
import AddEditePost from "../../Components/AddEditePost/AddEditePost";
import { useQuery } from '@tanstack/react-query'
export default function Posts() {

    const { userToken } = useContext(AuthContext)
    const [allPosts, setAllPosts] = useState(null)

    // function getAllPosts() {
    //     axios.get('https://linked-posts.routemisr.com/posts', {
    //         params: {
    //             limit: 4,
    //         },
    //         headers: {
    //             token: userToken
    //         }
    //     }).then((res) => {
    //         setAllPosts(res.data.posts);

    //     }).catch((err) => {
    //         console.log(err);
    //     })
    // }
    // useEffect(() => {
    //     getAllPosts()
    // }, [])



    function getData() {
        return axios.get('https://linked-posts.routemisr.com/posts', {
            params: {
                limit: 40,
                sort:'-createdAt'
            },
            headers: {
                token: userToken
            }
        })
    }


    let { data, isLoading, isFetching, isError, error, refetch } = useQuery({
        // queryKey: ['allPosts',x]
        queryKey: 'allPosts',
        queryFn: getData,
        // refetchOnMount: false, 
        // refetchOnWindowFocus: false,
        // refetchOnReconnect
        // refetchInterval: 1000 * 60 * 60 * 24 * 3, 
        // retry:1,
        // retryDelay:2000, 
        // gcTime:2000pp
    })







    if (isLoading) {
        return <Loader />
    }

    if (isError) {
        return <h1>{error.message}</h1>
    }



    return (
        <main className="md:w-1/2 p-2 mx-auto ">

            <AddEditePost getAllPosts={refetch} />


            {/*  */}

            {data?.data?.posts.length ? <>
                {data?.data?.posts.map((post) => {
                    return <div key={post._id} className=" shadow border border-gray-200 rounded-xl my-2">
                        <PostCard post={post} />
                    </div>
                })}
            </>

                : 'NoData Found'
            }







        </main >
    )
}