import React from 'react';
import './detailpemesanan.css';

function DetailPemesanan() {
  return (

<div class="wrapper">
  <div class="main-content-left">
    <b><div class="header">Data Pemesanan</div></b>
    <div class="card body mb-3">
                <div class="card-body main_content">
                  <div class="text-center">
                    <img src="profile.jpg" class="img" alt="Profile Image" ></img>
                        <b>
                        <p class="card-title">Olivia</p>
                        <p class="card-title">olivia@gmail.com </p>
                        <p class="card-title">081234567890 </p>
                        </b>
                  </div>
                </div>
    </div>
  </div>

  <div class=" main-content-right"> 
        <div class="info">
            <div class="card body mb-3">
                <div class="card-body main_content">
                  <div class=" card-title">
                  <div class="detail">
                    <table>
                        <tr>
                            <td>Tanggal Menginap</td>
                            <td>3-5 Oktober</td>
                        </tr>
                        <tr>
                            <td>Jumlah Malam</td>
                            <td>2 Malam</td>
                        </tr>
                        <tr>
                            <td>Jumlah Kamar</td>
                            <td>1 Kamar</td>
                        </tr>
                        <tr>
                            <td>Tipe Kamar</td>
                            <td>Presidential Suite</td>
                        </tr>
                        <tr>
                            <td>Tanggal Pemesanan</td>
                            <td>1 Oktober 2020</td>
                        </tr>
                        <tr>
                            <td>Total Biayar</td>
                            <td>Rp. 1.625.084</td>
                        </tr>
                    </table>
                </div>
                  </div>
                </div>
            </div>
      </div>
    </div>
</div>
 );
}
export default DetailPemesanan;
