import React, { useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";
import Button from "@material-ui/core/Button";
import IconButton from "@material-ui/core/IconButton";
import MenuIcon from "@material-ui/icons/Menu";
import NavigationDrawer from "./NavegationDrawer";
import ptypes from "prop-types";
import TimeMachineIcon from "./../icons/Time-Machine-icon.png";
import EditZonesIcons from "./../icons/Edit-clear-history.png";

const links = [
  { link: "/", label: "Time Machine", src: TimeMachineIcon },
  { link: "/zones", label: "zones", src: EditZonesIcons },
];
const useStyles = makeStyles((theme) => ({
  root: {
    width: "100%",
  },
  menuButton: {
    marginRight: theme.spacing(2),
  },
  title: {
    flexGrow: 1,
  },
}));

function ButtonAppBar({ text, onAction, onActionLabel }) {
  const classes = useStyles();
  const [openDrawer, setOpenDrawer] = useState(false);
  function handleToggleDrawer() {
    setOpenDrawer((open) => !open);
  }
  console.log(onAction);
  return (
    <div className={classes.root}>
      <AppBar position="static">
        <Toolbar>
          <IconButton
            edge="start"
            onClick={handleToggleDrawer}
            className={classes.menuButton}
            color="inherit"
            aria-label="menu"
          >
            <MenuIcon />
          </IconButton>
          <Typography variant="h6" className={classes.title}>
            {text}
          </Typography>
          {onActionLabel && (
            <Button onClick={onAction} color="inherit">
              {onActionLabel}
            </Button>
          )}
        </Toolbar>
      </AppBar>
      <NavigationDrawer
        links={links}
        onClose={handleToggleDrawer}
        open={openDrawer}
      />
    </div>
  );
}
ButtonAppBar.propTypes = {
  text: ptypes.string.isRequired,
  onAction: ptypes.func.isRequired,
  onActionLabel: ptypes.func.isRequired,
};
export default ButtonAppBar;
