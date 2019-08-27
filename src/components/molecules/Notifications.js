import React, { useState, Fragment } from "react";
import { Link } from "react-router-dom";
import dayjs from "dayjs";
import relativeTime from "dayjs/plugin/relativeTime";
// Redux
import { useDispatch, useSelector } from "react-redux";
//Actions
import { markNotificationsAsRead } from "../../redux/actions/userActions";

// Material UI:
import Menu from "@material-ui/core/Menu";
import MenuItem from "@material-ui/core/MenuItem";
import IconButton from "@material-ui/core/IconButton";
import Tooltip from "@material-ui/core/Tooltip";
import Typography from "@material-ui/core/Typography";
import Badge from "@material-ui/core/Badge";
import NotificationsIcon from "@material-ui/icons/Notifications";
import FavoriteIcon from "@material-ui/icons/Favorite";
import ChatIcon from "@material-ui/icons/Chat";

const Notifications = () => {
  const dispatch = useDispatch();
  const [anchorElement, setAnchorEl] = useState(null);
  const notifications = useSelector(store => store.user.notifications);

  const handleOpen = event => setAnchorEl(event.target);
  const handleClose = () => setAnchorEl(null);
  const onMenuOpened = () => {
    let unreadNotificationsIds = notifications
      .filter(notification => !notification.read)
      .map(notification => notification.notificationId);
    dispatch(markNotificationsAsRead(unreadNotificationsIds));
  };
  let notificationsIcon;

  if (notifications && notifications.length > 0) {
    let numberOfUnreadNotifications = notifications.filter(
      notification => notification.read === false
    ).length;

    numberOfUnreadNotifications > 0
      ? (notificationsIcon = (
          <Badge badgeContent={numberOfUnreadNotifications} color="secondary">
            <NotificationsIcon />
          </Badge>
        ))
      : (notificationsIcon = <NotificationsIcon />);
  } else {
    notificationsIcon = <NotificationsIcon />;
  }

  let notificationsMarkup =
    notifications && notifications.length > 0 ? (
      notifications.map(notification => {
        const verb = notification.type === "like" ? "liked" : "commented on";
        const time = dayjs(notification.createdAt).fromNow();
        const iconColor = notification.read ? "primary" : "secondary";
        const icon =
          notification.type === "like" ? (
            <FavoriteIcon color={iconColor} style={{ marginRight: 10 }} />
          ) : (
            <ChatIcon color={iconColor} style={{ marginRight: 10 }} />
          );
        return (
          <MenuItem key={notification.createdAt} onClick={handleClose}>
            {icon}
            <Typography
              component={Link}
              color="default"
              variant="body1"
              to={`/users/${notification.recipient}/post/${
                notification.postId
              }`}
            >
              {notification.sender} {verb} your post {time}
            </Typography>
          </MenuItem>
        );
      })
    ) : (
      <MenuItem onClick={handleClose}>You have no notifications yet</MenuItem>
    );
  return (
    <Fragment>
      <Tooltip placement="top" title="Notifications">
        <IconButton
          aria-owns={anchorElement ? "simple-menud" : undefined}
          aria-haspopup="true"
          onClick={handleOpen}
        >
          {notificationsIcon}
        </IconButton>
      </Tooltip>
      <Menu
        anchorEl={anchorElement}
        open={Boolean(anchorElement)}
        onClose={handleClose}
        onEntered={onMenuOpened}
      >
        {notificationsMarkup}
      </Menu>
    </Fragment>
  );
};

export default Notifications;
