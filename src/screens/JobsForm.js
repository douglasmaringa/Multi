import React,{useState} from 'react'
import { useStateValue } from "../StateProvider";
import {useHistory} from 'react-router-dom'
import Input from '@material-ui/core/Input';
import Paper from '@material-ui/core/Paper';
import Button from '@material-ui/core/Button';
import {db,storage} from "../firebase"
import firebase from "firebase"

function JobsForm() {
    const [{ single }] = useStateValue();
    const [email, setEmail] = React.useState("");
    const [name, setName] = React.useState("");
    const [phone, setPhone] = React.useState("");
    const [resume, setResume] = React.useState("");
    const [questions, setQuestions] = React.useState("");
    const [about, setAbout] = React.useState("");
    const history = useHistory()

//image state
//const allInputs={imgUrl:''}
const[imageAsFile,setImageAsFile]= useState("")
//const[imageAsUrl,setImageAsUrl]= useState(allInputs)


const handleImageAsFile=(e)=>{
    const image = e.target.files[0]
    setImageAsFile(imageFile=>(image))
  }
  
  const handleFireBaseUpload=e=>{
    e.preventDefault()
    console.log('start of upload')
    setResume("uploading")
    if(imageAsFile===''){
        console.error("not an image")
    }
    const uploadTask =storage.ref(`/images/${imageAsFile.name}`).put(imageAsFile)
    uploadTask.on('state_changed',(snapShot)=>{
        console.log(snapShot)
    },(err)=>{
        console.log(err)
    },()=>{
        storage.ref('images').child(imageAsFile.name).getDownloadURL().then(firebaseUrl=>{
            
            setResume(firebaseUrl)
            //setImageAsUrl(prevObject=>({prevObject,imgUrl:firebaseUrl}))
        })
    })
  }
  
  

    console.log(single)

    const submit=()=>{
        db.collection("JobsBookings").add({
            businessEmail:single,
            name:name,
            email:email,
            phone:phone,
            resume:resume,
            questions:questions,
            about:about,
            timestamp:firebase.firestore.FieldValue.serverTimestamp()
            
        })
        alert("Application saved")
         history.push('/thankyou')
    }
    return (
        <Paper elevation={3} className="paper">
    <div className="formParent">
    <form className="formReg" >

        <h1>JOBS <br/><br/> ENTER YOUR DETAILS</h1>
      <Input placeholder="Name" inputProps={{ 'aria-label': 'description' }} value={name}
      onChange={(e)=>{setName(e.target.value);}}/>
      <Input placeholder="Email" inputProps={{ 'aria-label': 'description' }} value={email} 
      onChange={(e)=>{setEmail(e.target.value);}}/>
      <Input placeholder="Phone" inputProps={{ 'aria-label': 'description' }} value={phone}
      onChange={(e)=>{setPhone(e.target.value);}}/>
      <Input placeholder="Questions" inputProps={{ 'aria-label': 'description' }} value={questions}
      onChange={(e)=>{setQuestions(e.target.value);}}/>
       <Input placeholder="Upload Resume Image" inputProps={{ 'aria-label': 'description' }} value={resume}
      onChange={(e)=>{setResume(e.target.value);}}/>
       <form onSubmit={handleFireBaseUpload}>
                <input type="file" onChange={handleImageAsFile}/>
                <br/>
                <button>upload</button>
            </form>
      <br/>
      <Input placeholder="Describe yourself in 100 words" inputProps={{ 'aria-label': 'description' }} value={about}
      onChange={(e)=>{setAbout(e.target.value);}}/>
      <br/>
      <Button variant="contained" color="primary" onClick={submit}>
        Save
      </Button>
     </form>
</div>
</Paper>
    )
}

export default JobsForm
