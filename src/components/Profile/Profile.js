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
        hotelPrice: '',
        isLoading: true
    });

    const request1 = axios.get(API_BASE_URL+'/hotel/profile', { headers: { "Authorization": `Bearer ${localStorage.getItem(ACCESS_TOKEN_NAME)}`}});
    const request2 = axios.get(API_BASE_URL+'/room/list', { headers: { "Authorization": `Bearer ${localStorage.getItem(ACCESS_TOKEN_NAME)}`}});
    const request3 = axios.get(API_BASE_URL+'/hotel/facility', { headers: { "Authorization": `Bearer ${localStorage.getItem(ACCESS_TOKEN_NAME)}`}});
    const request4 = axios.get(API_BASE_URL+'/hotel/price', { headers: { "Authorization": `Bearer ${localStorage.getItem(ACCESS_TOKEN_NAME)}`}});
    const fetchHotel = React.useCallback(() => {
        axios.all([request1, request2, request3, request4]).then(axios.spread((...responses) => {
            setHotel({
                dataHotel: responses[0].data,
                dataRoom: responses[1].data,
                hotelFacility: responses[2].data,
                hotelPrice: responses[3].data
            })
        }))
    })

    // const fetchHotel = React.useCallback(() => {
    //     axios.get(API_BASE_URL+'/hotel/profile', { headers: { "Authorization": `Bearer ${localStorage.getItem(ACCESS_TOKEN_NAME)}`}})
    //         .then((res) => {
    //             setHotel({
    //                 dataHotel: res.data,
    //                 isLoading: false
    //             })
    //         })
    // })

    // const fetchRoom = React.useCallback(() => {
    //     axios.get(API_BASE_URL+'/room/list', { headers: { "Authorization": `Bearer ${localStorage.getItem(ACCESS_TOKEN_NAME)}`}})
    //         .then((res) => {
    //             setHotel({
    //                 dataRoom: res.data
    //             })
    //         })
    // })

    useEffect(() => {
           fetchHotel();
    }, [state.isLoading])

    function toLogin() {
        props.history.push('/login');
    }

    function toEditProfile() {
        props.history.push('/home/hotel/edit');
    }
    
  return (
<div class="wrapper">
    <div class=" main_content_left">
        <b><div class="header">Profile Hotel</div></b> 
        <div className="KamarDetails-detail">
                    <img src={IMAGE_URL + state.dataHotel.map(item => item.hotel_picture)} id="CV" className="image"></img>
                     <div className="galleryItem">
                        {state.dataRoom.map(item =>
                             <div className="gallery">
                                <a target="_blank" href="living room.jpg">
                                    <img src={IMAGE_URL + item.room_picture}></img>
                                </a>
                            </div>
                        )} 
                    </div> 
                </div>

    </div>
    <div class=" main_content_right"> 
        <div class="info">
            <div class="text-right padding">
                <b>
                <button type="button" class="button" onClick={() => toEditProfile()}>Edit Profile</button>
                </b>
            </div>
            <div class="card body mb-3">
                <div class="card-body main_content">
                    <b><p class="card-title title">{state.dataHotel.map(item => item.hotel_name)}</p></b>
                    <i class="fas fa-map-marker-alt card-text"> {state.dataHotel.map(item => item.hotel_location)} </i><br></br>

                    <i class="fas fa-star color-icon"></i>
                    <i class="fas fa-star color-icon"></i>
                    <i class="fas fa-star color-icon"></i>
                    <i class="fas fa-star color-icon"></i>
                    <i class="fas fa-star color-icon"></i>
                    <br></br>
                    <b><p class="card-text color-price">Rp. {state.hotelPrice}</p></b>
                        <b><p class="card-title">About Hotel</p></b>
                        <p class="card-text">{state.dataHotel.map(item => item.hotel_desc)}</p>
                        <b><p class="card-title">Fasilitas </p></b>

                        {state.hotelFacility.map(item => 
                            <i className={item.facility_icon}>&nbsp;&nbsp;<a>{item.facility_name}&nbsp;&nbsp;</a></i>
                        )}
                        {/* <i class="fas fa-utensils card-title padding-icon"><a> Sarapan Gratis</a></i>
                        <i class="fas fa-swimming-pool padding-icon"><a> Kolam Renang</a></i>
                        <br></br>
                        <i class="fas fa-wifi padding-icon"><a> Free Wifi</a></i> */}
                </div>
            </div>
      </div>
    </div>
</div>
 );
}
export default withRouter(Profile);