import React from 'react';
import { Routes, Route } from 'react-router-dom';
import PostsList from "./features/posts/PostsList";
import AddPostForm from "./features/posts/AddPostForm";
import SinglePost from "./features/posts/SinglePost";
import EditPostForm from "./features/posts/EditPostForm"
import Layout from "./components/Layout";
import UserList from './features/users/UserList';
import UserPage from './features/users/UserPage';

function App() {
  return (
    <Routes>
      <Route path="/" element={<Layout />}>
        <Route index element={<PostsList />} />
        <Route path="post">
          <Route index element={<AddPostForm />} />
          <Route path=':postId' element={<SinglePost />} />
          <Route path='edit/:postId' element={<EditPostForm />} />
        </Route>
        <Route path="users">
          <Route index element={<UserList />} />
          <Route path=':userId' element={<UserPage />} />
        </Route>
      </Route>
    </Routes>
  );
}

export default App;
