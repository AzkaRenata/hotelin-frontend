import React, {useState,useEffect} from 'react'
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

function DataKamar(props) {

    const [state , setState] = useState({
        offset: 0,
        tableData: [],
        orgtableData: [],
        perPage: 10,
        currentPage: 0,
        alert: null,
        view: null
    });

    function hideAlert() {
        setState({
            alert: null
        });
    }

    function hideView() {
        setState({
            view: null
        });
    }

    const confirmDelete = id => {
        const getAlert = () => (
            <SweetAlert
                warning
                showCancel
                confirmBtnText="Delete"
                cancelBtnText="Cancel"
                confirmBtnBsStyle="default"
                cancelBtnBsStyle="danger"
                title="Tunggu ..."
                onConfirm={() => deleteItem(id)}
                onCancel={() => hideAlert()}
                focusCancelBtn
                >
                Apakah yakin mau delete?
            </SweetAlert>
        );
        setState({
            alert: getAlert()
        });
    }

    function showRoom(id){
        const getView = () => (
            <RoomView room_id={id} onCancel={() => hideView()}/>
        );
        setState({
            view: getView()
        });
    }

    const deleteItem = id => {
        console.log(id);
        axios.delete(API_BASE_URL+`/room/delete/${id}`, { headers: { "Authorization": `Bearer ${localStorage.getItem(ACCESS_TOKEN_NAME)}`}}).then(response => {
            var msg = response.data.success;
            if(msg == true){
                hideAlert();
                goToHome();
            } else {
                console.log(response.data)
                console.log("Gagal");
            }
        })
        .catch(function (error) {
            console.log(error);
        });
    }

    function  goToHome(){
        const getAlert = () => (
            <SweetAlert
                success
                title="Success!"
                onConfirm={() => onSuccess() }
                onCancel={hideAlert()}
                timeout={2000}
                confirmBtnText="OKE"
                >
                Delete Kamar Berhasil
            </SweetAlert>
        );
        setState({
            alert: getAlert()
        });
    }
 
    function onSuccess(){
        getData();
        hideAlert();
    }

    const toAddKamar = () => {
        props.history.push('/home/kamar/add'); 
    }

    const handlePageClick = (e) => {
        const selectedPage = e.selected;
        const offset = selectedPage * state.perPage;

        setState({
            currentPage: selectedPage,
            offset: offset
        }, () => {
            loadMoreData()
        });

    };

    function loadMoreData() {
        const data = state.orgtableData;

        const slice = data.slice(state.offset, state.offset + state.perPage)
        setState({
            pageCount: Math.ceil(data.length / state.perPage),
            tableData: slice
        })

    }

    useEffect(() => {
        getData();
    }, [])

    const getData = React.useCallback(() => {
        axios
            .get(API_BASE_URL+'/room/list', { headers: { "Authorization": `Bearer ${localStorage.getItem(ACCESS_TOKEN_NAME)}`}})
            .then(res => {
                var tdata = res.data;
                console.log('data-->' + JSON.stringify(tdata))
                var slice = tdata.slice(state.offset, state.offset + state.perPage)
                setState({
                    pageCount: Math.ceil(tdata.length / state.perPage),
                    orgtableData: tdata,
                    tableData: slice
                })
            });
            console.log("TABEL DATA : "+state.tableData.map(item => item));
    })

    return (
        <div className="row">
            {state.alert}
            {state.view}
            <div className="col-1" />
            <div className="col-10">
                <div class="row title-row">
                    <div class="col-6">
                        <h3 class="title">Daftar Kamar</h3>
                    </div>
                    <div class="col-6">
                        <button class="add-room-btn" onClick={toAddKamar}>
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
                            state.tableData.map((tdata, i) => (
                                <tr>
                                    <td>{tdata.room_code}</td>
                                    <td>{tdata.room_type}</td>
                                    <td>{tdata.guest_capacity}</td>
                                    <td>{tdata.room_price}</td>
                                    <td>
                                        <Link onClick={() => showRoom(tdata.id)}><img src={eyecloseupimg}/></Link>&nbsp;
                                        <Link to={`/home/kamar/edit/${tdata.id}`}><img src={pencilimg}/></Link>&nbsp;
                                        <Link onClick={() => confirmDelete(tdata.id)}><img src={deleteimg}/></Link>
                                    </td>
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
                    pageCount={state.pageCount}
                    marginPagesDisplayed={2}
                    pageRangeDisplayed={5}
                    onPageChange={handlePageClick}
                    containerClassName={"pagination"}
                    subContainerClassName={"pages pagination"}
                    activeClassName={"active"} />
            </div>
            <div className="col-sm-1" />
            <div className="col-1" />
        </div>
    )
}

export default withRouter(DataKamar);

