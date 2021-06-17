import React,{useState} from 'react'
import { auth } from "../firebase";
import {useHistory} from 'react-router-dom';
import Input from '@material-ui/core/Input';
import Paper from '@material-ui/core/Paper';
import Button from '@material-ui/core/Button';
//import { makeStyles } from '@material-ui/core/styles';
import Ghost from "../Data/Ghost.gif"
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

function BsLogin() {
  const [email, setEmail] = React.useState("");
  const [pass, setPass] = React.useState("");
  const[load,setLoad]= useState(false)
 // const [summary, setSummary] = React.useState("");
    const history = useHistory()
    //const classes = useStyles();

    
    const submit = e => {
      setLoad(true)
        e.preventDefault();
        
        auth
            .signInWithEmailAndPassword(email, pass)
            .then(auth => {
              
                history.push('/register')
                setLoad(true)
            })
            .catch(error => alert(error.message))
            setLoad(false)
    }



    return (
        <Paper elevation={3} className="paper1">
        <div className="paperdiv">
        <h1>Sign in</h1>
     
      <Input placeholder="Organisation Email" inputProps={{ 'aria-label': 'description' }} value={email} 
      onChange={(e)=>{setEmail(e.target.value);}}/>
      <br/>
      <Input type="password" placeholder="Organisation Password" inputProps={{ 'aria-label': 'description' }} value={pass}
      onChange={(e)=>{setPass(e.target.value);}}/>
      <br/>
      <Button variant="contained" color="primary" onClick={submit}>
        {
          load?(<><img src={Ghost} alt="t"/></>):(<> Sign in</>)
        }
       
      </Button>
      <br/>
      <Button variant="contained" color="secondary" onClick={()=>{history.push("/")}}>
       Cancel
      </Button>
      <br/>
      <Button  color="secondary" onClick={()=>{history.push("/")}}>
       Forgot Password
      </Button>
        </div>
        </Paper>
    )
}

export default BsLogin
