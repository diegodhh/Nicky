import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Fab from "@material-ui/core/Fab";
import AddIcon from "@material-ui/icons/Add";

const useStyles = makeStyles((theme) => ({
  root: {
    "& > *": {
      margin: theme.spacing(1),
    },
  },
  fab: {
    position: "fixed",
    bottom: "20px",
    right: "20px",
  },
  extendedIcon: {
    marginRight: theme.spacing(1),
  },
}));

export default function AddButton({ onAdd }) {
  const classes = useStyles();

  return (
    <div className={classes.root}>
      <Fab
        onClick={onAdd}
        className={classes.fab}
        color="primary"
        aria-label="add"
      >
        <AddIcon />
      </Fab>
    </div>
  );
}
