import React,{useState,useEffect} from 'react'
import "./business.css"
import { useStateValue } from "../StateProvider";
import {useHistory} from 'react-router-dom';
import ProjectCard from "../components/ProjectCard";
import Button from '@material-ui/core/Button';
import ArrowBackIcon from '@material-ui/icons/ArrowBack';
import JobCard from "../components/JobCard";
import EventCard from "../components/EventCard"
import ProductCard from "../components/ProductCard"
import ServiceCard from "../components/ServiceCard"
import firebase from "firebase"
import { db } from "../firebase";
import Skateboarding from "../Data/Skateboarding.gif"
import FacebookIcon from '@material-ui/icons/Facebook';
import LinkedInIcon from '@material-ui/icons/LinkedIn';
import EmailIcon from '@material-ui/icons/Email';
import Map  from "../components/Map"
import Modal from '@material-ui/core/Modal';
import TextField from '@material-ui/core/TextField';
import { makeStyles } from '@material-ui/core/styles';
import LanguageIcon from '@material-ui/icons/Language';
import TwitterIcon from '@material-ui/icons/Twitter';

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
  
  

function Business() {
    
    const history = useHistory()
  //redux
  const [{ single }] = useStateValue();
  const[data,setData]= useState([])
  const[projects,setProjects]= useState([])
  const[jobs,setJobs]= useState([])
  const[events,setEvents]= useState([])
  const[products,setProducts]= useState([])
  const[services,setServices]= useState([])
  const [loading,setLoading]= useState(false)
  const[location,setLocation]=useState([])

  //message state
  const[name,setName]= useState("")
  const[email,setEmail]= useState("")
  const[message,setMessage]= useState("")

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

  

  useEffect(()=>{
    setLoading(true)
    db.collection("search").where("username", "==", single)
    .onSnapshot((querySnapshot) => {
       
     setData(querySnapshot.docs.map((doc)=>doc.data()))
     setLoading(false)
       
})
},[single])

useEffect(()=>{
    
    db.collection("project").where("projectemail", "==", single)
    .onSnapshot((querySnapshot) => {
       
     setProjects(querySnapshot.docs.map((doc)=>doc.data()))
     console.log(querySnapshot.docs.map((doc)=>doc.data()))
       
})
},[single])

useEffect(()=>{
    
    db.collection("job").where("jobemail", "==", single)
    .onSnapshot((querySnapshot) => {
       
     setJobs(querySnapshot.docs.map((doc)=>doc.data()))
       
})
},[single])

useEffect(()=>{
    
    db.collection("event").where("eventemail", "==", single)
    .onSnapshot((querySnapshot) => {
       
     setEvents(querySnapshot.docs.map((doc)=>doc.data()))
       
})
},[single])

useEffect(()=>{
    
    db.collection("product").where("productemail", "==", single)
    .onSnapshot((querySnapshot) => {
       
     setProducts(querySnapshot.docs.map((doc)=>doc.data()))
       
})
},[single])

useEffect(()=>{
    
    db.collection("service").where("serviceemail", "==", single)
    .onSnapshot((querySnapshot) => {
       
     setServices(querySnapshot.docs.map((doc)=>doc.data()))
       
})
},[single])

useEffect(()=>{
    
    db.collection("location").where("username", "==", single)
    .onSnapshot((querySnapshot) => {
       
     setLocation(querySnapshot.docs.map((doc)=>doc.data()))
       
})
},[single])

const handle=()=>{
    history.push("/search")
}

//sending message

const create =()=>{
    db.collection("messages").add({ 
        to:single,
        name: name,
        email:email,
        message:message,
        timestamp:firebase.firestore.FieldValue.serverTimestamp()
      });
      alert("Sent Successfully")
      setOpen(false);
}

//modal body
const body = (
    <div style={modalStyle} className={classes.paper}>
       <form className={classes.root} noValidate autoComplete="off">
        <TextField id="standard-basic" label="Name" value={name} onChange={e => {
          setName(e.target.value);
        }} /><br/>
        <TextField id="standard-basic" label="Email" value={email} onChange={e => {
          setEmail(e.target.value);
        }} /><br/>
        <TextField id="standard-basic" label="Message" value={message} onChange={e => {
          setMessage(e.target.value);
        }} /><br/>
        
        <div className="modalbtn">
      <Button variant="contained" color="primary" onClick={create}>
        Send
      </Button>
      </div>
    </form>
    </div>
  );
  
    return (
        <div className="bsContainer">
            <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="simple-modal-title"
        aria-describedby="simple-modal-description"
      >
        {body}
      </Modal>
            <ArrowBackIcon onClick={handle}/>
           
            {
                loading?(
                <>
                <img src={Skateboarding} alt=""/>
                </>)
                :
                (<>
                
                {
                data.map((p) => (
                        <>
 <div className="bs-icons">
            <div className="bs-a">
            <a href={p.url} target="_blank" rel="noopener noreferrer"><LanguageIcon/></a>
              </div>
              <a href={p.facebook} target="_blank" rel="noopener noreferrer"><FacebookIcon/></a>
              <a href={p.linkedin} target="_blank" rel="noopener noreferrer"><LinkedInIcon/></a>
              <a href={p.twitter} target="_blank" rel="noopener noreferrer"><TwitterIcon/></a>
              <Button onClick={handleOpen}><EmailIcon/></Button>
          </div>
          <h1>{p.name}</h1>
          
           <div className="bsimageContainer">
               <div className="left-image">
                   <img src={p.image} alt=""/>
                   </div>
               <div className="right-image">
                   <img src={p.image2}  alt=""/>
                   <img src={p.image3}  alt=""/>
                    </div>
             </div>

             <div className="bsdescContainer">
               <div className="left-desc">
                   <h2>About us</h2>
                   <p>{p.summary}</p>
                   <h2>What do we do?</h2>
                   <p>{p.description}</p>
                  
               </div>
            </div>


                        </>
))}
                
                
                </>)
            }
            
             
    
    {/*projects */}
    {
        projects?(
            <>
        {
            projects.map(m=>(

                <div className="businessProjects">
                <h1>Projects</h1>
                <ProjectCard name={m.projectname} image={m.projectimage} summary={m.projectsummary} desc={m.projectdesc} start={m.projectstart} finish={m.projectfinish} username={single}/>
                
                 </div>
                  ))
        }
        </>
        
        ):
        (
            <>
            <h1>No Projects available</h1>
            </>
        )
    }
    
    {/*jobs */}
    
    {
        jobs?(
            <>
        {
            jobs.map(m=>(

                <div className="businessJobs">
                <h1>Jobs</h1>
                <JobCard name={m.jobname} username={single} desc={m.jobdesc}  location={m.jobAddress} salary={m.eventsalary}/>
                
                 </div>
                  ))
        }
        </>
        
        ):
        (
            <>
            <h1>No Jobs available</h1>
            </>
        )
    }

    {/*events */}
    

    {
        events?(
            <>
        {
            events.map(m=>(

                <div className="businessEvents">
                <h1>Events</h1>
                <EventCard name={m.eventname} username={single} summary={m.eventsummary} desc={m.eventdesc}  image={m.eventimage} start={m.eventstart} finish={m.eventfinish} needed={m.eventneeded} bring={m.eventbring} lat={m.lat} long={m.long}/>
                
                 </div>
                  ))
        }
        </>
        
        ):
        (
            <>
            <h1>No Events available</h1>
            </>
        )
    }

{/*product */}
{
        products?(
            <>
        {
            products.map(m=>(

                <div className="businessProduct">
                <h1>Products</h1>
                <ProductCard name={m.productname}  summary={m.productsummary}  image={m.productimage} price={m.productprice}/>
                
                 </div>
                  ))
        }
        </>
        
        ):
        (
            <>
            <h1>No Products available</h1>
            </>
        )
    }


     {/*ServiceCard */}
     {
        services?(
            <>
        {
            services.map(m=>(

                <div className="businessServices">
                <h1>Services</h1>
                <ServiceCard name={m.servicename} username={single} summary={m.servicesummary}  image={m.serviceimage} desc={m.servicedesc} />
                
                 </div>
                  ))
        }
        </>
        
        ):
        (
            <>
            <h1>No Services available</h1>
            </>
        )
    }
<div className="Business-map">
{
            location.map(m=>(
                <Map lat={JSON.parse(m.lat)} long={JSON.parse(m.long)}/>
            ))
}

</div>
        

        </div>
    )
}

export default Business
