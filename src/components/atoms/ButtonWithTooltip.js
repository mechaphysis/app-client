import React from "react";
import IconButton from "@material-ui/core/IconButton";
import ToolTip from "@material-ui/core/Tooltip";

const ButtonWithTooltip = ({
  children,
  handleClick,
  tipTitle,
  tipClass,
  btnClass
}) => {
  return (
    <ToolTip title={tipTitle} className={tipClass} placement="top">
      <IconButton onClick={handleClick} className={btnClass}>
        {children}
      </IconButton>
    </ToolTip>
  );
};

export default ButtonWithTooltip;
