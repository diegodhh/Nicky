import React from "react";

import Divider from "@material-ui/core/Divider";
import Drawer from "@material-ui/core/Drawer";
import ptypes from "prop-types";

import InboxIcon from "@material-ui/icons/MoveToInbox";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import ListItemText from "@material-ui/core/ListItemText";
import MailIcon from "@material-ui/icons/Mail";
import { Link } from "react-router-dom";
import { makeStyles } from "@material-ui/core/styles";

const drawerWidth = 240;

const useStyles = makeStyles((theme) => ({
  root: {
    display: "flex",
  },
  drawer: {
    [theme.breakpoints.up("sm")]: {
      width: drawerWidth,
      flexShrink: 0,
    },
  },
  appBar: {
    [theme.breakpoints.up("sm")]: {
      width: `calc(100% - ${drawerWidth}px)`,
      marginLeft: drawerWidth,
    },
  },
  menuButton: {
    marginRight: theme.spacing(2),
    [theme.breakpoints.up("sm")]: {
      display: "none",
    },
  },
  // necessary for content to be below app bar
  toolbar: theme.mixins.toolbar,
  drawerPaper: {
    width: drawerWidth,
  },
  content: {
    flexGrow: 1,
    padding: theme.spacing(3),
  },
}));
function NavigationDrawer(props) {
  const { open, onClose = false, links } = props;
  const classes = useStyles();
  console.log(links);
  return (
    <Drawer open={open} onClose={onClose}>
      <div>
        <div className={classes.toolbar} />
        <Divider />
        <List>
          {links.map(({ label, link, src }, index) => (
            <Link
              style={{ textDecoration: "none", color: "inherit" }}
              key={`${label}-${link}`}
              to={link}
            >
              <ListItem onClick={onClose} button>
                <ListItemIcon>
                  <img
                    style={{ widht: "24px", height: "24px" }}
                    src={src}
                    alt="Logo"
                  />
                </ListItemIcon>

                <ListItemText primary={label} />
              </ListItem>
            </Link>
          ))}
        </List>
        <Divider />
      </div>
    </Drawer>
  );
}

NavigationDrawer.propTypes = {
  open: ptypes.bool.isRequired,
  onClose: ptypes.func.isRequired,
  links: ptypes.array.isRequired,
};

export default NavigationDrawer;
