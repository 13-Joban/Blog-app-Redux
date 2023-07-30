import { useSelector } from 'react-redux'
import { selectPostById } from './postsSlice'
import PostAuthor from './PostAuthor'
import TimeAgo from './TimeAgo'
import ReactionButtons from './ReactionButtons'
import { Link, useParams } from 'react-router-dom'

const SinglePost = () => {
  // we need to reterieve post id
  let { postId } = useParams()

  postId = Number(postId)

  const post = useSelector(state => selectPostById(state, postId))

  if (!post) {
    return (
      <section>
        <h2>No Post Found</h2>
      </section>
    )
  }

  return (
    <article>
      <h2>{post.title}</h2>
      <p>{post.body}</p>
      <Link to={`/post/edit/${post.id}`}>Edit Post</Link>
      <p className='postCredit'>
        <PostAuthor userId={post.userId} />
        <TimeAgo timestamp={post.date} />
      </p>
      <ReactionButtons post={post} />
    </article>
  )
}

export default SinglePost
