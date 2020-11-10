import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';

export default function Pembatalan(){
    return(
        <div className="row">
            <div className="col-sm-1"></div>
            <div className="col-sm-10">
                <br />
                <br />
                <br />
                <h1>Data Pembatalan</h1>
                <br />
                <table className="table">
                    <thead>
                        <tr>
                          <th scope="col">Nama Pemesan</th>
                          <th scope="col">Tanggal Menginap</th>
                          <th scope="col">Tipe Kamar</th>
                          <th scope="col">Harga</th>
                          <th scope="col">Action</th>
                        </tr>
                    </thead>
                    <tbody>
                    <tr>
                      <th scope="row">1</th>
                      <td>Mark</td>
                      <td>Otto</td>
                      <td>@mdo</td>
                      <td><a href="#"><img src="../../eye-closeup.png" /></a>&nbsp;&nbsp;&nbsp;<a href="#"><img src="../../delete.png" /></a></td>
                    </tr>
                    <tr>
                      <th scope="row">2</th>
                      <td>Jacob</td>
                      <td>Thornton</td>
                      <td>@fat</td>
                      <td><a href="#"><img src="../../eye-closeup.png" /></a>&nbsp;&nbsp;&nbsp;<a href="#"><img src="../../delete.png" /></a></td>
                    </tr>
                    <tr>
                      <th scope="row">3</th>
                      <td>Larry</td>
                      <td>the Bird</td>
                      <td>@twitter</td>
                      <td><a href="#"><img src="../../eye-closeup.png" /></a>&nbsp;&nbsp;&nbsp;<a href="#"><img src="../../delete.png" /></a></td>
                    </tr>
                    </tbody>
                </table>
            </div>
            <div className="col-sm-1"></div>
        </div>
    )
}