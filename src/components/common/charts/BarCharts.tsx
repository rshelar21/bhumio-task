import { useEffect, useState, useRef, useCallback } from "react";
import { Box, Typography } from "@mui/material";
import {
  BarChart,
  Bar,
  Rectangle,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";
import DownloadChartBtn from "./DownloadChartBtn";
import { getHtmlToImage } from "../../../utils/htmlToImage";
import { useReactToPrint } from "react-to-print";
import Loader from "../Loader";
import CustomError from "../CustomError";
import { IRateOptions } from "../../../interfaces/RateOptions";
import { statesList } from "../../../constants";
interface IBarChartsProps {
  data: any;
  isLoading: boolean;
  isError: boolean;
  rateOptions: IRateOptions;
}

const CustomTooltip = ({ active, payload, label }: any) => {
  if (active && payload && payload.length) {
    return (
      <Box
        bgcolor="#fff"
        padding="8px 6px"
        border="2px solid #94d2bd"
        borderRadius="4px"
        display="flex"
        gap="4px"
      >
        <Typography variant="h4">{payload[0]?.value}</Typography>
        <Box>
          <p>
            {payload[0]?.value < 2 ? "lender is" : "lenders are"} offering{" "}
            <br /> rates at{" "}
            <Typography fontWeight="600" fontSize="14px" display="inline-block">
              {label}%
            </Typography>
          </p>
        </Box>
      </Box>
    );
  }

  return null;
};

const BarCharts: React.FC<IBarChartsProps> = ({
  data,
  isError,
  isLoading,
  rateOptions,
}) => {
  const elementRef = useRef(null);

  const reactToPrintContent = useCallback(() => {
    return elementRef.current;
  }, [elementRef.current]);

  const handlePrint = useReactToPrint({
    content: reactToPrintContent,
    documentTitle: "AwesomeFileName",
  });

  const handleHtmlToImage = (type: string) => {
    if (!elementRef.current) return;
    if (type === "PRINT") {
      console.log("print");
      handlePrint();
    } else {
      getHtmlToImage(type, elementRef);
    }
  };

  return (
    <Box width="100%" height="100%" position="relative">
      {isLoading && (
        <Box
          width="100%"
          height="100%"
          position="absolute"
          bgcolor="rgba(0,0,0,0.05)"
        >
          <Loader />
        </Box>
      )}
      {rateOptions?.down_payment_amount >= rateOptions?.price && (
        <Box
          width="100%"
          height="100%"
          position="absolute"
          bgcolor="rgba(0,0,0,0.05)"
        >
          <CustomError />
        </Box>
      )}
      <Box>
        <Typography variant="h5" fontWeight="600">
          In{" "}
          {statesList.find((item) => item.value === rateOptions?.state)?.label},
          most lenders in our data are offering rates at or below 7.000%.
        </Typography>
        <DownloadChartBtn handleHtmlToImage={handleHtmlToImage} />
        <Box width="100%" height="500px" ref={elementRef}>
          <ResponsiveContainer width="100%" height="100%">
            <BarChart
              width={500}
              height={300}
              data={data}
              margin={{
                top: 5,
                right: 0,
                left: 0,
                bottom: 5,
              }}
              barSize={25}
            >
              <CartesianGrid strokeDasharray="3 5" vertical={false} />
              <XAxis dataKey="name" />
              <YAxis
                label={{
                  value: "Number of lenders offering rate",
                  angle: -90,
                  position: "center",
                  offset: 10,
                }}
              />
              <Tooltip
                content={<CustomTooltip />}
                cursor={{
                  fill: "transparent",
                }}
              />

              <Legend
                content={
                  <Box>
                    <Typography variant="body1">
                      Interest rates for your situation
                    </Typography>
                  </Box>
                }
              />
              <Bar
                dataKey="value"
                fill="#82ca9d"
                activeBar={<Rectangle fill="gold" stroke="purple" />}
              />
            </BarChart>
          </ResponsiveContainer>
        </Box>
      </Box>
    </Box>
  );
};

export default BarCharts;
