import React, {useCallback, useEffect} from 'react'
import {useDropzone} from 'react-dropzone'
import {Button, Form, Label, Input, FormGroup, Container, Row, Col} from 'reactstrap';
import axios from 'axios';
import {API_BASE_URL, ACCESS_TOKEN_NAME} from '../../constants/apiContants';
import { withRouter } from "react-router-dom";
import {useState} from 'react';
import Dropzone from '../Dropzone/Dropzone';

function RoomForm(props) {
    // const validationSchema = Yup.object().shape({
    //     room_code: Yup.string().required("* required").max(50),
    //     room_type: Yup.string().required("* required").max(50),
    //     bed_type: Yup.string().required("* required").max(50),
    //     bed_count: Yup.number().required("* required").max(10),
    //     room_price: Yup.number().required("* required").max(50),
    //     guest_capacity: Yup.number().required("* required").max(4),
    // })
    const [state , setState] = useState({
        room_id: "",
        room_code: "",
        room_type : "",
        bed_type : "",
        bed_count : "",
        room_price : "",
        guest_capacity : "",
        hotel_id: ""
    });
    // const{ handleSubmit, handleChange, handleBlur, values, errors, touched, isValid } = useFormik({
    //     initialValues:{
    //         room_id: "",
    //         room_code: "",
    //         room_type : "",
    //         bed_type : "",
    //         bed_count : "",
    //         room_price : "",
    //         guest_capacity : "",
    //         hotel_id: ""
    //     },
    //     validationSchema,
    //     onSubmit(values){
    //         console.log(values);
    //         sendData(values);
    //     }
    // })
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
                        room_code: response.data.room_code,
                        room_type: response.data.room_type,
                        bed_type: response.data.bed_type,
                        bed_count: response.data.bed_count,
                        guest_capacity: response.data.guest_capacity,
                        room_price: response.data.room_price,
                        hotel_id: response.data.hotel_id
                    })
                    console.log(response.data);
                })
                .catch(function (error) {
                    props.showError(error);
                });
        }
    }, [])

    const onDrop = useCallback(acceptedFiles => {
        // Do something with the files
        setPicture(acceptedFiles[0]);
    }, [])
    const {getRootProps, getInputProps, isDragActive} = useDropzone({onDrop})

    const sendData = () => {
        if(state.room_code.length && state.room_type.length && state.bed_type.length 
            && state.bed_count.length && state.room_price.length && state.guest_capacity.length){
            props.showError(null);
            const formData = new FormData(); 
            formData.append( 
                "room_code", 
                state.room_code
            ); 
            formData.append( 
            "room_type", 
            state.room_type
            ); 
            formData.append( 
            "bed_type", 
            state.bed_type
            ); 
            formData.append( 
                "bed_count", 
                state.bed_count
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
                        redirectToRoomFacility(state.room_id);
                        props.showError(null)
                    } else{
                        props.showError("Some error ocurred");
                    }
                })
                .catch(function (error) {
                    if(error.response.status === 400){
                        props.showError("Pastika semua input terisi dengan benar")
                    } else {
                        props.showError("Internal Server Error")
                    }
                });  
            } else if(props.type == "add"){
                axios.post(API_BASE_URL+'/room/create', formData, { headers: { "Authorization": `Bearer ${localStorage.getItem(ACCESS_TOKEN_NAME)}`}})
                .then(function (response) {
                    if(response.status === 201 || response.status === 200){
                        setState(prevState => ({
                            ...prevState,
                            'successMessage' : 'Add Successfully. Redirecting to home page..'
                        }))
                        console.log(JSON.stringify(response.data.id));
                        setState({room_id : response.data.id});
                        redirectToRoomFacility(response.data.id);
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
            props.showError("Pastika semua input terisi degan benar");
        }
    }

    const redirectToRoomFacility = (id) => {
        if(props.type == "add"){
            props.setMenu('/home/kamar');
            props.history.push('/home/kamar/facility/add/'+id);
        } else {
            props.setMenu('/home/kamar');
            props.history.push('/home/kamar/facility/edit/'+state.room_id);
        }
        
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
                <Input type="text" placeholder="Room Code" name="room_code" id="room_code" value={state.room_code} onChange={handleChange}/>
                </FormGroup>
                <FormGroup>
                <Input type="text" placeholder="Room Type" name="room_type" id="room_type" value={state.room_type} onChange={handleChange}/>
                </FormGroup>
                <FormGroup>
                <Input type="text" placeholder="Bed Type" name="bed_type" id="bed_type" value={state.bed_type} onChange={handleChange}/>
                </FormGroup>
                <FormGroup>
                <Input type="number" placeholder="Bed Count" name="bed_count" id="bed_count" value={state.bed_count} onChange={handleChange}/>
                </FormGroup>
                <FormGroup>
                <Input type="number" placeholder="Guest Capacity" name="guest_capacity" id="guest_capacity" value={state.guest_capacity} onChange={handleChange}/>
                </FormGroup>
                <FormGroup>
                <Input type="number" placeholder="Room Price" name="room_price" id="room_price" value={state.room_price} onChange={handleChange}/>
                </FormGroup>
                <Button className="create-hotel-btn" onClick={handleSubmitClick}>Save Data</Button>
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

export default withRouter(RoomForm);
