import React from 'react';
import './profile.css';

function Profile() {
  return (

<div class="wrapper">
    <div class=" main_content_left">
        <b><div class="header">Profile Hotel</div></b> 
        <div className="KamarDetails-detail">
                    <img src="hotel1.jpg" id="CV"></img>
                     <div className="galleryItem">
                        <div class="gallery">
                            <a target="_blank" href="living room.jpg">
                                <img src="living room.jpg"></img>
                            </a>
                        </div>
                        <div class="gallery">
                            <a target="_blank" href="black.jpg">
                                <img src="living room.jpg"></img>
                            </a>
                        </div>
                        <div class="gallery">
                            <a target="_blank" href="black.jpg">
                                <img src="living room.jpg"></img>
                            </a>
                        </div>
                        <div class="gallery">
                            <a target="_blank" href="black.jpg">
                                <img src="living room.jpg"></img>
                            </a>
                        </div>
                    </div> 
                </div>

    </div>
    <div class=" main_content_right"> 
        <div class="info">
            <div class="text-right padding">
                <b>
                <button type="button" class="btn button">Edit Profile</button>
                </b>
            </div>
            <div class="card body mb-3">
                <div class="card-body main_content">
                    <b><p class="card-title title">Eastin Ashta Resort Canggu</p></b>
                    <i class="fas fa-map-marker-alt card-text"> Canggu, Bali</i><br></br>
                    <i class="fas fa-star color-icon"></i>
                    <i class="fas fa-star color-icon"></i>
                    <i class="fas fa-star color-icon"></i>
                    <i class="fas fa-star color-icon"></i>
                    <i class="fas fa-star color-icon"></i>
                    <br></br>
                    <b><p class="card-text color-price">Rp. 5.625.084</p></b>
                        <b><p class="card-title">About Hotel</p></b>
                        <p class="card-text">Eastin Ashta Resort Canggu adalah akomodasi 
                        modern yang terletak hanya 6 menit berjalan kaki dari Pantai Echo. 
                        Hotel ini menawarkan kolam renang dan pusat kebugaran.</p>
                        <b><p class="card-title">Fasilitas </p></b>
                        <i class="fas fa-utensils card-title padding-icon"><a> Sarapan Gratis</a></i>
                        <i class="fas fa-swimming-pool padding-icon"><a> Kolam Renang</a></i>
                        <br></br>
                        <i class="fas fa-wifi padding-icon"><a> Free Wifi</a></i>
                </div>
            </div>
      </div>
    </div>
</div>
 );
}
export default Profile;