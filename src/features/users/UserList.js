import React from 'react'
import { useSelector } from 'react-redux'
import { selectAllUsers } from './usersSlice'
import { Link } from 'react-router-dom'

const UserList = () => {

    const users = useSelector(selectAllUsers)


  return (
    <section>
        
        <h2>Users</h2>
            <ul>
                

           { users.map((user) => <li>

<Link to={`/users/${user.id}`} >{user.name}</Link>
</li>)}
            </ul>
            
        
    </section>
  )
}

export default UserList