import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import UserRegisterPage from './pages/users/UserRegisterPage';
import UserLoginPage from './pages/users/UserLoginPage';
import ClusterRegisterPage from './pages/clusters/ClusterRegisterPage';
import ClusterStatusPage from './pages/clusters/ClusterStatusPage';
import ClusterControlPage from './pages/clusters/ClusterControlPage';
import ClusterMonitorPage from './pages/clusters/ClusterMonitorPage';

const App = () => {
  return (
    <Router>
      <Switch>
        <Route path="/user/register" component={UserRegisterPage} />
        <Route path="/user/login" component={UserLoginPage} />
        <Route path="/clusters/register" component={ClusterRegisterPage} />
        <Route path="/clusters/status" component={ClusterStatusPage} />
        <Route path="/clusters/control" component={ClusterControlPage} />
        <Route path="/clusters/monitor" component={ClusterMonitorPage} />
      </Switch>
    </Router>
  );
};

export default App;