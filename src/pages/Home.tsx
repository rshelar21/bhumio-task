import { Box, Stack, Typography } from "@mui/material";
import BarCharts from "../components/common/charts/BarCharts";
import RateOptionSidebar from "../components/home/RateOptionSidebar";
import { useGetRates } from "../hooks/useGetRates";
import {useState, useEffect} from "react"
const Home = () => {
  // const { data, error, loading } = useGetRates();
  useEffect(() => {
    handleGetData()
  }, [])

  const handleGetData = async() => {
    try {
      const res = await fetch("https://www.consumerfinance.gov/oah-api/rates/rate-checker?price=200000&loan_amount=180000&minfico=700&maxfico=719&state=AL&rate_structure=fixed&loan_term=30&loan_type=conf&arm_type=5-1", {
        method: "GET",
        headers : {
          "Content-Type": "application/json",
          "Accept": "application/json",
          "Access-Control-Allow-Origin": "*",
          "Access-Control-Allow-Headers": "*",
          

        },
        
      })
      const data = await res.json()
      console.log(data)
    } catch(error){
      console.log(error)
    }
  }

  
  return (
    <Box
      width="100%"
      height="100%"
      minHeight="100vh"
      padding="20px"
      bgcolor="#fafafa"
    >
      <Box width="100%">
        {/* <Stack gap="50px" direction="column">
          <BarCharts />
          <RateOptionSidebar />
        </Stack> */}
      </Box>
    </Box>
  );
};

export default Home;
