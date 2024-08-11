import { useState, useMemo } from "react";
import { Box, Stack } from "@mui/material";
import BarCharts from "../components/common/charts/BarCharts";
import RateOptionSidebar from "../components/home/RateOptionSidebar";
import { IRateOptions } from "../interfaces/RateOptions";
import { statesList } from "../constants";
import { useQuery } from "@tanstack/react-query";
import { getRates } from "../hooks/query/useGetRates";

const Home = () => {
  const [rateOptions, setRateOptions] = useState<IRateOptions>({
    state: statesList[0].value,
    price: 200000,
    down_payment_amount_percent: 10,
    down_payment_amount: 20000,
    loan_amount: 180000,
    minfico: 700,
    maxfico: 719,
    rate_structure: "fixed",
    loan_type: "conf",
    loan_term: 30,
    arm_type: "5-1",
  });

  const { data, isLoading, isError, refetch } = useQuery({
    queryKey: ["rates", rateOptions],
    queryFn: () => getRates(rateOptions),
  });

  const dataValues = useMemo(() => {
    if (data && !isLoading) {
      const list = Object.entries(data?.data).map(([key, value]) => {
        return { name: key, value: value };
      });
      const sortedList = list.sort((a, b) => Number(a.name) - Number(b.name));
      return sortedList;
    }
  }, [data, isLoading]);

  const handleInputChange = (name: string, value: string | number) => {
    setRateOptions((prevState) => ({
      ...prevState,
      [name]: value,
    }));
    refetch();
  };

  return (
    <Box
      width="100%"
      height="100%"
      minHeight="100vh"
      padding="20px"
      bgcolor="#fafafa"
    >
      <Box width="100%">
        <Stack gap="50px" direction="column">
          <BarCharts
            data={dataValues}
            isLoading={isLoading}
            isError={isError}
            rateOptions={rateOptions}
          />
          <RateOptionSidebar
            handleInputChange={handleInputChange}
            rateOptions={rateOptions}
          />
        </Stack>
      </Box>
    </Box>
  );
};

export default Home;
