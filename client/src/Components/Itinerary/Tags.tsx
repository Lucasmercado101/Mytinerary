import React from "react";
import { Grid, Chip, makeStyles } from "@material-ui/core";

const useStyles = makeStyles(() => ({
  tagsWrapper: {
    position: "relative",
    padding: "15px",
    listStyle: "none"
  }
}));

const Tags: React.FC<{ tags: [string?, string?, string?] }> = ({ tags }) => {
  const { tagsWrapper } = useStyles();
  return (
    <>
      <Grid
        component="ul"
        className={tagsWrapper}
        container
        direction="row"
        spacing={1}
      >
        {tags.map((tag, index) => (
          <Grid component="li" key={index} item>
            <Chip color="secondary" label={tag} />
          </Grid>
        ))}
      </Grid>
    </>
  );
};

export default Tags;
