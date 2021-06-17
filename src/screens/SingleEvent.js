import React from 'react'
import "./singleProject.css"
import { useStateValue } from "../StateProvider";
import {useHistory} from 'react-router-dom'
import Button from '@material-ui/core/Button';
import Map  from "../components/Map"
import { makeStyles } from '@material-ui/core/styles';
import Modal from '@material-ui/core/Modal';
import TextField from '@material-ui/core/TextField';
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
    textField: {
      marginLeft: theme.spacing(1),
      marginRight: theme.spacing(1),
      width: 200,
    },
  }));
  

function SingleEvent() {
    const history = useHistory()

    //modal styles
  const classes = useStyles();

  // getModalStyle is not a pure function, we roll the style only on the first render
  const [modalStyle] = React.useState(getModalStyle);
  const [open, setOpen] = React.useState(false);
  const [{ singleEvent }, dispatch] = useStateValue();
  const [email, setEmail] = React.useState("");
  const [name, setName] = React.useState("");
  const [phone, setPhone] = React.useState("");
  const [people, setPeople] = React.useState("");
  const [bringing, setBringing] = React.useState("");
  const [questions, setQuestions] = React.useState("");
  const [startDate, setStartDate] = React.useState("");
  const [startTime, setStartTime] = React.useState("");
  const [endDate, setEndDate] = React.useState("");
  const [endTime, setEndTime] = React.useState("");
  const [requests, setRequests] = React.useState("");
   


 

  const submit=()=>{
      db.collection("EventBookings").add({
          businessEmail:singleEvent.username,
          eventName:singleEvent.name,
          name:name,
          email:email,
          phone:phone,
          people:people,
          bringing:bringing,
          questions:questions,
          startdate:startDate,
          starttime:startTime,
          enddate:endDate,
          endtime:endTime,
          requests:requests,
          timestamp:firebase.firestore.FieldValue.serverTimestamp()
          
      })
      alert("Event saved")
      history.push("/thankyou")
  }
  //opening modal
  const handleOpen = () => {
    setOpen(true);
  };

  //closing modal
  const handleClose = () => {
    setOpen(false);
  };


    
  const back=()=>{
    dispatch({
        type: 'Set_Single',
        item : singleEvent.username
    })
    history.push('/business')
   
  }
 

  //modal body

  const body = (
    <div style={modalStyle} className={classes.paper}>
      
    <div className="formParent">
    <form className="formReg" >

        <h1>Event <br/> ENTER YOUR DETAILS</h1>
      <Input placeholder="Name" inputProps={{ 'aria-label': 'description' }} value={name}
      onChange={(e)=>{setName(e.target.value);}}/>
      <Input placeholder="Email" inputProps={{ 'aria-label': 'description' }} value={email} 
      onChange={(e)=>{setEmail(e.target.value);}}/>
      <Input placeholder="Phone" inputProps={{ 'aria-label': 'description' }} value={phone}
      onChange={(e)=>{setPhone(e.target.value);}}/>
      <Input placeholder="Bringing" inputProps={{ 'aria-label': 'description' }} value={bringing}
      onChange={(e)=>{setBringing(e.target.value);}}/>
      <Input placeholder="Questions" inputProps={{ 'aria-label': 'description' }} value={questions}
      onChange={(e)=>{setQuestions(e.target.value);}}/>
       <Input placeholder="People" inputProps={{ 'aria-label': 'description' }} value={people}
      onChange={(e)=>{setPeople(e.target.value);}}/>
       <TextField id="date" label="Start Date" type="date" value={startDate} onChange={(e)=>{setStartDate(e.target.value);}}
        className={classes.textField}InputLabelProps={{shrink: true,}}/>
     <TextField id="date" label="End Date" type="date" value={endDate} onChange={(e)=>{setEndDate(e.target.value);}}
        className={classes.textField}InputLabelProps={{shrink: true,}}/>
         <TextField
        id="time"
        label="Arrival Time"
        type="time"
        value={startTime}
        onChange={(e)=>{setStartTime(e.target.value);}}
        className={classes.textField}
        InputLabelProps={{
          shrink: true,
        }}
        inputProps={{
          step: 300, // 5 min
        }}
      />
      <TextField
        id="time"
        label="Leaving Time"
        type="time"
        value={endTime}
         onChange={(e)=>{setEndTime(e.target.value);}}
        className={classes.textField}
        InputLabelProps={{
          shrink: true,
        }}
        inputProps={{
          step: 300, // 5 min
        }}
      />
      
      <Input placeholder="Requests" inputProps={{ 'aria-label': 'description' }} value={requests}
      onChange={(e)=>{setRequests(e.target.value);}}/>
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
                    <div className="single-event">
                    <div className="single-project-main">
                    <h1>{singleEvent.name}</h1>
                </div>
                <div className="single-project-image">
                    <img src={singleEvent.image} alt=""/>
                </div>
                <div className="single-paragraph">
                <p>{singleEvent.summary}</p>
                <br/>
                <p>needed {singleEvent.needed}</p>
                <br/>
                <p>bring {singleEvent.bring}</p>
                </div>
                <div className="single-paragraph">
                <p>{singleEvent.desc}</p>
                </div>
                <div className="single-paragraph">
                start date:{singleEvent.start} <br/>end date:{singleEvent.finish}
                </div>
                <div className="Business-map">

                <Map lat={JSON.parse(singleEvent.lat)} long={JSON.parse(singleEvent.long)}/>

            </div>
            </div>
           
            <br/>
            <br/>
            <Button size="small" variant="contained" color="primary" onClick={handleOpen}>
                    Iam Attending
           </Button>
        </div>
    )
}

export default SingleEvent
