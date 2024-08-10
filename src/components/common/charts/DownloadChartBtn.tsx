import React, { useState } from "react";
import { Menu, MenuItem, Button, Box, IconButton } from "@mui/material";
import SimCardDownloadOutlinedIcon from "@mui/icons-material/SimCardDownloadOutlined";

interface IDownloadChartBtn {
  handleHtmlToImage: (type: string) => void;
}

const DownloadChartBtn: React.FC<IDownloadChartBtn> = ({
  handleHtmlToImage,
}) => {
  const [currentValue, setCurrentValue] = useState<null | HTMLElement>(null);
  const open = Boolean(currentValue);

  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setCurrentValue(event.currentTarget);
  };

  const handleClose = (e: React.MouseEvent<HTMLLIElement, MouseEvent>) => {
    console.log(e?.currentTarget?.innerText);
    setCurrentValue(null);
    handleHtmlToImage(e?.currentTarget?.innerText);
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
        anchorEl={currentValue}
        open={open}
        onClose={handleClose}
        MenuListProps={{
          "aria-labelledby": "basic-button",
          style: {
            width: "100px",
          },
        }}
      >
        <MenuItem
          onClick={handleClose}
          style={{
            fontSize: "14px",
            fontWeight: 400,
          }}
        >
          PNG
        </MenuItem>
        <MenuItem
          onClick={handleClose}
          style={{
            fontSize: "14px",
            fontWeight: 400,
          }}
        >
          SVG
        </MenuItem>
        <MenuItem
          onClick={handleClose}
          style={{
            fontSize: "14px",
            fontWeight: 400,
          }}
        >
          JPEG
        </MenuItem>
        <MenuItem
          onClick={handleClose}
          style={{
            fontSize: "14px",
            fontWeight: 400,
          }}
        >
          PRINT
        </MenuItem>
      </Menu>
    </Box>
  );
};

export default DownloadChartBtn;
