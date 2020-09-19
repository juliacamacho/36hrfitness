import React from 'react';
import classes from './Search.css'
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';

const search = (props) => {
    return(
        <div className={classes.Search}>
            <p>Please enter the URL of your video:</p>
            <form className={classes.Form}>
                <TextField id="outlined-basic" label="Video URL" variant="outlined" />
                <Button variant="contained">Submit</Button>
            </form>
        </div>
    )
};

export default search;