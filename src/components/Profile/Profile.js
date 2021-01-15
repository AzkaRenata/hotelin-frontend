import React, {useState,useEffect} from 'react';
import './profile.css';
import { withRouter } from 'react-router-dom';
import { ACCESS_TOKEN_NAME, API_BASE_URL } from '../../constants/apiContants';
import axios from 'axios'
import {IMAGE_URL} from '../../constants/apiContants';
import {Button, Form, Label, Input, FormGroup, Container, Row, Col} from 'reactstrap';

function Profile(props) {
    
    const [state , setHotel] = useState({
        dataHotel: [],
        dataRoom: [],
        hotelFacility: [],
        isLoading: true,
        display: "hide"
    });
    
    const fetchHotel = React.useCallback(() => {
        
        axios.get(API_BASE_URL+'/hotel/profile', { headers: { "Authorization": `Bearer ${localStorage.getItem(ACCESS_TOKEN_NAME)}`}})
        .then(response => {
            setHotel({
                dataHotel: response.data.hotel,
                dataRoom: response.data.room,
                hotelFacility: response.data.facility,
                loading: false,
                display: "show"
            })
            console.log("Response profile : "+response.data.hotel.map(item => item.hotel_name))
        })
    })

    const [stars, setStar] = useState([]);
    useEffect(() => {
        fetchHotel();
    }, [])

    function toLogin() {
        props.history.push('/login');
    }

    function toEditProfile() {
        props.history.push('/home/hotel/edit');
    }
    
    function toTambahKamar() {
        props.history.push('/home/kamar/add');
        props.setMenu("/home/kamar");
    }
    
  return (
<div className={`${state.display} wrapper`}>
    {!state.loading && 
    <div className="">
        <b><div className="header">Profile Hotel</div></b> 
        <div className="KamarDetails-detail">
            {
                state.dataHotel.map(item => item.hotel_picture != null ?
                <img src={IMAGE_URL + item.hotel_picture} id="CV" className="hotel-image"/>
                :
                <img src="../../no_image.png" id="CV" className="hotel-image"/> 
                
            )}
            {
                state.dataRoom.length != 0 ?
                <div className="galleryItem">
                {state.dataRoom.map(item =>
                    item.room_picture != null ?
                    <div className="gallery">
                        <a href="javascript:void(0)">
                            <img src={IMAGE_URL + item.room_picture}></img>
                        </a>
                    </div>
                    :
                    <div className="gallery">
                        <a href="javascript:void(0)">
                            <img src="../../hotel1.jpg"></img>
                        </a>
                    </div>
                )} 
                </div>
                :
                <div className="galleryItem"><a href="#" onClick={toTambahKamar}>Tambah Data Kamar</a></div>
            } 
        </div>
    </div>
    }
    {!state.loading && 
    <div className=" main_content_right"> 
        <div className="profile-info">
            <div>
                <button type="button" className="button edit-hotel-btn" onClick={() => toEditProfile()}>Edit Profile</button>
                <div className="card body mb-3">
                    <div className="main_content">
                        <b><p className="card-title">{state.dataHotel.map(item => item.hotel_name)}</p></b>
                        <i className="fas fa-map-marker-alt card-text"> {state.dataHotel.map(item => item.hotel_location)} </i><br></br>
                        <i className="fas fa-star color-icon-dark card-text"></i>
                        <i className="fas fa-star color-icon-dark card-text"></i>
                        <i className="fas fa-star color-icon-dark card-text"></i>
                        <i className="fas fa-star color-icon-dark card-text"></i>
                        <i className="fas fa-star color-icon-dark card-text"></i>
                        <br />
                        <b className="card-text">{
                        state.dataHotel.map(item => item.hotel_rating*100/100 != 0 ?
                        Math.floor(item.hotel_rating*100/100)
                            :
                        " No Rating "
                        )}</b> 
                        <br></br>
                        <b>
                            <p className="card-title color-price">{state.dataHotel.map(item => item.hotel_price
                            != null ?
                            "Rp. "+item.hotel_price : "0"
                            )}
                            </p>
                        </b>
                            <b><p className="card-title-md">About Hotel</p></b>
                            <p className="card-text">{state.dataHotel.map(item => item.hotel_desc)}</p>
                            {  
                                state.dataRoom.length != 0 ?
                                    <div>
                                    <b><p className="card-title-md">Fasilitas</p></b>
                                    {state.hotelFacility.map(item => 
                                        <i className={"fas card-title padding-icon "+item.facility_icon}><a>&nbsp;&nbsp;{item.facility_name}&nbsp;&nbsp;</a></i>
                                    )}
                                    </div>
                                :
                                    <a href="#" onClick={toTambahKamar}>Tambah Data Kamar</a>
                            }
                    </div>
                </div>
            </div>
      </div>
    </div>
    }
</div>
 );
}
export default withRouter(Profile);