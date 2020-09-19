import React, {useState} from 'react';
import classes from './Search.css'
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';

const Search = (props) => {

    const [urlState, setURLstate] = useState("")

    const urlChangeHandler = (event) => {
        setURLstate(event.target.value)
    }

    const buttonClickedHandler = () => {
        console.log('clicked')
        console.log(urlState)
        props.url(urlState)
    }

    return(
        <div className={classes.Search}>
            <p>Please enter the URL of your video:</p>
            <form className={classes.Form}>
                <TextField 
                    id="outlined-basic" 
                    label="Video URL" 
                    variant="outlined"
                    onChange={urlChangeHandler} />
                <Button 
                    variant="contained" 
                    onClick={() => buttonClickedHandler()}>Submit</Button>
            </form>
        </div>
    )
};

export default Search;