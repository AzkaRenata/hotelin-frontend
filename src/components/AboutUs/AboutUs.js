import React from 'react';
import './AboutUs.css';
import 'bootstrap/dist/css/bootstrap.css';

export default function AboutUs(){
    return(
        <div className="container"> 
        <b><div className="header">About Us</div></b>
            <section className="AboutUS.js" id="AboutUs">
            <h5><b>Developer Team</b></h5>
            <div className=" row aboutus-row">
                    <div className="member col-lg-2 col-md-4 col-xs-6">
                        <div className="author">
                            <img src="../../Sarah.jpeg" className="rounded-circle img-thumbnail"></img>
                            <p className="text-center">Sarah</p>         
                        </div>
                    </div>

                    <div className="member col-lg-2 col-md-4 col-xs-6">
                        <div className="author">
                            <img src="../../Mujir.jpg" className="rounded-circle img-thumbnail"></img>
                            <p className="text-center">Mujir</p>         
                        </div>
                    </div>

                    <div className="member col-lg-2 col-md-4 col-xs-6">
                        <div className="author">
                            <img src="../../Marisna.jpg" className="rounded-circle img-thumbnail"></img>
                            <p className="text-center">Marisna</p>         
                        </div>
                    </div>

                    <div className="member col-lg-2 col-md-4 col-xs-6">
                        <div className="author">
                            <img src="../../Adam.jpeg" className="rounded-circle img-thumbnail"></img>
                            <p className="text-center">Adam</p>         
                        </div>
                    </div>

                    <div className="member col-lg-2 col-md-4 col-xs-6">
                        <div className="author">
                            <img src="../../Aziz.jpeg" className="rounded-circle img-thumbnail"></img>
                            <p className="text-center">Ajiz</p>         
                        </div>
                    </div>

                    <div className="member col-lg-2 col-md-4 col-xs-6">
                        <div className="author">
                            <img src="../../Irfan.jpeg" className="rounded-circle img-thumbnail"></img>
                            <p className="text-center">Irfan</p>         
                        </div>
                    </div>
                </div>

                <h5><b>Sponsored by</b></h5>
                <div className="row aboutus-row">
                    
                    <div className="member col-lg-3 col-s-6">
                        <div className="info">
                            <img src="../../virtualhive.png" className="logo-img1"></img>
                        </div>
                    </div>

                    <div className="member col-lg-3 col-s-6">
                        <div className="info">
                            <img src="../../rasyidtechnologies.png" className="logo-img1"></img>
                        </div>
                    </div>

                    <div className="member col-lg-3 col-s-6">
                        <div className="info">
                            <img src="../../pti.png" className="logo-img2"></img>
                        </div>
                    </div>

                    <div className="member col-lg-3 col-s-6">
                        <div className="info">
                            <img src="../../maulidangames.png" className="logo-img1"></img>
                        </div>
                    </div>
                </div>

                <h5><b>Supported by</b></h5>
                <div className="row aboutus-row">
                    
                    <div className="member col-lg-2 col-s-6">
                        <div className="info">
                            <img src="../../sindika.png" className="logo-img3"></img>
                        </div>
                    </div>

                    <div className="member col-lg-2 col-s-6">
                        <div className="info">
                            <img src="../../rasyidinstitute.png" className="logo-img1"></img>
                        </div>
                    </div>

                    <div className="member col-lg-2 col-s-6">
                        <div className="info">
                            <img src="../../trustmedis.png" className="logo-img1"></img>
                        </div>
                    </div>

                    <div className="member col-lg-2 col-s-6">
                        <div className="info">
                            <img src="../../profilku.png" className="logo-img1"></img>
                        </div>
                    </div>

                    <div className="member col-lg-2 col-s-6">
                        <div className="info">
                            <img src="../../alterra.png" className="logo-img1"></img>
                        </div>
                    </div>
                </div>

                <h5><b>Supervisors and Mentors</b></h5>
                <div class="row aboutus-row">
                    <div class="member col-lg-6 col-s-6">
                        <div class="info">
                            <p class="text-center">Umi Sa'adah (Dosen Teknik Informatika PENS)</p>
                            <p class="text-center">Desy Intan Permatasari (Dosen Teknik Informatika PENS)</p>
                            <p class="text-center">Andhik Ampuh Yunanto (Dosen Teknik Informatika PENS)</p>
                            <p class="text-center">Maulidan Bagus Afridian Rasyid (Founder Maulidan Games & Rasyid Technology)</p>
                            <p class="text-center">Willy Achmat Fauzi (CEO Sindika)</p>
                            <p class="text-center">Verent Flourencia Irene (UX Designer Maulidan Games)</p>
                            <p class="text-center">Mayshella Ainun Wakhidah (Mahasiswa Teknik Informatika PENS)</p>
                            <p class="text-center">Andika Ahmad Ramadhan (Mahasiswa Teknik Informatika PENS)</p>
                            <p class="text-center">Fandi Ahmad (Mahasiswa Teknik Informatika PENS)</p>
                        </div>
                    </div>

                    <div class="member col-lg-6 col-s-6">
                        <div class="info">
                            <p class="text-center">Ardian Kristya Pratama (Mobile Developer AlinaMed & Ikkat Inovasi Teknologi)</p>
                            <p class="text-center">Angga Pradipta Kurnia Putra (CTO AlinaMed & Mobile Developer Ikkat Inovasi Teknologi)</p>
                            <p class="text-center">Muhammad Alif Pradipta ADP (Mobile Developer Sindika)</p>
                            <p class="text-center">Rafly Arief Kanza (Owner & Full Stack Developer punggawastudio.com)</p>
                            <p class="text-center">Ahmad Jarir At Thobari (Software Engineer Rasyid Technologies)</p>
                            <p class="text-center">Aji Dibyo Respati (Mahasiswa Teknik Informatika PENS)</p>
                            <p class="text-center">Achmad Zulkarnain (CEO & Co-Founder TrustMedis)</p>
                            <p class="text-center">Arrie Affianto (Founder Profilku Mobile & Samsung Developer Warrior)</p>
                            <p class="text-center">Tegar Imansyah (Software RnD in System Architect Alterra)</p>
                        </div>
                    </div>
                </div>
            </section>
        </div>
    )

}