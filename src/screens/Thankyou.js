import React from 'react'
import "./business.css"
import Paper from '@material-ui/core/Paper';
import Button from '@material-ui/core/Button';
import {useHistory} from 'react-router-dom'

function Thankyou() {
    const history = useHistory()

    const submit=()=>{
        history.push("/search")
    }
    return (
        <div>
           <Paper elevation={3} className="thankyoupaper">
                <h1>Thank you</h1><br/><br/>
                <h1>Your Form Has Been Submitted Successfully</h1>
                <br/><br/>
                <Button variant="contained" color="primary" onClick={submit}>
       Check out More Businesses
      </Button>
            </Paper>
        </div>
    )
}

export default Thankyou
