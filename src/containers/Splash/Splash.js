import React, {useState} from 'react'
import Button from '@material-ui/core/Button';
import {Link} from "react-router-dom";
import classes from './Splash.css'
import ReactPlayer from 'react-player'

const Splash = (props) => {

    const [buttonClicked, setButtonClicked] = useState(false)

    const buttonClickedHandler = () => {
        let buttonClickedState = buttonClicked
        setButtonClicked(!buttonClickedState)
    }

    // let Options = null;
    // if (buttonClicked === true) {
    //     Options = (
    //         <div className={classes.Option1}>
    //             <Link to="/room">Create a Session</Link>
    //             <br />
    //             <Link to="/room">Join a Session</Link>
    //         </div>
    //     )
    // }

    return(
        // <div className={classes.Splash}>
        //     <h1>Welcome to 36hr Fitness!</h1>
        //     <h2>Prepare to be amazed by your very own virtual personal trainer...</h2>
        //     <h2>[insert rest of splash design here]</h2>
        //      <Button variant="contained">
        //          <Link to="/room">Go to room</Link>
        //      </Button>
        // </div>
        <div>
            {/* <video autoplay muted loop id="workout"  width="100%" height="100%">
                <source src="/videos/workout.mp4" type="video/mp4" />
            </video> */}
            <ReactPlayer 
                url="/videos/workout.mp4" 
                muted
                playing
                loop
                width='100%'
                height='100%'
                />

            <div className={classes.Overlay}>
            </div>
            
            <div id = "title" className={classes.Header}>
                    <span>36 Hour <br/ >Fitness</span>
            </div>

            <div className={classes.Button}>
                <Button 
                    variant="contained" 
                    color="secondary" 
                    size="large"
                    onClick={() => buttonClickedHandler()}>
                    Get Started Now
                </Button>
            </div>

            {buttonClicked ? (<div className={classes.Option1}>
                <Link to="/room" style={{ color: '#FFF' }}>Create a Session</Link>
                <br />
                <Link to="/room" style={{ color: '#FFF' }}>Join a Session</Link>
            </div>) : null}  

        </div>
    )

}

export default Splash