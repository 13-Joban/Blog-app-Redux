import React from 'react'
import { useParams, Link } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { selectUserById} from './usersSlice'
import {  selectPostsByUser } from '../posts/postsSlice';

const UserPage = () => {

    const { userId} = useParams();
    const user = useSelector(state => selectUserById(state, Number(userId)))
    console.log(user);
    // const allPosts = useSelector(selectAllPosts)

    // const postsForUser = allPosts.filter(post => post.userId === Number(userId))
    

    const postsForUser = useSelector((state) => selectPostsByUser(state , Number(userId)));
    console.log(postsForUser);

    const postTitles = postsForUser.map(post => (
        <li key={post.id}>
            <Link to={`/post/${post.id}`}>{post.title}</Link>
        </li>
    ))

  return (
    <section>
        <h3>{user.name}</h3>

        <ol>
          {postTitles} 
        </ol>

    </section>
  )
}

export default UserPage