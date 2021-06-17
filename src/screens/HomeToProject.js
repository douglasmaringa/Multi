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
  

function HomeToProject() {
    const history = useHistory()
     //redux
  const [{ singleProject }, dispatch] = useStateValue();

   //modal styles
   const classes = useStyles();

   // getModalStyle is not a pure function, we roll the style only on the first render
   const [modalStyle] = React.useState(getModalStyle);
   const [open, setOpen] = React.useState(false);
   
   //opening modal
   const handleOpen = () => {
     setOpen(true);
   };
 
   //closing modal
   const handleClose = () => {
     setOpen(false);
   };
 
 
   const [email, setEmail] = React.useState("");
   const [name, setName] = React.useState("");
   const [phone, setPhone] = React.useState("");
   const [people, setPeople] = React.useState("");
   const [bringing, setBringing] = React.useState("");
   const [questions, setQuestions] = React.useState("");

   const submit=()=>{
     db.collection("ProjectBookings").add({
         businessEmail:singleProject.username,
         projectName:singleProject.name,
         name:name,
         email:email,
         phone:phone,
         people:people,
         bringing:bringing,
         questions:questions,
         timestamp:firebase.firestore.FieldValue.serverTimestamp()
         
     })
     alert("project saved")
     history.push("/thankyou")
 }

 const back=()=>{
   dispatch({
       type: 'Set_Single',
       item : singleProject.username
   })
   history.push('/business')
  
 }
 
   //modal body

   const body = (
    <div style={modalStyle} className={classes.paper}>
      
      <div className="formParent">
    <form className="formReg" >

        <h1>PROJECT <br/> ENTER YOUR DETAILS</h1>
      <Input placeholder="Name" inputProps={{ 'aria-label': 'description' }} value={name}
      onChange={(e)=>{setName(e.target.value);}}/>
      <Input placeholder="Email" inputProps={{ 'aria-label': 'description' }} value={email} 
      onChange={(e)=>{setEmail(e.target.value);}}/>
      <Input placeholder="Phone" inputProps={{ 'aria-label': 'description' }} value={phone}
      onChange={(e)=>{setPhone(e.target.value);}}/>
      <Input placeholder="Can Bring" inputProps={{ 'aria-label': 'description' }} value={bringing}
      onChange={(e)=>{setBringing(e.target.value);}}/>
      <Input placeholder="Questions" inputProps={{ 'aria-label': 'description' }} value={questions}
      onChange={(e)=>{setQuestions(e.target.value);}}/>
       <Input placeholder="How many People are you coming with?" inputProps={{ 'aria-label': 'description' }} value={people}
      onChange={(e)=>{setPeople(e.target.value);}}/>
      
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
                    <h1>{singleProject.name}</h1>
                </div>
                <div className="single-project-image">
                    <img src={singleProject.image}  alt=""/>
                </div>
                <div className="single-paragraph">
                <p>{singleProject.summary}</p>
                </div>
                <div className="single-paragraph">
                <p>{singleProject.desc}</p>
                </div>
                <div className="single-paragraph">
                start date:{singleProject.start} <br/>end date:{singleProject.finish}
                </div>
              
           
            <br/>
            <br/>
            <Button size="small" variant="contained" color="primary" onClick={handleOpen} >
                     I'd Like To Be Involved 
           </Button>
        </div>
    )
}

export default HomeToProject
