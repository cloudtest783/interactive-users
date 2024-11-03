import React, { useEffect, useState } from 'react';
import { getUsers, getUserPosts, deleteUserPost, updateUserPost } from './api';
import UserCard from './components/UserCard';
import PostCard from './components/PostCard';

function App() {
  const [users, setUsers] = useState([]);
  const [selectedUserId, setSelectedUserId] = useState(null);
  const [posts, setPosts] = useState([]);

  // Fetch users on component mount
  useEffect(() => {
    getUsers().then(response => {
      console.log('Fetched users:', response.data);
      setUsers(response.data);
    });
  }, []);

  // Fetch posts whenever a user is selected
  useEffect(() => {
    if (selectedUserId) {
      getUserPosts(selectedUserId).then(response => {
        console.log(`Fetched posts for user ${selectedUserId}:`, response.data);
        setPosts(response.data);
      });
    }
  }, [selectedUserId]);

  // Remove user and their posts
  const handleRemoveUser = (userId) => {
    console.log(`Removing user ${userId}`);
    setUsers(users.filter(user => user.id !== userId));
    if (userId === selectedUserId) {
      setSelectedUserId(null);
      setPosts([]);
    }
  };

  // Select user and fetch their posts
  const handleSelectUser = (userId) => {
    console.log(`User ${userId} selected`);
    setSelectedUserId(userId);
  };

  // Remove a post
  const handleRemovePost = (postId) => {
    console.log(`Removing post ${postId}`);
    deleteUserPost(postId).then(() => {
      setPosts(posts.filter(post => post.id !== postId));
    });
  };

  // Edit a post
  const handleEditPost = (postId, data) => {
    console.log(`Editing post ${postId}`, data);
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
