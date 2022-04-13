import React from "react";

// css
import useStyles from "./Footer.css";

// material-ui
import Typography from "@material-ui/core/Typography";
import Box from "@material-ui/core/Box";

// atomic

export default function Footer() {
  const classes = useStyles();
  return (
    <Box className={classes.box}>
      <Typography variant="body2" color="textSecondary" align="center">
        {"Copyright© "}
        MONEY USER {new Date().getFullYear()}
        {" ver." + "0.0.1"}
      </Typography>
    </Box>
  );
}
