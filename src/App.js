import React, { useEffect, useState } from 'react';
import { getUsers, getUserPosts, deleteUserPost, updateUserPost } from './api';
import UserCard from './components/UserCard';
import PostCard from './components/PostCard';
import './App.css'; // Assuming you have a global CSS file for overall app styles

function App() {
  const [users, setUsers] = useState([]);
  const [selectedUserId, setSelectedUserId] = useState(null);
  const [selectedUserName, setSelectedUserName] = useState(''); // State for user's name
  const [posts, setPosts] = useState([]);

  // Fetch users on component mount
  useEffect(() => {
    getUsers().then(response => {
      console.log('Fetched users:', response.data);
      setUsers(response.data);
    });

    // Check for query params
    const params = new URLSearchParams(window.location.search);
    const userId = params.get('userId');
    if (userId) {
      handleSelectUser(parseInt(userId));
    }
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
      setSelectedUserName(''); // Reset user's name
      setPosts([]);
    }

    // Remove query param when user is removed
    const params = new URLSearchParams(window.location.search);
    params.delete('userId');
    window.history.replaceState({}, '', `${window.location.pathname}`);
  };

  // Select user and fetch their posts
  const handleSelectUser = (userId) => {
    console.log(`User ${userId} selected`);
    setSelectedUserId(userId);
    const user = users.find(user => user.id === userId);
    if (user) {
      setSelectedUserName(user.name); // Update user's name
    }

    // Update query param when user is selected
    const params = new URLSearchParams(window.location.search);
    params.set('userId', userId);
    window.history.replaceState({}, '', `${window.location.pathname}?${params}`);
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
        <div className="post-frame"> {/* Add a frame around the post list */}
          <h2>User {selectedUserName}'s Posts</h2> {/* Add heading */}
          <div className="post-list">
            {posts.map(post => (
              <PostCard key={post.id} post={post} onRemove={handleRemovePost} onEdit={handleEditPost} />
            ))}
          </div>
        </div>
      )}
    </div>
  );
}

export default App;
