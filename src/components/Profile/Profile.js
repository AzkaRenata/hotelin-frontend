import React, {useState,useEffect} from 'react';
import './profile.css';
import { withRouter } from 'react-router-dom';
import { ACCESS_TOKEN_NAME, API_BASE_URL } from '../../constants/apiContants';
import axios from 'axios'
import {IMAGE_URL} from '../../constants/apiContants';

function Profile(props) {
    
    const [state , setHotel] = useState({
        dataHotel: {},
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
            console.log("Response profile : "+response.hotel)
        })
        for(var i=0; i<5; i++){
            setStar(<i className="fas fa-star color-icon"></i>);
        }
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
    <div className="row">
    {!state.loading && 
    <div className="col-lg-6">
        <b><div className="header">Profile Hotel</div></b> 
        <div className="KamarDetails-detail">
            {
                state.dataHotel.hotel_picture != null ?
                    <img src={IMAGE_URL + state.dataHotel.hotel_picture} id="CV" className="hotel-image"/>
                    :
                    <img src="../../no_image.png" id="CV" className="hotel-image"/> 
                
            }
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
    <div className="col-lg-6"> 
        <div className="info">
            <div className="text-right padding p-r-20">
                <b>
                <button type="button" className="button" onClick={() => toEditProfile()}>Edit Profile</button>
                </b>
            </div>
            <div className="card body mb-3">
                <div className="card-body main_content">
                    <b><p className="card-title title">{state.dataHotel.hotel_name}</p></b>
                    <i className="fas fa-map-marker-alt card-text"> {state.dataHotel.hotel_location} </i><br></br>
                  
                    {
                        stars
                    }
                    <br />
                    <b>{
                    Math.floor(state.dataHotel.hotel_rating*100/100) != 0 ?
                    Math.floor(state.dataHotel.hotel_rating*100/100)
                        :
                    " No Rating "
                    }</b> 
                    <br></br>
                    <b>
                        <p className="card-text color-price">{state.dataHotel.hotel_price
                        != null ?
                        "Rp. "+state.dataHotel.hotel_price : "0"
                        }
                        </p>
                    </b>
                        <b><p className="card-title">About Hotel</p></b>
                        <p className="card-text">{state.dataHotel.hotel_desc}</p>
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
    }
    </div>
</div>
 );
}
export default withRouter(Profile);