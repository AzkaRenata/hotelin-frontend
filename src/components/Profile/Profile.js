import React, {useState,useEffect} from 'react';
import './profile.css';
import { withRouter } from 'react-router-dom';
import { ACCESS_TOKEN_NAME, API_BASE_URL } from '../../constants/apiContants';
import axios from 'axios'
import {IMAGE_URL} from '../../constants/apiContants';

function Profile(props) {
    
    const [state , setHotel] = useState({
        dataHotel: [],
        dataRoom: [],
        hotelFacility: [],
        isLoading: true
    });

    const request1 = axios.get(API_BASE_URL+'/hotel/profile', { headers: { "Authorization": `Bearer ${localStorage.getItem(ACCESS_TOKEN_NAME)}`}});
    const request2 = axios.get(API_BASE_URL+'/room/list', { headers: { "Authorization": `Bearer ${localStorage.getItem(ACCESS_TOKEN_NAME)}`}});
    const request3 = axios.get(API_BASE_URL+'/hotel/facility', { headers: { "Authorization": `Bearer ${localStorage.getItem(ACCESS_TOKEN_NAME)}`}});
    const fetchHotel = React.useCallback(() => {
        axios.all([request1, request2, request3]).then(axios.spread((...responses) => {
            setHotel({
                dataHotel: responses[0].data,
                dataRoom: responses[1].data,
                hotelFacility: responses[2].data
            })
        }))
        console.log(state.hotelFacility)
    })

    const [stars, setStar] = useState([]);
    useEffect(() => {
        fetchHotel();
        for(var i=0; i<5; i++){
            setStar(<i class="fas fa-star color-icon"></i>);
        }
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
<div class="wrapper">
    <div class=" main_content_left">
        <b><div class="header">Profile Hotel</div></b> 
        <div className="KamarDetails-detail">
            {
                state.dataHotel["hotel_picture"] != null ?
                <img src={IMAGE_URL + state.dataHotel.map(item => item.hotel_picture)} id="CV" className="hotel-image"/>
                :
                <img src="../../hotel1.jpg" id="CV" className="hotel-image"/>
            }
            {
                state.dataRoom.length != 0 ?
                <div className="galleryItem">
                {state.dataRoom.map(item =>
                    <div className="gallery">
                        <a target="_blank" href="living room.jpg">
                            <img src={IMAGE_URL + item.room_picture}></img>
                        </a>
                    </div>
                )} 
                </div>
                :
                <div className="galleryItem"><a href="#" onClick={toTambahKamar}>Tambah Data Kamar</a></div>
            } 
        </div>
    </div>
    <div class=" main_content_right"> 
        <div class="info">
            <div class="text-right padding p-r-20">
                <b>
                <button type="button" class="button" onClick={() => toEditProfile()}>Edit Profile</button>
                </b>
            </div>
            <div class="card body mb-3">
                <div class="card-body main_content">
                    <b><p class="card-title title">{state.dataHotel.map(item => item.hotel_name)}</p></b>
                    <i class="fas fa-map-marker-alt card-text"> {state.dataHotel.map(item => item.hotel_location)} </i><br></br>
                  
                    {
                        stars
                    }
                    <br />
                    <b>{Math.floor(state.dataHotel.map(item => item.hotel_rating)*100)/100}</b>
                    
                    
                    <br></br>
                    <b><p class="card-text color-price">{"Rp. " + state.dataHotel.map(item => item.hotel_price)}</p></b>
                        <b><p class="card-title">About Hotel</p></b>
                        <p class="card-text">{state.dataHotel.map(item => item.hotel_desc)}</p>
                        {  
                            state.dataRoom.length != 0 ?
                                <div>
                                <b><p className="card-title">Fasilitas</p></b>
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
 );
}
export default withRouter(Profile);