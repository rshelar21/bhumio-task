import React from "react";
import { TextField, Box, Typography, Stack } from "@mui/material";
import { IRateOptions } from "../../../interfaces/RateOptions";

interface IFormInputText {
  label?: string;
  value: number | string;
  name: string;
  handleInputChange: (name: string, value: string | number) => void;
  type: string;
  placeholder?: string;
  Icon?: any;
  rateOptions: IRateOptions;
}

const FormInputText: React.FC<IFormInputText> = ({
  label,
  value,
  name,
  handleInputChange,
  type,
  placeholder,
  Icon,
  rateOptions,
}) => {
  const handleChange = (
    event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = event.target;
    if (name === "down_payment_amount_percent") {
      if (Number(value) <= 100 && Number(value) >= 0) {
        const downPaymentAmount =
          (Number(rateOptions?.price) * Number(value)) / 100;
        handleInputChange(name, value);
        handleInputChange("down_payment_amount", downPaymentAmount);
        handleInputChange(
          "loan_amount",
          Number(rateOptions?.price) - downPaymentAmount
        );
        return;
      }
    }

    if (name === "price") {
      const downPaymentAmount =
        (Number(value) * Number(rateOptions?.down_payment_amount_percent)) /
        100;
      handleInputChange(name, Number(value));
      handleInputChange("down_payment_amount", downPaymentAmount);
      handleInputChange("loan_amount", Number(value) - downPaymentAmount);
      return;
    }
    if (name === "down_payment_amount") {
      const downPaymentPercent = Number(value) / Number(rateOptions?.price);
      console.log("down_payment_amount_percent", downPaymentPercent);
      handleInputChange(name, Number(value));
      handleInputChange("down_payment_amount_percent", downPaymentPercent);
      handleInputChange(
        "loan_amount",
        Number(rateOptions?.price) - Number(value)
      );
      return;
    }
  };
  return (
    <Box width="100%">
      <Stack gap="6px">
        {label && <Typography>{label}</Typography>}
        <Box
          width="100%"
          position="relative"
          display="flex"
          alignItems="center"
        >
          <TextField
            id="outlined-basic"
            variant="outlined"
            inputProps={{
              style: {
                padding: "12px 10px",
              },
            }}
            value={value}
            name={name}
            type={type}
            placeholder={placeholder}
            style={{ width: "100%" }}
            autoComplete="off"
            onChange={handleChange}
          />
          {Icon && (
            <Box position="absolute" zIndex="999" right="12px">
              {Icon}
            </Box>
          )}
        </Box>
      </Stack>
    </Box>
  );
};

export default FormInputText;
