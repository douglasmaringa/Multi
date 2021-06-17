import React from 'react'
import "./projectCard.css"
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

const useStyles = makeStyles({
    root: {
      maxWidth: "50vw",
      height:"200px",
      padding:10,
      display:"grid",
      gridTemplateColumns:"1fr 1fr",
      marginTop:"20px"
    },
  });

function ServiceCard({name,summary,image,desc,username}) {
    const classes = useStyles();
    const history = useHistory()
    //redux
const [, dispatch] = useStateValue();

const newScreen = () => {
  dispatch({
      type: 'Set_SingleService',
      item : {
          name: name,
          summary: summary,
          desc: desc,
          image: image,
          username:username,
      },
  })
  history.push('/singleservice')
};

    return (
        <Card className={classes.root}>
        <div>
      <CardActionArea>
        <CardMedia
          component="img"
          alt="Contemplative Reptile"
          height="100%"
          image={image}
          title="Business"
        />
         </CardActionArea>
        </div>

        <div>
        <CardContent>
          <Typography gutterBottom variant="h5" component="h2">
           { name}
          </Typography>
          <Typography variant="body2" color="textSecondary" component="p">
           {summary}
           <br/>
          
          </Typography>
        </CardContent>
     
      <CardActions>
      <Button variant="contained" color="primary" onClick={newScreen} >
                     View
      </Button>
        
      </CardActions>
      </div>
    </Card>
    )
}

export default ServiceCard
