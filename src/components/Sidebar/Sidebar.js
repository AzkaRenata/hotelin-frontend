import React, {useState} from 'react';
import './sidebar.css';
import {API_BASE_URL, ACCESS_TOKEN_NAME} from '../../constants/apiContants';
import { withRouter } from "react-router-dom";
function Sidebar(props) {

    const [activeLink, setActiveLink] = useState("page");
    let kls = "page";
    const redirectToProfile = () => {
        setActiveLink("link1");
        props.history.push('/home/profile');
    }
    const redirectToDetail = () => {
        setActiveLink("link2");
        props.history.push('/home/detail'); 
    }
    const redirectToBooking = () => {
        setActiveLink("link3");
        props.history.push('/home/booking'); 
    }
    const redirectToVisitor = () => {
        setActiveLink("link4");
        props.history.push('/home/visitor'); 
    }
    const redirectToCancelBooking = () => {
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
                <li className="page"><a href="javascript:void(0)" onClick={() => redirectToProfile()}><i class=""></i>Profile</a></li>
                <li className={'${activeLink === "link2" ? "page" : ""}'}><a href="javascript:void(0)" onClick={() => redirectToDetail()}><i class=""></i>Detail</a></li>
                <li className={'${activeLink === "link3" ? "page" : ""}'}><a href="javascript:void(0)" onClick={() => redirectToBooking()}><i class=""></i>Pemesanan</a></li>
                <li className={'${activeLink === "link4" ? "page" : ""}'}><a href="javascript:void(0)" onClick={() => redirectToVisitor()}><i class=""></i>Pengunjung</a></li>
                <li className={'${activeLink === "link5" ? "page" : ""}'}><a href="javascript:void(0)" onClick={() => redirectToCancelBooking()}><i class=""></i>Pembatalan</a></li>
                <li><a href="javascript:void(0)" onClick={() => handleLogout()}><i class=""></i>Logout</a></li>
            </b>
        </ul> 
    </div>
</div>
);
}
export default withRouter(Sidebar);