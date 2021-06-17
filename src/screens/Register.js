import React,{useState,useEffect} from 'react'
import {db,storage,auth} from "../firebase"
import firebase from "firebase"
import "./register.css"
import { useStateValue } from "../StateProvider";
import Input from '@material-ui/core/Input';
import Paper from '@material-ui/core/Paper';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import MenuItem from '@material-ui/core/MenuItem';
import focus from "../Data/focus"
import structure from "../Data/structure"
import looking from "../Data/looking"
import location from "../Data/location"
import provides from "../Data/provides"
import services from "../Data/services"
import events from "../Data/events"
import projects from "../Data/projects"
import products from "../Data/product"
import job from "../Data/job"
import Modal from '@material-ui/core/Modal';
import { makeStyles } from '@material-ui/core/styles';
import ReactMapGL from "react-map-gl";



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
    width: 400,
    backgroundColor: theme.palette.background.paper,
    border: '2px solid #000',
    boxShadow: theme.shadows[5],
    padding: theme.spacing(2, 4, 3),
  },
}));



function Register() {


  //getting user from firebase and putting user into state
const [ dispatch] = useStateValue();
const[authEmail,setAuthEmail]=useState("")

  useEffect(() => {
    // will only run once when the app component loads...

    auth.onAuthStateChanged((authUser) => {
      console.log("THE USER IS >>> ", authUser);

      if (authUser) {
        // the user just logged in / the user was logged in

        dispatch({
          type: "SET_USER",
          user: authUser,
        });
        setAuthEmail(authUser.email)
      } else {
        // the user is logged out
        dispatch({
          type: "SET_USER",
          user: null,
        });
      }
    });
  }, [dispatch]);





  //Search page state
  const [name, setName] = React.useState("");
  const [email, setEmail] = React.useState("");
  const [summary, setSummary] = React.useState("");
  const [description, setDescription] = React.useState("");
  const [facebook, setFacebook] = React.useState("");
  const [linkedin, setLinkedin] = React.useState("");
  const [twitter, setTwitter] = React.useState("");
  const [url, setUrl] = React.useState("");
  const [image, setImage] = React.useState("");
  const [image2, setImage2] = React.useState("");
  const [image3, setImage3] = React.useState("");
  //filter state
  const [focus1, setFocus1] = React.useState('aqautic');
  const [structure1, setStructure1] = React.useState('full volunteer');
  const [looking1, setLooking1] = React.useState('volunteers');
  const [location1, setLocation1] = React.useState('single');
  const [provides1, setProvides1] = React.useState('people');
  const [services1, setServices1] = React.useState('home services');
  const [events1, setEvents1] = React.useState('free');
  const [projects1, setProjects1] = React.useState('research');

  //location state
  const [title, setTitle] = React.useState("");
  const [lat, setLat] = React.useState("");
  const [long, setLong] = React.useState("");
  const [phoneNumber, setPhoneNumber] = React.useState("");

  //project state
  const [projectName, setProjectName] = React.useState("");
  const [bssName, setBssName] = React.useState("");
  const [projectCategory, setProjectCategory] = React.useState('research');
  const [projectSummary, setProjectSummary] = React.useState("");
  const [projectDesc, setProjectDesc] = React.useState("");
  const [projectImage, setProjectImage] = React.useState("");
  const [projectEmail, setProjectEmail] = React.useState("");
  const [projectStart, setProjectStart] = React.useState("");
  const [projectFinish, setProjectFinish] = React.useState("");
  const [projectlooking, setProjectlooking] = React.useState("");
  const [projectAddress, setProjectAddress] = React.useState("");

  //service state
  const [serviceName, setServiceName] = React.useState("");
  const [serviceCategory, setServiceCategory] = React.useState('home services');
  const [serviceSummary, setServiceSummary] = React.useState("");
  const [serviceDesc, setServiceDesc] = React.useState("");
  const [serviceImage, setServiceImage] = React.useState("");
  const [serviceEmail, setServiceEmail] = React.useState("");
  const [serviceAddress, setServiceAddress] = React.useState("");

  //product state
  const [productName, setProductName] = React.useState("");
  const [productCategory, setProductCategory] = React.useState('health');
  const [productSummary, setProductSummary] = React.useState("");
  const [productDesc, setProductDesc] = React.useState("");
  const [productImage, setProductImage] = React.useState("");
  const [productEmail, setProductEmail] = React.useState("");
  const [productAddress, setProductAddress] = React.useState("");
  const [productPrice, setProductPrice] = React.useState("");

//event state
const [eventName, setEventName] = React.useState("");
const[bsnamed,setBsnamed]=React.useState("");
const [eventCategory, setEventCategory] = React.useState('free');
const [eventSummary, setEventSummary] = React.useState("");
const [eventDesc, setEventDesc] = React.useState("");
const [eventImage, setEventImage] = React.useState("");
const [eventEmail, setEventEmail] = React.useState("");
const [eventStart, setEventStart] = React.useState("");
const [eventFinish, setEventFinish] = React.useState("");
const [eventAddress, setEventAddress] = React.useState("");
const [eventBring, setEventBring] = React.useState("");
const [eventNeeded, setEventNeeded] = React.useState("");
const [eventLat, setEventLat] = React.useState("");
const [eventLong, setEventLong] = React.useState("");


//job state
const [jobName, setJobName] = React.useState("");
const [jobCategory, setJobCategory] = React.useState('paid position');
const [jobDesc, setJobDesc] = React.useState("");
const [jobEmail, setJobEmail] = React.useState("");
const [jobStart, setJobStart] = React.useState("");
const [jobAddress, setJobAddress] = React.useState("");
const [jobSalary, setJobSalary] = React.useState("");

//image state
//const allInputs={imgUrl:''}
const[imageAsFile,setImageAsFile]= useState("")
//const[imageAsUrl,setImageAsUrl]= useState(allInputs)


  console.log(authEmail)

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

//const [currentPlaceId, setCurrentPlaceId] = React.useState(null);
  const [viewport, setViewport] = React.useState({
    latitude: 40.730610,
    longitude: -73.935242,
    zoom: 4,
    width:400,
    height:400
  });

  /*const handleMarkerClick = (id, lat, long) => {
    setCurrentPlaceId(id);
    setViewport({ ...viewport, latitude: JSON.parse(lat), longitude: JSON.parse(long) });
  };*/

  //function for submitting filters and search page info

  const submit =(e)=>{
    e.preventDefault()
    db.collection("search").add({
      name:name,
      username:authEmail,
      summary:summary,
      description:description,
      facebook:facebook,
      linkedin:linkedin,
      image:image,
      image2:image2,
      image3:image3,
      focus:focus1,
      structure:structure1,
      looking:looking1,
      location:location1,
      provides:provides1,
      service:services1,
      events:events1,
      project:projects1,
      city:title,
      url:url,
      twitter:twitter,
      timestamp:firebase.firestore.FieldValue.serverTimestamp()
      
  })
  db.collection("location").add({
    name:name,
    username:authEmail,
    desc:summary,
    image:image,
    title:title,
    lat:lat,
    long:long,
    _id:phoneNumber,
    timestamp:firebase.firestore.FieldValue.serverTimestamp()
    
})
  alert("saved successfully")
  }

  //function for submitting projects

  const submitProject=()=>{
    db.collection("project").add({
      projectname:projectName,
      bsName:bssName,
      projectcategory:projectCategory,
      projectsummary:projectSummary,
      projectdesc:projectDesc,
      projectimage:projectImage,
      projectemail:authEmail,
      projectstart:projectStart,
      projectfinish:projectFinish,
      projectlooking:projectlooking,
      projectAddress:projectAddress,
      timestamp:firebase.firestore.FieldValue.serverTimestamp()
      
  })
  alert("project saved")
  }

  //

  //function for submitting services

  const submitService=()=>{
    db.collection("service").add({
      servicename:serviceName,
      servicecategory:serviceCategory,
      servicesummary:serviceSummary,
      servicedesc:serviceDesc,
      serviceimage:serviceImage,
      serviceemail:authEmail,
      serviceaddress:serviceAddress,
      timestamp:firebase.firestore.FieldValue.serverTimestamp()
      
  })
  alert("service saved")
  }

  //function for submitting services

  const submitProduct=()=>{
    db.collection("product").add({
      productname:productName,
      productcategory:productCategory,
      productsummary:productSummary,
      productdesc:productDesc,
      productimage:productImage,
      productemail:authEmail,
      productaddress:productAddress,
      productprice:productPrice,
      timestamp:firebase.firestore.FieldValue.serverTimestamp()
      
  })
  alert("product saved")
  }

  //function for submitting event

  const submitEvent=()=>{
    db.collection("event").add({
      eventname:eventName,
      bsname:bsnamed,
      eventcategory:eventCategory,
      eventsummary:eventSummary,
      eventdesc:eventDesc,
      eventimage:eventImage,
      eventemail:authEmail,
      eventstart:eventStart,
      eventfinish:eventFinish,
      eventAddress:eventAddress,
      eventneeded:eventNeeded,
      eventbring:eventBring,
      lat:eventLat,
      long:eventLong,
      timestamp:firebase.firestore.FieldValue.serverTimestamp()
  })
  alert("event saved")
  }

  //function for submitting job

  const submitJob=()=>{
    db.collection("job").add({
      jobname:jobName,
      jobcategory:jobCategory,
      jobdesc:jobDesc,
      jobemail:authEmail,
      jobstart:jobStart,
      eventsalary:jobSalary,
      jobAddress:jobAddress,
      timestamp:firebase.firestore.FieldValue.serverTimestamp()
  })
  alert("job saved")
  }

const map=(evt)=>{
  setLat(evt.lngLat[1]);
  setLong(evt.lngLat[0]);
  setEventLat(evt.lngLat[1])
  setEventLong(evt.lngLat[0])
  setOpen(false);
}
//modal body
const body = (
  <div style={modalStyle} className={classes.paper}>
     <ReactMapGL
      {...viewport}
      mapboxApiAccessToken={"pk.eyJ1IjoiZG91Z2xhc21hcmluZ2EiLCJhIjoiY2twYzZid2kzMWF1eDJ1cDc1dmo0NmswdCJ9.AWID9iqWzNnDlKJI-vH90Q"}
     
      onViewportChange={(viewport) => setViewport(viewport)}
      onClick={map}
      
      >
      </ReactMapGL>
  </div>
);


//image 1
const handleImageAsFile=(e)=>{
  const image = e.target.files[0]
  setImageAsFile(imageFile=>(image))
}

const handleFireBaseUpload=e=>{
  e.preventDefault()
  console.log('start of upload')
  setImage("uploading")
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
          
          setImage(firebaseUrl)
          //setImageAsUrl(prevObject=>({prevObject,imgUrl:firebaseUrl}))
      })
  })
}


//second image
const handleFireBaseUpload2=e=>{
  e.preventDefault()
  console.log('start of upload')
  setImage2("uploading")
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
          
          setImage2(firebaseUrl)
         // setImageAsUrl(prevObject=>({prevObject,imgUrl:firebaseUrl}))
      })
  })
}

//third image
const handleFireBaseUpload3=e=>{
  e.preventDefault()
  console.log('start of upload')
  setImage3("uploading")
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
          
          setImage3(firebaseUrl)
          //setImageAsUrl(prevObject=>({prevObject,imgUrl:firebaseUrl}))
      })
  })
}

//project image
const handleFireBaseUpload4=e=>{
  e.preventDefault()
  console.log('start of upload')
  setProjectImage("uploading")
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
          
        setProjectImage(firebaseUrl)
         // setImageAsUrl(prevObject=>({prevObject,imgUrl:firebaseUrl}))
      })
  })
}

//service image
const handleFireBaseUpload5=e=>{
  e.preventDefault()
  console.log('start of upload')
  setServiceImage("uploading")
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
          
        setServiceImage(firebaseUrl)
          //setImageAsUrl(prevObject=>({prevObject,imgUrl:firebaseUrl}))
      })
  })
}

//product image
const handleFireBaseUpload6=e=>{
  e.preventDefault()
  console.log('start of upload')
  setProductImage("uploading")
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
          
        setProductImage(firebaseUrl)
          //setImageAsUrl(prevObject=>({prevObject,imgUrl:firebaseUrl}))
      })
  })
}

//event image
const handleFireBaseUpload7=e=>{
  e.preventDefault()
  console.log('start of upload')
  setEventImage("uploading")
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
          
        setEventImage(firebaseUrl)
          //setImageAsUrl(prevObject=>({prevObject,imgUrl:firebaseUrl}))
      })
  })
}
  return (
    <div>
     <Paper elevation={3} className="paper">
       <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="simple-modal-title"
        aria-describedby="simple-modal-description"
      >
        {body}
      </Modal>
      
    <div className="formParent">
    <form className="formReg" >



      <div className="business">
        <h1>Basic Information</h1>
      <Input placeholder="Organisation Name" inputProps={{ 'aria-label': 'description' }} value={name}
      onChange={(e)=>{setName(e.target.value);}}/>
      <Input placeholder="Organisation Email" inputProps={{ 'aria-label': 'description' }} value={email} 
      onChange={(e)=>{setEmail(e.target.value);}}/>
       <Input placeholder="Url (web address)" inputProps={{ 'aria-label': 'description' }} value={url} 
      onChange={(e)=>{setUrl(e.target.value);}}/>
       <Input placeholder="Facebook url" inputProps={{ 'aria-label': 'description' }} value={facebook} 
      onChange={(e)=>{setFacebook(e.target.value);}}/>
      <Input placeholder="Linkedin url" inputProps={{ 'aria-label': 'description' }} value={linkedin} 
      onChange={(e)=>{setLinkedin(e.target.value);}}/>
      <Input placeholder="Twitter" inputProps={{ 'aria-label': 'description' }} value={twitter} 
      onChange={(e)=>{setTwitter(e.target.value);}}/>
      <Input placeholder="Organisational Summary" inputProps={{ 'aria-label': 'description' }} value={summary}
      onChange={(e)=>{setSummary(e.target.value);}}/>
      <Input placeholder="Description" inputProps={{ 'aria-label': 'description' }} value={description}
      onChange={(e)=>{setDescription(e.target.value);}}/>
     <Input placeholder="Main Image" inputProps={{ 'aria-label': 'description' }} value={image} 
      onChange={(e)=>{setImage(e.target.value);}}/>
      <form onSubmit={handleFireBaseUpload}>
                <input type="file" onChange={handleImageAsFile}/>
                <button>upload</button>
            </form>
       <Input placeholder="Logo" inputProps={{ 'aria-label': 'description' }} value={image2} 
      onChange={(e)=>{setImage2(e.target.value);}}/>
      <form onSubmit={handleFireBaseUpload2}>
                <input type="file" onChange={handleImageAsFile}/>
                <button>upload</button>
            </form>
       <Input placeholder="Third Image" inputProps={{ 'aria-label': 'description' }} value={image3} 
      onChange={(e)=>{setImage3(e.target.value);}}/>
      <form onSubmit={handleFireBaseUpload3}>
                <input type="file" onChange={handleImageAsFile}/>
                <button>upload</button>
            </form>
      <br/>
      <label>Bank account name</label>
      <br/>
      <label>Bsb</label>
      <br/>
      <label>Account number</label>
      <br/>
      <label>Bpay ID#</label>
      <br/>
      </div>


      <div className="business">
        <h1>Location</h1>
      <Input placeholder="District" inputProps={{ 'aria-label': 'description' }} value={title} onChange={(e)=>{setTitle(e.target.value)}} />
      <br/>
      <Button variant="contained" color="primary" onClick={handleOpen}>
        Location
      </Button>
      <Input placeholder="Latitude" inputProps={{ 'aria-label': 'description' }} value={lat} onChange={(e)=>{setLat(e.target.value)}}/>
      <Input placeholder="Longitude" inputProps={{ 'aria-label': 'description' }}value={long} onChange={(e)=>{setLong(e.target.value)}} />
      <Input placeholder="Contact Number" inputProps={{ 'aria-label': 'description' }}value={phoneNumber} onChange={(e)=>{setPhoneNumber(e.target.value)}}/>
      <br/>
      </div>


      <div className="business">
        <h1>Filters</h1>

        <TextField
          id="standard-select-currency"
          select
          value={focus1}
          onChange={(e)=>{setFocus1(e.target.value);}}
          helperText="Please select your organisation focus"
        >
          {focus.map((option) => (
            <MenuItem key={option.value} value={option.value}>
              {option.label}
            </MenuItem>
          ))}
        </TextField>

        <TextField
          id="standard-select-currency"
          select
          value={structure1}
          onChange={(e)=>{setStructure1(e.target.value);}}
          helperText="Please select your organisation structure"
        >
          {structure.map((option) => (
            <MenuItem key={option.value} value={option.value}>
              {option.label}
            </MenuItem>
          ))}
        </TextField>

        <TextField
          id="standard-select-currency"
          select
          value={looking1}
          onChange={(e)=>{setLooking1(e.target.value);}}
          helperText="What is your org looking for?"
        >
          {looking.map((option) => (
            <MenuItem key={option.value} value={option.value}>
              {option.label}
            </MenuItem>
          ))}
        </TextField>
<br/>
        <TextField
          id="standard-select-currency"
          select
          value={location1}
          onChange={(e)=>{setLocation1(e.target.value);}}
          helperText="Location Type"
        >
          {location.map((option) => (
            <MenuItem key={option.value} value={option.value}>
              {option.label}
            </MenuItem>
          ))}
        </TextField>
<br/>
        <TextField
          id="standard-select-currency"
          select
          value={provides1}
          onChange={(e)=>{setProvides1(e.target.value);}}
          helperText="What do you Provide?"
        >
          {provides.map((option) => (
            <MenuItem key={option.value} value={option.value}>
              {option.label}
            </MenuItem>
          ))}
        </TextField>
<br/>
        <TextField
          id="standard-select-currency"
          select
          value={services1}
          onChange={(e)=>{setServices1(e.target.value);}}
          helperText="What services do you provide?"
        >
          {services.map((option) => (
            <MenuItem key={option.value} value={option.value}>
              {option.label}
            </MenuItem>
          ))}
        </TextField>
<br/>
        <TextField
          id="standard-select-currency"
          select
          value={events1}
          onChange={(e)=>{setEvents1(e.target.value);}}
          helperText="Events and Experiences"
        >
          {events.map((option) => (
            <MenuItem key={option.value} value={option.value}>
              {option.label}
            </MenuItem>
          ))}
        </TextField>
            <br/>
        <TextField
          id="standard-select-currency"
          select
          value={projects1}
          onChange={(e)=>{setProjects1(e.target.value);}}
          helperText="Types of Projects"
        >
          {projects.map((option) => (
            <MenuItem key={option.value} value={option.value}>
              {option.label}
            </MenuItem>
          ))}
        </TextField>
        
      <br/>
      <Button variant="contained" color="primary" onClick={submit}>
        Save
      </Button>
      </div>




      <div className="business">
        <h1>Project Information</h1>
      <Input placeholder="Project Name" inputProps={{ 'aria-label': 'description' }} value={projectName}
      onChange={(e)=>{setProjectName(e.target.value);}}/>
       <Input placeholder="Business Name" inputProps={{ 'aria-label': 'description' }} value={bssName}
      onChange={(e)=>{setBssName(e.target.value);}}/>
      <TextField
          id="standard-select-currency"
          select
          value={projectCategory}
          onChange={(e)=>{setProjectCategory(e.target.value);}}
          helperText="Select project category"
        >
          {projects.map((option) => (
            <MenuItem key={option.value} value={option.value}>
              {option.label}
            </MenuItem>
          ))}
        </TextField>
      <Input placeholder="Project Summary" inputProps={{ 'aria-label': 'description' }} value={projectSummary} 
      onChange={(e)=>{setProjectSummary(e.target.value);}}/>
      <Input placeholder="Project Description" inputProps={{ 'aria-label': 'description' }} value={projectDesc}
      onChange={(e)=>{setProjectDesc(e.target.value);}}/>
      <Input placeholder="Contact Email" inputProps={{ 'aria-label': 'description' }} value={projectEmail}
      onChange={(e)=>{setProjectEmail(e.target.value);}}/>
      <br/>
       <TextField id="date" label="Start Date" type="date" value={projectStart} onChange={(e)=>{setProjectStart(e.target.value);}}
        className={classes.textField}InputLabelProps={{shrink: true,}}/>
      <br/>
      <TextField id="date" label="Finish Date" type="date" value={projectFinish} onChange={(e)=>{setProjectFinish(e.target.value);}}
        className={classes.textField}InputLabelProps={{shrink: true,}}/>
      <Input placeholder="Project Image" inputProps={{ 'aria-label': 'description' }} value={projectImage}
      onChange={(e)=>{setProjectImage(e.target.value);}}/>
      <form onSubmit={handleFireBaseUpload4}>
                <input type="file" onChange={handleImageAsFile}/>
                <button>upload</button>
            </form>
       <Input placeholder="What are you Looking for?" inputProps={{ 'aria-label': 'description' }} value={projectlooking}
      onChange={(e)=>{setProjectlooking(e.target.value);}}/>
       <Input placeholder="Project Address" inputProps={{ 'aria-label': 'description' }} value={projectAddress}
      onChange={(e)=>{setProjectAddress(e.target.value);}}/>

<Button variant="contained" color="primary" onClick={submitProject}>
        Save 
      </Button>
      
      </div>


      <div className="business">
        <h1>Service Information</h1>
      <Input placeholder="Service Name" inputProps={{ 'aria-label': 'description' }} value={serviceName}
      onChange={(e)=>{setServiceName(e.target.value);}}/>
      <TextField
          id="standard-select-currency"
          select
          value={serviceCategory}
          onChange={(e)=>{setServiceCategory(e.target.value);}}
          helperText="Select service category"
        >
          {services.map((option) => (
            <MenuItem key={option.value} value={option.value}>
              {option.label}
            </MenuItem>
          ))}
        </TextField>
      <Input placeholder="Service Summary" inputProps={{ 'aria-label': 'description' }} value={serviceSummary} 
      onChange={(e)=>{setServiceSummary(e.target.value);}}/>
      <Input placeholder="Service Description" inputProps={{ 'aria-label': 'description' }} value={serviceDesc}
      onChange={(e)=>{setServiceDesc(e.target.value);}}/>
      <Input placeholder="Contact Email" inputProps={{ 'aria-label': 'description' }} value={serviceEmail}
      onChange={(e)=>{setServiceEmail(e.target.value);}}/>
      <Input placeholder="Service Image" inputProps={{ 'aria-label': 'description' }} value={serviceImage}
      onChange={(e)=>{setServiceImage(e.target.value);}}/>
      <form onSubmit={handleFireBaseUpload5}>
                <input type="file" onChange={handleImageAsFile}/>
                <button>upload</button>
            </form>
       <Input placeholder="Service Address" inputProps={{ 'aria-label': 'description' }} value={serviceAddress}
      onChange={(e)=>{setServiceAddress(e.target.value);}}/>

<Button variant="contained" color="primary" onClick={submitService}>
        Save 
      </Button>
      
      </div>



      <div className="business">
        <h1>Product Information</h1>
      <Input placeholder="Product Name" inputProps={{ 'aria-label': 'description' }} value={productName}
      onChange={(e)=>{setProductName(e.target.value);}}/>
      <TextField
          id="standard-select-currency"
          select
          value={productCategory}
          onChange={(e)=>{setProductCategory(e.target.value);}}
          helperText="Select Product category"
        >
          {products.map((option) => (
            <MenuItem key={option.value} value={option.value}>
              {option.label}
            </MenuItem>
          ))}
        </TextField>
      <Input placeholder="Product Summary" inputProps={{ 'aria-label': 'description' }} value={productSummary} 
      onChange={(e)=>{setProductSummary(e.target.value);}}/>
      <Input placeholder="Product Description" inputProps={{ 'aria-label': 'description' }} value={productDesc}
      onChange={(e)=>{setProductDesc(e.target.value);}}/>
      <Input placeholder="Contact Email" inputProps={{ 'aria-label': 'description' }} value={productEmail}
      onChange={(e)=>{setProductEmail(e.target.value);}}/>
      <Input placeholder="Product Image" inputProps={{ 'aria-label': 'description' }} value={productImage}
      onChange={(e)=>{setProductImage(e.target.value);}}/>
       <form onSubmit={handleFireBaseUpload6}>
                <input type="file" onChange={handleImageAsFile}/>
                <button>upload</button>
            </form>
       <Input placeholder="Product Address" inputProps={{ 'aria-label': 'description' }} value={productAddress}
      onChange={(e)=>{setProductAddress(e.target.value);}}/>
       <Input placeholder="Product Price" inputProps={{ 'aria-label': 'description' }} value={productPrice}
      onChange={(e)=>{setProductPrice(e.target.value);}}/>


<Button variant="contained" color="primary" onClick={submitProduct}>
        Save 
      </Button>
      
      </div>



      <div className="business">
        <h1>Event Information</h1>
      <Input placeholder="Event Name" inputProps={{ 'aria-label': 'description' }} value={eventName}
      onChange={(e)=>{setEventName(e.target.value);}}/>
      <br/>
      <Input placeholder="Business Name" inputProps={{ 'aria-label': 'description' }} value={bsnamed}
      onChange={(e)=>{setBsnamed(e.target.value);}}/>
      <br/>
      <TextField
          id="standard-select-currency"
          select
          value={eventCategory}
          onChange={(e)=>{setEventCategory(e.target.value);}}
          helperText="Select project category"
        >
          {events.map((option) => (
            <MenuItem key={option.value} value={option.value}>
              {option.label}
            </MenuItem>
          ))}
        </TextField>
      <Input placeholder="Event Summary" inputProps={{ 'aria-label': 'description' }} value={eventSummary} 
      onChange={(e)=>{setEventSummary(e.target.value);}}/>
      <Input placeholder="Event Description" inputProps={{ 'aria-label': 'description' }} value={eventDesc}
      onChange={(e)=>{setEventDesc(e.target.value);}}/>
      <Input placeholder="Contact Email" inputProps={{ 'aria-label': 'description' }} value={eventEmail}
      onChange={(e)=>{setEventEmail(e.target.value);}}/>
      <TextField id="date" label="Start Date" type="date" value={eventStart} onChange={(e)=>{setEventStart(e.target.value);}}
        className={classes.textField}InputLabelProps={{shrink: true,}}/>
      <TextField id="date" label="Finish Date" type="date" value={eventFinish} onChange={(e)=>{setEventFinish(e.target.value);}}
        className={classes.textField}InputLabelProps={{shrink: true,}}/>
      <Input placeholder="Event Image" inputProps={{ 'aria-label': 'description' }} value={eventImage}
      onChange={(e)=>{setEventImage(e.target.value);}}/>
      <form onSubmit={handleFireBaseUpload7}>
                <input type="file" onChange={handleImageAsFile}/>
                <button>upload</button>
            </form>
       <Input placeholder="Event Address" inputProps={{ 'aria-label': 'description' }} value={eventAddress}
      onChange={(e)=>{setEventAddress(e.target.value);}}/>
      <Input placeholder="What to bring" inputProps={{ 'aria-label': 'description' }} value={eventBring}
      onChange={(e)=>{setEventBring(e.target.value);}}/>
      <Input placeholder="Whats needed" inputProps={{ 'aria-label': 'description' }} value={eventNeeded}
      onChange={(e)=>{setEventNeeded(e.target.value);}}/>
       <Button variant="contained" color="primary" onClick={handleOpen}>
        Location
      </Button>
      <Input placeholder="Latitude" inputProps={{ 'aria-label': 'description' }} value={eventLat}
      onChange={(e)=>{setEventLat(e.target.value);}}/>
      <Input placeholder="Longitude" inputProps={{ 'aria-label': 'description' }} value={eventLong}
      onChange={(e)=>{setEventLong(e.target.value);}}/>

<Button variant="contained" color="primary" onClick={submitEvent}>
        Save 
      </Button>
      
      </div>

      <div className="business">
        <h1>Job Information</h1>
      <Input placeholder="Job Title" inputProps={{ 'aria-label': 'description' }} value={jobName}
      onChange={(e)=>{setJobName(e.target.value);}}/>
      <br/>
      <TextField
          id="standard-select-currency"
          select
          value={jobCategory}
          onChange={(e)=>{setJobCategory(e.target.value);}}
          helperText="Select Job category"
        >
          {job.map((option) => (
            <MenuItem key={option.value} value={option.value}>
              {option.label}
            </MenuItem>
          ))}
        </TextField>
      
      <Input placeholder="Job Description" inputProps={{ 'aria-label': 'description' }} value={jobDesc}
      onChange={(e)=>{setJobDesc(e.target.value);}}/>
      <Input placeholder="Contact Email" inputProps={{ 'aria-label': 'description' }} value={jobEmail}
      onChange={(e)=>{setJobEmail(e.target.value);}}/>
      <TextField id="date" label="Start Date" type="date" value={jobStart} onChange={(e)=>{setJobStart(e.target.value);}}
        className={classes.textField}InputLabelProps={{shrink: true,}}/>
       <Input placeholder="Job Address" inputProps={{ 'aria-label': 'description' }} value={jobAddress}
      onChange={(e)=>{setJobAddress(e.target.value);}}/>
      <Input placeholder="Salary" inputProps={{ 'aria-label': 'description' }} value={jobSalary}
      onChange={(e)=>{setJobSalary(e.target.value);}}/>

<Button variant="contained" color="primary" onClick={submitJob}>
        Save 
      </Button>
      
      </div>


    </form>
    </div>
    </Paper>
    </div>
  );
}

export default Register
