import React, { Component } from 'react';
import Checkbox from '../Checkbox/Checkbox';
import { withRouter, Link } from "react-router-dom";
import {Button, Form, Label, Input, CustomInput, FormGroup, Container, Row, Col} from 'reactstrap';
import axios from 'axios';
import {API_BASE_URL, ACCESS_TOKEN_NAME} from '../../constants/apiContants';

export class FasilitasKamar extends Component {
    constructor(props) {
        super(props)

        this.state = {
            room_id:"",
            desc1: "",
            desc2: "",
            desc3: "",
            desc4: "",
        }
    }
  componentWillMount = () => {
    this.selectedCheckboxes = new Set();
    const room_id = this.props.match.params.id;
    this.setState({room_id: room_id});
  }

  handleChange = (e) => {
    const {id , value} = e.target   
    this.setState(prevState => ({
        ...prevState,
        [id] : value
    }))
  }

  toggleCheckbox = (label, id) => {
    if (this.selectedCheckboxes.has(id)) {
      this.selectedCheckboxes.delete(id);
    } else {
      this.selectedCheckboxes.add(id);
    }
  }

  handleFormSubmit = formSubmitEvent =>{
    formSubmitEvent.preventDefault();

    this.sendData();
  }
 
  redirectToRoomList() {
    this.props.setMenu('/home/kamar')
    this.props.history.push('/home/kamar');
  }
  
  sendData() {
    if(this.selectedCheckboxes.size > 0) {
      const formData = new FormData(); 
      for (const checkbox of this.selectedCheckboxes) {
        console.log(checkbox, 'is selected.');
        if(checkbox == "1"){
          formData.append( 
            "facility1", 
            "1"
          ); 
          formData.append( 
              "desc1", 
              this.state.desc1
          ); 
        } else if(checkbox == "2"){
          formData.append( 
            "facility2", 
            "2"
          ); 
          formData.append( 
            "desc2", 
            this.state.desc2
          ); 
        } else if(checkbox == "3"){
          formData.append( 
            "facility3", 
            "3"
          ); 
          formData.append( 
            "desc3", 
            this.state.desc3
          ); 
        } else if(checkbox == "4"){
          formData.append( 
            "facility4", 
            "4"
          ); 
          formData.append( 
            "desc4", 
            this.state.desc4
          ); 
        }
      } 
      if(this.props.type == "add"){ 
        axios.post(API_BASE_URL+'/room-facility/create-many/'+this.props.match.params.id, formData, { headers: { "Authorization": `Bearer ${localStorage.getItem(ACCESS_TOKEN_NAME)}`}})
        .then(response =>  {
            if(response.status === 201 || response.status === 200){
                // setState(prevState => ({
                //     ...prevState,
                //     'successMessage' : 'Add Successfully. Redirecting to home page..'
                // }))
                console.log(JSON.stringify(response.data.id));
                this.redirectToRoomList();
                console.log(localStorage.getItem(ACCESS_TOKEN_NAME));
                //props.showError(null)
            } else{
                this.props.showError("Some error ocurred");
            }
        })
        .catch(function (error) {
            console.log(error);
        });  
      } else {
        axios.post(API_BASE_URL+'/room-facility/update-many/'+this.state.room_id, formData, { headers: { "Authorization": `Bearer ${localStorage.getItem(ACCESS_TOKEN_NAME)}`}})
        .then(response =>  {
            if(response.status === 201 || response.status === 200){
                // setState(prevState => ({
                //     ...prevState,
                //     'successMessage' : 'Add Successfully. Redirecting to home page..'
                // }))
                console.log(JSON.stringify(response.data));
                this.redirectToRoomList();
                console.log(localStorage.getItem(ACCESS_TOKEN_NAME));
                //props.showError(null)
            } else{
                this.props.showError("Some error ocurred");
            }
        })
        .catch(function (error) {
          this.props.showError(error);
        });  
      }
    } else {
        this.props.showError('Field Tidak Boleh Kosong')    
    }  
  }

  render() {
    return (
      <Container>
      <h2 className="title-row">Fasilitas Kamar</h2>
      <Row>
      <Col md="1"></Col>
      <Col md="8">
      <div>
          <Form>
              <FormGroup>
              <b>
              <Checkbox
                label="Free Wifi"
                handleCheckboxChange={this.toggleCheckbox}
                id="1"
              />
              </b>
              <Input type="textarea" placeholder="Deskripsi Wifi" name="desc1" id="desc1" value={this.state.desc1} onChange={this.handleChange}/>
              </FormGroup>
              <FormGroup>
              <b>
              <Checkbox
                label="Sarapan"
                handleCheckboxChange={this.toggleCheckbox}
                id="2"
              />
              </b>
              <Input type="textarea" placeholder="Deskripsi Sarapan" name="desc2" id="desc2" onChange={this.handleChange} checked={this.state.checked3}/>
              </FormGroup>
              <FormGroup>
              <b>
              <Checkbox
                label="Air Conditioner"
                handleCheckboxChange={this.toggleCheckbox}
                id="3"
              />
              </b>
              <Input type="textarea" placeholder="Deskripsi AC" name="desc3" id="desc3" value={this.state.desc3} onChange={this.handleChange}/>
              </FormGroup>
              <FormGroup>
              <b>
              <Checkbox
                label="Televisi"
                handleCheckboxChange={this.toggleCheckbox}
                id="4"
              />
              </b>
              <Input type="textarea" placeholder="Deskripsi TV" name="desc4" id="desc4" value={this.state.desc4} onChange={this.handleChange}/>
              </FormGroup>
              <Button className="create-hotel-btn" onClick={this.handleFormSubmit}>Save Data</Button>
          </Form>
      </div>
      </Col>
      <Col md="3"></Col>
      </Row>
      </Container>
    );
  }
}

export default withRouter(FasilitasKamar);