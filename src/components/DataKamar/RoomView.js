import axios from 'axios'
import React, { Component } from 'react'
import { Link, withRouter } from 'react-router-dom';
import {API_BASE_URL, ACCESS_TOKEN_NAME, IMAGE_URL} from '../../constants/apiContants';
 
class RoomView extends Component {
    constructor (props) {
        super(props)
        this.state = {
            room_data: {}
        }
        this.editRoom = this.editRoom.bind(this);
    }

    componentDidMount () {
        //const room_id = this.props.match.params.id;
        const room_id = this.props.room_id;
        axios.get(API_BASE_URL+`/room/list/${room_id}`,{ headers: { "Authorization": `Bearer ${localStorage.getItem(ACCESS_TOKEN_NAME)}`}})
        .then(response => {
            this.setState({
                room_data: response.data
            })
        })
    }

    editRoom(){
        const id = this.props.room_id;
        this.props.history.push(`/home/kamar/edit/${id}`);
    }
    render () {
    const { room_data } = this.state
console.log("cek : "+room_data.room_type);
    return (
        <div className="">
        <div className='modal' style={{ display: 'block' }} aria-hidden="true">
            <div className='modal-dialog modal-dialog-scrollable modal-dialog-centered'>
                <div className='modal-content'>
                    <div className='modal-header'>
                        <h5 className="modal-title">Room Detail</h5>
                        <button type="button" className="close" onClick={this.props.onCancel} data-dismiss="modal" aria-label="Close">
                            <span aria-hidden="true">&times;</span>
                        </button>
                    </div>
                    <div className="modal-body">
                        <div class="room-type">
                            <h5><b>{room_data.room_type}</b></h5> 
                        </div>                       
                        <h6><b>Room Code :</b>{room_data.room_code}</h6>
                        <h6><b>Room Price :</b> {room_data.room_price}</h6>
                        <h6><b>Guest Capacity : </b>{room_data.guest_capacity}</h6>
                        <h6><b>Bed Type : </b>{room_data.bed_type}</h6>
                        <h6><b>Bed Count : </b>{room_data.bed_count}</h6>                        
                        <h6><b>Room Picture :</b></h6>
                        <div style={{ border: '1px solid black' }}>
                            {room_data.room_picture != null ?
                            <img src={IMAGE_URL+room_data.room_picture} style={{ width: '95%' }} />
                            : 
                            <img src="../../no_image.png" style={{ width: '95%' }} />}
                        </div>
                    </div>
                    <div className="modal-footer">
                        <button type="button" onClick={this.props.onCancel} className="btn btn-secondary">Close</button>
                        <Link type="button" onClick={this.editRoom} className="btn btn-primary">Edit</Link>
                    </div>
                </div>
            </div>
        </div>
        </div>
        
    )
    }
}
 
export default withRouter(RoomView)