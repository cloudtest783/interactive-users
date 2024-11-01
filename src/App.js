// src/App.js
import React, { useEffect, useState } from 'react';
import { getUsers, getUserPosts, deleteUser, deleteUserPost, updateUserPost } from './api';
import UserCard from './components/UserCard';
import PostCard from './components/PostCard';

function App() {
  const [users, setUsers] = useState([]);
  const [selectedUserId, setSelectedUserId] = useState(null);
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    getUsers().then(response => setUsers(response.data));
  }, []);

  const handleRemoveUser = (userId) => {
    deleteUser(userId).then(() => {
      setUsers(users.filter(user => user.id !== userId));
      if (userId === selectedUserId) {
        setSelectedUserId(null);
        setPosts([]);
      }
    });
  };

  const handleSelectUser = (userId) => {
    setSelectedUserId(userId);
    getUserPosts(userId).then(response => setPosts(response.data));
  };

  const handleRemovePost = (postId) => {
    deleteUserPost(postId).then(() => {
      setPosts(posts.filter(post => post.id !== postId));
    });
  };

  const handleEditPost = (postId, data) => {
    updateUserPost(postId, data).then(() => {
      setPosts(posts.map(post => post.id === postId ? { ...post, ...data } : post));
    });
  };

  return (
    <div className="App">
      <h1>User Interaction Hub</h1>
      <div className="user-list">
        {users.map(user => (
          <UserCard key={user.id} user={user} onRemove={handleRemoveUser} onSelect={handleSelectUser} />
        ))}
      </div>
      {selectedUserId && (
        <div className="post-list">
          {posts.map(post => (
            <PostCard key={post.id} post={post} onRemove={handleRemovePost} onEdit={handleEditPost} />
          ))}
        </div>
      )}
    </div>
  );
}

export default App;
