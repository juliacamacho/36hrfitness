import React from 'react';
import classes from './Search.css'
import TextField from '@material-ui/core/TextField';

const search = (props) => {
    return(
        <div className={classes.Search}>
            <p>Please enter the URL of your video:</p>
            <form>
                <TextField id="outlined-basic" label="Video URL" variant="outlined" />
            </form>
        </div>
    )
};

export default search;