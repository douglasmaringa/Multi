import React,{useState,useEffect} from 'react'
import "./search.css"
import Nav from "../components/Nav"
import Card from "../components/SearchCard"
import { makeStyles } from '@material-ui/core/styles';
import FilterListIcon from '@material-ui/icons/FilterList';
import Button from '@material-ui/core/Button';
import Modal from '@material-ui/core/Modal';
import FormLabel from '@material-ui/core/FormLabel';
import FormGroup from '@material-ui/core/FormGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import FormHelperText from '@material-ui/core/FormHelperText';
import Checkbox from '@material-ui/core/Checkbox';
import {db} from "../firebase"
import ReactMapGL, { Marker, Popup } from "react-map-gl";
//import mapboxgl from "mapbox-gl"
import walk from "../Data/Walk.gif"
import building from "./building.png";
import { useStateValue } from "../StateProvider";
import {useHistory} from 'react-router-dom'
// eslint-disable-next-line import/no-webpack-loader-syntax
//mapboxgl.workerClass = require('worker-loader!mapbox-gl/dist/mapbox-gl-csp-worker').default;



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



  
function Search() {
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
  const[org,setOrg]= useState(false)
  const[eve,setEve]= useState(false)
  const[proj,setProj]= useState(false)

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
  const [ ,dispatch] = useStateValue();

  const newScreen = (username) => {
    dispatch({
        type: 'Set_Single',
        item : username
    })
    history.push('/business')
};

 
  //opening modal
  const handleOpen = () => {
    setOpen(true);
  };

  //opening modal
  const handleOpen1 = () => {
    setOpen1(true);
  };

 
  const handleOpen2 = () => {
    setOpen2(true);
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
//checkbox state
const[check,setCheck]=useState(false)
const[check2,setCheck2]=useState(false)
const[check3,setCheck3]=useState(false)
const[check4,setCheck4]=useState(false)
const[check5,setCheck5]=useState(false)
const[check6,setCheck6]=useState(false)


  //function for filtering
  const handleFocus = (event) => {
    let value = event.target.value.toLowerCase();
    if(value==="aqautic"){
      setCheck(true)
    }else if(value==="weed")
    {
      setCheck2(true)
    }
    else if(value==="education")
    {
      setCheck3(true)
    }
    else if(value==="research")
    {
      setCheck4(true)
    }
    else if(value==="profit")
    {
      setCheck5(true)
    }else{
      setCheck6(true)
    }
    let result = [];
    console.log(value);
    result = filteredData.filter((data) => {
    return data.focus.search(value) !== -1;
    });
    setOrg(true)
    setReset(true)
    setFilteredData(result);
    //alert(event.target.value)
    }

    //checkbox state
const[check7,setCheck7]=useState(false)
const[check8,setCheck8]=useState(false)
const[check9,setCheck9]=useState(false)
const[check10,setCheck10]=useState(false)
const[check11,setCheck11]=useState(false)


    const handleStructure = (event) => {
        let value = event.target.value.toLowerCase();
        if(value==="full volunteer"){
          setCheck7(true)
        }else if(value==="professional")
        {
          setCheck8(true)
        }
        else if(value==="partial volunteer")
        {
          setCheck9(true)
        }
        else if(value==="government")
        {
          setCheck10(true)
        }
        else{
          setCheck11(true)
        }
        let result = [];
        console.log(value);
        result = filteredData.filter((data) => {
        return data.structure.search(value) !== -1;
        });
        setOrg(true)
    setReset(true)
        setFilteredData(result);
        //alert(event.target.value)
        }

        //checkbox state
const[check12,setCheck12]=useState(false)
const[check13,setCheck13]=useState(false)
const[check14,setCheck14]=useState(false)
const[check15,setCheck15]=useState(false)
const[check16,setCheck16]=useState(false)
const[check17,setCheck17]=useState(false)  

        const handleLooking = (event) => {
            let value = event.target.value.toLowerCase();
            if(value==="volunteer"){
              setCheck12(true)
            }else if(value==="employees")
            {
              setCheck13(true)
            }
            else if(value==="resources")
            {
              setCheck14(true)
            }
            else if(value==="legal")
            {
              setCheck15(true)
            } else if(value==="land")
            {
              setCheck16(true)
            }
            else{
              setCheck17(true)
            }
            let result = [];
            console.log(value);
            result = filteredData.filter((data) => {
            return data.looking.search(value) !== -1;
            });
            setOrg(true)
    setReset(true)
            setFilteredData(result);
            //alert(event.target.value)
            }

             //checkbox state
const[check18,setCheck18]=useState(false)
const[check19,setCheck19]=useState(false)
const[check20,setCheck20]=useState(false)
const[check21,setCheck21]=useState(false)

            const handleLocation = (event) => {
                let value = event.target.value.toLowerCase();
                if(value==="single"){
                  setCheck18(true)
                }else if(value==="multiple")
                {
                  setCheck19(true)
                }
                else if(value==="where required")
                {
                  setCheck20(true)
                }
                
                else{
                  setCheck21(true)
                }
                let result = [];
                console.log(value);
                result = filteredData.filter((data) => {
                return data.location.search(value) !== -1;
                });
                setOrg(true)
    setReset(true)
                setFilteredData(result);
                //alert(event.target.value)
                }

                //checkbox state
const[check22,setCheck22]=useState(false)
const[check23,setCheck23]=useState(false)
const[check24,setCheck24]=useState(false)
const[check25,setCheck25]=useState(false)
const[check26,setCheck26]=useState(false)
const[check27,setCheck27]=useState(false)
const[check28,setCheck28]=useState(false)
                const handleProvides = (event) => {
                    let value = event.target.value.toLowerCase();
                    if(value==="people"){
                      setCheck22(true)
                    }else if(value==="incursions")
                    {
                      setCheck23(true)
                    }
                    else if(value==="training")
                    {
                      setCheck24(true)
                    }
                    else if(value==="advice")
                    {
                      setCheck25(true)
                    }
                    else if(value==="resources")
                    {
                      setCheck26(true)
                    }
                    else if(value==="space")
                    {
                      setCheck27(true)
                    }
                    
                    else{
                      setCheck28(true)
                    }
                    let result = [];
                    console.log(value);
                    result = filteredData.filter((data) => {
                    return data.provides.search(value) !== -1;
                    });
                    setOrg(true)
    setReset(true)
                    setFilteredData(result);
                    //alert(event.target.value)
                    }

const[check29,setCheck29]=useState(false)
const[check30,setCheck30]=useState(false)
const[check31,setCheck31]=useState(false)
                    const handleServices = (event) => {
                        let value = event.target.value.toLowerCase();
                        if(value==="home services"){
                          setCheck29(true)
                        }
                        else if(value==="design")
                        {
                          setCheck30(true)
                        }
                        
                        else{
                          setCheck31(true)
                        }
                        let result = [];
                        console.log(value);
                        result = filteredData.filter((data) => {
                        return data.service.search(value) !== -1;
                        });
                        setOrg(true)
    setReset(true)
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
                            return data.events.search(value) !== -1;
                            });
                            setEve(true)
                            setReset(true)
                            setFilteredData(result);
                           // alert(event.target.value)
                            }

                             //checkbox state
const[checkss1,setCheckss1]=useState(false)
const[checkss2,setCheckss2]=useState(false)
const[checkss3,setCheckss3]=useState(false)
const[checkss4,setCheckss4]=useState(false)
const[checkss5,setCheckss5]=useState(false)
const[checkss6,setCheckss6]=useState(false)
const[checkss7,setCheckss7]=useState(false)
const[checkss8,setCheckss8]=useState(false)
const[checkss9,setCheckss9]=useState(false)
const[checkss10,setCheckss10]=useState(false)
const[checkss11,setCheckss11]=useState(false)
const[checkss12,setCheckss12]=useState(false)
const[checkss13,setCheckss13]=useState(false)
const[checkss14,setCheckss14]=useState(false)
const[checkss15,setCheckss15]=useState(false)
const[checkss16,setCheckss16]=useState(false)


                            const handleProjects = (event) => {
                                let value = event.target.value.toLowerCase();

                                if(value==="research"){
                                  setCheckss1(true)
                                }
                                else if(value==="citizen science")
                                {
                                  setCheckss2(true)
                                }
                                else if(value==="new itiatives")
                                {
                                  setCheckss3(true)
                                }
                                else if(value==="black spot")
                                {
                                  setCheckss4(true)
                                }
                                else if(value==="preservation")
                                {
                                  setCheckss5(true)
                                }
                                else if(value==="rehab")
                                {
                                  setCheckss6(true)
                                }
                                else if(value==="crowd funding")
                                {
                                  setCheckss7(true)
                                }
                                else if(value==="involves schools")
                                {
                                  setCheckss8(true)
                                }
                                else if(value==="arduos")
                                {
                                  setCheckss9(true)
                                }
                                else if(value==="building")
                                {
                                  setCheckss10(true)
                                }
                                else if(value==="family friendly")
                                {
                                  setCheckss11(true)
                                }
                                else if(value==="easy as")
                                {
                                  setCheckss12(true)
                                }
                                else if(value==="training")
                                {
                                  setCheckss13(true)
                                }
                                else if(value==="educational")
                                {
                                  setCheckss14(true)
                                }
                                else if(value==="volunteers")
                                {
                                  setCheckss15(true)
                                }
                                
                                else{
                                  setCheckss16(true)
                                }
                                let result = [];
                                console.log(value);
                                result = filteredData.filter((data) => {
                                return data.project.search(value) !== -1;
                                });
                                setProj(true)
                                setReset(true)
                                setFilteredData(result);
                                //alert(event.target.value)
                                }
                               

    //get search data from firebase
    useEffect(() => {
        setLoading(true)
         db.collection("search").orderBy('timestamp','desc').onSnapshot(snapshot=>{
           console.log(snapshot.docs.map(doc=>doc.data()))
         setAllData(snapshot.docs.map(doc=>doc.data()));
         setFilteredData(snapshot.docs.map(doc=>doc.data()));
         setLoading(false)
         })}
        
         
         , []);

         useEffect(() => {
        
          db.collection("location").orderBy('timestamp','desc').onSnapshot(snapshot=>{
            console.log(snapshot.docs.map(doc=>doc.data()))
          setData(snapshot.docs.map(doc=>doc.data()));
         
          })}
 
          
          , []);

         const handleMarkerClick = (id, lat, long,title) => {
            
            //changes the map location when you press marker
          setCurrentPlaceId(id);
          setViewport({ ...viewport, latitude: JSON.parse(lat), longitude: JSON.parse(long) });
         /* let value = title;
            let result = [];
            console.log(value);
            result = filteredData.filter((data) => {
            return data.city.search(value) != -1;
            });
            setFilteredData(result);*/
        
            //when you press the marker the city is then searched in the database
    db.collection("search").where("city", "==", title)
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
          setOrg(false)
          setProj(false)
          setReset(false)

          //focus
          setCheck(false)
          setCheck2(false)
          setCheck3(false)
          setCheck4(false)
          setCheck5(false)
          setCheck6(false)

          //structure
          setCheck7(false)
          setCheck8(false)
          setCheck9(false)
          setCheck10(false)
          setCheck11(false)

          //looking
          setCheck12(false)
          setCheck13(false)
          setCheck14(false)
          setCheck15(false)
          setCheck16(false)
          setCheck17(false)

          //location
          setCheck18(false)
           setCheck19(false)
           setCheck20(false)
           setCheck21(false)

           //provides
           setCheck22(false)
           setCheck23(false)
           setCheck24(false)
           setCheck25(false)
           setCheck26(false)
           setCheck27(false)
           setCheck28(false)
          
           //service
           setCheck29(false)
           setCheck30(false)
           setCheck31(false)

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
         
           //Projects
           setCheckss1(false)
           setCheckss2(false)
           setCheckss3(false)
           setCheckss4(false)
           setCheckss5(false)
           setCheckss6(false)
           setCheckss7(false)
           setCheckss8(false)
           setCheckss9(false)
           setCheckss9(false)
           setCheckss10(false)
           setCheckss11(false)
           setCheckss12(false)
           setCheckss13(false)
           setCheckss14(false)
           setCheckss15(false)
           setCheckss16(false)
           
         
  
         db.collection("search").orderBy('timestamp','desc').onSnapshot(snapshot=>{
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
                <Button  variant="contained" color="primary" onClick={handleOpen}>
                    Organisations {org?(<><FilterListIcon/></>):(<></>)} 
                 </Button>
                 <Button  variant="contained" color="primary" onClick={handleOpen1}>
                    Events {eve?(<><FilterListIcon/></>):(<></>)} 
                 </Button>

                 <Button  variant="contained" color="primary" onClick={handleOpen2}>
                    Projects {proj?(<><FilterListIcon/></>):(<></>)} 
                 </Button>
                 {
                   reset?
                   (<>
                    <Button  variant="contained" color="secondary" onClick={reseted}>
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
                   control={<Checkbox value="aqautic" checked={check} onChange={(event) =>{handleFocus(event)}} name="focus" className="checkbox" />}
                   label="Aqautic"
                   />
                <FormControlLabel
                   control={<Checkbox value="weed" checked={check2} onChange={(event) =>handleFocus(event)} name="focus" />}
                   label="Weed Management"
                   />
                <FormControlLabel
                   control={<Checkbox value="education" checked={check3} onChange={(event) =>handleFocus(event)} name="focus" />}
                   label="Policy"
                   />
                <FormControlLabel
                   control={<Checkbox value="research" checked={check4} onChange={(event) =>handleFocus(event)} name="focus" />}
                   label="Research"
                   />
                <FormControlLabel
                   control={<Checkbox value="profit" checked={check5} onChange={(event) =>handleFocus(event)} name="focus" />}
                   label="Profit"
                   />
                <FormControlLabel
                   control={<Checkbox value="rescue" checked={check6} onChange={(event) =>handleFocus(event)} name="focus" />}
                   label="Rescue"
                   />
                </FormGroup>
                 <FormHelperText>Be careful</FormHelperText>
                </div>

                <div className="modal-section">
                 <FormLabel component="legend">Structure</FormLabel>
                 <FormGroup>
                 <FormControlLabel
                   control={<Checkbox value="full volunteer" checked={check7} onChange={(event) =>handleStructure(event)} name="structure" />}
                   label="100% Volunteer"
                   />
                  <FormControlLabel
                   control={<Checkbox value="professional" checked={check8} onChange={(event) =>handleStructure(event)} name="structure" />}
                   label="Professional"
                   />
                   <FormControlLabel
                   control={<Checkbox value="partial volunteer" checked={check9} onChange={(event) =>handleStructure(event)} name="structure" />}
                   label="Partial Volunteer"
                   />
                   <FormControlLabel
                   control={<Checkbox value="government" checked={check10} onChange={(event) =>handleStructure(event)} name="structure" />}
                   label="Government"
                   />
                   <FormControlLabel
                   control={<Checkbox value="business" checked={check11} onChange={(event) =>handleStructure(event)} name="structure" />}
                   label="Business"
                   />
                </FormGroup>
                 <FormHelperText>Be careful</FormHelperText>
                 </div>

                 <div className="modal-section">
                 <FormLabel component="legend">Looking For</FormLabel>
                 <FormGroup>
                 <FormControlLabel
                   control={<Checkbox value="volunteer" checked={check12} onChange={(event) =>handleLooking(event)} name="looking" />}
                   label="Volunteer"
                   />
                  <FormControlLabel
                   control={<Checkbox value="employees" checked={check13} onChange={(event) =>handleLooking(event)} name="looking" />}
                   label="Employees"
                   />
                   <FormControlLabel
                   control={<Checkbox value="resources" checked={check14} onChange={(event) =>handleLooking(event)} name="looking" />}
                   label="Resources"
                   />
                   <FormControlLabel
                   control={<Checkbox value="legal" checked={check15} onChange={(event) =>handleLooking(event)} name="looking" />}
                   label="Legal"
                   />
                   <FormControlLabel
                   control={<Checkbox value="land" checked={check16} onChange={(event) =>handleLooking(event)} name="looking" />}
                   label="Land"
                   />
                   <FormControlLabel
                   control={<Checkbox value="funding" checked={check17} onChange={(event) =>handleLooking(event)} name="looking" />}
                   label="Funding"
                   />
                </FormGroup>
                 <FormHelperText>Be careful</FormHelperText>
                 </div>

                 <div className="modal-section">
                 <FormLabel component="legend">Location</FormLabel>
                 <FormGroup>
                 <FormControlLabel
                   control={<Checkbox value="single" checked={check18} onChange={(event) =>handleLocation(event)} name="location" />}
                   label="Single"
                   />
                  <FormControlLabel
                   control={<Checkbox value="multiple" checked={check19} onChange={(event) =>handleLocation(event)} name="location" />}
                   label="Multiple"
                   />
                   <FormControlLabel
                   control={<Checkbox value="where required" checked={check20} onChange={(event) =>handleLocation(event)} name="location" />}
                   label="where required"
                   />
                   <FormControlLabel
                   control={<Checkbox value="online" checked={check21} onChange={(event) =>handleLocation(event)} name="location" />}
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
                   control={<Checkbox value="people" checked={check22} onChange={(event) =>handleProvides(event)} name="Provides" />}
                   label="People"
                   />
                <FormControlLabel
                   control={<Checkbox value="incursions" checked={check23} onChange={(event) =>handleProvides(event)} name="Provides" />}
                   label="Incursions"
                   />
                <FormControlLabel
                   control={<Checkbox value="training" checked={check24} onChange={(event) =>handleProvides(event)} name="Provides" />}
                   label="Training"
                   />
                <FormControlLabel
                   control={<Checkbox value="advice" checked={check25} onChange={(event) =>handleProvides(event)} name="Provides" />}
                   label="Advice"
                   />
                <FormControlLabel
                   control={<Checkbox value="resources" checked={check26} onChange={(event) =>handleProvides(event)} name="Provides" />}
                   label="Resources"
                   />
                <FormControlLabel
                   control={<Checkbox value="space" checked={check27} onChange={(event) =>handleProvides(event)} name="Provides" />}
                   label="Space"
                   />
                <FormControlLabel
                   control={<Checkbox value="fauna rehab" checked={check28} onChange={(event) =>handleProvides(event)} name="Provides" />}
                   label="Fauna Rehab"
                   />
                </FormGroup>
                 <FormHelperText>Be careful</FormHelperText>
                </div>
            
                <div className="modal-section">
            <FormLabel component="legend">Services</FormLabel>
                 <FormGroup>
                 <FormControlLabel
                   control={<Checkbox value="home services" checked={check29} onChange={(event) =>handleServices(event)} name="services" />}
                   label="Home Services"
                   />
                <FormControlLabel
                   control={<Checkbox value="design" checked={check30} onChange={(event) =>handleServices(event)} name="services" />}
                   label="Design"
                   />
                <FormControlLabel
                   control={<Checkbox value="legal" checked={check31} onChange={(event) =>handleServices(event)} name="services" />}
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
                   control={<Checkbox value="research" checked={checkss1} onChange={(event) =>handleProjects(event)} name="Projects" />}
                   label="research"
                   />
                <FormControlLabel
                   control={<Checkbox value="citizen science" checked={checkss2} onChange={(event) =>handleProjects(event)} name="Projects" />}
                   label="citizen science"
                   />
                   <FormControlLabel
                   control={<Checkbox value="new itiatives" checked={checkss3} onChange={(event) =>handleProjects(event)} name="Projects" />}
                   label="new itiatives"
                   />
                   <FormControlLabel
                   control={<Checkbox value="black spot" checked={checkss4} onChange={(event) =>handleProjects(event)} name="Projects" />}
                   label="black spot"
                   />
                   <FormControlLabel
                   control={<Checkbox value="preservation" checked={checkss5} onChange={(event) =>handleProjects(event)} name="Projects" />}
                   label="preservation"
                   />
                   <FormControlLabel
                   control={<Checkbox value="rehab" checked={checkss6} onChange={(event) =>handleProjects(event)} name="Projects" />}
                   label="rehab"
                   />
                   <FormControlLabel
                   control={<Checkbox value="crowd funding" checked={checkss7} onChange={(event) =>handleProjects(event)} name="Projects" />}
                   label="crowd funding"
                   />
                   <FormControlLabel
                   control={<Checkbox value="involves schools" checked={checkss8} onChange={(event) =>handleProjects(event)} name="Projects" />}
                   label="involves schools"
                   />
                   <FormControlLabel
                   control={<Checkbox value="arduos" checked={checkss9} onChange={(event) =>handleProjects(event)} name="Projects" />}
                   label="arduos"
                   />
                   <FormControlLabel
                   control={<Checkbox value="building" checked={checkss10} onChange={(event) =>handleProjects(event)} name="Projects" />}
                   label="building"
                   />
                   <FormControlLabel
                   control={<Checkbox value="family friendly" checked={checkss11} onChange={(event) =>handleProjects(event)} name="Projects" />}
                   label="family friendly"
                   />
                   <FormControlLabel
                   control={<Checkbox value="easy as" checked={checkss12} onChange={(event) =>handleProjects(event)} name="Projects" />}
                   label="easy as"
                   />
                   <FormControlLabel
                   control={<Checkbox value="training" checked={checkss13} onChange={(event) =>handleProjects(event)} name="Projects" />}
                   label="training"
                   />
                   <FormControlLabel
                   control={<Checkbox value="educational" checked={checkss14} onChange={(event) =>handleProjects(event)} name="Projects" />}
                   label="educational"
                   />
                   <FormControlLabel
                   control={<Checkbox value="volunteers" checked={checkss15} onChange={(event) =>handleProjects(event)} name="Projects" />}
                   label="volunteers"
                   />
                   <FormControlLabel
                   control={<Checkbox value="policy" checked={checkss16} onChange={(event) =>handleProjects(event)} name="Projects" />}
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
                <img src={walk} alt="kk"/>
                <img src={walk} alt="kk"/>
                </div>
                </>
                  
                ):
                (
                <>
                {filteredData.map((value,index)=>{
                      return(
                        <div key={index}>
                        <Card name={value.name} summary={value.summary} desc={value.description} username={value.username} image={value.image}/>
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
          <img src={building} width={viewport.zoom * 5} height={viewport.zoom * 5}  onClick={() => handleMarkerClick(p._id, p.lat, p.long,p.title)} alt="kk"/>
         
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
                  <label>Place</label>
                  <img src={p.image} alt="kk"/>
                  <h4 className="place" onClick={() =>{alert("put link to business here")}}>{p.title}</h4>
                  <p className="desc">{p.desc}</p>
                  <span className="username">
                  <Button size="small"variant="contained" color="primary" onClick={() => newScreen(p.username)}>
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

export default Search
