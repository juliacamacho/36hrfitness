import React, {useState} from 'react';
import Search from '../../components/Search/Search'
import VideoStream from '../../components/VideoStream/VideoStream'
import WebcamStream from '../../components/WebcamStream/WebcamStream'
import Results from '../../components/Results/Results'
import classes from './Layout.css'
import Grid from '@material-ui/core/Grid';
import ResponsiveGridLayout from 'react-grid-layout';

const layout = (props) => {

    

    return (
        <div className={classes.Layout}>
            <ResponsiveGridLayout cols={20} rowHeight={30} width={1650}>
                <div 
                    key="a" 
                    data-grid={{x: 0, y: 0, w: 20, h: 5}}
                    className={classes.Box}>
                    <Search />    
                </div>
                <div 
                    key="b" 
                    data-grid={{x: 0, y: 0, w: 10, h: 10}}
                    className={classes.Box}>
                    <VideoStream />    
                </div>
                <div 
                    key="c" 
                    data-grid={{x: 10, y: 0, w: 10, h: 10}}
                    className={classes.Box}>
                <WebcamStream />
                </div>
                <div 
                    key="d" 
                    data-grid={{x: 0, y: 3, w: 5, h: 9}}
                    className={classes.Box}>
                    <Results />    
                </div>
                <div 
                    key="e" 
                    data-grid={{x: 5, y: 3, w: 5, h: 9}}
                    className={classes.Box}>
                    <Results />    
                </div>
                <div 
                    key="f" 
                    data-grid={{x: 10, y: 3, w: 5, h: 9}}
                    className={classes.Box}>
                    <Results />    
                </div>
                <div 
                    key="g" 
                    data-grid={{x: 15, y: 3, w: 5, h: 9}}
                    className={classes.Box}>
                    <Results />    
                </div>
            </ResponsiveGridLayout>
        </div>
    )
};

export default layout;