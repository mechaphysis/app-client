import React, { Fragment } from "react";
import ButtonWithTooltip from "../atoms/ButtonWithTooltip";
import PublishPost from "./PublishPost";
import HomeIcon from "@material-ui/icons/Home";
import Notifications from "@material-ui/icons/Notifications";
import { Link } from "@material-ui/core";

const AuthenticatedButtons = () => {
  return (
    <Fragment>
      <PublishPost />
      <Link to="/">
        <ButtonWithTooltip tipTitle="Home">
          <HomeIcon color="action" />
        </ButtonWithTooltip>
      </Link>
      <Notifications color="inherit" />
    </Fragment>
  );
};

export default AuthenticatedButtons;
