import React, {useState} from 'react';
import './App.css';
import LoginForm from './components/LoginForm/LoginForm';
import RegistrationForm from './components/RegistrationForm/RegistrationForm';
import AddHotel from './components/Hotel/AddHotel';
import EditHotel from './components/Hotel/EditHotel';
import Sidebar from './components/Sidebar/Sidebar';
import Pemesanan from './components/Pemesanan/Pemesanan';
import DataKamar from './components/DataKamar/DataKamar';
import Pembatalan from './components/Pembatalan/Pembatalan';
import Profile from './components/Profile/Profile';
import Histori from './components/Histori/Histori';
import PrivateRoute from './utils/PrivateRoute';
import {
  BrowserRouter as Router,
  Switch,
  Route
} from "react-router-dom";
import AlertComponent from './components/AlertComponent/AlertComponent';  

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
        
          <div>
            <PrivateRoute path="/home">
              <Sidebar/>
            </PrivateRoute>
            <div className="home-content">
              <PrivateRoute path="/home/hotel" exact={true}>
                <Profile />
              </PrivateRoute>
              <PrivateRoute path="/hotel/add" exact={true}>
                <AddHotel showError={updateErrorMessage} updateTitle={updateTitle} />
              </PrivateRoute>
              <PrivateRoute path="/home/hotel/edit">
                <EditHotel showError={updateErrorMessage} updateTitle={updateTitle} />
              </PrivateRoute>
              <PrivateRoute path="/home/kamar" exact={true}>
                <DataKamar />
              </PrivateRoute>
              <PrivateRoute path="/home/kamar/add">
                <div>Add Kamar</div>
              </PrivateRoute>
              <PrivateRoute path="/home/kamar/edit">
                <div>Edit Kamar</div>
              </PrivateRoute>
              <PrivateRoute path="/home/current-booking">
                <Pemesanan />
              </PrivateRoute>
              <PrivateRoute path="/home/history-booking">
                <Histori />
              </PrivateRoute>
              <PrivateRoute path="/home/cancel-booking">
                <Pembatalan />
              </PrivateRoute>
              <PrivateRoute path="/home/logout">
                
              </PrivateRoute>
            </div>
          </div>
        </Switch>
        <AlertComponent errorMessage={errorMessage} hideError={updateErrorMessage}/>
  </div>
  </Router>
  );
}

export default App;