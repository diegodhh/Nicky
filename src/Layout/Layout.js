import React from "react";

import { makeStyles } from "@material-ui/core/styles";
import ptypes from "prop-types";
const useStyles = makeStyles((theme) => ({
  root: {
    display: "flex",
    flexDirection: "column",
  },
}));

Layout.propTypes = {
  children: ptypes.node,
};

function Layout({ children }) {
  const classes = useStyles();
  return (
    <>
      <div className={classes.root}>{children}</div>
    </>
  );
}

export default Layout;
