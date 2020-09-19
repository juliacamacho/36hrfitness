import React from 'react';
import Button from '@material-ui/core/Button';
import {Link} from "react-router-dom";
import classes from './Splash.css'

const Splash = (props) => {

    return(
        <div className={classes.Splash}>
            <Button variant="contained">
                <Link to="/room">Go to room</Link>
            </Button>
        </div>
    )

}

export default Splash