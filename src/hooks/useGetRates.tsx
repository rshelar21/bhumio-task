// import axios from "../lib/axios";
import axios from "axios";
import { useState, useEffect } from "react";

export const useGetRates = () => {
  const [data, setData] = useState();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    fetchRates();
  }, []);

  const fetchRates = async () => {
    try {
      setLoading(true);
      // const response = await axios.get(
      //   "/rate-checker?price=200000&loan_amount=180000&minfico=700&maxfico=719&state=AL&rate_structure=fixed&loan_term=30&loan_type=conf&arm_type=5-1",
      //   {
      //     headers: {
      //       "Content-Type" : "application/json",
      //     }
      //   }
      // );
      const response = await axios.post(
        "https://www.consumerfinance.gov/oah-api/rates/rate-checker?price=200000&loan_amount=180000&minfico=700&maxfico=719&state=AL&rate_structure=fixed&loan_term=30&loan_type=conf&arm_type=5-1",
        {
          headers: {
            "Content-Type": "application/json",
            "Accept": "application/json"
          },
          proxy : {
            host: "www.consumerfinance.gov",
            port: 443,
          }
        }
      );
      console.log(response);
      // setData(response.data);
      setLoading(false);
    } catch (err: any) {
      // setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return { data, loading, error };
};
