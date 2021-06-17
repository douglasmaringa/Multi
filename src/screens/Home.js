import React,{useState,useEffect} from 'react'
import Button from '@material-ui/core/Button';
import HomeCard from "../components/HomeCard"
import Paper from '@material-ui/core/Paper';
import {db} from "../firebase"
import {Link,useHistory} from 'react-router-dom';
import { useStateValue } from "../StateProvider";
import "./home.css"

function Home() {
    
    const [data1,setData1] = useState([]);
    const [data2,setData2] = useState([]);
    const history = useHistory()

  
        
         
       
         useEffect(()=>{
    
            db.collection("event").orderBy('timestamp','desc').limit(3)
            .onSnapshot((querySnapshot) => {
               
                setData1(querySnapshot.docs.map((doc)=>doc.data()))
               
        })
        },[])

        useEffect(()=>{
    
            db.collection("project").orderBy('timestamp','desc').limit(3)
            .onSnapshot((querySnapshot) => {
               
                setData2(querySnapshot.docs.map((doc)=>doc.data()))
               
        })
        },[])

    const go =()=>{
        history.push("/jobregister")
    }

    const go2 =()=>{
        history.push("/bsregister")
    }

    const go3 =()=>{
        alert("Email Us at GGF@gmail.com ")
    }

    const go4 =()=>{
        alert("About page to open when button is clicked")
    }

     //redux
  const [ dispatch] = useStateValue();

  const newScreen = (eventemail,eventname,eventsummary,eventdesc,eventimage,eventstart,eventfinish,eventneeded,eventbring,lat,long) => {
  dispatch({
      type: 'Set_SingleEvent',
      item : {
          name: eventname,
          summary: eventsummary,
          desc: eventdesc,
          image:eventimage,
          start:eventstart,
          finish:eventfinish,
          needed:eventneeded,
          bring:eventbring,
          username:eventemail,
          lat:lat,
          long:long
      },
  })
  history.push('/hometoevent')
};

const newScreen2 = (projectemail,projectname,projectsummary,projectdesc,projectimage,projectstart,projectfinish,projectlooking) => {
    dispatch({
        type: 'Set_SingleProject',
        item : {
            name: projectname,
            summary: projectsummary,
            desc: projectdesc,
            image: projectimage,
            start:projectstart,
            finish:projectfinish,
            username:projectemail
        },
   })
   history.push('/hometoproject')
 };


    return (
        <div className="home-container">
           <div className="home-head">
                <h1>GGF is a company that advertises itself as a best brand for doing things</h1>
                <div className="home-btn">
                <Button size="small" variant="contained" color="primary" onClick={go}>
                   Register Resume for Jobs
                </Button>
                <br/>
                <br/>
                <Button size="small" variant="contained" color="primary" onClick={go2}>
                   Register As Business
                </Button>
                <br/>
                <br/>
                <Button size="small" variant="contained" color="primary" onClick={go3}>
                   Contact GGF
                </Button>
                <br/>
                <br/>
                <Button size="small" variant="contained" color="primary" onClick={go4}>
                   Detailed Information
                </Button>
                </div>
           </div>
           <div className="home-body">
               <h1><Link to="/search">Explore GGF (popular filters)</Link></h1>
               <div className="home-bs">
               
                        <HomeCard name="Events" summary="filter" desc="filter" username="filter" image="https://static7.depositphotos.com/1000998/744/i/950/depositphotos_7447538-stock-photo-on-concert.jpg"/>
                        <HomeCard name="Home" summary="filter" desc="filter" username="filter" image="https://static6.depositphotos.com/1015060/665/i/950/depositphotos_6650985-stock-photo-young-woman-cleaning-kitchen.jpg"/>
                        <HomeCard name="Building" summary="filter" desc="filter" username="filter" image="https://st3.depositphotos.com/9880800/17034/i/1600/depositphotos_170349306-stock-photo-construction-workers-looking-at-building.jpg"/>
                        <HomeCard name="Design" summary="filter" desc="filter" username="filter" image="https://st3.depositphotos.com/10654624/13553/i/1600/depositphotos_135538572-stock-photo-designers-working-at-project.jpg"/>
                        <HomeCard name="Music" summary="filter" desc="filter" username="filter" image="https://st3.depositphotos.com/10638998/15080/i/1600/depositphotos_150807594-stock-photo-electric-guitar-player.jpg"/>
                        <HomeCard name="Training" summary="filter" desc="filter" username="filter" image="https://st2.depositphotos.com/1056393/6779/i/950/depositphotos_67799165-stock-photo-audience-in-the-lecture-hall.jpg"/>
               </div>
               <h1><Link to="/eventsearch">Explore Events</Link></h1>
               <div >
               {data1.map((m,index)=>{
                      return(
                        <div key={index}>
                            <Paper elevation={3} className="eventbody">
                            <div className="event-left">
                            <h1>Date</h1>
                                <h1>{m.eventstart}</h1>
                                <Button size="small" variant="contained" color="primary" onClick={() => newScreen(m.eventemail,m.eventname,m.eventsummary,m.eventdesc,m.eventimage,m.eventstart,m.eventfinish,m.eventneeded,m.eventbring,m.lat,m.long)}>
                     View
      </Button>
                            </div>
                            <div className="event-middle">
                           <h1>{m.eventname}</h1>
                            <p>{m.eventsummary}</p>
                            </div>
                            <div className="event-right">
                            <h1>{m.bsname}</h1>
                            <img src={m.eventimage} alt="i"/>
                            </div>
                            </Paper>
                        </div>
                       
                    )
                    })}
               </div>

               <h1><Link to="/projectsearch">Explore Projects</Link></h1>
               <div >
               {data2.map((m,index)=>{
                      return(
                        <div key={index}>
                            <Paper elevation={3} className="eventbody">
                            <div className="event-right">
                            <h1>{m.bsName}</h1>
                            <img src={m.projectimage} alt="i"/>
                            </div>
                            
                            <div className="event-middle">
                           <h1>{m.projectname}</h1>
                            <p>{m.projectsummary}</p>
                            </div>
                            <div className="event-left">
                            <h1>Date</h1>
                                <h1>{m.projectstart}</h1>
                                <Button size="small" variant="contained" color="primary" onClick={() => newScreen2(m.projectemail,m.projectname,m.projectsummary,m.projectdesc,m.projectimage,m.projectstart,m.projectfinish,m.projectlooking)}>
                     View
      </Button>
                            </div>
                            
                            </Paper>
                        </div>
                       
                    )
                    })}
               </div>


           </div>
        </div>
    )
}

export default Home
