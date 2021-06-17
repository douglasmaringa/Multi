import React,{useState,useEffect} from 'react';
import "./nav.css"
import { fade, makeStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import IconButton from '@material-ui/core/IconButton';
import Typography from '@material-ui/core/Typography';
import MenuIcon from '@material-ui/icons/Menu';
import MoreIcon from '@material-ui/icons/MoreVert';
import Button from '@material-ui/core/Button';
import { auth } from "../firebase";
import {Link,useHistory} from 'react-router-dom'



const useStyles = makeStyles((theme) => ({
  grow: {
    flexGrow: 1,
  },
  menuButton: {
    marginRight: theme.spacing(2),
  },
  title: {
    display: 'none',
    [theme.breakpoints.up('sm')]: {
      display: 'block',
    },
    listStyleType:'none',
    textDecoration:'none',
    color:'white'
  },
  search: {
    position: 'relative',
    borderRadius: theme.shape.borderRadius,
    backgroundColor: fade(theme.palette.common.white, 0.15),
    '&:hover': {
      backgroundColor: fade(theme.palette.common.white, 0.25),
    },
    marginRight: theme.spacing(2),
    marginLeft: 0,
    width: '100%',
    [theme.breakpoints.up('sm')]: {
      marginLeft: theme.spacing(3),
      width: 'auto',
    },
  },
  searchIcon: {
    padding: theme.spacing(0, 2),
    height: '100%',
    position: 'absolute',
    pointerEvents: 'none',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    color:'white',
  },
  inputRoot: {
    color: 'inherit',
  },
  inputInput: {
    padding: theme.spacing(1, 1, 1, 0),
    // vertical padding + font size from searchIcon
    paddingLeft: `calc(1em + ${theme.spacing(4)}px)`,
    transition: theme.transitions.create('width'),
    width: '100%',
    [theme.breakpoints.up('md')]: {
      width: '20ch',
    },
  },
  sectionDesktop: {
    display: 'none',
    [theme.breakpoints.up('md')]: {
      display: 'flex',
    },
  },
  sectionMobile: {
    display: 'flex',
    [theme.breakpoints.up('md')]: {
      display: 'none',
    },
  },
  paper: {
    position: 'absolute',
    width: 400,
    backgroundColor: theme.palette.background.paper,
    border: '2px solid #000',
    boxShadow: theme.shadows[5],
    padding: theme.spacing(2, 4, 3),
  },
}));

export default function BsNav() {
  const classes = useStyles();
  
  
 
  const history = useHistory()
  //redux
  

  
 
  const[authEmail,setAuthEmail]=useState("")
  const[show,setShow]=useState(false)
  
    useEffect(() => {
      // will only run once when the app component loads...
  
      auth.onAuthStateChanged((authUser) => {
        console.log("THE USER IS >>> ", authUser);
  
        if (authUser) {
          // the user just logged in / the user was logged in

          setAuthEmail(authUser.email)
          setShow(true)
        } else {
          // the user is logged out
         console.log("n")
        }
      });
    }, []);
  
    const handleAuthenticaton = () => {
      if (authEmail) {
        auth.signOut();
        history.push("/")
      }
    }
  
  
  return (
    <div className="navbar">
    <div className={classes.grow}>
    
      <AppBar position="fixed">
        <Toolbar>
          <IconButton
            edge="start"
            className={classes.menuButton}
            color="inherit"
            aria-label="open drawer"
          >
            <MenuIcon />
          </IconButton>
          <Link to="/">
          <Typography className={classes.title} variant="h6" noWrap>
             GGF
           </Typography>
          </Link>
          <div className="btn1">
                    <Button variant="contained" color="primary" onClick={()=>{history.push("/register")}} >
        Add 
      </Button>
      <Button variant="contained" color="primary" onClick={()=>{history.push("/dashboard")}} >
        Dashboard
      </Button>
      <Button variant="contained" color="primary" onClick={()=>{history.push("/resume")}} >
       Employees
      </Button>
      <Button variant="contained" color="primary" onClick={()=>{history.push("/message")}} >
       Messages
      </Button>
     
      </div>
          <div className={classes.grow} />
          <div className={classes.sectionDesktop}>
            
                {
                    show?(<><h1 className="logout">Welcome {authEmail}  </h1> <Button variant="contained" color="primary" onClick={handleAuthenticaton} >
                    Sign out
                   </Button></>):
                    
                    (<>
                    <div className="btn">
                    <Button variant="contained" color="primary" >
        Login
      </Button>

      <Button variant="contained" color="secondary" >
        Register
      </Button>
      </div>
                    </>)
                }
         

     
          </div>
          <div className={classes.sectionMobile}>
            <IconButton
             
            >
              
              <MoreIcon />
            </IconButton>
          </div>
        </Toolbar>
      </AppBar>
     
    </div>
    </div>
  );
}