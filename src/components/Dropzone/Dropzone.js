import React, {useEffect, useState} from 'react';
import {useDropzone} from 'react-dropzone';
import { withRouter } from 'react-router-dom';
import {FRONT_BASE_URL} from '../../constants/apiContants';

const outerContainer = {
  margin: '40px 0px',
  padding: '16px',
  border: '1px solid rgb(232, 232, 232)',
  borderRadius: '3px',
  width: '100%',
  display: 'inline-block'
}

const container = {
  display: 'flex',
  flexDirection: 'column',
  fontFamily: 'sans-serif',
  border: '2px grey dashed'
}

const dropzone = {
  flex: 1,
  display: 'flex',
  flexDirection: 'column',
  alignItem: 'center',
  padding: '20px',
  borderWidth: '2px'
}

const thumbsContainer = {
  display: 'flex',
  flexDirection: 'row',
  flexWrap: 'wrap',
  marginTop: 16
};

const thumb = {
  display: 'inline-flex',
  borderRadius: 2,
  border: '1px solid #eaeaea',
  marginBottom: 8,
  marginRight: 8,
  width: 100,
  height: 100,
  padding: 4,
  boxSizing: 'border-box'
};

const thumbInner = {
  display: 'flex',
  minWidth: 0,
  overflow: 'hidden'
};

const img = {
  display: 'block',
  width: 'auto',
  height: '100%'
};


function Preview(props) {
  const [files, setFiles] = useState([]);
  const {getRootProps, getInputProps, isDragAccept} = useDropzone({
    accept: 'image/*',
    maxFiles: 1,
    onDrop: acceptedFiles => {
      props.setPicture(acceptedFiles[0]);
      setFiles(acceptedFiles.map(file => Object.assign(file, {
        preview: URL.createObjectURL(file)
      })));
    }
  });
  
  const thumbs = files.map(file => (
    <div style={thumb} key={file.name}>
      <div style={thumbInner}>
        <img
          src={file.preview}
          style={img}
        />
      </div>
    </div>
  ));

  useEffect(() => () => {
    // Make sure to revoke the data uris to avoid memory leaks
    files.forEach(file => URL.revokeObjectURL(file.preview));
  }, [files]);

  return (
    <div style={outerContainer}>
      <section style={container}>
        <div {...getRootProps()} style={dropzone}>
          <input {...getInputProps()} />
          {isDragAccept ?
          <p>Drop the files here ...</p> :
          <img src={FRONT_BASE_URL+"/down-arrow.png"} className="upload-image"></img>
          }
        </div>
        <aside style={thumbsContainer}>
          {thumbs}
        </aside>
      </section>
    </div>
  );
}
export default withRouter(Preview)