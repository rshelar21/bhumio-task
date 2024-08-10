import React, { useState } from "react";
import { Menu, MenuItem, Button, Box, IconButton } from "@mui/material";
import SimCardDownloadOutlinedIcon from "@mui/icons-material/SimCardDownloadOutlined";

interface IDownloadChartBtn {
  handleHtmlToImage: () => void;
}

const DownloadChartBtn: React.FC<IDownloadChartBtn> = ({
  handleHtmlToImage,
}) => {
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);

  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = (e: React.MouseEvent<HTMLLIElement, MouseEvent>) => {
    console.log(e?.currentTarget?.innerText);
    setAnchorEl(null);
    handleHtmlToImage();
  };
  return (
    <Box display="flex" justifyContent="flex-end">
      <Button
        onClick={handleClick}
        endIcon={<SimCardDownloadOutlinedIcon />}
        variant="text"
        disableRipple={true}
        style={{
          textTransform: "none",
        }}
        id="basic-button"
        aria-controls={open ? "basic-menu" : undefined}
        aria-haspopup="true"
        aria-expanded={open ? "true" : undefined}
      >
        Download Chart
      </Button>
      <Menu
        id="basic-menu"
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
        MenuListProps={{
          "aria-labelledby": "basic-button",
          style: {
            width: "100px",
          },
        }}
      >
        <MenuItem onClick={handleClose}>PNG</MenuItem>
        <MenuItem onClick={handleClose}>SVG</MenuItem>
        <MenuItem onClick={handleClose}>JPEG</MenuItem>
      </Menu>
    </Box>
  );
};

export default DownloadChartBtn;
