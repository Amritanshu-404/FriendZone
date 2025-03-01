import React, { useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import LandingPage from './Pages/LandingPage';
import About from './Pages/About';
import LoginSignup from './Pages/LoginSignup';
import Dashboard from './Pages/Dashboard';
import Navbar from './Components/Navbar';
import UserProject from './Pages/UserProject';
import ProjectPostWelcome from './Pages/ProjectPostWelcome';
import PostProject from './Pages/PostProject';
import Explore from './Pages/Explore';
import Profile from './Pages/Profile';
import Error from './ErrorPage';
import Banner from './Components/Banner';


const App = () => {
  useEffect(() => {
    const token = localStorage.getItem('token');
    if (token) {
      localStorage.setItem('isLoggedIn', 'true');
    }
  }, []);

  return (
    <Router>
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/about" element={<About />} />
        <Route path="/login" element={<LoginSignup />} />
        <Route
          path="/dashboard"
          element={
            localStorage.getItem('isLoggedIn') === 'true' ? (
              <>
                <Banner />
                <Navbar />
                <Dashboard />
              </>
            ) : (
              <Navigate to="/login" replace />
            )
          }
        />
        <Route
          path="/my_profile"
          element={
            localStorage.getItem('isLoggedIn') === 'true' ? (
              <>
                <Navbar />
                <Profile />
              </>
            ) : (
              <Navigate to="/login" replace />
            )
          }
        />
        <Route
          path="/explore"
          element={
            localStorage.getItem('isLoggedIn') === 'true' ? (
              <>
                <Navbar />
                <Explore />
              </>
            ) : (
              <Navigate to="/login" replace />
            )
          }
        />
        <Route
          path="/user/projects"
          element={
            localStorage.getItem('isLoggedIn') === 'true' ? (
              <>
                <Navbar />
                <UserProject />
              </>
            ) : (
              <Navigate to="/login" replace />
            )
          }
        />
        <Route
          path="/user/project_post/welcome"
          element={
            localStorage.getItem('isLoggedIn') === 'true' ? (
              <>
                <Navbar />
                <ProjectPostWelcome />
              </>
            ) : (
              <Navigate to="/login" replace />
            )
          }
        />
        <Route
          path="/user/project_post/details"
          element={
            localStorage.getItem('isLoggedIn') === 'true' ? (
              <>
                <Navbar />
                <PostProject />
              </>
            ) : (
              <Navigate to="/login" replace />
            )
          }
        />
        <Route path="*" element={<Error />} />
      </Routes>
    </Router>
  );
};

export default App;
