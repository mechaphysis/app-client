import React from "react";

import withStyles from "@material-ui/core/styles/withStyles";
import dayjs from "dayjs";

import Link from "@material-ui/core/Link";
import Paper from "@material-ui/core/Paper";
import Typograhpy from "@material-ui/core/Typography";
import LocationOn from "@material-ui/icons/LocationOn";
import LinkIcon from "@material-ui/icons/Link";
import CalendarToday from "@material-ui/icons/CalendarToday";

import { avatarStyles } from "../../../styles/general";

const styles = {
  ...avatarStyles,
  paper: {
    padding: 20
  },
  profile: {
    "& hr": {
      border: "none",
      margin: "0 0 10px 0"
    }
  }
};

const StaticProfile = () => {
  return <div />;
};

export default withStyles(styles)(StaticProfile);
