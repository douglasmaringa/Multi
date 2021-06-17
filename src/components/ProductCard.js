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

const useStyles = makeStyles({
    root: {
      maxWidth: "200px",
      height:"200px",
      padding:10,
    },
  });

function ProductCard({name,image,summary,price}) {
    const classes = useStyles();

    return (
        <Card className={classes.root}>
        <div>
      <CardActionArea>
        <CardMedia
          component="img"
          alt="Contemplative Reptile"
          height="100px"
          image={image}
          title="Business"
        />
         </CardActionArea>
        </div>

        <div>
        <CardContent>
          <Typography gutterBottom variant="h5" component="h2">
           { name}<br/><strong>${price}</strong>
          </Typography>
          <Typography variant="body2" color="textSecondary" component="p">
           {summary}
           <br/>
          
          </Typography>
        </CardContent>
     
      <CardActions>
      <Button size="small" variant="contained" color="primary" >
                     View
      </Button>
        
      </CardActions>
      </div>
    </Card>
    )
}

export default ProductCard
