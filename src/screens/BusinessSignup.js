import React from 'react'
import { auth } from "../firebase";
import {useHistory} from 'react-router-dom';
import Input from '@material-ui/core/Input';
import Paper from '@material-ui/core/Paper';
import Button from '@material-ui/core/Button';
import "./bsSignup.css"

/*const useStyles = makeStyles((theme) => ({
    paper1: {
      position: 'absolute',
      width: 400,
      backgroundColor: theme.palette.background.paper,
      border: '2px solid #000',
      boxShadow: theme.shadows[5],
      padding: theme.spacing(2, 4, 3),
    },
  }));
  */

function BusinessSignup() {
  const [email, setEmail] = React.useState("");
  const [pass, setPass] = React.useState("");
  //const [summary, setSummary] = React.useState("");
    const history = useHistory()
    //const classes = useStyles();

    const submit=()=>{
         // register logic
         auth
         .createUserWithEmailAndPassword(email,pass)
         .then((auth )=>{
             // create a user and logged in
             history.push('/register')
         })
         .catch(e=> alert(e.message))
    }


    return (
        <Paper elevation={3} className="paper1">
        <div className="paperdiv">
        <h1>Register</h1>
     
      <Input placeholder="Organisation Email" inputProps={{ 'aria-label': 'description' }} value={email} 
      onChange={(e)=>{setEmail(e.target.value);}}/>
      <br/>
      <Input placeholder="OrganisationPassword" inputProps={{ 'aria-label': 'description' }} value={pass}
      onChange={(e)=>{setPass(e.target.value);}}/>
      <br/>
      <Button variant="contained" color="primary" onClick={submit}>
        Save
      </Button>
      <br/>
      <Button variant="contained" color="secondary" onClick={()=>{history.push("/")}}>
       Cancel
      </Button>
        </div>
        </Paper>
    )
}

export default BusinessSignup
