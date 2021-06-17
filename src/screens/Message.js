import React,{useState,useEffect} from 'react'
import "./dashboard.css"
import { db,auth } from "../firebase";

function Message() {
const[messages,setMessages]=useState([])



    useEffect(()=>{
        auth.onAuthStateChanged((authUser) => {
            console.log("THE USER IS >>> ", authUser);
      
            if (authUser) {
              // the user just logged in / the user was logged in
      
              
              db.collection("messages").where("to", "==",authUser.email)
        .onSnapshot((querySnapshot) => {
           
         setMessages(querySnapshot.docs.map((doc)=>doc.data()))
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
                <h1>Messages</h1>
                <table id="customers">
  <tr>
    <th>Name</th>
    <th>Email</th>
    <th>Message</th>
    <th>Date Recieved</th>
  </tr>
  {
      messages.map(m=>(
<tr>
    <td>{m.name}</td>
    <td>{m.email}</td>
    <td>{m.message}</td>
    <td>{new Date(m.timestamp.seconds * 1000).toISOString()}</td>
  </tr>
      ))
  }
  
  </table>
            </div>

           

          

           
        </div>
    )
}

export default Message
