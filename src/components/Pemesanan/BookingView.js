import axios from 'axios'
import React, { Component } from 'react'
import { Link, withRouter } from 'react-router-dom';
import {API_BASE_URL, ACCESS_TOKEN_NAME, IMAGE_URL} from '../../constants/apiContants';
 
class RoomView extends Component {
    constructor (props) {
        super(props)
        this.state = {
            user: {},
            room: {},
            booking: {}
        }
    }

    componentDidMount () {
        //const room_id = this.props.match.params.id;
        const booking_id = this.props.booking_id;
        console.log(booking_id);
        axios.get(API_BASE_URL+`/booking/detail/${booking_id}`,{ headers: { "Authorization": `Bearer ${localStorage.getItem(ACCESS_TOKEN_NAME)}`}})
        .then(response => {
            console.log(response.data);
            this.setState({
                user: response.data.user,
                room: response.data.room,
                booking: response.data.booking
            })
        })
        
    }

    render () {
    return (
        <div className="">
        <div className='modal' style={{ display: 'block' }} aria-hidden="true">
            <div className='modal-dialog modal-dialog-scrollable modal-dialog-centered'>
                <div className='modal-content'>
                    <div className='modal-header'>
                        <h5 className="modal-title">Detail Pemesanan</h5>
                        <button type="button" className="close" onClick={this.props.onCancel} data-dismiss="modal" aria-label="Close">
                            <span aria-hidden="true">&times;</span>
                        </button>
                    </div>
                    <div className="modal-body">
                        <div style={{ border: '1px solid black' }}>
                            { 
                            this.state.user.user_picture != null ? 
                            <img src={IMAGE_URL+this.state.user.user_picture} style={{ width: '95%' }} />
                            :
                            <img src="../../user_photo.png" style={{ width: '95%' }} />
                            }
                        </div>
                        <h6><b>User :</b> {this.state.user.name}</h6>
                        <h6><b>Email :</b> {this.state.user.email}</h6>
                        <h6><b>Nomer Telp :</b> {this.state.user.telp}</h6>
                        <hr></hr>
                        <h6><b>Status Booking:</b> 
                            {(() => {
                                switch (this.state.booking.booking_status) {
                                    case 1:
                                        return " Ongoing"
                                        break;
                                    case 2:
                                        return " Done"
                                        break;
                                    default:
                                        return " Cancelled"
                                        break;
                                }
                            })()}
                        </h6>
                        <h6><b>Check In: </b>{this.state.booking.check_in}</h6>
                        <h6><b>Check Out :</b> {this.state.booking.check_out}</h6>
                        <h6><b>Lama Menginap :</b></h6>
                        <h6><b>Tanggal Pemesanan :</b>{this.state.booking.booking_time}</h6>
                        <h6><b>Total Harga :</b> {this.state.booking.total_price}</h6>
                    </div>
                    <div className="modal-footer">
                        <button type="button" onClick={this.props.onCancel} className="btn btn-secondary">Close</button>
                        <Link type="button" className="btn btn-primary">Edit</Link>
                    </div>
                </div>
            </div>
        </div>
        </div>
        
    )
    }
}
 
export default withRouter(RoomView)