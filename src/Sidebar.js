import React from 'react';
import './sidebar.css';

function Sidebar() {
  return (
<div class="wrapper">
    <div class="sidebar">
        <div class="text-center padding">
            <img src="logo-rev-white.png" class="logo" alt="picture" ></img>
        </div>
        <ul>
            <b>
                <div class="page">
                    <li><a href="#"><i class=""></i>Profile</a></li>
                </div>
                <li><a href="#"><i class=""></i>Detail</a></li>
                <li><a href="#"><i class=""></i>Pemesanan</a></li>
                <li><a href="#"><i class=""></i>Pengunjung</a></li>
                <li><a href="#"><i class=""></i>Pembatalan</a></li>
                <li><a href="#"><i class=""></i>Logout</a></li>
            </b>
        </ul> 
    </div>
</div>
 );
}
export default Sidebar;