import React from "react";
import { Box, Typography, Stack } from "@mui/material";

interface ICustomErrorProps {
  desc?: string;
  title?: string;
}

const CustomError: React.FC<ICustomErrorProps> = ({ desc, title }) => {
  return (
    <Box
      width="100%"
      height="100%"
      position="absolute"
      bgcolor="rgba(0,0,0,0.05)"
    >
      <Box
        width="100%"
        height="100%"
        display="flex"
        justifyContent="center"
        alignItems="center"
      >
        <Box
          width="fit"
          border="1px solid red"
          bgcolor="#fadee1"
          zIndex="9999"
          padding="10px 20px"
          boxShadow="0 0 10px rgba(0,0,0,0.1)"
        >
          <Typography variant="h5">
            {title ? title : "Something went wrong"}
          </Typography>
          <Typography variant="body2">
            {desc ? desc : "Please check all the values and try again"}
          </Typography>
        </Box>
      </Box>
    </Box>
  );
};

export default CustomError;
