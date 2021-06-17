import React,{useState,useEffect} from 'react'
import {BrowserRouter as Router,Switch,Route} from "react-router-dom";
import "./App.css"
import { auth } from "./firebase";
import Register from "./screens/Register"
import Search from "./screens/Search"
import Footer from "./components/Footer"
import Nav from "./components/Nav"
import Business from "./screens/Business"
import SingleProject from "./screens/SingleProject"
import SingleEvent from "./screens/SingleEvent"
import SingleService from "./screens/SingleService"
import JobsForm from "./screens/JobsForm"
import Thankyou from "./screens/Thankyou"
import Home from "./screens/Home"
import BusinessSignup from "./screens/BusinessSignup"
import BsNav from "./components/BsNav"
import BsLogin from "./screens/BsLogin"
import Dashboard from "./screens/Dashboard"
import JobRegister from "./screens/JobRegister"
import Resume from "./screens/Resume"
import EventSearch from "./screens/EventSearch"
import Message from "./screens/Message"
import Hometoevent from "./screens/Hometoevent"
import ScrollToTop from "./ScrollToTop"
import ProjectSearch from "./screens/ProjectSearch"
import HometoProject from "./screens/HomeToProject"

function App() {

  const[authEmail,setAuthEmail]=useState("")
  useEffect(() => {
    // will only run once when the app component loads...

    auth.onAuthStateChanged((authUser) => {
      console.log("THE USER IS >>> ", authUser);

      if (authUser) {
        // the user just logged in / the user was logged in

        setAuthEmail(authUser.email)
        
      } else {
        // the user is logged out
       console.log("n")
      }
    });
  }, []);
  return (
    <Router>
       <ScrollToTop>
      <Switch>
      <Route path="/thankyou">
        <Nav/>
            <Thankyou/>
            <Footer/>
          </Route>
          <Route path="/projectsearch">
        <Nav/>
            <ProjectSearch/>
           
          </Route>
          <Route path="/hometoevent">
        <Nav/>
            <Hometoevent/>
            <Footer/>
           </Route>
           <Route path="/hometoproject">
        <Nav/>
            <HometoProject/>
            <Footer/>
           </Route>
          <Route path="/eventsearch">
        <Nav/>
            <EventSearch/>
           
          </Route>
        <Route path="/jobform">
        <Nav/>
            <JobsForm/>
            <Footer/>
          </Route>
        <Route path="/singleservice">
        <Nav/>
            <SingleService/>
            <Footer/>
          </Route>
      <Route path="/singleevent">
        <Nav/>
            <SingleEvent/>
            <Footer/>
          </Route>
      <Route path="/singleproject">
        <Nav/>
            <SingleProject/>
            <Footer/>
          </Route>
          
      <Route path="/business">
        <Nav/>
            <Business/>
            <Footer/>
          </Route>
      <Route path="/search">
            <Search />
          </Route>
          <Route path="/resume">
          <BsNav/>
            <Resume/>
            <Footer/>
          </Route>
          <Route path="/jobregister">
          <Nav/>
            <JobRegister/>
            <Footer/>
          </Route>
          <Route path="/message">
          <BsNav/>
            <Message/>
            <Footer/>
          </Route>
          <Route path="/dashboard">
          <BsNav/>
            <Dashboard email={authEmail}/>
            <Footer/>
          </Route>
          <Route path="/register">
            <>
            <BsNav/>
            <Register />
            <Footer/>
            </>
          </Route>
          <Route path="/bslogin">
            <>
            
            <BsLogin />
            <Footer/>
            </>
          </Route>
          <Route path="/bsregister">
            <>
           
            <BusinessSignup />
            <Footer/>
            </>
          </Route>
          <Route path="/">
          <Nav/>
          <Home/>
          <Footer/>
          </Route>
        </Switch>
        </ScrollToTop>
    </Router>
  )
}

export default App
