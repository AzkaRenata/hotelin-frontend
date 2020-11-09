
import React, { Component, useState } from 'react';
import Profile from './Profile';
import Header from './components/Header/Header';
import LoginForm from './components/LoginForm/LoginForm';
import RegistrationForm from './components/RegistrationForm/RegistrationForm';
import Home from './components/Home/Home';
import Dashboard from './components/Dashboard/Dashboard';
import PrivateRoute from './utils/PrivateRoute';
import {
  BrowserRouter as Router,
  Switch,
  Route
} from "react-router-dom";
import AlertComponent from './components/AlertComponent/AlertComponent';  
import KamarDetails from './KamarDetails';
import DataKamar from './components/DataKamar/DataKamar';
import Histori from './components/Histori/Histori';
import Pembatalan from './components/Pembatalan/Pembatalan';
import Pemesanan from './components/Pemesanan/Pemesanan';

// import logo from './logo.svg';
// import './App.css';

function App() {
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
    <div className="App">
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
              <Route path="/datakamar">
                <DataKamar showError={updateErrorMessage} updateTitle={updateTitle}/>
              </Route>
              <Route path="/histori">
                <Histori showError={updateErrorMessage} updateTitle={updateTitle}/>
              </Route>
              <Route path="/pemesanan">
                <Pemesanan showError={updateErrorMessage} updateTitle={updateTitle}/>
              </Route>
              <Route path="/pembatalan">
                <Pembatalan showError={updateErrorMessage} updateTitle={updateTitle}/>
              </Route>
              <PrivateRoute path="/home">
                <Dashboard/>
              </PrivateRoute>
            </Switch>
            <AlertComponent errorMessage={errorMessage} hideError={updateErrorMessage}/>
          </div>
        </div>
    </div>
  </div>
  </Router>
    
    // <div className="App">
    //   <header className="App-header">
    //     <img src={logo} className="App-logo" alt="logo" />
    //     <p>
    //       Edit <code>src/App.js</code> and save to reload.
    //     </p>
    //     <a
    //       className="App-link"
    //       href="https://reactjs.org"
    //       target="_blank"
    //       rel="noopener noreferrer"
    //     >
    //       Learn React
    //     </a>
    //   </header>
    // </div>
    
    <Profile />
  );
}

export default App;