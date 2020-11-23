import React, {useCallback, useEffect} from 'react'
import {useDropzone} from 'react-dropzone'
import {Button, Form, Label, Input, FormGroup, Container, Row, Col} from 'reactstrap';
import axios from 'axios';
import {API_BASE_URL, ACCESS_TOKEN_NAME} from '../../constants/apiContants';
import { withRouter } from "react-router-dom";
import {useState} from 'react';

function RoomForm(props) {

    const [state , setState] = useState({
        room_id: "",
        room_type : "",
        bed_type : "",
        room_price : "",
        guest_capacity : "",
        hotel_id: ""
    });
    const [room_picture, setPicture] = useState(null);

    const handleChange = (e) => {
        const {id , value} = e.target   
        setState(prevState => ({
            ...prevState,
            [id] : value
        }))
    }

    useEffect(() => {
        if(props.type == "edit"){
            const room_id = props.match.params.id;
            axios.get(API_BASE_URL+`/room/list/${room_id}`, { headers: { "Authorization": `Bearer ${localStorage.getItem(ACCESS_TOKEN_NAME)}`}})
                .then(function (response) {
                    setState({
                        room_id: room_id,
                        room_type: response.data.room_type,
                        bed_type: response.data.bed_type,
                        guest_capacity: response.data.guest_capacity,
                        room_price: response.data.room_price,
                        hotel_id: response.data.hotel_id
                    })
                    console.log(response.data);
                })
                .catch(function (error) {
                    console.log(error);
                });
        }
    }, [])

    const onDrop = useCallback(acceptedFiles => {
        // Do something with the files
        setPicture(acceptedFiles[0]);
    }, [])
    const {getRootProps, getInputProps, isDragActive} = useDropzone({onDrop})

    const sendData = () => {
        if(state.room_type.length) {
            props.showError(null);
            const formData = new FormData(); 
            formData.append( 
            "room_type", 
            state.room_type
            ); 
            formData.append( 
            "bed_type", 
            state.bed_type
            ); 
            formData.append( 
            "room_price", 
            state.room_price
            );
            formData.append( 
            "hotel_id", 
            state.hotel_id
            ); 
            formData.append( 
            "guest_capacity", 
            state.guest_capacity
            );
            formData.append( 
            "room_picture", 
            room_picture
            ); 
            
            if(props.type == "edit"){
                axios.post(API_BASE_URL+`/room/update/${state.room_id}`, formData, { headers: { "Authorization": `Bearer ${localStorage.getItem(ACCESS_TOKEN_NAME)}`}})
                .then(function (response) {
                    if(response.status === 201 || response.status === 200){
                        setState(prevState => ({
                            ...prevState,
                            'successMessage' : 'Add Successfully. Redirecting to home page..'
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
            } else if(props.type == "add"){
                axios.post(API_BASE_URL+'/room/create', formData, { headers: { "Authorization": `Bearer ${localStorage.getItem(ACCESS_TOKEN_NAME)}`}})
                .then(function (response) {
                    if(response.status === 201 || response.status === 200){
                        setState(prevState => ({
                            ...prevState,
                            'successMessage' : 'Add Successfully. Redirecting to home page..'
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
            }
              
        } else {
            props.showError('Error')    
        }  
    }

    const redirectToHome = () => {
        props.setMenu('/home/kamar')
        props.history.push('/home/kamar');
    }

    const handleSubmitClick = (e) => {
        e.preventDefault();
        sendData();
    }

    return (
        <div className="create-hotel">
        <Container>
        <h2>Data Kamar</h2>
        <Row>
        <Col>
        <div className="create-hotel-form">
            <Form>
                <FormGroup>
                <Input type="text" placeholder="Room Type" name="room_type" id="room_type" value={state.room_type} onChange={handleChange}/>
                </FormGroup>
                <FormGroup>
                <Input type="text" placeholder="Bed Type" name="bed_type" id="bed_type" value={state.bed_type} onChange={handleChange}/>
                </FormGroup>
                <FormGroup>
                <Input type="text" placeholder="Guest Capacity" name="guest_capacity" id="guest_capacity" value={state.guest_capacity} onChange={handleChange}/>
                </FormGroup>
                <FormGroup>
                <Input type="text" placeholder="Room Price" name="room_price" id="room_price" value={state.room_price} onChange={handleChange}/>
                </FormGroup>
                <Button className="create-hotel-btn" onClick={handleSubmitClick}>Save Data</Button>
            </Form>
        </div>
        </Col>
        <Col>
        <div {...getRootProps()} className="create-hotel-dragndrop">
            <input {...getInputProps()} />
            {
            isDragActive ?
            <p>Drop the files here ...</p> :
            <img src="../../../down-arrow.png" className="upload-image"></img>
            }
        </div>
        </Col>
        </Row>
        </Container>
        </div>
    );
}

export default withRouter(RoomForm);
