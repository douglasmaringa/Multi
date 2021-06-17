import React,{useState,useEffect} from 'react'
import "./dashboard.css"
import { db,auth } from "../firebase";

function Dashboard({email}) {
const[events,setEvents]=useState([])
const[services,setServices]=useState([])
const[jobs,setJobs]=useState([])
const[projects,setProjects]=useState([])

console.log(email)
    useEffect(()=>{
        auth.onAuthStateChanged((authUser) => {
            console.log("THE USER IS >>> ", authUser);
      
            if (authUser) {
              // the user just logged in / the user was logged in
      
              
              db.collection("EventBookings").where("businessEmail", "==",authUser.email)
        .onSnapshot((querySnapshot) => {
           
         setEvents(querySnapshot.docs.map((doc)=>doc.data()))
         console.log(querySnapshot.docs.map((doc)=>doc.data()))
           
    })
              
            } else {
              // the user is logged out
             console.log("n")
            }
          });
        
    },[])

    useEffect(()=>{
        auth.onAuthStateChanged((authUser) => {
            console.log("THE USER IS >>> ", authUser);
      
            if (authUser) {
              // the user just logged in / the user was logged in
      
              
              db.collection("ServiceBookings").where("businessEmail", "==",authUser.email)
        .onSnapshot((querySnapshot) => {
           
            setServices(querySnapshot.docs.map((doc)=>doc.data()))
         console.log(querySnapshot.docs.map((doc)=>doc.data()))
           
    })
              
            } else {
              // the user is logged out
             console.log("n")
            }
          });
        
    },[])

    useEffect(()=>{
        auth.onAuthStateChanged((authUser) => {
            console.log("THE USER IS >>> ", authUser);
      
            if (authUser) {
              // the user just logged in / the user was logged in
      
              
              db.collection("JobsBookings").where("businessEmail", "==",authUser.email)
        .onSnapshot((querySnapshot) => {
           
            setJobs(querySnapshot.docs.map((doc)=>doc.data()))
         console.log(querySnapshot.docs.map((doc)=>doc.data()))
           
    })
              
            } else {
              // the user is logged out
             console.log("n")
            }
          });
        
    },[])


    useEffect(()=>{
        auth.onAuthStateChanged((authUser) => {
            console.log("THE USER IS >>> ", authUser);
      
            if (authUser) {
              // the user just logged in / the user was logged in
      
              
              db.collection("ProjectBookings").where("businessEmail", "==",authUser.email)
        .onSnapshot((querySnapshot) => {
           
            setProjects(querySnapshot.docs.map((doc)=>doc.data()))
         console.log(querySnapshot.docs.map((doc)=>doc.data()))
           
    })
              
            } else {
              // the user is logged out
             console.log("n")
            }
          });
        
    },[])


    return (
        <div className="dashboard">

            <div className="dashboard1">
                <h1>Events</h1>
                <table id="customers">
  <tr>
    <th>Name</th>
    <th>Email</th>
    <th>Contact</th>
    <th>Arrival Date</th>
    <th>Arrival Time</th>
    <th>Leaving Time</th>
    <th>Leaving Date</th>
    <th>Requests</th>
    <th>Number of people</th>
  </tr>
  {
      events.map(m=>(
<tr>
    <td>{m.name}</td>
    <td>{m.email}</td>
    <td>{m.phone}</td>
    <td>{m.startdate}</td>
    <td>{m.starttime}</td>
    <td>{m.endtime}</td>
    <td>{m.enddate}</td>
    <td>{m.requests}</td>
    <td>{m.people}</td>
  </tr>
      ))
  }
  
  </table>
            </div>

            <div className="dashboard1">
                <h1>Services</h1>
                {
                  services?(<>
                  
                  </>):(<></>)
                }
                <table id="customers">
  <tr>
    <th>Name</th>
    <th>Email</th>
    <th>Contact</th>
    <th>Arrival Date</th>
    <th>Arrival Time</th>
    <th>Leaving Time</th>
    <th>Leaving Date</th>
    <th>Requests</th>
    <th>Questions</th>
  </tr>
  {
      services.map(m=>(
<tr>
    <td>{m.name}</td>
    <td>{m.email}</td>
    <td>{m.phone}</td>
    <td>{m.startdate}</td>
    <td>{m.starttime}</td>
    <td>{m.endtime}</td>
    <td>{m.enddate}</td>
    <td>{m.requests}</td>
    <td>{m.questions}</td>
  </tr>
      ))
  }
  
  </table>
            </div>

            <div className="dashboard1">
                <h1>Jobs</h1>
                <table id="customers">
  <tr>
    <th>Name</th>
    <th>Email</th>
    <th>Contact</th>
    <th>Questions</th>
  </tr>
  {
      jobs.map(m=>(
          <>
<tr>
    <td>{m.name}</td>
    <td>{m.email}</td>
    <td>{m.phone}</td>
    <td>{m.questions}</td>
  </tr>
  <img src={m.resume} alt="i" width="400px" marginLeft="50px"/>
  <p >{m.about}</p>
  </>
      ))
  }
  
  </table>
            </div>

            <div className="dashboard1">
                <h1>Project Bookings</h1>
                <table id="customers">
  <tr>
    <th>Name</th>
    <th>Email</th>
    <th>Contact</th>
    <th>Bringing</th>
    <th>People Coming</th>
    <th>Questions</th>
  </tr>
  {
      projects.map(m=>(
<tr>
    <td>{m.name}</td>
    <td>{m.email}</td>
    <td>{m.phone}</td>
    <td>{m.bringing}</td>
    <td>{m.people}</td>
    <td>{m.questions}</td>
  </tr>
      ))
  }
  
  </table>
            </div>

        </div>
    )
}

export default Dashboard
