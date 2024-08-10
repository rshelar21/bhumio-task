import React, { useState } from "react";
import { Box, Stack, Typography } from "@mui/material";
import FormSelect from "../common/form/FormSelect";
import {
  statesList,
  rateTypeList,
  loanTermsList,
  loanTypesList,
  armTypesList,
} from "../../constants";
import FormInputText from "../common/form/FormInputText";
import PercentOutlinedIcon from "@mui/icons-material/PercentOutlined";
import AttachMoneyOutlinedIcon from "@mui/icons-material/AttachMoneyOutlined";
import FormToggleBtns from "../common/form/FormToggleBtns";
import FormSlider from "../common/form/FormSlider";
import { IRateOptions } from "../../interfaces/RateOptions";

interface IRateOptionSidebar {
  handleInputChange: (name: string, value: string | number) => void;
  rateOptions: IRateOptions;
}

const RateOptionSidebar: React.FC<IRateOptionSidebar> = ({
  handleInputChange,
  rateOptions,
}) => {
  return (
    <Box height="100%" width="100%" bgcolor="#ffffff">
      <Typography variant="h6">Explore Rate Options</Typography>
      <Stack direction="row" width="100%" gap="40px">
        <Box width="100%">
          <Box
            mt="12px"
            border="1px solid rgba(0,0,0,0.2)"
            padding="20px"
            borderRadius="12px"
          >
            <Stack gap="12px" direction="column">
              <FormSlider
                name=""
                value=""
                label="Credit score range"
                handleInputChange={handleInputChange}
                rateOptions={rateOptions}
              />
              <Box display="flex" gap="20px" alignItems="flex-end">
                <FormSelect
                  options={statesList}
                  label="Select State"
                  value={rateOptions?.state}
                  name="state"
                  handleInputChange={handleInputChange}
                />
                <FormInputText
                  label="House Price"
                  name="price"
                  value={rateOptions?.price}
                  handleInputChange={handleInputChange}
                  type="number"
                  placeholder="$1000"
                  Icon={
                    <AttachMoneyOutlinedIcon fontSize="small" color="action" />
                  }
                  rateOptions={rateOptions}
                />
              </Box>
              <Box display="flex" gap="20px" alignItems="flex-end">
                <FormInputText
                  label="Down Payment"
                  name="down_payment_amount_percent"
                  value={rateOptions?.down_payment_amount_percent}
                  handleInputChange={handleInputChange}
                  type="number"
                  placeholder="10"
                  Icon={<PercentOutlinedIcon fontSize="small" color="action" />}
                  rateOptions={rateOptions}
                />
                <FormInputText
                  name="down_payment_amount"
                  value={rateOptions?.down_payment_amount}
                  handleInputChange={handleInputChange}
                  type="number"
                  placeholder="$1000"
                  rateOptions={rateOptions}
                  Icon={
                    <AttachMoneyOutlinedIcon fontSize="small" color="action" />
                  }
                />
              </Box>

              <Box>
                {rateOptions?.down_payment_amount >= rateOptions?.price && (
                  <Typography fontWeight="400" fontSize="14px" color="red">
                    Your down payment cannot be more than your house price.
                  </Typography>
                )}
              </Box>

              <Stack direction="column" gap="0px" pt="4px">
                <Typography>Loan amount</Typography>
                <Typography variant="h6">
                  $ {rateOptions?.loan_amount}
                </Typography>
              </Stack>
            </Stack>
          </Box>
        </Box>
        <Box width="100%">
          <Box
            mt="12px"
            border="1px solid rgba(0,0,0,0.2)"
            padding="20px"
            borderRadius="12px"
          >
            <Stack gap="12px" direction="column">
              <FormToggleBtns
                label="Rate Type"
                options={rateTypeList}
                value={rateOptions?.rate_structure}
                name="rate_structure"
                handleInputChange={handleInputChange}
              />
              <FormToggleBtns
                label="Loan Term"
                options={loanTermsList}
                value={rateOptions?.loan_term}
                name="loan_term"
                handleInputChange={handleInputChange}
                isDisabled={rateOptions?.rate_structure === "arm"}
              />
              <FormToggleBtns
                label="Loan Type"
                options={loanTypesList}
                value={rateOptions?.loan_type}
                name="loan_type"
                handleInputChange={handleInputChange}
                isDisabled={rateOptions?.rate_structure === "arm"}
              />
              {rateOptions?.rate_structure === "arm" && (
                <FormToggleBtns
                  label="ARM Type"
                  options={armTypesList}
                  value={rateOptions?.arm_type}
                  name="arm_type"
                  handleInputChange={handleInputChange}
                />
              )}
            </Stack>
          </Box>
        </Box>
      </Stack>
    </Box>
  );
};

export default RateOptionSidebar;
