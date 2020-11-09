import React, {useState} from 'react';
import './App.css';
import Header from './components/Header/Header';
import LoginForm from './components/LoginForm/LoginForm';
import RegistrationForm from './components/RegistrationForm/RegistrationForm';
import Home from './components/Home/Home';
import PrivateRoute from './utils/PrivateRoute';
import {
  BrowserRouter as Router,
  Switch,
  Route
} from "react-router-dom";
import AlertComponent from './components/AlertComponent/AlertComponent';  

function Login() {
  const [title, updateTitle] = useState(null);
  const [errorMessage, updateErrorMessage] = useState(null);
  return (
    // <Router>
    // <div className="App">
    //   <Header title={title}/>
    //     <div className="container d-flex align-items-center flex-column">
    //       <Switch>
    //         <Route path="/" exact={true}>
    //           <RegistrationForm showError={updateErrorMessage} updateTitle={updateTitle}/>
    //         </Route>
    //         <Route path="/register">
    //           <RegistrationForm showError={updateErrorMessage} updateTitle={updateTitle}/>
    //         </Route>
    //         <Route path="/login">
    //           <LoginForm showError={updateErrorMessage} updateTitle={updateTitle}/>
    //         </Route>
    //         <PrivateRoute path="/home">
    //           <Home/>
    //         </PrivateRoute>
    //       </Switch>
    //       <AlertComponent errorMessage={errorMessage} hideError={updateErrorMessage}/>
    //     </div>
    // </div>
    // </Router>
    <Router>
    <div className="Login">
      <div className="limiter">
        <div className="container-login100">
          <div className="login100-more"></div>
          <div className="wrap-login100 p-l-50 p-r-50 p-t-72 p-b-50">
            <Switch>
              <Route path="/" exact={true}>
                <LoginForm showError={updateErrorMessage} updateTitle={updateTitle}/>
              </Route>
              <Route path="/register">
                <RegistrationForm showError={updateErrorMessage} updateTitle={updateTitle}/>
              </Route>
              <Route path="/login">
                <LoginForm showError={updateErrorMessage} updateTitle={updateTitle}/>
              </Route>
              <PrivateRoute path="/home">
                <Home/>
              </PrivateRoute>
            </Switch>
          </div>
        </div>
    </div>
  </div>
  </Router>
  );
}

export default Login;