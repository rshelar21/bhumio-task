import React from "react";
import { Slider, Box, Stack, Typography } from "@mui/material";
import { IRateOptions } from "../../../interfaces/RateOptions";

interface IFormSliderProps {
  label?: string;
  value: string;
  name: string;
  handleInputChange: (name: string, value: string | number) => void;
  rateOptions: IRateOptions;
}

function valueText(value: number) {
  if (value === 840) {
    const label = `${value} - ${value + 10}`;
    return label;
  } else {
    const label = `${value} - ${value + 19}`;
    return label;
  }
}

const FormSlider: React.FC<IFormSliderProps> = ({
  label,
  value,
  name,
  handleInputChange,
}) => {
  const handleChange = (event: Event, newValue: number | number[]) => {
    console.log(newValue, event);
    const value = newValue as number;
    if (value === 840) {
      handleInputChange("minfico", value);
      handleInputChange("maxfico", value + 10);
    } else {
      handleInputChange("minfico", value);
      handleInputChange("maxfico", value + 19);
    }
  };
  return (
    <Box width="100%">
      <Stack gap="6px">
        {label && <Typography>{label}</Typography>}
        <Box gap="12px" alignItems="center" display="flex">
          <Typography>600</Typography>
          <Slider
            defaultValue={720}
            aria-label="Default"
            valueLabelDisplay="auto"
            valueLabelFormat={valueText}
            min={600}
            max={840}
            step={20}
            marks
            name={name}
            onChange={handleChange}
          />
          <Typography>850</Typography>
        </Box>
      </Stack>
    </Box>
  );
};

export default FormSlider;
