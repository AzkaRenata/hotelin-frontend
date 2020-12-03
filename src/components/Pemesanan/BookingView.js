import axios from 'axios'
import React, { Component } from 'react'
import { Link, withRouter } from 'react-router-dom';
import {API_BASE_URL, ACCESS_TOKEN_NAME, IMAGE_URL} from '../../constants/apiContants';
 
class RoomView extends Component {
    constructor (props) {
        super(props)
        this.state = {
            booking_data: {}
        }
    }

    componentDidMount () {
        //const room_id = this.props.match.params.id;
        const booking_id = this.props.booking_id;
        console.log(booking_id);
        axios.get(API_BASE_URL+`/booking/show/${booking_id}`,{ headers: { "Authorization": `Bearer ${localStorage.getItem(ACCESS_TOKEN_NAME)}`}})
        .then(response => {
            this.setState({
                booking_data: response.data.bookinghistory
            })
        })
        
    }

    // editRoom(id){
    //     this.props.onCancel();
    //     this.props.history.push(`/home/kamar/edit/${id}`);
    // }
    render () {
    const { booking_data } = this.state
    return (
        <div className="">
        <div className='modal' style={{ display: 'block' }} aria-hidden="true">
            <div className='modal-dialog modal-dialog-scrollable modal-dialog-centered'>
                <div className='modal-content'>
                    <div className='modal-header'>
                        <h5 className="modal-title">{booking_data.title}</h5>
                        <button type="button" className="close" onClick={this.props.onCancel} data-dismiss="modal" aria-label="Close">
                            <span aria-hidden="true">&times;</span>
                        </button>
                    </div>
                    <div className="modal-body">
                        <h6><b>User :</b> {booking_data.name}</h6>
                        <h6><b>Kamar : </b>{booking_data.room_type}</h6>
                        <h6><b>Status Booking:</b> {booking_data.booking_status}</h6>
                        <h6><b>Check In: </b>{booking_data.check_in}</h6>
                        <h6><b>Check Out :</b> {booking_data.check_out}</h6>
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