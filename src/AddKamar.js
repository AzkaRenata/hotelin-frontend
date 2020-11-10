import './AddKamar.css';
import {Button, Form, Label, Input, FormGroup, Container, Row, Col} from 'reactstrap';
import React, {useCallback} from 'react'
import {useDropzone} from 'react-dropzone'


function AddKamar() {
  const onDrop = useCallback(acceptedFiles => {
    // Do something with the files
    let formData = new FormData()
    formData.append('uploadedFiles', acceptedFiles)
    console.log(formData)
  }, [])
  const {getRootProps, getInputProps, isDragActive} = useDropzone({onDrop})

  return (
    <div className="create-room">
    <Container>
      <h2>Add Data Kamar</h2>
      <Row>
      <Col>
      <div className="create-room-form">
          <Form>
            <FormGroup>
              <Input type="text" placeholder="Fasilitas Kamar"/>
            </FormGroup>
            <FormGroup>
              <Input type="text" placeholder="Tipe Kamar"/>
            </FormGroup>
            <FormGroup>
              <Input type="text" placeholder="Jumlah Kamar"/>
            </FormGroup>
            <FormGroup>
              <Input type="text" placeholder="Harga Kamar"/>
            </FormGroup>
          </Form>
      </div>
      <Button className="create-room-btn">Add Data</Button>
      </Col>
      <Col>
      <div {...getRootProps()} className="create-room-dragndrop">
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

export default AddKamar;
