import axios from "axios";
import { useState, useEffect } from "react";
import { IRateOptions } from "../../interfaces/RateOptions";

export const getRates = async (rateOptions: IRateOptions) => {
  try {
    const res = await axios.get(
      `/oah-api/rates/rate-checker?price=${rateOptions?.price}&loan_amount=${rateOptions?.loan_amount}&minfico=${rateOptions?.minfico}&maxfico=${rateOptions?.maxfico}&state=${rateOptions?.state}&rate_structure=${rateOptions?.rate_structure}&loan_term=${rateOptions?.loan_term}&loan_type=${rateOptions?.loan_type}&arm_type=${rateOptions?.arm_type}`
    );
    return res.data;
  } catch (error: any) {
    if (error) {
      throw new Error(error.response.data.message);
    }
  }
};
