import React, { useState } from "react";
import {
  Box,
  Stack,
  IconButton,
  Tooltip,
  Typography,
  ToggleButton,
  ToggleButtonGroup,
} from "@mui/material";
import { IOptions } from "../../../interfaces/utils";

interface IFormToggleBtns {
  label?: string;
  value: string | number;
  name: string;
  handleInputChange: (name: string, value: string | number) => void;
  options: IOptions[];
}

const FormToggleBtns: React.FC<IFormToggleBtns> = ({
  label,
  value,
  name,
  handleInputChange,
  options,
}) => {
  const handleAlignment = (
    event: React.MouseEvent<HTMLElement>,
    newAlignment: string | number
  ) => {
    if (name === "loan_term") {
      handleInputChange(name, Number(newAlignment));
    } else {
      handleInputChange(name, newAlignment);
    }
  };
  return (
    <Box width="100%">
      <Stack gap="6px">
        {label && <Typography>{label}</Typography>}
        <Box width="100%">
          <ToggleButtonGroup
            value={value}
            exclusive
            onChange={handleAlignment}
            fullWidth
          >
            {options?.map((item, index) => (
              <ToggleButton
                value={item?.value}
                aria-label={item?.value}
                style={{
                  backgroundColor:
                    value?.toString() === item?.value ? "#94d2bd" : "",
                  color: "#000",
                }}
              >
                <Typography
                  style={{
                    textTransform: "none",
                  }}
                >
                  {item?.label}
                </Typography>
              </ToggleButton>
            ))}
          </ToggleButtonGroup>
        </Box>
      </Stack>
    </Box>
  );
};

export default FormToggleBtns;
