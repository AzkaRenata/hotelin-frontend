import React, { Component,useState } from 'react'
import axios from 'axios';
import ReactPaginate from 'react-paginate';
import "./DataKamar.css";
import eyecloseupimg from './eye-closeup.png';
import deleteimg from './delete.png';
import pencilimg from './pencil.png';
import {API_BASE_URL, ACCESS_TOKEN_NAME} from '../../constants/apiContants';
import { withRouter, Link } from "react-router-dom";
import SweetAlert from 'react-bootstrap-sweetalert';
import RoomView from './RoomView';
import useFullPageLoader from '../hooks/useFullPageLoader';

export class DataKamar extends Component {

    constructor(props) {
        super(props)

        this.state = {
            offset: 0,
            tableData: [],
            orgtableData: [],
            perPage: 10,
            currentPage: 0,
            alert: null,
            view: null
        }

        this.handlePageClick = this.handlePageClick.bind(this);

    }

    hideAlert() {
        this.setState({
            alert: null
        });
    }

    hideView() {
        this.setState({
            view: null
        });
    }

    confirmDelete(id){
        const getAlert = () => (
            <SweetAlert
                warning
                showCancel
                confirmBtnText="Delete"
                cancelBtnText="Cancel"
                confirmBtnBsStyle="default"
                cancelBtnBsStyle="danger"
                title="Tunggu ..."
                onConfirm={() => this.deleteItem(id)}
                onCancel={() => this.hideAlert()}
                focusCancelBtn
                >
                Apakah yakin mau delete?
            </SweetAlert>
        );
        this.setState({
            alert: getAlert()
        });
    }

    showRoom(id){
        const getView = () => (
            <RoomView room_id={id} onCancel={() => this.hideView()}/>
        );
        this.setState({
            view: getView()
        });
    }

    deleteItem(id) {
        console.log(id);
        axios.delete(API_BASE_URL+`/room/delete/${id}`, { headers: { "Authorization": `Bearer ${localStorage.getItem(ACCESS_TOKEN_NAME)}`}}).then(response => {
            var msg = response.data.success;
            if(msg == true){
                this.hideAlert();
                this.goToHome();
            } else {
                console.log(response.data)
                console.log("Gagal");
            }
        })
        .catch(function (error) {
            console.log(error);
        });
    }

    goToHome(){
        const getAlert = () => (
            <SweetAlert
                success
                title="Success!"
                onConfirm={() => this.onSuccess() }
                onCancel={this.hideAlert()}
                timeout={2000}
                confirmBtnText="OKE"
                >
                Delete Kamar Berhasil
            </SweetAlert>
        );
        this.setState({
            alert: getAlert()
        });
    }
 
    onSuccess(){
        this.componentDidMount();
        this.hideAlert();
    }

    toAddKamar = () => {
        this.props.history.push('/home/kamar/add'); 
    }

    handlePageClick = (e) => {
        const selectedPage = e.selected;
        const offset = selectedPage * this.state.perPage;

        this.setState({
            currentPage: selectedPage,
            offset: offset
        }, () => {
            this.loadMoreData()
        });

    };

    loadMoreData() {
        const data = this.state.orgtableData;

        const slice = data.slice(this.state.offset, this.state.offset + this.state.perPage)
        this.setState({
            pageCount: Math.ceil(data.length / this.state.perPage),
            tableData: slice
        })

    }

    componentDidMount() {
        this.getData();
    }

    getData() {
        axios
            .get(API_BASE_URL+'/room/list', { headers: { "Authorization": `Bearer ${localStorage.getItem(ACCESS_TOKEN_NAME)}`}})
            .then(res => {
                var tdata = res.data;
                console.log('data-->' + JSON.stringify(tdata))
                var slice = tdata.slice(this.state.offset, this.state.offset + this.state.perPage)
                this.setState({
                    pageCount: Math.ceil(tdata.length / this.state.perPage),
                    orgtableData: tdata,
                    tableData: slice
                })
            });
            console.log(this.state.tableData)
    }


    render() {
        return (
            <div className="row">
                {this.state.alert}
                {this.state.view}
                <div className="col-1" />
                <div className="col-10">
                    <div class="row title-row">
                        <div class="col-6">
                            <h3 class="title">Daftar Kamar</h3>
                        </div>
                        <div class="col-6">
                            <button class="add-room-btn" onClick={this.toAddKamar}>
                                Tambah Kamar
                            </button>    
                        </div>
                    </div>
                    <table className="table">
                        <thead className="table-active">
                            <th scope="col">Kode Kamar</th>
                            <th scope="col">Tipe Kamar</th>
                            <th scope="col">Kapasitas Kamar</th>
                            <th scope="col">Harga</th>
                            <th scope="col">Action</th>

                        </thead>
                        <tbody>
                            {
                                this.state.tableData.map((tdata, i) => (
                                    <tr>
                                        <td>{tdata.room_code}</td>
                                        <td>{tdata.room_type}</td>
                                        <td>{tdata.guest_capacity}</td>
                                        <td>{tdata.room_price}</td>
                                        <td>
                                            <Link onClick={() => this.showRoom(tdata.id)}><img src={eyecloseupimg}/></Link>&nbsp;
                                            <Link to={`/home/kamar/edit/${tdata.id}`}><img src={pencilimg}/></Link>&nbsp;
                                            <Link onClick={() => this.confirmDelete(tdata.id)}><img src={deleteimg}/></Link></td>
                                    </tr>

                                ))
                            }

                        </tbody>
                    </table>
                    
                    <ReactPaginate
                        previousLabel={"Prev"}
                        nextLabel={"Next"}
                        breakLabel={"..."}
                        breakClassName={"break-me"}
                        pageCount={this.state.pageCount}
                        marginPagesDisplayed={2}
                        pageRangeDisplayed={5}
                        onPageChange={this.handlePageClick}
                        containerClassName={"pagination"}
                        subContainerClassName={"pages pagination"}
                        activeClassName={"active"} />
                </div>
                <div className="col-sm-1" />
                <div className="col-1" />
            </div>
        )
    }
}

export default withRouter(DataKamar);	