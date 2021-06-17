import React,{useState} from 'react';
import "./nav.css"
import { fade, makeStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import IconButton from '@material-ui/core/IconButton';
import Typography from '@material-ui/core/Typography';
import InputBase from '@material-ui/core/InputBase';
import MenuIcon from '@material-ui/icons/Menu';
import SearchIcon from '@material-ui/icons/Search';
import MoreIcon from '@material-ui/icons/MoreVert';
import Button from '@material-ui/core/Button';
import { db } from "../firebase";
import Modal from '@material-ui/core/Modal';
import { useStateValue } from "../StateProvider";
import {Link,useHistory} from 'react-router-dom'

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

export default function Nav() {
  const classes = useStyles();
  const[search,setSearch]=useState("")
  const[result,setResult]=useState([])
  // getModalStyle is not a pure function, we roll the style only on the first render
  const [modalStyle] = React.useState(getModalStyle);
  const [open, setOpen] = React.useState(false);
  const [open1, setOpen1] = React.useState(false);

  /*//opening modal
  const handleOpen = () => {
    setOpen(true);
  };*/

  //closing modal
  const handleClose = () => {
    setOpen(false);
  };

  //opening modal
  const handleOpen1 = () => {
    setOpen1(true);
  };

  //closing modal
  const handleClose1 = () => {
    setOpen1(false);
  };


  const searched=(e)=>{
    db.collection("search").where("name", "==", search)
    .onSnapshot((querySnapshot) => {
       
     setResult(querySnapshot.docs.map((doc)=>doc.data()))
       
})
setOpen(true);
  }


  const history = useHistory()
  //redux
  const [, dispatch] = useStateValue();

  

  //modal body
  const body = (
    <div style={modalStyle} className={classes.paper}>
      {
        result?
        (<>
        {result.map(m=>(
          <div className="search">
          <img src={m.image} alt="img"/>
          <h1>{m.name}</h1>
          <Button onClick={()=>{
           
              dispatch({
                  type: 'Set_Single',
                  item : m.username
              })
              setOpen(false);
              history.push('/business')
        
          }}>View</Button>
          </div>
        ))}
        
        </>):
        
        (<>
        <h1>Results not found</h1>
        </>)
      }
    </div>
  );

  //modal body
  const body1 = (
    <div style={modalStyle} className={classes.paper}>
     <div className="btn">
          <Button variant="contained" color="primary" >
        Login As User
      </Button>

      <Button variant="contained" color="secondary" onClick={()=>{history.push("/bslogin")}} >
        Login As Business
      </Button>

      </div>
    </div>
  );


  return (
    <div className="navbar">
    <div className={classes.grow}>
    <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="simple-modal-title"
        aria-describedby="simple-modal-description"
      >
        {body}
      </Modal>

      <Modal
        open={open1}
        onClose={handleClose1}
        aria-labelledby="simple-modal-title"
        aria-describedby="simple-modal-description"
      >
        {body1}
      </Modal>
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
          
          <div className={classes.search}>
            <InputBase
              placeholder="Search…"
              value={search}
              onChange={(e)=>{setSearch(e.target.value)}}
              classes={{
                root: classes.inputRoot,
                input: classes.inputInput,
              }}
              inputProps={{ 'aria-label': 'search' }}
              
            />
            <Button onClick={searched}><div className={classes.searchIcon}>
              <SearchIcon  />
            </div></Button>
          </div>
          
         
          <div className={classes.grow} />
          <div className={classes.sectionDesktop}>
            <div className="btn">
          <Button variant="contained" color="primary" onClick={handleOpen1}>
        Login
      </Button>

      <Button variant="contained" color="secondary" >
        Register
      </Button>

      </div>
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
