import './AddHotel.css';

import React from 'react'
import {Button, Form, Input, FormGroup, Container, Row, Col} from 'reactstrap';
import axios from 'axios';
import {API_BASE_URL, ACCESS_TOKEN_NAME} from '../../constants/apiContants';
import { withRouter } from "react-router-dom";
import {useState} from 'react';
import Dropzone from '../Dropzone/Dropzone';

function AddHotel(props) {

  const [state , setState] = useState({
    hotel_name : "",
    hotel_location : "",
    hotel_desc : ""
  });
  const [hotel_picture, setPicture] = useState(null);

  const handleChange = (e) => {
      const {id , value} = e.target   
      setState(prevState => ({
          ...prevState,
          [id] : value
      }))
  }

  const sendData = () => {
    if(state.hotel_name.length && state.hotel_location.length) {
        props.showError(null);
        const formData = new FormData(); 
        formData.append( 
          "hotel_name", 
          state.hotel_name
        ); 
        formData.append( 
          "hotel_location", 
          state.hotel_location
        ); 
        formData.append( 
          "hotel_desc", 
          state.hotel_desc
        ); 
        formData.append( 
          "hotel_picture", 
          hotel_picture
        ); 
         
        axios.post(API_BASE_URL+'/hotel/create', formData, { headers: { "Authorization": `Bearer ${localStorage.getItem(ACCESS_TOKEN_NAME)}`}})
            .then(function (response) {
                if(response.status === 200 || (response.status === 201)){
                    setState(prevState => ({
                        ...prevState,
                        'successMessage' : 'Add Hotel Successfully. Redirecting to home page..'
                    }))
                    redirectToHome();
                    console.log(localStorage.getItem(ACCESS_TOKEN_NAME));
                    props.showError(null)
                } else{
                    props.showError("Some error ocurred");
                }
            })
            .catch(function (error) {
                console.log(error);
            });    
    } else {
        props.showError('Input Tidak Boleh Kosong')    
    }  
  }

  const redirectToHome = () => {
    props.setMenu('/home/hotel')
    props.history.push('/home/hotel');
  }

  const handleSubmitClick = (e) => {
    e.preventDefault();
    sendData();
  }

  return (
    <div className="create-hotel">
    <Container>
      <h2>Tambah Data Hotel</h2>
      <Row>
      <Col>
      <div className="create-hotel-form">
          <Form>
            <FormGroup>
              <Input type="text" placeholder="Nama Hotel" name="hotel_name" id="hotel_name" value={state.hotel_name} onChange={handleChange}/>
            </FormGroup>
            <FormGroup>
              <Input type="text" placeholder="Lokasi Hotel" name="hotel_location" id="hotel_location" value={state.hotel_location} onChange={handleChange}/>
            </FormGroup>
            <FormGroup>
              <Input type="textarea" placeholder="Deskripsi Hotel" name="hotel_desc" id="hotel_desc" value={state.hotel_desc} onChange={handleChange}/>
            </FormGroup>
            <Button className="create-hotel-btn" onClick={handleSubmitClick}>SIMPAN</Button>
          </Form>
      </div>
      </Col>
      <Col>
      <Dropzone setPicture={setPicture}/>
      </Col>
      </Row>
    </Container>
    </div>
  );
}

export default withRouter(AddHotel);
