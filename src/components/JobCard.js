import React from 'react'
import "./projectCard.css"
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import {useHistory} from 'react-router-dom'

const useStyles = makeStyles({
    root: {
      maxWidth: "50vw",
      height:"180px",
      padding:10,
      display:"grid",
      gridTemplateColumns:"1fr 1fr",
      marginTop:"20px"
    },
  });

function JobCard({name,desc,salary,location,username}) {
  const history = useHistory()
    const classes = useStyles();

    const go=()=>{
    
      history.push('/jobform')
     
    }
    return (
        <Card className={classes.root}>
        <div>
        <CardContent>
          <Typography gutterBottom variant="h5" component="h2">
            {name}<br/><strong>${salary} per year</strong>
          </Typography>
          <Typography variant="body2" color="textSecondary" component="p">
         {desc}
           <br/>
          City :{location}
          </Typography>
        </CardContent>
      </div>
      <div className="jobcard">
      <Button size="small" variant="contained" color="primary" onClick={go}>
                    Apply
      </Button>
      </div>
    </Card>
    )
}

export default JobCard
