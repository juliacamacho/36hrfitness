import React, {useState} from 'react';
import Search from '../../components/Search/Search'
import VideoStream from '../../components/VideoStream/VideoStream'
import WebcamStream from '../../components/WebcamStream/WebcamStream'
import Results from '../../components/Results/Results'
import classes from './Layout.css'

const layout = (props) => {

    

    return (
        <div className={classes.Layout}>
            <div className={classes.Header}>
                <h1>Welcome to 36hr Fitness!</h1>
            </div>
            <Search />
            <div className={classes.VideoStreams}>
                <VideoStream />
                <WebcamStream />
            </div>
            <Results />
        </div>
    )
};

export default layout;