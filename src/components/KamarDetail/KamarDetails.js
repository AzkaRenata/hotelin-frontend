import React from 'react';
import './KamarDetails.css';

export default function KamarDetails(){
    return(
        <div className="KamarDetails.js">
            <header className="KamarDetails-header">
                <h1>Detail Kamar</h1>

                <div className="KamarDetails-detail">
                    <img src="black.jpg" id="CV"></img>
                    {/* <div className="galleryItem">
                        <div class="gallery">
                            <a target="_blank" href="black.jpg">
                                <img src="black.jpg"></img>
                            </a>
                        </div>
                        <div class="gallery">
                            <a target="_blank" href="black.jpg">
                                <img src="black.jpg"></img>
                            </a>
                        </div>
                        <div class="gallery">
                            <a target="_blank" href="black.jpg">
                                <img src="black.jpg"></img>
                            </a>
                        </div>
                        <div class="gallery">
                            <a target="_blank" href="black.jpg">
                                <img src="black.jpg"></img>
                            </a>
                        </div>
                    </div> */}
                </div>

                <div className="KamarDetails-detail">
                    <table>
                        <tr>
                            <td>Harga</td>
                            <td>RP. 1.626.804</td>
                        </tr>
                        <tr>
                            <td>Jumlah Kamar</td>
                            <td>20</td>
                        </tr>
                        <tr>
                            <td>Fasilitas</td>
                            <td>
                                <p>Free Wifi</p>
                                <p>1 Queen Bed</p>
                                <p>Sarapan Gratis</p>
                            </td>
                        </tr>
                    </table>
                </div>
                <button className="EditButton">Edit</button>
            </header>
        </div>
    )
}