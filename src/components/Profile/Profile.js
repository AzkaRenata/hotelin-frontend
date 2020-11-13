
import React, {useState,useEffect} from 'react';
import './profile.css';
import { withRouter } from 'react-router-dom';
import { ACCESS_TOKEN_NAME, API_BASE_URL } from '../../constants/apiContants';
import axios from 'axios'
import {IMAGE_URL} from '../../constants/apiContants';
import { Container, Row } from 'react-bootstrap';

function Profile(props) {
    function toEditProfile() {
        props.history.push('/home/hotel/edit');
    }
    return (
        <div class="row">
            <div class="col-1"></div>
            <div class="col-10">
                <div class="row title-row">
                    <div class="col-6">
                        <h2 class="title">Profile Hotel</h2>
                    </div>
                    <div class="col-6">
                        <button class="edit-hotel-btn">
                            Edit
                        </button>    
                    </div>
                </div>
                <div class="row hotel-detail">
                    <div class="col-6 main-content-left">
                        <img src="../../hotel1.jpg" id="CV" className="hotel-image"></img>
                        <div className="galleryItem">
                            <div class="gallery">
                                <a target="_blank" href="living room.jpg">
                                    <img src="../../living room.jpg"></img>
                                </a>
                            </div>
                            <div class="gallery">
                                <a target="_blank" href="black.jpg">
                                    <img src="../../living room.jpg"></img>
                                </a>
                            </div>
                            <div class="gallery">
                                <a target="_blank" href="black.jpg">
                                    <img src="../../living room.jpg"></img>
                                </a>
                            </div>
                            <div class="gallery">
                                <a target="_blank" href="black.jpg">
                                    <img src="../../living room.jpg"></img>
                                </a>
                            </div>
                        </div> 
                    </div>
                    <div class="col-6 main_content_right">
                        <h6 class="detail-title">Eastin Ashta Resort Canggu</h6>
                        <i class="fas fa-map-marker-alt detail-location-icon"></i><h6 class="detail-location">Canggu, Bali</h6>
                        <br/>
                        <i class="fas fa-star color-icon"></i>
                        <i class="fas fa-star color-icon"></i>
                        <i class="fas fa-star color-icon"></i>
                        <i class="fas fa-star color-icon"></i>
                        <i class="fas fa-star color-icon"></i>
                        <h6 class="card-text detail-price">Rp. 5.625.084</h6>
                        <br/>
                        <h6 class="detail-section-title">About Hotel</h6>
                        <h6 class="card-text">Eastin Ashta Resort Canggu adalah akomodasi 
                        modern yang terletak hanya 6 menit berjalan kaki dari Pantai Echo. 
                        Hotel ini menawarkan kolam renang dan pusat kebugaran.</h6>
                        <br/>
                        <h6 class="detail-section-title">Fasilitas </h6>
                        <i class="fas fa-utensils detail-location-icon"></i><h6 class="detail-location"> Sarapan Gratis</h6>
                        <br/>
                        <i class="fas fa-swimming-pool detail-location-icon"></i><h6 class="detail-location"> Kolam Renang</h6>
                        <br/>
                        <i class="fas fa-wifi detail-location-icon"></i><h6 class="detail-location"> Free Wifi</h6>
                    </div>
                </div>
            </div>
            <div class="col-1"></div>
        </div>
 );
}
export default withRouter(Profile);