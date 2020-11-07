import React,{ useEffect } from 'react';
import { withRouter } from 'react-router-dom';
import { ACCESS_TOKEN_NAME, API_BASE_URL } from '../../constants/apiContants';
import axios from 'axios'
import LoginForm from '../LoginForm/LoginForm';
import RegistrationForm from '../RegistrationForm/RegistrationForm';
import Home from '../Home/Home';
import {
  BrowserRouter as Router,
  Switch,
  Route
} from "react-router-dom";
import AlertComponent from '../AlertComponent/AlertComponent';  
function Dashboard(props) {
    useEffect(() => {
        axios.get(API_BASE_URL+'/user/', { headers: { 'token': localStorage.getItem(ACCESS_TOKEN_NAME) }})
        .then(function (response) {
            if(response.status !== 200){
              redirectToLogin()
            }
            console.log(localStorage.getItem(ACCESS_TOKEN_NAME));
        })
        .catch(function (error) {
          redirectToLogin()
        });
      })
    function redirectToLogin() {
      props.history.push('/login');
    }
    return (
        <Router>
        <div className="App">
          <div className="limiter">
            <div className="container-login100">
              <div className="login100-more"></div>
              <div className="wrap-login100 p-l-50 p-r-50 p-t-72 p-b-50">
                <Switch>
                  <Route path="dashboard/" exact={true}>
                    <LoginForm/>
                  </Route>
                </Switch>
              </div>
            </div>
        </div>
      </div>
      </Router>
    )
}

export default withRouter(Dashboard);