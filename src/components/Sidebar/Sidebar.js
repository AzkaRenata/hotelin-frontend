import React, {useState} from 'react';
import './sidebar.css';
import {API_BASE_URL, ACCESS_TOKEN_NAME} from '../../constants/apiContants';
import { withRouter } from "react-router-dom";
function Sidebar(props) {

    const [activeLink, setActiveLink] = useState("link1");
    
    const toProfile = () => {
        setActiveLink("link1");
        props.history.push('/home/profile');
    }
    const toKamar = () => {
        setActiveLink("link2");
        props.history.push('/home/kamar'); 
    }
    const toCurrentBooking = () => {
        setActiveLink("link3");
        props.history.push('/home/current-booking'); 
    }
    const toHistoryBooking = () => {
        setActiveLink("link4");
        props.history.push('/home/history-booking'); 
    }
    const toCancelBooking = () => {
        setActiveLink("link5");
        props.history.push('/home/cancel-booking'); 
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
        <ul>
            <b>
                <li className={activeLink === "link1" ? "page" : ""}><a href="javascript:void(0)" onClick={() => toProfile()}><i class=""></i>Profile</a></li>
                <li className={activeLink === "link2" ? "page" : ""}><a href="javascript:void(0)" onClick={() => toKamar()}><i class=""></i>List Kamar</a></li>
                <li className={activeLink === "link3" ? "page" : ""}><a href="javascript:void(0)" onClick={() => toCurrentBooking()}><i class=""></i>Pengunjung</a></li>
                <li className={activeLink === "link4" ? "page" : ""}><a href="javascript:void(0)" onClick={() => toHistoryBooking()}><i class=""></i>Histori Booking</a></li>
                <li className={activeLink === "link5" ? "page" : ""}><a href="javascript:void(0)" onClick={() => toCancelBooking()}><i class=""></i>Pembatalan</a></li>
                <li><a href="javascript:void(0)" onClick={() => handleLogout()}><i class=""></i>Logout</a></li>
            </b>
        </ul> 
    </div>
</div>
);
}
export default withRouter(Sidebar);