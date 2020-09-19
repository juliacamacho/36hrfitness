import React from 'react';
import classes from './VideoStream.css'
import ReactPlayer from 'react-player'

const videoStream = (props) => {
    return(
        <div className={classes.VideoStream}>
            <ReactPlayer 
                url={props.url}
                muted
                playing
                loop
                controls
                width='auto'
                height='auto'
                //padding-top: 56.25%; 
                />
        </div>
    )
};

export default videoStream;