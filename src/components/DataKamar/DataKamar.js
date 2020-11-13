import React, { PureComponent,useState } from 'react'
import axios from 'axios';
import ReactPaginate from 'react-paginate';
import "./DataKamar.css";
import eyecloseupimg from './eye-closeup.png';
import deleteimg from './delete.png';
import pencilimg from './pencil.png';
import {API_BASE_URL, ACCESS_TOKEN_NAME} from '../../constants/apiContants';
import { withRouter } from "react-router-dom";



export class DataKamar extends PureComponent {

    constructor(props) {
        super(props)

        this.state = {
            offset: 0,
            tableData: [],
            orgtableData: [],
            perPage: 5,
            currentPage: 0
        }

        this.handlePageClick = this.handlePageClick.bind(this);

    }

    toAddKamar = () => {
        this.props.history.push('/home/kamar/add'); 
    }
    
    toEditKamar = () => {
        this.props.history.push('/home/kamar/edit'); 
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
            .get(API_BASE_URL+'/room', { headers: { 'token': localStorage.getItem(ACCESS_TOKEN_NAME) }})
            // .get('https://jsonplaceholder.typicode.com/comments')
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


    render() {
        return (
            <div className="row">
                <div className="col-1" />
                <div className="col-10">
                    <div class="row title-row">
                        <div class="col-6">
                            <h2 class="title">Data Kamar</h2>
                        </div>
                        <div class="col-6">
                            <button class="add-room-btn" onClick={this.toEditKamar}>
                                Tambah Kamar
                            </button>    
                        </div>
                    </div>
                    <table className="table">
                        <thead className="table-active">
                            <th scope="col">Tipe Kamar</th>
                            <th scope="col">Harga</th>
                            <th scope="col">Kapasitas Kamar</th>
                            <th scope="col">Action</th>

                        </thead>
                        <tbody>
                            {
                                this.state.tableData.map((tdata, i) => (
                                    <tr>
                                        <td>{tdata.room_type}</td>
                                        <td>{tdata.room_price}</td>
                                        <td>{tdata.guest_capacity}</td>
                                        <td><a href="#"><img src={eyecloseupimg}/></a>&nbsp;<a href="#"><img src={pencilimg}/></a>&nbsp;<a href="#"><img src={deleteimg}/></a></td>
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