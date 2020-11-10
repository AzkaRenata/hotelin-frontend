import './AddHotel.css';

import React, {useCallback} from 'react'
import {useDropzone} from 'react-dropzone'
import {Button, Form, Label, Input, FormGroup, Container, Row, Col} from 'reactstrap';


function AddHotel() {
  const onDrop = useCallback(acceptedFiles => {
    // Do something with the files
    let formData = new FormData()
    formData.append('uploadedFiles', acceptedFiles)
    console.log(formData)
  }, [])
  const {getRootProps, getInputProps, isDragActive} = useDropzone({onDrop})

  return (
    <div className="create-hotel">
    <Container>
      <h2>Add Data Hotel</h2>
      <Row>
      <Col>
      <div className="create-hotel-form">
          <Form>
            <FormGroup>
              <Input type="text" placeholder="Hotel Name"/>
            </FormGroup>
            <FormGroup>
              <Input type="text" placeholder="Location"/>
            </FormGroup>
            <FormGroup>
              <Input type="text" placeholder="Description"/>
            </FormGroup>
          </Form>
      </div>
      <Button className="create-hotel-btn">Add Data</Button>
      </Col>
      <Col>
      <div {...getRootProps()} className="create-hotel-dragndrop">
        <input {...getInputProps()} />
        {
        isDragActive ?
          <p>Drop the files here ...</p> :
          <img src="down-arrow.png" className="upload-image"></img>
        }
      </div>
      </Col>
      </Row>
    </Container>
    </div>
  );
}

export default AddHotel;
