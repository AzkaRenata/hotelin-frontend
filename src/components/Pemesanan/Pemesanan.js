import React, { PureComponent,useState } from 'react';
import axios from 'axios';
import ReactPaginate from 'react-paginate';
import "./Pemesanan.css";
import BookingView from "./BookingView";
import eyecloseupimg from './eye-closeup.png';
import deleteimg from './delete.png';
import {API_BASE_URL, ACCESS_TOKEN_NAME} from '../../constants/apiContants';
import { withRouter, Link } from "react-router-dom";
import SweetAlert from 'react-bootstrap-sweetalert';

export class Pemesanan extends PureComponent {

    constructor(props) {
        super(props)

        this.state = {
            offset: 0,
            tableData: [],
            orgtableData: [],
            perPage: 5,
            currentPage: 0,
            alert: null,
            view: null
        }

        this.handlePageClick = this.handlePageClick.bind(this);

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
        const $status = this.props.status;
        this.getData($status);
    }
    getData(status) {
        axios
            .get(API_BASE_URL+`/booking/list/${status}`, { headers: { "Authorization": `Bearer ${localStorage.getItem(ACCESS_TOKEN_NAME)}`}})
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
                title="Wait ..."
                onConfirm={() => this.deleteItem(id)}
                onCancel={() => this.hideAlert()}
                focusCancelBtn
                >
                Are you sure want to delete?
            </SweetAlert>
        );
        this.setState({
            alert: getAlert()
        });
    }

    showOnGoingBooking(id){
        const getView = () => (
            <BookingView booking_id={id} onCancel={() => this.hideView()}/>
        );
        this.setState({
            view: getView()
        });
    }

    deleteItem(id) {
        console.log(id);
        axios.delete(API_BASE_URL+`/booking/delete/${id}`, { headers: { "Authorization": `Bearer ${localStorage.getItem(ACCESS_TOKEN_NAME)}`}}).then(response => {
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
                confirmBtnText="Oke Siap"
                >
                Deleted room successfully
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

    render() {
        return (
            <div className="row">
                {this.state.view}
                {this.state.alert}
                <div className="col-1" />
                <div className="col-10">
                    <div class="row title-row">
                        <div class="col-6">
                            <h2 class="title">Daftar Tamu Saat Ini</h2>
                        </div>
                        <div class="col-6">  
                        </div>
                    </div>
                    <table className="table">
                        <thead className="table-active">
                        <th scope="col">Nama Pemesan</th>
                          <th scope="col">Check-In</th>
                          <th scope="col">Tipe Kamar</th>
                          <th scope="col">Harga</th>
                          <th scope="col">Action</th>

                        </thead>
                        <tbody>
                            {
                                this.state.tableData.map((tdata, i) => (
                                    <tr>
                                        <td>{tdata.name}</td>
                                        <td>{tdata.check_in}</td>
                                        <td>{tdata.room_type}</td>
                                        <td>{tdata.room_price}</td>
                                        <td>
                                            <Link onClick={() => this.showOnGoingBooking(tdata.id)}><img src={eyecloseupimg}/></Link>&nbsp;
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
                <div className="col-1" />
            </div>
        )
    }
}

export default withRouter(Pemesanan);