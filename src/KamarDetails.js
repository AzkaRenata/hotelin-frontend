import React from 'react';
import './KamarDetails.css';

export default function KamarDetails(){
    return(
        <div className="KamarDetails.js">
            <header className="KamarDetails-header">
                <div className="JudulEdit">
                    <h1>Detail Kamar</h1>
                    <button className="EditButton">Edit</button>
                </div>
                
                <div className="KamarDetails-detail">
                    <img src="black.jpg" id="CV"></img>
                </div>

                <div className="KamarDetails-detail">
                    <table>
                        <tr>
                            <td>
                                <p className="NamaKamar">Deluxe</p>
                            </td>
                        </tr>
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
                
            </header>
        </div>
    )
}