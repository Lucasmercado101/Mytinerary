import React, { useState } from "react";
import {
  Typography,
  Card,
  CardHeader,
  Avatar,
  CardContent,
  CardActions,
  IconButton,
  Collapse,
  Divider,
  makeStyles
} from "@material-ui/core";
import {
  Favorite as FavoriteIcon,
  ExpandMore as ShowMoreIcon
} from "@material-ui/icons";
import Tags from "./Tags";

const useStyles = makeStyles((theme) => ({
  avatar: {
    background: theme.palette.primary.main
  },
  showMoreButton: {
    transition: "100ms linear"
  },
  showMoreClosed: {
    marginLeft: "auto",
    rotate: "0deg"
  },
  showMoreOpen: {
    marginLeft: "auto",
    rotate: "180deg"
  }
}));

type Props = {
  title: string;
  description: string;
  tags?: [string?, string?, string?];
};

const Itinerary: React.FC<Props> = ({ title, description, tags }) => {
  const [isDetailsopen, setIsDetailsopen] = useState(false);
  const { avatar, showMoreButton, showMoreClosed, showMoreOpen } = useStyles();

  return (
    <Card component="article" elevation={2}>
      <CardHeader
        component="header"
        avatar={
          <Avatar className={avatar} aria-label="recipe">
            R
          </Avatar>
        }
        title={title}
      />
      <Divider variant="fullWidth" />
      <CardContent>
        <Typography variant="body2" color="textSecondary" component="p">
          {description}
        </Typography>
      </CardContent>
      <CardActions disableSpacing>
        <IconButton aria-label="add to favorites">
          <FavoriteIcon />
        </IconButton>
        <IconButton
          className={`${showMoreButton} ${
            isDetailsopen ? showMoreOpen : showMoreClosed
          } `}
          onClick={() => setIsDetailsopen(!isDetailsopen)}
          aria-expanded={isDetailsopen}
          aria-label="show more"
        >
          <ShowMoreIcon />
        </IconButton>
      </CardActions>
      <Collapse in={isDetailsopen} timeout="auto" unmountOnExit>
        <CardContent>
          <Typography paragraph>Method:</Typography>
          <Typography paragraph>
            Heat 1/2 cup of the broth in a pot until simmering, add saffron and
            set aside for 10 minutes.
          </Typography>
          <Typography paragraph>
            Heat oil in a (14- to 16-inch) paella pan or a large, deep skillet
            over medium-high heat. Add chicken, shrimp and chorizo, and cook,
            stirring occasionally until lightly browned, 6 to 8 minutes.
            Transfer shrimp to a large plate and set aside, leaving chicken and
            chorizo in the pan. Add pimentón, bay leaves, garlic, tomatoes,
            onion, salt and pepper, and cook, stirring often until thickened and
            fragrant, about 10 minutes. Add saffron broth and remaining 4 1/2
            cups chicken broth; bring to a boil.
          </Typography>
          <Typography paragraph>
            Add rice and stir very gently to distribute. Top with artichokes and
            peppers, and cook without stirring, until most of the liquid is
            absorbed, 15 to 18 minutes. Reduce heat to medium-low, add reserved
            shrimp and mussels, tucking them down into the rice, and cook again
            without stirring, until mussels have opened and rice is just tender,
            5 to 7 minutes more. (Discard any mussels that don’t open.)
          </Typography>
          <Typography>
            Set aside off of the heat to let rest for 10 minutes, and then
            serve.
          </Typography>
        </CardContent>
      </Collapse>
      {tags && (
        <footer>
          <Divider variant="middle" />
          <Tags tags={tags} />
        </footer>
      )}
    </Card>
  );
};

export default Itinerary;
