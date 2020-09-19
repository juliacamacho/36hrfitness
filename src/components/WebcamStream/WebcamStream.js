import React from 'react';
import classes from './WebcamStream.css'
import Webcam from "react-webcam";

const webcamStream = (props) => {
    return(
        <div className={classes.WebcamStream}>
            <Webcam 
                width='80%'
            />
        </div>
    )
};

export default webcamStream;