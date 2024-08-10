import React from "react";
import {
  Box,
  Stack,
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
  isDisabled?: boolean;
}

const FormToggleBtns: React.FC<IFormToggleBtns> = ({
  label,
  value,
  name,
  handleInputChange,
  options,
  isDisabled,
}) => {
  const handleAlignment = (
    event: React.MouseEvent<HTMLElement>,
    value: string | number
  ) => {
    if (name === "loan_term") {
      handleInputChange(name, Number(value));
    } else if (name === "rate_structure" && value === "arm") {
      handleInputChange(name, value);
      handleInputChange("loan_term", 30);
      handleInputChange("loan_type", "conf");
    } else {
      handleInputChange(name, value);
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
                key={index}
                disabled={isDisabled}
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
