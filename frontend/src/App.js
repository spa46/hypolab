import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import UserRegistrationPage from './pages/users/UserRegistrationPage';
import UserLoginPage from './pages/users/UserLoginPage';
import ClusterRegistrationPage from './pages/clusters/ClusterRegistrationPage';
import ClusterStatusPage from './pages/clusters/ClusterStatusPage';
import ClusterControlPage from './pages/clusters/ClusterControlPage';
import ClusterMonitorPage from './pages/clusters/ClusterMonitorPage';

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/user/registration" element={<UserRegistrationPage />} />
        <Route path="/user/login" element={<UserLoginPage />} />
        <Route path="/clusters/registration" element={<ClusterRegistrationPage />} />
        <Route path="/clusters/status" element={<ClusterStatusPage />} />
        <Route path="/clusters/control" element={<ClusterControlPage />} />
        <Route path="/clusters/monitor" element={<ClusterMonitorPage />} />
      </Routes>
    </Router>
  );
};

export default App;