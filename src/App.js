import React, {useState} from 'react';
import './App.css';
import LoginForm from './components/LoginForm/LoginForm';
import RegistrationForm from './components/RegistrationForm/RegistrationForm';
import AddHotel from './components/Hotel/AddHotel';
import EditHotel from './components/Hotel/EditHotel';
import RoomForm from './components/DataKamar/RoomForm';
import Sidebar from './components/Sidebar/Sidebar';
import Pemesanan from './components/Pemesanan/Pemesanan';
import DataKamar from './components/DataKamar/DataKamar';
import FasilitasKamar from './components/FasilitasKamar/FasilitasKamar';
import Profile from './components/Profile/Profile';
import PrivateRoute from './utils/PrivateRoute';
import {
  BrowserRouter as Router,
  Switch,
  Route
} from "react-router-dom";
import AlertComponent from './components/AlertComponent/AlertComponent';  
import api from "./api";

function App() {
  const [activeMenu, updateMenu] = useState("/home/hotel");
  const [errorMessage, updateErrorMessage] = useState(null);

  return (
    <Router>
    <div className="App">
        <Switch>
          <Route path="/" exact={true}>
            <LoginForm showError={updateErrorMessage} setMenu={updateMenu}/>     
          </Route>
          <Route path="/register">
            <RegistrationForm showError={updateErrorMessage} setMenu={updateMenu}/>
          </Route>
          <Route path="/login">
            <LoginForm showError={updateErrorMessage} setMenu={updateMenu}/>
          </Route>
        
          <div>
            <PrivateRoute path="/home">
              <Sidebar activeMenu={activeMenu} setMenu={updateMenu}/>
            </PrivateRoute>
            <PrivateRoute path="/hotel/add" exact={true}>
                <AddHotel showError={updateErrorMessage} setMenu={updateMenu} />
              </PrivateRoute>
            <div className="home-content">
              <PrivateRoute path="/home/hotel" exact={true}>
                <Profile showError={updateErrorMessage} setMenu={updateMenu} />
              </PrivateRoute>
              <PrivateRoute path="/home/hotel/edit">
                <EditHotel showError={updateErrorMessage} setMenu={updateMenu} />
              </PrivateRoute>
              <PrivateRoute path="/home/kamar" exact={true}>
                <DataKamar />
              </PrivateRoute>
              <PrivateRoute path="/home/kamar/add">
                <RoomForm showError={updateErrorMessage} setMenu={updateMenu} type="add"/>
              </PrivateRoute>
              <PrivateRoute path="/home/kamar/edit/:id">
                <RoomForm showError={updateErrorMessage} setMenu={updateMenu} type="edit"/>
              </PrivateRoute>
              <PrivateRoute path="/home/kamar/facility/add/:id">
                <FasilitasKamar showError={updateErrorMessage} setMenu={updateMenu} type="add" />
              </PrivateRoute>
              <PrivateRoute path="/home/kamar/facility/edit/:id">
                <FasilitasKamar showError={updateErrorMessage} setMenu={updateMenu} type="edit" />
              </PrivateRoute>
              <PrivateRoute path="/home/current-booking">
                <Pemesanan status="1"/>
              </PrivateRoute>
              <PrivateRoute path="/home/history-booking">
                <Pemesanan status="2"/>
              </PrivateRoute>
              <PrivateRoute path="/home/cancel-booking">
                <Pemesanan status="3"/>
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