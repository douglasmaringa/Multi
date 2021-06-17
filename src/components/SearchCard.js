import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import { useStateValue } from "../StateProvider";
import {useHistory} from 'react-router-dom'
import "./card.css"

const useStyles = makeStyles({
  root: {
    maxWidth: "60vw",
    height:"200px",
    padding:10,
    display:"grid",
    gridTemplateColumns:"1fr 1fr",
    marginTop:"20px"
  },
});

export default function SearchCard({name,summary ,desc,username,image}) {
  const classes = useStyles();
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

  return (
    <Card className={classes.root}>
        <div className="searchimg">
      <CardActionArea>
        <CardMedia
          component="img"
          alt="Contemplative Reptile"
          height="200"
          image={image}
          title="Business"
          
        />
         </CardActionArea>
        </div>

        <div>
        <CardContent>
          <Typography gutterBottom variant="h5" component="h2">
            {name}
          </Typography>
          <Typography variant="body2" color="textSecondary" component="p">
           {summary}
           <br/>
           
          </Typography>
        </CardContent>
     
      <CardActions>
        <div className="searchbtn">
      <Button size="small" variant="contained" color="primary" onClick={() => newScreen(username)}>
                     View
      </Button>
      </div>
      </CardActions>
      </div>
    </Card>
  );
}
