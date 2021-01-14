import React, {useState} from 'react';
import axios from 'axios';
import './LoginForm.css';
import {API_BASE_URL, ACCESS_TOKEN_NAME} from '../../constants/apiContants';
import { withRouter } from "react-router-dom";
import {useFormik} from "formik";
import * as Yup from "yup";

function LoginForm(props) {
    const validationSchema = Yup.object().shape({
      email: Yup.string().required("* required").email("* email must be a valid email"),
      password: Yup.string().required("* required").min(8),
    })
    const{ handleSubmit, handleChange, handleBlur, values, errors, touched, isValid } = useFormik({
      initialValues:{
          email : "",
          password : ""
      },
      validationSchema,
      onSubmit(values){
          console.log(values);
          sendData(values);
      }
    })
    const [state , setState] = useState({
        successMessage: null
    })

    const sendData = (state) => {
        const payload={
            "email":state.email,
            "password":state.password,
        }
        axios.post(API_BASE_URL+'/user/login/owner', payload)
            .then(function (response) {
                if(response.status === 200 || (response.status === 201)){
                    setState(prevState => ({
                        ...prevState,
                        'successMessage' : 'Login successful. Redirecting to home page..'
                    }))
                    localStorage.setItem(ACCESS_TOKEN_NAME,response.data.token);
                    redirectToHome();
                    props.showError(null);
                  }
            })
            .catch(function (error) {
              console.log(error);
              if(error.response.status === 400){
                  props.showError("Username/Email Tidak Ditemukan");
              }
              else if(error.response.status === 401){
                  props.showError("Password Salah");
              } else {
                  props.showError("Internal Server Error");
              }
            });
    }
    const redirectToHome = () => {
        props.setMenu('/home/hotel')
        props.history.push('/home/hotel');
    }
    const redirectToRegister = () => {
        props.history.push('/register'); 
        props.setMenu('Register');
    }

    /*const styles = StyleSheet.create({
      image: {
    
      },
      touchable: {
        alignItems: 'center',
        justifyContent: 'center'
      },
      text: {
        color: colors.button,
        fontSize: 18,
        textAlign: 'center'
      }
    })

    <div className="download">
              <TouchableOpacity style={styles.touchable}>
                 <Image source={images.button} style={styles.image} />
              </TouchableOpacity>
            </div>
    
    */

    return(
      <div className="limiter">
        <div className="container-login100">
          <div className="login100-more"></div>
          <div className="wrap-login100 p-l-50 p-r-50 p-t-72 p-b-50">
            <form className="login100-form validate-form" onSubmit={handleSubmit}>
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
                <input className="input100" type="email" name="email" placeholder="Email addess..." 
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

              <div className="container-login100-form-btn m-t-59">
                <div className="wrap-login100-form-btn">
                  <div className="login100-form-bgbtn"></div>
                  <button className="login100-form-btn w-full sign-in-btn" disabled={!isValid}>
                    LOGIN
                  </button>
                </div>
              </div>
              <div className="alert alert-success mt-2" style={{display: state.successMessage ? 'block' : 'none' }} role="alert">
                  {state.successMessage}
            </div>
            </form>
            <h6 className="text-center fs-18">Belum Punya Akun ? <a className="fs-18" href="javascript:void(0)" onClick={() => redirectToRegister()}>Daftar</a></h6>
          
            <div className="row">
              <div className="col-lg-6">
                <a href="#">
                  <img src="../../download-desktop.png" className="download-img"></img>
                </a>
                
              </div>

              <div className="col-lg-6">
                <a href="#">
                  <img src="../../download-playstore.png" className="download-img"></img>
                </a>
              </div>

            </div>
          </div>
        </div>
      </div>
      )
}

export default withRouter(LoginForm);