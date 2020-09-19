import React from 'react';
import Button from '@material-ui/core/Button';
import {Link} from "react-router-dom";
import classes from './Splash.css'

const Splash = (props) => {

    return(
        <div className={classes.Splash}>
            <h1>Welcome to 36hr Fitness!</h1>
            <h2>Prepare to be amazed by your very own virtual personal trainer...</h2>
            <h2>[insert rest of splash design here]</h2>
             <Button variant="contained">
                 <Link to="/room">Go to room</Link>
             </Button>
        </div>
    )

}

export default Splash