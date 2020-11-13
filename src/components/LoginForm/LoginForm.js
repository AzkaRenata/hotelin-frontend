import React, {useState} from 'react';
import axios from 'axios';
import './LoginForm.css';
import {API_BASE_URL, ACCESS_TOKEN_NAME} from '../../constants/apiContants';
import { withRouter } from "react-router-dom";

function LoginForm(props) {
    const [state , setState] = useState({
        email : "",
        password : "",
        successMessage: null
    })
    const handleChange = (e) => {
        const {id , value} = e.target   
        setState(prevState => ({
            ...prevState,
            [id] : value
        }))
    }

    const handleSubmitClick = (e) => {
        e.preventDefault();
        const payload={
            "email":state.email,
            "password":state.password,
        }
        axios.post(API_BASE_URL+'/user/login', payload)
            .then(function (response) {
                if(response.status === 200){
                    setState(prevState => ({
                        ...prevState,
                        'successMessage' : 'Login successful. Redirecting to home page..'
                    }))
                    localStorage.setItem(ACCESS_TOKEN_NAME,response.data.token);
                    redirectToHome();
                    props.showError(null)
                }
                else if(response.code === 400){
                    props.showError("Username and password do not match");
                }
                else{
                    props.showError("Username does not exists");
                }
            })
            .catch(function (error) {
                console.log(error);
            });
    }
    const redirectToHome = () => {
        props.updateTitle('Home')
        props.history.push('/home/hotel');
    }
    const redirectToRegister = () => {
        props.history.push('/register'); 
        props.updateTitle('Register');
    }
    // return(
    //     <div className="card col-12 col-lg-4 login-card mt-2 hv-center">
    //         <form>
    //             <div className="form-group text-left">
    //             <label htmlFor="exampleInputEmail1">Email address</label>
    //             <input type="email" 
    //                    className="form-control" 
    //                    id="email" 
    //                    aria-describedby="emailHelp" 
    //                    placeholder="Enter email" 
    //                    value={state.email}
    //                    onChange={handleChange}
    //             />
    //             <small id="emailHelp" className="form-text text-muted">We'll never share your email with anyone else.</small>
    //             </div>
    //             <div className="form-group text-left">
    //             <label htmlFor="exampleInputPassword1">Password</label>
    //             <input type="password" 
    //                    className="form-control" 
    //                    id="password" 
    //                    placeholder="Password"
    //                    value={state.password}
    //                    onChange={handleChange} 
    //             />
    //             </div>
    //             <div className="form-check">
    //             </div>
    //             <button 
    //                 type="submit" 
    //                 className="btn btn-primary"
    //                 onClick={handleSubmitClick}
    //             >Submit</button>
    //         </form>
    //         <div className="alert alert-success mt-2" style={{display: state.successMessage ? 'block' : 'none' }} role="alert">
    //             {state.successMessage}
    //         </div>
    //         <div className="registerMessage">
    //             <span>Dont have an account? </span>
    //             <span className="loginText" onClick={() => redirectToRegister()}>Register</span> 
    //         </div>
    //     </div>
    // )
    return(
      <div className="limiter">
        <div className="container-login100">
          <div className="login100-more"></div>
          <div className="wrap-login100 p-l-50 p-r-50 p-t-72 p-b-50">
            <form className="login100-form validate-form">
              <div className="p-b-59 w-full text-center">
                <span className="login100-form-title text-blue title">
                  LOGIN
                </span>
                <div className="dis-inline text-center">
                    <span className="login100-form-title">
                    &nbsp;&nbsp;&nbsp;| &nbsp;&nbsp;&nbsp;
                    </span>  
                </div>
                <a href="javascript:void(0)" className="login100-form-title title" onClick={() => redirectToRegister()} >
                REGISTER
                </a>
                
                
            </div>

              <div className="wrap-input100 validate-input" data-validate = "Valid email is required: ex@abc.xyz">
                <input className="input100" type="text" name="email" placeholder="Email addess..." 
                id="email" value={state.email} onChange={handleChange}/>
                <span className="focus-input100"></span>
              </div>

              <div className="wrap-input100 validate-input" data-validate = "Password is required">
                <input className="input100" type="password" name="pass" placeholder="Password"
                id="password" value={state.password} onChange={handleChange} />
                <span className="focus-input100"></span>
              </div>

              <div className="container-login100-form-btn m-t-59">
                <div className="wrap-login100-form-btn">
                  <div className="login100-form-bgbtn"></div>
                  <button className="login100-form-btn w-full sign-in-btn" onClick={handleSubmitClick}>
                    Sign in
                  </button>
                </div>
              </div>
              <div className="alert alert-success mt-2" style={{display: state.successMessage ? 'block' : 'none' }} role="alert">
                  {state.successMessage}
            </div>
            </form>
            <h6 className="text-center fs-18">Belum Punya Akun ? <a className="fs-18" href="javascript:void(0)" onClick={() => redirectToRegister()}>Daftar</a></h6>
          </div>
        </div>
      </div>
      )
}

export default withRouter(LoginForm);