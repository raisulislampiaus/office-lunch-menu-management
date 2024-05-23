import React from 'react';
import { BrowserRouter as Router, Route, Switch, Redirect } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';
import ProtectedRoute from './components/ProtectedRoute';
import AddMenu from './components/AddMenu';
import AddMenuOption from './components/AddMenuOption';
import ViewChoices from './components/ViewChoices';
import ViewMenu from './components/ViewMenu';
import SelectChoice from './components/SelectChoice';
import Login from './components/Login';
import Register from './components/Register';
import Navbar from './components/Navbar';
import Home from './components/Home';

const App = () => {
  return (
    <AuthProvider>
      <Router>
        <div>
          <Navbar />
          <Switch>
            <Route path="/home" component={Home} />
            <Route path="/login" component={Login} />
            <Route path="/register" component={Register} />
            <ProtectedRoute path="/admin/add-menu" component={AddMenu} role="admin" />
            <ProtectedRoute path="/admin/add-menu-option" component={AddMenuOption} role="admin" />
            <ProtectedRoute path="/admin/view-choices" component={ViewChoices} role="admin" />
            <ProtectedRoute path="/employee/view-menu" component={ViewMenu} />
            <ProtectedRoute path="/employee/select-choice/:userId" component={SelectChoice} />
            <Route path="*" render={() => <Redirect to="/login" />} />
          </Switch>
        </div>
      </Router>
    </AuthProvider>
  );
};

export default App;
