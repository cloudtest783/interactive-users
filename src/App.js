import React, { useEffect, useState } from 'react';
import { BrowserRouter as Router, Route, Routes, useLocation } from 'react-router-dom';
import { getUsers, getUserPosts, deleteUserPost, updateUserPost } from './api';
import UserCard from './components/UserCard';
import PostCard from './components/PostCard';
import MapPage from './components/MapPage';
import './App.css'; // Assuming you have a global CSS file for overall app styles

function App() {
  const [users, setUsers] = useState([]);
  const [selectedUserId, setSelectedUserId] = useState(null);
  const [selectedUserName, setSelectedUserName] = useState('');
  const [posts, setPosts] = useState([]);
  const location = useLocation();

  useEffect(() => {
    getUsers().then(response => {
      setUsers(response.data);
    });

    // Check for query params
    const params = new URLSearchParams(window.location.search);
    const userId = params.get('userId');
    if (userId) {
      handleSelectUser(parseInt(userId));
    }
  }, []);

  useEffect(() => {
    if (selectedUserId) {
      getUserPosts(selectedUserId).then(response => {
        setPosts(response.data);
      });
    }
  }, [selectedUserId]);

  useEffect(() => {
    if (location.state && location.state.savedState) {
      setSelectedUserId(location.state.savedState.selectedUserId);
      setSelectedUserName(location.state.savedState.selectedUserName);
      setPosts(location.state.savedState.posts);
    }
  }, [location.state]);

  const handleRemoveUser = (userId) => {
    setUsers(users.filter(user => user.id !== userId));
    if (userId === selectedUserId) {
      setSelectedUserId(null);
      setSelectedUserName('');
      setPosts([]);
    }

    const params = new URLSearchParams(window.location.search);
    params.delete('userId');
    window.history.replaceState({}, '', `${window.location.pathname}`);
  };

  const handleSelectUser = (userId) => {
    setSelectedUserId(userId);
    const user = users.find(user => user.id === userId);
    if (user) {
      setSelectedUserName(user.name);
    }

    const params = new URLSearchParams(window.location.search);
    params.set('userId', userId);
    window.history.replaceState({}, '', `${window.location.pathname}?${params}`);
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

  const saveStateAndNavigate = (lat, lng) => {
    const savedState = { selectedUserId, selectedUserName, posts };
    window.history.pushState({ savedState }, '', `/map/${lat}/${lng}`);
  };

  return (
    <div className="App">
      <h1>User Interaction Hub</h1>
      <Routes>
        <Route path="/map/:lat/:lng" element={<MapPage />} />
        <Route path="/" element={
          <>
            <div className="user-list">
              {users.map(user => (
                <UserCard
                  key={user.id}
                  user={user}
                  onRemove={handleRemoveUser}
                  onSelect={(userId) => {
                    handleSelectUser(userId);
                  }}
                  onCoordinatesClick={(lat, lng) => {
                    saveStateAndNavigate(lat, lng);
                  }}
                />
              ))}
            </div>
            {selectedUserId && (
              <div className="post-frame">
                <h2>User {selectedUserName}'s Posts</h2>
                <div className="post-list">
                  {posts.map(post => (
                    <PostCard key={post.id} post={post} onRemove={handleRemovePost} onEdit={handleEditPost} />
                  ))}
                </div>
              </div>
            )}
          </>
        } />
      </Routes>
    </div>
  );
}

export default App;
