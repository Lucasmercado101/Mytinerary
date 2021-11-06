import { useContext, useState } from "react";
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
import {
  CityItinerariesResponse,
  postNewCityItineraryComment,
  postNewCityItineraryCommentFnInput
} from "../api";
import MoneyIcon from "@mui/icons-material/AttachMoney";
import ClockIcon from "@mui/icons-material/QueryBuilder";
import {
  TextField,
  Grid,
  Box,
  Chip,
  ButtonBase,
  useTheme,
  List,
  ListItem,
  Button,
  ListItemAvatar,
  ListItemText
} from "@mui/material";
import { Ctx } from "../Context";
import { useMutation, useQueryClient } from "react-query";

const Itinerary: React.FC<{
  data: CityItinerariesResponse;
}> = ({ data }) => {
  const ctx = useContext(Ctx)!;

  const queryClient = useQueryClient();

  const { mutateAsync, isLoading } = useMutation(
    (vars: postNewCityItineraryCommentFnInput) =>
      postNewCityItineraryComment(vars)
  );
  const [newComment, setNewComment] = useState("");
  const { activities, creator, hashtags, price, time, title, comments } = data;
  const { id: userId, profilePic } = creator;
  const theme = useTheme();
  const [isExpanded, setIsExpanded] = useState(false);
  const [areCommentsExpanded, setAreCommentsExpanded] = useState(false);
  const [newUserComment, setNewUserComment] = useState<null | string>(null);

  const handleSubmit = () => {
    mutateAsync({
      // assuming it's logged in if it reached this function
      // then userData always exists
      authorId: ctx.userData!.id,
      content: newComment,
      itineraryId: data.id
    }).then(() => {
      setNewComment("");
      setNewUserComment(null);
      queryClient.invalidateQueries("cityItineraries");
    });
    setNewComment("");
  };

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
      <ButtonBase
        sx={{
          p: 2,
          width: "100%",
          display: "flex",
          justifyContent: "space-between"
        }}
        onClick={() => {
          setAreCommentsExpanded(!areCommentsExpanded);
          setNewUserComment(null);
        }}
      >
        <Typography>
          Comments{" "}
          <Typography component="span" color="text.secondary">
            ({comments?.length ?? 0})
          </Typography>
        </Typography>
        <ExpandMoreIcon
          sx={{
            transform: !areCommentsExpanded ? "rotate(0deg)" : "rotate(180deg)",
            marginLeft: "auto",
            transition: theme.transitions.create("transform", {
              duration: theme.transitions.duration.shortest
            })
          }}
        />
      </ButtonBase>
      <Collapse in={areCommentsExpanded} timeout="auto" unmountOnExit>
        <CardContent>
          {ctx.userData && (
            <Collapse in={newUserComment !== ""} timeout="auto" unmountOnExit>
              <div style={{ display: "flex" }}>
                <Button size="small" color="primary">
                  My comments (
                  {(ctx.userData &&
                    comments &&
                    comments.length &&
                    comments.filter((c) => c.Author.id === ctx.userData!.id)
                      .length) ??
                    0}
                  )
                </Button>
                <Button
                  onClick={() => setNewUserComment("")}
                  size="small"
                  color="primary"
                  sx={{ ml: "auto" }}
                >
                  Add Comment
                </Button>
              </div>
            </Collapse>
          )}
          <Collapse
            in={typeof newUserComment === "string"}
            timeout="auto"
            unmountOnExit
          >
            <Grid container spacing={2}>
              <Grid item xs={12}>
                <TextField
                  value={newComment}
                  onChange={(e) => setNewComment(e.target.value)}
                  multiline
                  fullWidth
                />
              </Grid>
              <Grid container item xs={12} spacing={3}>
                <Grid item ml={"auto"}>
                  <Button
                    onClick={() => setNewUserComment(null)}
                    sx={{ px: 3 }}
                    fullWidth
                    variant="text"
                  >
                    Cancel
                  </Button>
                </Grid>
                <Grid item>
                  <Button
                    disabled={isLoading}
                    onClick={handleSubmit}
                    sx={{ px: 3 }}
                    fullWidth
                    variant="contained"
                  >
                    Submit
                  </Button>
                </Grid>
              </Grid>
            </Grid>
          </Collapse>
          {comments && comments.length > 0 && (
            <List sx={{ padding: 0, margin: 0 }}>
              {comments.map((el) => (
                <ListItem key={el.id} sx={{ px: 0 }}>
                  {el.Author.profilePic && (
                    <ListItemAvatar>
                      <Avatar src={el.Author.profilePic} />
                    </ListItemAvatar>
                  )}
                  <ListItemText primary={el.comment} />
                </ListItem>
              ))}
            </List>
          )}
        </CardContent>
      </Collapse>
    </Card>
  );
};

export default Itinerary;
