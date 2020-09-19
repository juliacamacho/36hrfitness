import React, {useState} from 'react';
import Search from '../../components/Search/Search'
import VideoStream from '../../components/VideoStream/VideoStream'
import WebcamStream from '../../components/WebcamStream/WebcamStream'
import Results from '../../components/Results/Results'
import classes from './Layout.css'
import Grid from '@material-ui/core/Grid';

const layout = (props) => {

    

    return (
        <div className={classes.Layout}>
            <div className={classes.Header}>
                <h1>Begin your workout...</h1>
            </div>
            <Search />
            {/* <div className={classes.VideoStreams}> */}
            <Grid
                container
                direction="row"
                justify="center"
                alignItems="center"
                spacing={4}
                >
                <VideoStream />
                <WebcamStream />
            </Grid>
            {/* </div> */}
            <Results />
        </div>
    )
};

export default layout;