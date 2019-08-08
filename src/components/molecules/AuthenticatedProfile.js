import React, { Fragment } from "react";
import { Link } from "react-router-dom";
import dayjs from "dayjs";
//Material UI
import Paper from "@material-ui/core/Paper";
import Avatar from "@material-ui/core/Avatar";
import MuiLink from "@material-ui/core/Link";
import Typography from "@material-ui/core/Typography";
import LocationOn from "@material-ui/icons/LocationOn";
import LinkIcon from "@material-ui/icons/Link";
import CalendarToday from "@material-ui/icons/CalendarToday";
import IconButton from "@material-ui/core/IconButton";
import EditIcon from "@material-ui/icons/Edit";
import ToolTip from "@material-ui/core/Tooltip";
import KeyboardReturn from "@material-ui/icons/KeyboardReturn";
import EditProfile from "./EditProfile";

//FIXME: correct styling for avatar and placing by the side the icon for uploading image
export const AuthenticatedProfile = props => {
  const {
    classes,
    user: {
      credentials: { imageUrl, handle, bio, website, location, createdAt }
    }
  } = props;

  const handleImageChange = event => {
    const imageFile = event.target.files[0];
    const formData = new FormData();
    formData.append("image", imageFile, imageFile.name);
    props.uploadImage(formData);
  };

  const handleEditImage = () => {
    const fileInput = document.getElementById("imageUpload");
    fileInput.click();
  };

  const handleLogOut = () => {
    props.logOutUser();
  };

  return (
    <Paper className={classes.paper}>
      <div className={classes.profile}>
        <Avatar alt={`Profile`} src={imageUrl} className={classes.bigAvatar} />
        <input
          type="file"
          id="imageUpload"
          hidden="hidden"
          onChange={handleImageChange}
        />
        <ToolTip title="Change Profile Picture" placement="top">
          <IconButton onClick={handleEditImage} className="button">
            <EditIcon color="primary" />
          </IconButton>
        </ToolTip>
        <MuiLink
          component={Link}
          to={`/users/${handle}`}
          color="primary"
          variant="h5"
        >
          @{handle}
        </MuiLink>
        <hr />
        {bio && <Typography variant="body2">{bio}</Typography>}
        <hr />
        {location && (
          <Fragment>
            <LocationOn color="primary">
              <span>{location}</span>
            </LocationOn>
            <hr />
          </Fragment>
        )}
        {website && (
          <Fragment>
            <LinkIcon color="primary" />
            <a href={website} target="_blank" rel="noopener noreferrer">
              {" "}
              {website}
            </a>
            <hr />
          </Fragment>
        )}
        <CalendarToday color="primary" />{" "}
        <span>Joined {dayjs(createdAt).format("MMM YYYY")}</span>
      </div>
      <ToolTip title="Log out" placement="top">
        <IconButton onClick={handleLogOut}>
          <KeyboardReturn color="primary" />
        </IconButton>
      </ToolTip>
      <EditProfile />
    </Paper>
  );
};
