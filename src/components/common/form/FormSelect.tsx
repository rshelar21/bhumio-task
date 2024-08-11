import React from "react";
import {
  Box,
  Select,
  MenuItem,
  SelectChangeEvent,
  Typography,
  Stack,
} from "@mui/material";
import { IOptions } from "../../../interfaces/utils";

interface IFormSelectProps {
  options: IOptions[];
  label: string;
  value: string;
  name: string;
  handleInputChange: (name: string, value: string) => void;
}

const FormSelect: React.FC<IFormSelectProps> = ({
  options,
  label,
  value,
  name,
  handleInputChange,
}) => {
  const handleChange = (event: SelectChangeEvent) => {
    const { name, value } = event.target;
    handleInputChange(name, value);
  };

  return (
    <Box width="100%">
      <Stack gap="6px">
        <Typography>{label}</Typography>
        <Select
          labelId="demo-simple-select-label"
          id="demo-simple-select"
          value={value || ""}
          onChange={handleChange}
          style={{
            height: "47px",
          }}
          MenuProps={{
            style: {
              maxHeight: 300,
            },
          }}
          name={name}
        >
          {options?.map((item, index) => (
            <MenuItem value={item?.value}>{item?.label}</MenuItem>
          ))}
        </Select>
      </Stack>
    </Box>
  );
};

export default FormSelect;
