import React from 'react';
import Search from '../../components/Search/Search'
import VideoStream from '../../components/VideoStream/VideoStream'
import WebcamStream from '../../components/WebcamStream/WebcamStream'
import Results from '../../components/Results/Results'
import classes from './Layout.css'

const layout = (props) => {
    return (
        <div style={{backgroundColor:"#80B2FF"}}>
            <Search />
            <VideoStream />
            <WebcamStream />
            <Results />
        </div>
    )
};

export default layout;