import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";

import { editPost , selectPostById, deletePost} from "./postsSlice";
import { useNavigate, useParams } from "react-router-dom";
import { selectAllUsers } from "../users/usersSlice";

const EditPostForm = () => {
    const dispatch = useDispatch()
    const { postId } = useParams()
    

    const navigate = useNavigate();
    const post  = useSelector((state) => selectPostById(state, Number(postId)))

    const [title, setTitle] = useState(post?.title)
    const [content, setContent] = useState(post?.body)
    const [userId, setUserId] = useState(post?.userId)
    const [requestStatus, setRequestStatus] = useState('idle')

    const users = useSelector(selectAllUsers)

    const onTitleChanged = e => setTitle(e.target.value)
    const onContentChanged = e => setContent(e.target.value)
    const onAuthorChanged = e => setUserId(Number(e.target.value))


    const canEdit = [title, content, userId].every(Boolean) && requestStatus === 'idle';

    const onEditPostClicked = () => {
        if (canEdit) {
            try {
                setRequestStatus('pending')
                dispatch(editPost({id: post.id, title, body: content, userId , reactions: post.reactions})).unwrap()
                setTitle('')
                setContent('')
                setUserId('')
                navigate(`/post/${postId}`)
            } catch (err) {
                console.error('Failed to edit the post', err)
            } finally {
                setRequestStatus('idle')
            }
        }

    }
    const onDeletePostClicked = () => {
      
            try {
                setRequestStatus('pending')
                dispatch(deletePost({id: post.id })).unwrap()
                setTitle('')
                setContent('')
                setUserId('')
                navigate(`/`)
            } catch (err) {
                console.error('Failed to edit the post', err)
            } finally {
                setRequestStatus('idle')
            }
    

    }

    const usersOptions = users.map(user => (
        <option key={user.id} value={user.id}>
            {user.name}
        </option>
    ))

    return (
        <section>
            <h2>Edit Post</h2>
            <form>
                <label htmlFor="postTitle">Post Title:</label>
                <input
                    type="text"
                    id="postTitle"
                    name="postTitle"
                    value={title}
                    onChange={onTitleChanged}
                />
                <label htmlFor="postAuthor">Author:</label>
                <select id="postAuthor" value={userId} onChange={onAuthorChanged}>
                    <option value=""></option>
                    {usersOptions}
                </select>
                <label htmlFor="postContent">Content:</label>
                <textarea
                    id="postContent"
                    name="postContent"
                    value={content}
                    onChange={onContentChanged}
                />
                <button
                    type="button"
                    onClick={onEditPostClicked}
                    disabled={!canEdit}
                >Edit Post</button>
                  <button
                    type="button"
                    className="deleteButton"
                    onClick={onDeletePostClicked}
                >Delete Post</button>
            </form>
        </section>
    )
}
export default EditPostForm