import { Link } from "react-router-dom"
import {getCount, incrementCount} from '../features/posts/postsSlice'
import { useSelector, useDispatch } from "react-redux"
const Header = () => {

    const count = useSelector(getCount);
    const dispatch = useDispatch();


    return (
        <header className="Header">
            <h1>Redux Blog</h1>
            <nav>
                <ul>
                    <li><Link to="/">Home</Link></li>
                    <li><Link to="post">Post</Link></li>
                    <li><Link to="users">Users</Link></li>
                    <button  onClick={() => dispatch(incrementCount())}>
                        {count}
                    </button>
                </ul>
            </nav>
        </header>
    )
}

export default Header