import React,{useState,useEffect} from 'react'
import "./search.css"
import Nav from "../components/Nav"
import Paper from '@material-ui/core/Paper';
import FilterListIcon from '@material-ui/icons/FilterList';
import { makeStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import Modal from '@material-ui/core/Modal';
import FormLabel from '@material-ui/core/FormLabel';
import FormGroup from '@material-ui/core/FormGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import FormHelperText from '@material-ui/core/FormHelperText';
import Checkbox from '@material-ui/core/Checkbox';
import {db} from "../firebase"
import ReactMapGL, { Marker, Popup } from "react-map-gl";
import walk from "../Data/Walk.gif"
import { useStateValue } from "../StateProvider";
import {useHistory} from 'react-router-dom'
import building from "./building.png";


//modal styles 
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
      width: 800,
      height:"80vh",
      backgroundColor: theme.palette.background.paper,
      border: '2px solid #000',
      boxShadow: theme.shadows[5],
      padding: theme.spacing(2, 4, 3),
      overflow:'scroll',
    },
  }));



  
function EventSearch() {
    //filter states
    const [allData,setAllData] = useState([]);
  const [filteredData,setFilteredData] = useState(allData);
 
  const [open, setOpen] = React.useState(false);
  const [open1, setOpen1] = React.useState(false);
  const [open2, setOpen2] = React.useState(false);
  
  const classes = useStyles();
  // getModalStyle is not a pure function, we roll the style only on the first render
  const [modalStyle] = React.useState(getModalStyle);

  //filter icon
 
  const[eve,setEve]= useState(false)
  

  //reset button
  const[reset,setReset]=useState(false)

   //map state
   const [currentPlaceId, setCurrentPlaceId] = React.useState(null);
   //location it opens on
  const [viewport, setViewport] = React.useState({
    latitude: 40.730610,
    longitude: -73.935242,
    zoom: 4,
    width:570,
    height:540
  });

  //location data state
  const[data,setData]=useState([])

  //loading state
  const[loading,setLoading]=useState(true)

  const history = useHistory()
  //redux
  const [, dispatch] = useStateValue();

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

 
  

  //opening modal
  const handleOpen1 = () => {
    setOpen1(true);
  };

 
  
//closing modal
  const handleClose = () => {
    setOpen(false);
  };

  const handleClose1 = () => {
    setOpen1(false);
  };

  const handleClose2 = () => {
    setOpen2(false);
  };

  //function for filtering
  const handleFocus = (event) => {
    let value = event.target.value.toLowerCase();
    let result = [];
    console.log(value);
    result = filteredData.filter((data) => {
    return data.focus.search(value) !== -1;
    });
   
    setFilteredData(result);
    //alert(event.target.value)
    }

    const handleStructure = (event) => {
        let value = event.target.value.toLowerCase();
        let result = [];
        console.log(value);
        result = filteredData.filter((data) => {
        return data.structure.search(value) !== -1;
        });
        setFilteredData(result);
        //alert(event.target.value)
        }
    
        const handleLooking = (event) => {
            let value = event.target.value.toLowerCase();
            let result = [];
            console.log(value);
            result = filteredData.filter((data) => {
            return data.looking.search(value) !== -1;
            });
            setFilteredData(result);
            //alert(event.target.value)
            }
            const handleLocation = (event) => {
                let value = event.target.value.toLowerCase();
                let result = [];
                console.log(value);
                result = filteredData.filter((data) => {
                return data.location.search(value) !== -1;
                });
                setFilteredData(result);
                //alert(event.target.value)
                }
                const handleProvides = (event) => {
                    let value = event.target.value.toLowerCase();
                    let result = [];
                    console.log(value);
                    result = filteredData.filter((data) => {
                    return data.provides.search(value) !== -1;
                    });
                    setFilteredData(result);
                    //alert(event.target.value)
                    }
                    const handleServices = (event) => {
                        let value = event.target.value.toLowerCase();
                        let result = [];
                        console.log(value);
                        result = filteredData.filter((data) => {
                        return data.service.search(value) !== -1;
                        });
                        setFilteredData(result);
                        //alert(event.target.value)
                        }

 //checkbox state
 const[checks1,setChecks1]=useState(false)
 const[checks2,setChecks2]=useState(false)
 const[checks3,setChecks3]=useState(false)
 const[checks4,setChecks4]=useState(false)
 const[checks5,setChecks5]=useState(false)
 const[checks6,setChecks6]=useState(false)
 const[checks7,setChecks7]=useState(false)
 const[checks8,setChecks8]=useState(false)
 const[checks9,setChecks9]=useState(false)
 const[checks10,setChecks10]=useState(false)
 const[checks11,setChecks11]=useState(false)
 const[checks12,setChecks12]=useState(false)
 const[checks13,setChecks13]=useState(false)
 const[checks14,setChecks14]=useState(false)
 const[checks15,setChecks15]=useState(false)
 const[checks16,setChecks16]=useState(false)
 const[checks17,setChecks17]=useState(false)
 const[checks18,setChecks18]=useState(false)
 
 
                         const handleEvents = (event) => {
                             let value = event.target.value.toLowerCase();
 
                             if(value==="free"){
                               setChecks1(true)
                             }
                             else if(value==="carbon nuetral")
                             {
                               setChecks2(true)
                             }
                             else if(value==="self guided")
                             {
                               setChecks3(true)
                             }
                             else if(value==="catered")
                             {
                               setChecks4(true)
                             }
                             else if(value==="overnight")
                             {
                               setChecks5(true)
                             }
                             else if(value==="arducus")
                             {
                               setChecks6(true)
                             }
                             else if(value==="remote")
                             {
                               setChecks7(true)
                             }
                             else if(value==="cultural")
                             {
                               setChecks8(true)
                             }
                             else if(value==="greater benefit")
                             {
                               setChecks9(true)
                             }
                             else if(value==="family friendly")
                             {
                               setChecks10(true)
                             }
                             else if(value==="easy as")
                             {
                               setChecks11(true)
                             }
                             else if(value==="training")
                             {
                               setChecks12(true)
                             }
                             else if(value==="educational")
                             {
                               setChecks13(true)
                             }
                             else if(value==="volunteers")
                             {
                               setChecks14(true)
                             }
                             else if(value==="policy")
                             {
                               setChecks15(true)
                             }
                             else if(value==="profit")
                             {
                               setChecks16(true)
                             }
                             else if(value==="music and art")
                             {
                               setChecks17(true)
                             }
                             
                             
                             
                             else{
                               setChecks18(true)
                             }
                             let result = [];
                             console.log(value);
                             result = filteredData.filter((data) => {
                             return data.eventcategory.search(value) !== -1;
                             });
                             setEve(true)
                             setReset(true)
                             setFilteredData(result);
                            // alert(event.target.value)
                             }
 
                            const handleProjects = (event) => {
                                let value = event.target.value.toLowerCase();
                                let result = [];
                                console.log(value);
                                result = filteredData.filter((data) => {
                                return data.project.search(value) !== -1;
                                });
                               
                                setReset(true)
                                setFilteredData(result);
                                //alert(event.target.value)
                                }
                               

    //get search data from firebase
    useEffect(() => {
        setLoading(true)
         db.collection("event").orderBy('timestamp','desc').onSnapshot(snapshot=>{
           console.log(snapshot.docs.map(doc=>doc.data()))
         setAllData(snapshot.docs.map(doc=>doc.data()));
         setFilteredData(snapshot.docs.map(doc=>doc.data()));
         setLoading(false)
         })}
        
         
         , []);

         useEffect(() => {
        
          db.collection("event").orderBy('timestamp','desc').onSnapshot(snapshot=>{
            console.log(snapshot.docs.map(doc=>doc.data()))
          setData(snapshot.docs.map(doc=>doc.data()));
         
          })}
 
          
          , []);

         const handleMarkerClick = (lat, long,eventAddress) => {
            
            //changes the map location when you press marker
          setCurrentPlaceId(lat);
          setViewport({ ...viewport, latitude: JSON.parse(lat), longitude: JSON.parse(long) });
         /* let value = title;
            let result = [];
            console.log(value);
            result = filteredData.filter((data) => {
            return data.city.search(value) != -1;
            });
            setFilteredData(result);*/
        
            //when you press the marker the city is then searched in the database
    db.collection("event").where("eventAddress", "==", eventAddress)
    .onSnapshot((querySnapshot) => {
       
      //the results are added to the filtering
      setFilteredData(querySnapshot.docs.map((doc)=>doc.data()))
     console.log(querySnapshot.docs.map((doc)=>doc.data()))
       
})
        };

     //reset
     const reseted =()=>{

      setLoading(true)
      setEve(false)
     
      //events
      setChecks1(false)
      setChecks2(false)
      setChecks3(false)
      setChecks4(false)
      setChecks5(false)
      setChecks6(false)
      setChecks7(false)
      setChecks8(false)
      setChecks9(false)
      setChecks9(false)
      setChecks10(false)
      setChecks11(false)
      setChecks12(false)
      setChecks13(false)
      setChecks14(false)
      setChecks15(false)
      setChecks16(false)
      setChecks17(false)
      setChecks18(false)
      setReset(false)
     db.collection("event").orderBy('timestamp','desc').onSnapshot(snapshot=>{
       console.log(snapshot.docs.map(doc=>doc.data()))
     setAllData(snapshot.docs.map(doc=>doc.data()));
     setFilteredData(snapshot.docs.map(doc=>doc.data()));
     setLoading(false)
     })
    
     
    }

    return (
        <div >
            <Nav/>
            <div className="container">
                <div className="left">
               
                 <Button  variant="contained" color="primary" onClick={handleOpen1}>
                    Events {eve?(<><FilterListIcon/></>):(<></>)} 
                 </Button>

                
                 {
                   reset?
                   (<>
                    <Button  variant="contained" color="primary" onClick={reseted}>
                    Reset  
                 </Button>
                   </>):(<></>)
                 }
                {/*first modal second on line 336 */}
                 <Modal
                  open={open}
                  onClose={handleClose}
                  aria-labelledby="simple-modal-title"
                  aria-describedby="simple-modal-description"
                  > 
                <div style={modalStyle} className={classes.paper}>
                 
                 <FormLabel component="legend">Focus</FormLabel>
                 <div className="modal">
                <div className="modal-section">
                 <FormGroup>
                 <FormControlLabel
                   control={<Checkbox value="aqautic" onChange={(event) =>handleFocus(event)} name="focus" />}
                   label="Aqautic"
                   />
                <FormControlLabel
                   control={<Checkbox value="weed" onChange={(event) =>handleFocus(event)} name="focus" />}
                   label="Weed Management"
                   />
                <FormControlLabel
                   control={<Checkbox value="education" onChange={(event) =>handleFocus(event)} name="focus" />}
                   label="Policy"
                   />
                <FormControlLabel
                   control={<Checkbox value="research" onChange={(event) =>handleFocus(event)} name="focus" />}
                   label="Research"
                   />
                <FormControlLabel
                   control={<Checkbox value="profit" onChange={(event) =>handleFocus(event)} name="focus" />}
                   label="Profit"
                   />
                <FormControlLabel
                   control={<Checkbox value="rescue" onChange={(event) =>handleFocus(event)} name="focus" />}
                   label="Rescue"
                   />
                </FormGroup>
                 <FormHelperText>Be careful</FormHelperText>
                </div>

                <div className="modal-section">
                 <FormLabel component="legend">Structure</FormLabel>
                 <FormGroup>
                 <FormControlLabel
                   control={<Checkbox value="full volunteer" onChange={(event) =>handleStructure(event)} name="structure" />}
                   label="100% Volunteer"
                   />
                  <FormControlLabel
                   control={<Checkbox value="professional" onChange={(event) =>handleStructure(event)} name="structure" />}
                   label="Professional"
                   />
                   <FormControlLabel
                   control={<Checkbox value="partial volunteer" onChange={(event) =>handleStructure(event)} name="structure" />}
                   label="Partial Volunteer"
                   />
                   <FormControlLabel
                   control={<Checkbox value="government" onChange={(event) =>handleStructure(event)} name="structure" />}
                   label="Government"
                   />
                   <FormControlLabel
                   control={<Checkbox value="business" onChange={(event) =>handleStructure(event)} name="structure" />}
                   label="Business"
                   />
                </FormGroup>
                 <FormHelperText>Be careful</FormHelperText>
                 </div>

                 <div className="modal-section">
                 <FormLabel component="legend">Looking For</FormLabel>
                 <FormGroup>
                 <FormControlLabel
                   control={<Checkbox value="volunteer" onChange={(event) =>handleLooking(event)} name="looking" />}
                   label="Volunteer"
                   />
                  <FormControlLabel
                   control={<Checkbox value="employees" onChange={(event) =>handleLooking(event)} name="looking" />}
                   label="Employees"
                   />
                   <FormControlLabel
                   control={<Checkbox value="resources" onChange={(event) =>handleLooking(event)} name="looking" />}
                   label="Resources"
                   />
                   <FormControlLabel
                   control={<Checkbox value="legal" onChange={(event) =>handleLooking(event)} name="looking" />}
                   label="Legal"
                   />
                   <FormControlLabel
                   control={<Checkbox value="land" onChange={(event) =>handleLooking(event)} name="looking" />}
                   label="Land"
                   />
                   <FormControlLabel
                   control={<Checkbox value="funding" onChange={(event) =>handleLooking(event)} name="looking" />}
                   label="Funding"
                   />
                </FormGroup>
                 <FormHelperText>Be careful</FormHelperText>
                 </div>

                 <div className="modal-section">
                 <FormLabel component="legend">Location</FormLabel>
                 <FormGroup>
                 <FormControlLabel
                   control={<Checkbox value="single" onChange={(event) =>handleLocation(event)} name="location" />}
                   label="Single"
                   />
                  <FormControlLabel
                   control={<Checkbox value="multiple" onChange={(event) =>handleLocation(event)} name="location" />}
                   label="Multiple"
                   />
                   <FormControlLabel
                   control={<Checkbox value="where required" onChange={(event) =>handleLocation(event)} name="location" />}
                   label="where required"
                   />
                   <FormControlLabel
                   control={<Checkbox value="online" onChange={(event) =>handleLocation(event)} name="location" />}
                   label="Online"
                   />
                </FormGroup>
                 <FormHelperText>Be careful</FormHelperText>
                 </div>
                 </div>

            <div className="bottomModal">

            <div className="modal-section">
            <FormLabel component="legend">Provides</FormLabel>
                 <FormGroup>
                 <FormControlLabel
                   control={<Checkbox value="people" onChange={(event) =>handleProvides(event)} name="Provides" />}
                   label="People"
                   />
                <FormControlLabel
                   control={<Checkbox value="incursions" onChange={(event) =>handleProvides(event)} name="Provides" />}
                   label="Incursions"
                   />
                <FormControlLabel
                   control={<Checkbox value="training" onChange={(event) =>handleProvides(event)} name="Provides" />}
                   label="Training"
                   />
                <FormControlLabel
                   control={<Checkbox value="advice" onChange={(event) =>handleProvides(event)} name="Provides" />}
                   label="Advice"
                   />
                <FormControlLabel
                   control={<Checkbox value="resources" onChange={(event) =>handleProvides(event)} name="Provides" />}
                   label="Resources"
                   />
                <FormControlLabel
                   control={<Checkbox value="space" onChange={(event) =>handleProvides(event)} name="Provides" />}
                   label="Space"
                   />
                <FormControlLabel
                   control={<Checkbox value="fauna rehab" onChange={(event) =>handleProvides(event)} name="Provides" />}
                   label="Fauna Rehab"
                   />
                </FormGroup>
                 <FormHelperText>Be careful</FormHelperText>
                </div>
            
                <div className="modal-section">
            <FormLabel component="legend">Services</FormLabel>
                 <FormGroup>
                 <FormControlLabel
                   control={<Checkbox value="home services" onChange={(event) =>handleServices(event)} name="services" />}
                   label="Home Services"
                   />
                <FormControlLabel
                   control={<Checkbox value="design" onChange={(event) =>handleServices(event)} name="services" />}
                   label="Design"
                   />
                <FormControlLabel
                   control={<Checkbox value="legal" onChange={(event) =>handleServices(event)} name="services" />}
                   label="Legal"
                   />
                </FormGroup>
                 <FormHelperText>Be careful</FormHelperText>
                </div>
            </div>
            <Button variant="contained" color="primary" onClick={handleClose}>
                Save
            </Button>
            </div>
                </Modal>

              {/*second modal */}
              <Modal
                  open={open1}
                  onClose={handleClose1}
                  aria-labelledby="simple-modal-title"
                  aria-describedby="simple-modal-description"
                  > 
                 <div style={modalStyle} className={classes.paper}>
                <div className="modal-section">
                 <FormLabel component="legend">Events</FormLabel>
                 <FormGroup>
                 <FormControlLabel
                   control={<Checkbox value="free" checked={checks1} onChange={(event) =>handleEvents(event)} name="structure" />}
                   label="for a fee"
                   />
                  <FormControlLabel
                   control={<Checkbox value="carbon nuetral" checked={checks2} onChange={(event) =>handleEvents(event)} name="structure" />}
                   label="carbon nuetral"
                   />
                   <FormControlLabel
                   control={<Checkbox value="self guided" checked={checks3} onChange={(event) =>handleEvents(event)} name="structure" />}
                   label="self guided"
                   />
                   <FormControlLabel
                   control={<Checkbox value="catered" checked={checks4} onChange={(event) =>handleEvents(event)} name="structure" />}
                   label="catered"
                   />
                   <FormControlLabel
                   control={<Checkbox value="overnight" checked={checks5} onChange={(event) =>handleEvents(event)} name="structure" />}
                   label="overnight"
                   />
                   <FormControlLabel
                   control={<Checkbox value="arducus" checked={checks6} onChange={(event) =>handleEvents(event)} name="structure" />}
                   label="arducus"
                   />
                   <FormControlLabel
                   control={<Checkbox value="remote" checked={checks7} onChange={(event) =>handleEvents(event)} name="structure" />}
                   label="remote"
                   />
                   <FormControlLabel
                   control={<Checkbox value="cultural" checked={checks8} onChange={(event) =>handleEvents(event)} name="structure" />}
                   label="cultural"
                   />
                   <FormControlLabel
                   control={<Checkbox value="greater benefit" checked={checks9} onChange={(event) =>handleEvents(event)} name="structure" />}
                   label="greater benefit"
                   />
                   <FormControlLabel
                   control={<Checkbox value="family friendly" checked={checks10} onChange={(event) =>handleEvents(event)} name="structure" />}
                   label="family friendly"
                   />
                   <FormControlLabel
                   control={<Checkbox value="easy as" checked={checks11} onChange={(event) =>handleEvents(event)} name="structure" />}
                   label="easy as"
                   />
                   <FormControlLabel
                   control={<Checkbox value="training" checked={checks12} onChange={(event) =>handleEvents(event)} name="structure" />}
                   label="training"
                   />
                   <FormControlLabel
                   control={<Checkbox value="educational" checked={checks13} onChange={(event) =>handleEvents(event)} name="structure" />}
                   label="educational"
                   />
                   <FormControlLabel
                   control={<Checkbox value="volunteers" checked={checks14} onChange={(event) =>handleEvents(event)} name="structure" />}
                   label="volunteers"
                   />
                   <FormControlLabel
                   control={<Checkbox value="policy" checked={checks15} onChange={(event) =>handleEvents(event)} name="structure" />}
                   label="policy"
                   />
                   <FormControlLabel
                   control={<Checkbox value="profit" checked={checks16} onChange={(event) =>handleEvents(event)} name="structure" />}
                   label="profit"
                   />
                   <FormControlLabel
                   control={<Checkbox value="music and art" checked={checks17} onChange={(event) =>handleEvents(event)} name="structure" />}
                   label="music and art"
                   />
                   <FormControlLabel
                   control={<Checkbox value="citizen" checked={checks18} onChange={(event) =>handleEvents(event)} name="structure" />}
                   label="citizen"
                   />
                </FormGroup>
                 <FormHelperText>Be careful</FormHelperText>
                 </div>
                 <Button variant="contained" color="primary" onClick={handleClose}>
                Save
            </Button>

                 </div>
                 </Modal>


                  {/*third modal */}
              <Modal
                  open={open2}
                  onClose={handleClose2}
                  aria-labelledby="simple-modal-title"
                  aria-describedby="simple-modal-description"
                  > 
                <div style={modalStyle} className={classes.paper}>
                <div className="modal-section">
                 <FormLabel component="legend">Projects</FormLabel>
                 <FormGroup>
                 <FormControlLabel
                   control={<Checkbox value="research" onChange={(event) =>handleProjects(event)} name="Projects" />}
                   label="research"
                   />
                <FormControlLabel
                   control={<Checkbox value="citizen science" onChange={(event) =>handleProjects(event)} name="Projects" />}
                   label="citizen science"
                   />
                   <FormControlLabel
                   control={<Checkbox value="new itiatives" onChange={(event) =>handleProjects(event)} name="Projects" />}
                   label="new itiatives"
                   />
                   <FormControlLabel
                   control={<Checkbox value="black spot" onChange={(event) =>handleProjects(event)} name="Projects" />}
                   label="black spot"
                   />
                   <FormControlLabel
                   control={<Checkbox value="preservation" onChange={(event) =>handleProjects(event)} name="Projects" />}
                   label="preservation"
                   />
                   <FormControlLabel
                   control={<Checkbox value="rehab" onChange={(event) =>handleProjects(event)} name="Projects" />}
                   label="rehab"
                   />
                   <FormControlLabel
                   control={<Checkbox value="crowd funding" onChange={(event) =>handleProjects(event)} name="Projects" />}
                   label="crowd funding"
                   />
                   <FormControlLabel
                   control={<Checkbox value="involves schools" onChange={(event) =>handleProjects(event)} name="Projects" />}
                   label="involves schools"
                   />
                   <FormControlLabel
                   control={<Checkbox value="arduos" onChange={(event) =>handleProjects(event)} name="Projects" />}
                   label="arduos"
                   />
                   <FormControlLabel
                   control={<Checkbox value="building" onChange={(event) =>handleProjects(event)} name="Projects" />}
                   label="building"
                   />
                   <FormControlLabel
                   control={<Checkbox value="family friendly" onChange={(event) =>handleProjects(event)} name="Projects" />}
                   label="family friendly"
                   />
                   <FormControlLabel
                   control={<Checkbox value="easy as" onChange={(event) =>handleProjects(event)} name="Projects" />}
                   label="easy as"
                   />
                   <FormControlLabel
                   control={<Checkbox value="training" onChange={(event) =>handleProjects(event)} name="Projects" />}
                   label="training"
                   />
                   <FormControlLabel
                   control={<Checkbox value="educational" onChange={(event) =>handleProjects(event)} name="Projects" />}
                   label="educational"
                   />
                   <FormControlLabel
                   control={<Checkbox value="volunteers" onChange={(event) =>handleProjects(event)} name="Projects" />}
                   label="volunteers"
                   />
                   <FormControlLabel
                   control={<Checkbox value="policy" onChange={(event) =>handleProjects(event)} name="Projects" />}
                   label="policy"
                   />
                  
                </FormGroup>
                 <FormHelperText>Be careful</FormHelperText>
                 </div>
                 <Button variant="contained" color="primary" onClick={handleClose}>
                Save
            </Button>
                 </div>
                 </Modal>

              {
                loading?
                (
                <>
                <div className="searchLoading">
                <img src={walk} alt=""/>
                <img src={walk} alt=""/>
                </div>
                </>
                  
                ):
                (
                <>
                {filteredData.map((m,index)=>{
                      return(
                        <div key={index} >
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
                
                </>
                )
              }
                
                </div>

            <div className="right">
            <div className="map">
    <ReactMapGL
      {...viewport}
      mapboxApiAccessToken={"pk.eyJ1IjoiZG91Z2xhc21hcmluZ2EiLCJhIjoiY2twYzZid2kzMWF1eDJ1cDc1dmo0NmswdCJ9.AWID9iqWzNnDlKJI-vH90Q"}
      mapStyle="mapbox://styles/safak/cknndpyfq268f17p53nmpwira"
      onViewportChange={(viewport) => setViewport(viewport)}>
      
      {data.map((p) => (
        <>
          <Marker className="marker" latitude={JSON.parse(p.lat)} longitude={JSON.parse(p.long)} offsetLeft={-20} offsetTop={-10}>
          <img src={building} width={viewport.zoom * 5} height={viewport.zoom * 5}  onClick={() => handleMarkerClick(p.lat, p.long,p.eventAddress)} alt=""/>
         
            </Marker>
            {p._id === currentPlaceId && (
              <Popup
                key={p._id}
                latitude={JSON.parse(p.lat)}
                longitude={JSON.parse(p.long)}
                closeButton={true}
                closeOnClick={false}
                onClose={() => setCurrentPlaceId(null)}
                anchor="left"
              >
                <div className="card1">
                  <label>Event</label>
                  <img src={p.eventimage} alt=""/>
                  <h4 className="place" onClick={() =>{alert("put link to business here")}}>{p.eventname}</h4>
                  <p className="desc">{p.eventsummary}</p>
                  <span className="username">
                  <Button size="small"variant="contained" color="primary" onClick={() => newScreen(p.eventemail,p.eventname,p.eventsummary,p.eventdesc,p.eventimage,p.eventstart,p.eventfinish,p.eventneeded,p.eventbring,p.lat,p.long)}>
                     View
                  </Button>
                  </span>
                  
                </div>
              </Popup>
            )}
            </>
        ))}
      </ReactMapGL>
    </div>
            </div>

            </div>
        </div>
    )
}

export default EventSearch
