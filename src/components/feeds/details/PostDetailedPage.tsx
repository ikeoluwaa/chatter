import { useParams } from "react-router-dom"
import { useAppSelector } from "../../../app/store/store"
import PostDetails from "./PostDetails"
import PostComments from "./PostComments"

export default function PostDetailedPage() {
  const {id} = useParams()
  const post = useAppSelector((state) =>
  state.posts.posts.find((e) => e.id === id))
  if (!post) return <h2>Event not found</h2>;
  return (
    <>
    <PostDetails post={post}/>
    <PostComments/>
    </>
  )
}
