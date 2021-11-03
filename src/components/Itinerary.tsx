import { useState } from "react";
import { styled } from "@mui/material/styles";
import Card from "@mui/material/Card";
import CardHeader from "@mui/material/CardHeader";
import CardMedia from "@mui/material/CardMedia";
import CardContent from "@mui/material/CardContent";
import CardActions from "@mui/material/CardActions";
import Collapse from "@mui/material/Collapse";
import Avatar from "@mui/material/Avatar";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import { red } from "@mui/material/colors";
import FavoriteIcon from "@mui/icons-material/Favorite";
import ShareIcon from "@mui/icons-material/Share";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import { CityItinerariesResponse } from "../api";
import MoneyIcon from "@mui/icons-material/AttachMoney";
import ClockIcon from "@mui/icons-material/QueryBuilder";
import { Grid, Box, Chip, ButtonBase, useTheme } from "@mui/material";

const Itinerary: React.FC<{ data: CityItinerariesResponse }> = ({ data }) => {
  const { activities, creator, hashtags, price, time, title } = data;
  const { userId, profilePic } = creator;
  const theme = useTheme();
  const [isExpanded, setIsExpanded] = useState(false);

  return (
    <Card sx={{ width: "100%", backgroundColor: "paper" }}>
      <CardHeader
        avatar={<Avatar src={profilePic} />}
        // action={
        //   <IconButton aria-label="settings">
        //     <MoreVertIcon />
        //   </IconButton>
        // }
        title={<Typography>{title}</Typography>}
      />
      <CardContent>
        <Grid container spacing={3}>
          <Grid container item spacing={1} mx={0}>
            <Grid item xs={6}>
              <Box display="flex" gap={0.5} alignItems="center">
                <ClockIcon />
                <Typography>{time}</Typography>
              </Box>
            </Grid>
            <Grid item xs={6}>
              <Box display="flex" gap={0} alignItems="center">
                <MoneyIcon />
                <Typography>{price}</Typography>
              </Box>
            </Grid>
          </Grid>
          <Grid container item spacing={1} mx={0}>
            {hashtags.map((hashtag, i) => (
              <Grid key={i} item xs={3}>
                <Chip label={`#${hashtag}`} variant="filled" />
              </Grid>
            ))}
          </Grid>
        </Grid>
      </CardContent>
      <ButtonBase
        sx={{
          p: 2,
          width: "100%",
          display: "flex",
          justifyContent: "space-between"
        }}
        onClick={() => setIsExpanded(!isExpanded)}
      >
        <Typography>View Activities</Typography>
        <ExpandMoreIcon
          sx={{
            transform: !isExpanded ? "rotate(0deg)" : "rotate(180deg)",
            marginLeft: "auto",
            transition: theme.transitions.create("transform", {
              duration: theme.transitions.duration.shortest
            })
          }}
        />
      </ButtonBase>
      <Collapse in={isExpanded} timeout="auto" unmountOnExit>
        <CardContent>
          {activities.map((activity, i) => (
            <Typography key={i}>- {activity}</Typography>
          ))}
        </CardContent>
      </Collapse>
      {/* <ButtonBase
        sx={{
          p: 2,
          width: "100%",
          display: "flex",
          justifyContent: "space-between"
        }}
        onClick={() => setIsExpanded(!isExpanded)}
      >
        <Typography>
          Comments{" "}
          <Typography component="span" color="text.secondary">
            (25)
          </Typography>
        </Typography>
        <ExpandMoreIcon
          sx={{
            transform: !isExpanded ? "rotate(0deg)" : "rotate(180deg)",
            marginLeft: "auto",
            transition: theme.transitions.create("transform", {
              duration: theme.transitions.duration.shortest
            })
          }}
        />
      </ButtonBase> */}
    </Card>
  );
};

export default Itinerary;
