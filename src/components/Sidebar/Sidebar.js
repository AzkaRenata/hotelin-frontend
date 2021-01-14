import React, {useState, useEffect} from 'react';
import './sidebar.css';
import {API_BASE_URL, ACCESS_TOKEN_NAME} from '../../constants/apiContants';
import { withRouter, Link } from "react-router-dom";
function Sidebar(props) {
    
    const toProfile = () => {
        props.setMenu("/home/hotel");
        props.history.push('/home/hotel');
    }
    const toKamar = () => {
        props.setMenu("/home/kamar");
        props.history.push('/home/kamar'); 
    }
    const toCurrentBooking = () => {
        props.setMenu("/home/current-booking");
        props.history.push('/home/current-booking'); 
    }
    const toHistoryBooking = () => {
        props.setMenu("/home/history-booking");
        props.history.push('/home/history-booking'); 
    }
    const toCancelBooking = () => {
        props.setMenu("/home/cancel-booking");
        props.history.push('/home/cancel-booking'); 
    }
    const toAboutUs= () => {
        props.setMenu("/home/about-us");
        props.history.push('/home/about-us'); 
    }
    function handleLogout() {
        localStorage.removeItem(ACCESS_TOKEN_NAME)
        props.history.push('/login')
    }

  return (
    
<div class="wrapper">
    <div class="sidebar">
        <div class="text-center padding">
            <img src="../../logo-rev-white.png" class="logo" alt="picture" ></img>
        </div>
        <ul className="my-sidebar">
            <b>
                <li className={props.activeMenu === "/home/hotel" ? "page" : ""}>
                    <a href="javascript:void(0)" onClick={() => toProfile()}><i class=""></i>Profile</a>
                </li>
                {/* <li className={props.activeMenu === "/home/hotel" ? "page" : ""}><Link to="/home/hotel"><i class=""></i>Profile</Link></li> */}
                <li className={props.activeMenu === "/home/kamar" ? "page" : ""}>
                    <a href="javascript:void(0)" onClick={() => toKamar()}><i class=""></i>Kamar</a>
                </li>
                <li className={props.activeMenu === "/home/current-booking" ? "page" : ""}>
                    <a href="javascript:void(0)" onClick={() => toCurrentBooking()}><i class=""></i>Pengunjung</a>
                </li>
                <li className={props.activeMenu === "/home/history-booking" ? "page" : ""}>
                    <a href="javascript:void(0)" onClick={() => toHistoryBooking()}><i class=""></i>Pemesanan</a>
                </li>
                <li className={props.activeMenu === "/home/cancel-booking" ? "page" : ""}>
                    <a href="javascript:void(0)" onClick={() => toCancelBooking()}><i class=""></i>Pembatalan</a>
                </li>
                <li className={props.activeMenu === "/home/about-us" ? "page" : ""}>
                    <a href="javascript:void(0)" onClick={() => toAboutUs()}><i class=""></i>About Us</a>
                </li>
                <li>
                    <a href="javascript:void(0)" onClick={() => handleLogout()}><i class=""></i>Logout</a>
                </li>
            </b>
        </ul> 
    </div>
</div>
);
}
export default withRouter(Sidebar);