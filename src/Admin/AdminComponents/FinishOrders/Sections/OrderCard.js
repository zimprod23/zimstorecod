import React from "react";
import Button from "@material-ui/core/Button";
import Card from "@material-ui/core/Card";
import CardActions from "@material-ui/core/CardActions";
import { CardActionArea } from "@material-ui/core";
import CardContent from "@material-ui/core/CardContent";
import CardMedia from "@material-ui/core/CardMedia";
import Typography from "@material-ui/core/Typography";
import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles((theme) => ({
  root: {
    maxWidth: 345,
  },
  media: {
    height: 140,
  },
  reduction: {
    fontSize: 18,
    color: "red",
  },
  desc: {
    wordWrap: "break-word",
  },
}));

function ProductCards(props) {
  let alternative = `/product/${props.product.id}`;

  const classes = useStyles();
  return (
    <div>
      <Card className={classes.root}>
        <a
          href={`${props.product.link ? props.product.link : alternative}`}
          target="_blank"
        >
          <CardActionArea>
            <CardMedia
              className={classes.media}
              alt={props.product.name}
              image={props.product.overview}
              title={props.product.name}
            />
            <CardContent>
              <Typography gutterBottom variant="h5" component="h2">
                {props.product.name}
              </Typography>
              <Typography
                variant="body2"
                color="textSecondary"
                component="p"
                className={classes.desc}
              >
                Size : {props.product.size ? props.product.size : "none"}
              </Typography>
              <Typography
                variant="body2"
                color="textSecondary"
                component="p"
                className={classes.desc}
              >
                size : {props.product.quantity}
              </Typography>
              <Typography
                variant="body2"
                color="textSecondary"
                component="p"
                className={classes.desc}
              >
                .
              </Typography>
            </CardContent>
          </CardActionArea>
        </a>
        <CardActions>
          <Button size="small" color="primary">
            {`${props.product.price} MAD`}
          </Button>
          <Button size="small" color="primary">
            {`${props.product.originalPrice} MAD`}
          </Button>
        </CardActions>
      </Card>
    </div>
  );
}

export default ProductCards;
