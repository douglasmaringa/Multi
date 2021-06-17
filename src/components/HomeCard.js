import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';

import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';

import Typography from '@material-ui/core/Typography';

import {useHistory} from 'react-router-dom'
import "./card.css"

const useStyles = makeStyles({
  root: {
    maxWidth: "40vw",
    height:"200px",
    padding:10,
    display:"grid",
    gridTemplateColumns:"300px 200px",
    marginTop:"20px",
    marginRight:"20px"
  },
});

export default function HomeCard({name,summary ,desc,username,image}) {
  const classes = useStyles();
  const history = useHistory()
  //redux
  /*const [{ single }, dispatch] = useStateValue();

  const newScreen = (username) => {
    dispatch({
        type: 'Set_Single',
        item : username
    })
   
    history.push('/business')
};*/

  return (
    <Card className={classes.root}>
        <div className="searchimg">
      <CardActionArea>
        <CardMedia
          component="img"
          alt="Contemplative Reptile"
          height="200"
          width="400"
          image={image}
          title="Business"
          onClick={()=>{history.push("/search")}}
        />
         </CardActionArea>
        </div>

        <div>
        <CardContent>
          <Typography gutterBottom variant="h5" component="h2">
            {name}
          </Typography>
        </CardContent>
      </div>
    </Card>
  );
}