import React from 'react';
import "./FullPageLoader.css";
import {FRONT_BASE_URL} from '../../constants/apiContants';

const FullPageLoader = () => {
    return(
        <div className="fp-container">
            <img src={FRONT_BASE_URL+"/spinner.gif"} className="fp-loader" alt="loading"/>
        </div>
    )
}

export default FullPageLoader;