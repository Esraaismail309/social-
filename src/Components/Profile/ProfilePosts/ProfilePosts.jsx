import { useContext, useEffect, useState } from "react"
import { AuthContext } from "../../../Context/AuthContext"
import axios from "axios"
import PostCard from "../../PostCard/PostCard"
import Loader from "../../Loader/Loader"
import AddEditePost from "../../AddEditePost/AddEditePost"

export default function ProfilePosts() {



  const { userData, userToken } = useContext(AuthContext)
  const [userPosts, setUserPosts] = useState(null)
  const [isLoading, setIsLoading] = useState(false)


  function getUserPosts() {
    setIsLoading(true)

    axios.get(`https://linked-posts.routemisr.com/users/${userData._id}/posts?limit=50`,
      { headers: { token: userToken } }
    ).then((res) => {
      setUserPosts(res.data.posts)
    }).finally(() => {
      setIsLoading(false)
    })
  }

  useEffect(() => {
    getUserPosts()
  }, [])



  if (isLoading) {
    return <Loader />
  }

  return (
    <div className="col-span-2 px-3">

      <AddEditePost  getAllPosts={getUserPosts}/>
      {userPosts?.length ? userPosts.map((post) => {
        return <div key={post._id}>
          <PostCard post={post} />
        </div>
      }) : 'No Posts Found'


      }</div>
  )
}