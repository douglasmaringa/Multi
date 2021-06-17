import React,{useState,useEffect} from 'react'
import "./resume.css"
import {  makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Typography from '@material-ui/core/Typography';
import {db} from "../firebase"


const useStyles = makeStyles({
    root: {
      maxWidth: "80vw",
      height:"300px",
      padding:10,
      display:"grid",
      gridTemplateColumns:"1fr 2fr 2fr",
      marginTop:"20px"
    },
    
  paper: {
    position: 'absolute',
    width: "50vw",
    height:"50vh",
    backgroundColor: "white",
    border: '2px solid #000',
   
  },
  });

  /*function rand() {
    return Math.round(Math.random() * 20) - 10;
  }*/
  
  /*function getModalStyle() {
    const top = 50 + rand();
    const left = 50 + rand();
  
    return {
      top: `${top}%`,
      left: `${left}%`,
      transform: `translate(-${top}%, -${left}%)`,
    };
  }*/

function Resume() {
    const classes = useStyles();

   
    const[resume,setResume]=useState([])

   
  

  
     //get search data from firebase
     useEffect(() => {
        
         db.collection("Resume").orderBy('timestamp','desc').onSnapshot(snapshot=>{
           console.log(snapshot.docs.map(doc=>doc.data()))
         setResume(snapshot.docs.map(doc=>doc.data()));
      
         })}
        
         
         , []);

   //modal body
 

  
    return (
        <div>
            
            {
                resume.map(m=>(
                    <Card className={classes.root}>
                    <div>
                  <CardActionArea>
                    <CardMedia
                      component="img"
                      alt="Contemplative Reptile"
                      height="100%"
                     width="100%"
                      image={m.image}
                      title="Business"
                    />
                     </CardActionArea>
                    </div>
                   
                    <div>
                    <CardContent>
                      <Typography gutterBottom variant="h5" component="h2">
                        {m.name}
                      </Typography>
                      <Typography variant="body2" color="textSecondary" component="p">
                      { m.skills}
                       <br/>
                       <strong>contact</strong> {m.phone}
                       <br/>
                       <strong>email</strong>   {m.email}
                      </Typography>
                    </CardContent>
                  </div>
                  <div>
                  <CardActions>
                  
                  <CardMedia
                    component="img"
                    alt="Contemplative Reptile"
                    height="100%"
                   width="100%"
                    image={m.resume}
                    title="Business"
                  />
                 
                  
                </CardActions>
                  </div>
                </Card>
                ))
            }
           
        </div>
    )
}

export default Resume
