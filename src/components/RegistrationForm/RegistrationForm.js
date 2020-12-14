import React, {useState} from 'react';
import axios from 'axios';
import './MyStyle.css';
import './Bootstrap.css';
import './RegistrationForm.css';
import {API_BASE_URL, ACCESS_TOKEN_NAME} from '../../constants/apiContants';
import { withRouter } from "react-router-dom";
import {useFormik} from "formik";
import * as Yup from "yup";

function RegistrationForm(props) {
    const validationSchema = Yup.object().shape({
        name: Yup.string().required("* required").max(30),
        username: Yup.string().required("* required").max(30),
        email: Yup.string().required("* required").email("* email must be a valid email"),
        password: Yup.string().required("* required").min(8)
                    .matches(/\w*[a-z]\w*/, "Password must have small character")
                    .matches(/\w*[A-Z]\w*/, "Password must have capital character")
                    .matches(/\d/, "Password must have a number")
                    .matches(/\w*[!@#$%^&*()-_"=+{}; :,<.>]\w*/, "Password must have special character"),
        password_confirmation: Yup.string().required("* required")
        .oneOf([Yup.ref('password'), null],'* Password must match'),
        telp: Yup.string().matches(/(0)(\d){10,12}\b/,"valid phone number (0xxxx)"),
    })

    const{ handleSubmit, handleChange, handleBlur, values, errors, touched, isValid } = useFormik({
        initialValues:{
            username : "",
            email : "",
            password : "",
            password_confirmation: "",
            name : "",
            telp : "",
            address: ""
        },
        validationSchema,
        onSubmit(values){
            console.log(values);
            sendDetailsToServer(values);
        }
    })

    const [state , setState] = useState({
        successMessage: null
    })
    const [gender, setGender] = useState("male");
    const [user_picture, setPicture] = useState(null);

    const onGenderChange = (e) => {
        setGender(e.target.value);
    }
    const onFileChange = (e) => {
      setPicture(e.target.files[0]); 
    }

    const sendDetailsToServer = (values) => {
        props.showError(null);

        const formData = new FormData(); 
        formData.append( 
            "name", 
            values.name
        ); 
        formData.append( 
            "gender", 
            gender
        ); 
        formData.append( 
            "telp", 
            values.telp
        );
        formData.append( 
            "address", 
            values.address
        );
        formData.append( 
            "username", 
            values.username
        );
        formData.append( 
            "email", 
            values.email
        );
        formData.append( 
            "password", 
            values.password
        );
        formData.append( 
            "password_confirmation", 
            values.password_confirmation
        );
        formData.append( 
            "user_level", 
            "1"
        );
        formData.append( 
            "user_picture", 
            user_picture
        ); 
            
        axios.post(API_BASE_URL+'/user/register', formData)
            .then(function (response) {
                if(response.status === 201 || response.status === 200){
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
        
    }
    const toHotelForm = () => {
        props.setMenu('/hotel/add');
        props.history.push('/hotel/add');
    }
    const redirectToLogin = () => {
        props.history.push('/login'); 
    }

    return(
        <div className="limiter">
            <div className="container-login100">
                <div className="login100-more"></div>
                <div className="wrap-login100 p-l-50 p-r-50 p-t-72 p-b-50">
                    <form className="login100-form validate-form" onSubmit={handleSubmit} autocomplete="off">
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
                        id="username" value={values.username} onChange={handleChange} onBlur={handleBlur}/>
                        <span className="focus-input100"></span>
                        </div>
                        <span className="error-message">{touched.username && errors.username ? errors.username : null}</span>

                        <div className="wrap-input100 validate-input" data-validate = "Valid email is required: ex@abc.xyz">
                        <input className="input100" type="text" name="email" placeholder="Email addess..." 
                        id="email" value={values.email} onChange={handleChange} onBlur={handleBlur}/>
                        <span className="focus-input100"></span>
                        </div>
                        <span className="error-message">{touched.email && errors.email ? errors.email : null}</span>

                        <div className="wrap-input100 validate-input" data-validate = "Password is required">
                        <input className="input100" type="password" name="password" placeholder="Password" 
                        id="password" value={values.password} onChange={handleChange} onBlur={handleBlur}/>
                        <span className="focus-input100"></span>
                        </div>
                        <span className="error-message">{touched.password && errors.password ? errors.password : null}</span>

                        <div className="wrap-input100 validate-input" data-validate = "Repeat Password is required">
                        <input className="input100" type="password" name="password_confirmation" placeholder="Confirm Password" 
                        id="password_confirmation" value={values.password_confirmation} onChange={handleChange} onBlur={handleBlur}/>
                        <span className="focus-input100"></span>
                        </div>
                        <span className="error-message">{touched.password_confirmation && errors.password_confirmation ? errors.password_confirmation : null}</span>

                        <div className="wrap-input100 validate-input" data-validate="Name is required">
                        <input className="input100" type="text" name="name" placeholder="Name..."
                        id="name" value={values.name} onChange={handleChange} onBlur={handleBlur} />
                        <span className="focus-input100"></span>
                        </div>
                        <span className="error-message">{touched.name && errors.name ? errors.name : null}</span>

                        <div className="form-group w-full m-t-15">
                            <select className="form-control" name="gender" value={gender} onChange={onGenderChange}>
                                <option disabled="disabled" selected="selected">Gender</option>
                                <option value="Male">Male</option>
                                <option value="Female">Female</option>
                            </select>  
                        </div>

                        <div className="wrap-input100 validate-input" data-validate="Telp is required">
                        <input className="input100" type="text" name="telp" placeholder="Telp..."
                        id="telp" value={values.telp} onChange={handleChange} onBlur={handleBlur} />
                        <span className="focus-input100"></span>
                        </div>
                        <span className="error-message">{touched.telp && errors.telp ? errors.telp : null}</span>

                        <div className="wrap-input100 validate-input" data-validate="Address is required">
                        <input className="input100" type="text" name="address" placeholder="Address..."
                        id="address" value={values.address} onChange={handleChange} onBlur={handleBlur} />
                        <span className="focus-input100"></span>
                        </div>

                        <div class="form-group w-full m-t-15 m-box">
                            <b>Upload Picture</b>
                            <br/>
                            <input type="file" class="form-control-file border" onChange={onFileChange} />
                        </div>

                        <div className="container-login100-form-btn m-t-30">
                        <div className="wrap-login100-form-btn">
                            <div className="login100-form-bgbtn"></div>
                            <button className="login100-form-btn w-full sign-up-btn" type="submit" disabled={!isValid}>
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