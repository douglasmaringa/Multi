import React from 'react'
import "./singleProject.css"
import { useStateValue } from "../StateProvider";
import {useHistory} from 'react-router-dom'
import Button from '@material-ui/core/Button';
import { makeStyles } from '@material-ui/core/styles';
import Modal from '@material-ui/core/Modal';
import {db} from "../firebase"
import firebase from "firebase"
import Input from '@material-ui/core/Input';

function rand() {
    return Math.round(Math.random() * 20) - 10;
  }
  
  function getModalStyle() {
    const top = 50 + rand();
    const left = 50 + rand();
  
    return {
      top: `${top}%`,
      left: `${left}%`,
      transform: `translate(-${top}%, -${left}%)`,
    };
  }
  
  const useStyles = makeStyles((theme) => ({
    paper: {
      position: 'absolute',
      width: 600,
      height:"100vh",
      backgroundColor: theme.palette.background.paper,
      border: '2px solid #000',
      boxShadow: theme.shadows[5],
      padding: theme.spacing(2, 4, 3),
      overflow:'scroll',
    },
  }));
  


function SingleService() {
    const history = useHistory()
    //modal styles
  const classes = useStyles();
  const [email, setEmail] = React.useState("");
  const [name, setName] = React.useState("");
  const [phone, setPhone] = React.useState("");
  const [startDate, setStartDate] = React.useState("");
  const [startTime, setStartTime] = React.useState("");
  const [endDate, setEndDate] = React.useState("");
  const [endTime, setEndTime] = React.useState("");
  const [requests, setRequests] = React.useState("");
  const [questions, setQuestions] = React.useState("");

  // getModalStyle is not a pure function, we roll the style only on the first render
  const [modalStyle] = React.useState(getModalStyle);
  const [open, setOpen] = React.useState(false);
     //redux
  const [{singleService }, dispatch] = useStateValue();

  const back=()=>{
    dispatch({
        type: 'Set_Single',
        item : singleService.username
    })
    history.push('/business')
   
  }
  
  //opening modal
  const handleOpen = () => {
    setOpen(true);
  };

  //closing modal
  const handleClose = () => {
    setOpen(false);
  };

  const submit=()=>{
    db.collection("ServiceBookings").add({
        businessEmail:singleService.username,
        serviceName:singleService.name,
        name:name,
        email:email,
        phone:phone,
        startdate:startDate,
        starttime:startTime,
        enddate:endDate,
        endtime:endTime,
        requests:requests,
        questions:questions,
        timestamp:firebase.firestore.FieldValue.serverTimestamp()
        
    })
    alert("Service saved")
    history.push("/thankyou")
}
  //modal body

  const body = (
    <div style={modalStyle} className={classes.paper}>
      
      <div className="formParent">
    <form className="formReg" >

        <h1>Service Form</h1>
      <Input placeholder="Name" inputProps={{ 'aria-label': 'description' }} value={name}
      onChange={(e)=>{setName(e.target.value);}}/>
      <Input placeholder="Email" inputProps={{ 'aria-label': 'description' }} value={email} 
      onChange={(e)=>{setEmail(e.target.value);}}/>
      <Input placeholder="Phone" inputProps={{ 'aria-label': 'description' }} value={phone}
      onChange={(e)=>{setPhone(e.target.value);}}/>
      <Input placeholder="Start Date" inputProps={{ 'aria-label': 'description' }} value={startDate}
      onChange={(e)=>{setStartDate(e.target.value);}}/>
      <Input placeholder="End Date" inputProps={{ 'aria-label': 'description' }} value={endDate}
      onChange={(e)=>{setEndDate(e.target.value);}}/>
      <Input placeholder="Start Time" inputProps={{ 'aria-label': 'description' }} value={startTime}
      onChange={(e)=>{setStartTime(e.target.value);}}/>
      <Input placeholder="End Time" inputProps={{ 'aria-label': 'description' }} value={endTime}
      onChange={(e)=>{setEndTime(e.target.value);}}/>
      <Input placeholder="Requests" inputProps={{ 'aria-label': 'description' }} value={requests}
      onChange={(e)=>{setRequests(e.target.value);}}/>
      
      <Input placeholder="Questions" inputProps={{ 'aria-label': 'description' }} value={questions}
      onChange={(e)=>{setQuestions(e.target.value);}}/>
      
      
      <br/>
      <Button variant="contained" color="primary" onClick={submit}>
        Save
      </Button>
     </form>
</div>
    </div>
  );

  
  
    return (
        <div className="Single-project-container">
              <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="simple-modal-title"
        aria-describedby="simple-modal-description"
      >
        {body}
      </Modal>
            <Button size="small" variant="contained" color="primary" onClick={back}>
                     Back
                    </Button>
                    <div className="single-project-main">
                    <h1>{singleService.name}</h1>
                </div>
                <div className="single-project-image">
                    <img src={singleService.image} alt="" />
                </div>
                <div className="single-paragraph">
                <p>{singleService.summary}</p>
                <br/>
                </div>
                <div className="single-paragraph">
                <p>{singleService.desc}</p>
                </div>           
            <br/>
            <br/>
            <Button size="small" variant="contained" color="primary" onClick={handleOpen}>
                    Get A Qoute
           </Button>
        </div>
    )
}

export default SingleService
