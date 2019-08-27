import React, { Fragment } from "react";
import { Link } from "react-router-dom";
import ButtonWithTooltip from "../atoms/ButtonWithTooltip";
import PublishPost from "./PublishPost";
import HomeIcon from "@material-ui/icons/Home";
import Notifications from "./Notifications";

const AuthenticatedButtons = () => {
  return (
    <Fragment>
      <PublishPost />
      <Link to="/">
        <ButtonWithTooltip tipTitle="Home">
          <HomeIcon color="action" />
        </ButtonWithTooltip>
      </Link>

      <Notifications />
    </Fragment>
  );
};

export default AuthenticatedButtons;
