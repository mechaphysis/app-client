import React, { Fragment } from "react";
import { Link } from "react-router-dom";
import { useDispatch } from "react-redux";
import dayjs from "dayjs";

//Redux actions:
import { uploadImage, logOutUser } from "../../redux/actions/userActions";

//Material UI
import Paper from "@material-ui/core/Paper";
import Avatar from "@material-ui/core/Avatar";
import MuiLink from "@material-ui/core/Link";
import Typography from "@material-ui/core/Typography";
import LocationOn from "@material-ui/icons/LocationOn";
import LinkIcon from "@material-ui/icons/Link";
import CalendarToday from "@material-ui/icons/CalendarToday";
import EditIcon from "@material-ui/icons/Edit";
import KeyboardReturn from "@material-ui/icons/KeyboardReturn";
import EditProfile from "./EditProfile";
import ButtonWithTooltip from "../atoms/ButtonWithTooltip";

//FIXME: correct styling for avatar and placing by the side the icon for uploading image
export const AuthenticatedProfile = props => {
  //connect to redux using hooks:
  const dispatch = useDispatch();

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
    dispatch(uploadImage(formData));
  };

  const handleEditImage = () => {
    const fileInput = document.getElementById("imageUpload");
    fileInput.click();
  };

  const handleLogOut = () => {
    dispatch(logOutUser());
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
        <ButtonWithTooltip
          tipTitle="Change Profile Picture"
          handleClick={handleEditImage}
          btnClass="button"
        >
          <EditIcon color="primary" />
        </ButtonWithTooltip>
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
      <ButtonWithTooltip tipTitle="Logout" handleClick={handleLogOut}>
        <KeyboardReturn color="primary" />{" "}
      </ButtonWithTooltip>
      <EditProfile />
    </Paper>
  );
};
