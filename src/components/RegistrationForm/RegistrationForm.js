import React, {useState} from 'react';
import axios from 'axios';
import './MyStyle.css';
import './Bootstrap.css';
import './RegistrationForm.css';
import {API_BASE_URL, ACCESS_TOKEN_NAME} from '../../constants/apiContants';
import { withRouter } from "react-router-dom";

function RegistrationForm(props) {
    const [state , setState] = useState({
        email : "",
        password : "",
        password_confirmation: "",
        name : "",
        telp : "",
        address: "",
        username : "",
        successMessage: null
    })
    const [gender, setGender] = useState("male");
    const [user_picture, setPicture] = useState(null);

    const handleChange = (e) => {
        const {id , value} = e.target   
        setState(prevState => ({
            ...prevState,
            [id] : value
        }))
    }

    const onGenderChange = (e) => {
        setGender(e.target.value);
    }

    const onFileChange = (e) => {
      setPicture(e.target.files[0]); 
    }

    const sendDetailsToServer = () => {
        if(state.email.length && state.password.length) {
            props.showError(null);

            const formData = new FormData(); 
            formData.append( 
              "name", 
              state.name
            ); 
            formData.append( 
              "gender", 
              gender
            ); 
            formData.append( 
              "telp", 
              state.telp
            );
            formData.append( 
              "address", 
              state.address
            );
            formData.append( 
              "username", 
              state.username
            );
            formData.append( 
              "email", 
              state.email
            );
            formData.append( 
              "password", 
              state.password
            );
            formData.append( 
              "password_confirmation", 
              state.password_confirmation
            );
            formData.append( 
              "user_level", 
              1
            );
            formData.append( 
              "user_picture", 
              user_picture
            ); 
             
            axios.post(API_BASE_URL+'/user/register', formData)
                .then(function (response) {
                    if(response.status === 200){
                        setState(prevState => ({
                            ...prevState,
                            'successMessage' : 'Registration successful. Redirecting to home page..'
                        }))
                        localStorage.setItem(ACCESS_TOKEN_NAME,response.data.token);
                        toHotelForm();
                        props.showError(null)
                    } else{
                        props.showError("Some error ocurred");
                    }
                })
                .catch(function (error) {
                    console.log(error);
                });    
        } else {
            props.showError('Please enter valid username and password')    
        }
        
    }
    const toHotelForm = () => {
        props.updateTitle('Hotel')
        props.history.push('/hotel/add');
    }
    const redirectToLogin = () => {
        props.updateTitle('Login')
        props.history.push('/login'); 
    }
    const handleSubmitClick = (e) => {
        e.preventDefault();
        if(state.password === state.password_confirmation) {
            sendDetailsToServer()    
        } else {
            props.showError('Passwords do not match');
        }
    }

    return(
        <div className="limiter">
            <div className="container-login100">
                <div className="login100-more"></div>
                <div className="wrap-login100 p-l-50 p-r-50 p-t-72 p-b-50">
                    <form className="login100-form validate-form">
                        <div className="p-b-59 w-full text-center">
                            <div className="dis-inline text-left">
                                <a href="javascript:void(0)" className="login100-form-title text-center title" onClick={() => redirectToLogin()}>
                                LOGIN
                                </a>  
                            </div>
                            <div className="dis-inline text-center">
                                <span className="login100-form-title">
                                &nbsp;&nbsp;&nbsp;| &nbsp;&nbsp;&nbsp;
                                </span>  
                            </div>
                            <div className="dis-inline text-right">
                                <span className="login100-form-title text-center text-blue title">
                                REGISTER
                                </span>  
                            </div>
                        </div>

                        <div className="wrap-input100 validate-input" data-validate="Username is required">
                        <input className="input100" type="text" name="username" placeholder="Username..." 
                        id="username" value={state.username} onChange={handleChange}/>
                        <span className="focus-input100"></span>
                        </div>

                        <div className="wrap-input100 validate-input" data-validate = "Valid email is required: ex@abc.xyz">
                        <input className="input100" type="text" name="email" placeholder="Email addess..." 
                        id="email" value={state.email} onChange={handleChange}/>
                        <span className="focus-input100"></span>
                        </div>

                        <div className="wrap-input100 validate-input" data-validate = "Password is required">
                        <input className="input100" type="password" name="pass" placeholder="Password" 
                        id="password" value={state.password} onChange={handleChange}/>
                        <span className="focus-input100"></span>
                        </div>

                        <div className="wrap-input100 validate-input" data-validate = "Repeat Password is required">
                        <input className="input100" type="password" name="repeat-pass" placeholder="Confirm Password" 
                        id="password_confirmation" value={state.password_confirmation} onChange={handleChange}/>
                        <span className="focus-input100"></span>
                        </div>

                        <div className="wrap-input100 validate-input" data-validate="Name is required">
                        <input className="input100" type="text" name="name" placeholder="Name..."
                        id="name" value={state.name} onChange={handleChange} />
                        <span className="focus-input100"></span>
                        </div>

                        <div className="form-group w-full m-t-15">
                            <select className="form-control" name="gender" value={gender} onChange={onGenderChange}>
                                <option disabled="disabled" selected="selected">Gender</option>
                                <option value="Male">Male</option>
                                <option value="Female">Female</option>
                            </select>  
                        </div>

                        <div className="wrap-input100 validate-input" data-validate="Telp is required">
                        <input className="input100" type="text" name="telp" placeholder="Telp..."
                        id="telp" value={state.telp} onChange={handleChange} />
                        <span className="focus-input100"></span>
                        </div>

                        <div className="wrap-input100 validate-input" data-validate="Address is required">
                        <input className="input100" type="text" name="address" placeholder="Address..."
                        id="address" value={state.address} onChange={handleChange} />
                        <span className="focus-input100"></span>
                        </div>

                        <div class="form-group w-full m-t-15">
                            Upload Picture
                            <input type="file" class="form-control-file border" onChange={onFileChange} />
                        </div>

                        <div className="container-login100-form-btn m-t-59">
                        <div className="wrap-login100-form-btn">
                            <div className="login100-form-bgbtn"></div>
                            <button className="login100-form-btn w-full sign-up-btn" onClick={handleSubmitClick}>
                            Sign Up
                            </button>
                        </div>

                        </div>
                    </form>
                    <h6 className="text-center fs-18">Sudah Punya Akun ? <a className="fs-18" href="javascript:void(0)" onClick={() => redirectToLogin()}>Masuk</a></h6>
                </div>
            </div>
        </div>
    )
}
export default withRouter(RegistrationForm);