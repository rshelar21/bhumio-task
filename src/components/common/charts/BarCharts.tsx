import { useRef, useCallback } from "react";
import { Box, Typography } from "@mui/material";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";
import DownloadChartBtn from "./DownloadChartBtn";
import { getHtmlToImage } from "../../../utils/htmlToImage";
import { useReactToPrint } from "react-to-print";
import Loader from "../Loader";
import CustomError from "../CustomError";
import { IRateOptions } from "../../../interfaces/RateOptions";
import { statesList } from "../../../constants";
import dayjs from "dayjs";
interface IBarChartsProps {
  isLoading: boolean;
  rateOptions: IRateOptions;
  timeStamp: string;
  data: {
        name: string;
        value: number;
      }[]
    | any;
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

const customizedGroupTick = (props: any) => {
  const { x, y, payload } = props;

  return (
    <g transform={`translate(${x}, ${y})`}>
      <text
        x={0}
        y={0}
        dy={5}
        textAnchor="end"
        fill="#666"
        transform="rotate(-90)"
      >
        {payload.value}
      </text>
    </g>
  );
};

const BarCharts: React.FC<IBarChartsProps> = ({
  data,
  isLoading,
  rateOptions,
  timeStamp,
}) => {
  const elementRef = useRef(null);

  const reactToPrintContent = useCallback(() => {
    return elementRef.current;
  }, [elementRef.current]);

  const handlePrint = useReactToPrint({
    content: reactToPrintContent,
    documentTitle: "Interest Rates",
  });

  const handleHtmlToImage = (type: string) => {
    if (!elementRef.current) return;
    if (type === "PRINT") {
      handlePrint();
    } else {
      getHtmlToImage(type, elementRef);
    }
  };

  return (
    <Box width="100%" height="100%" position="relative">
      {isLoading ? <Loader /> : !data?.length ? <CustomError /> : null}

      {rateOptions?.down_payment_amount >= rateOptions?.price && (
        <CustomError />
      )}

      <Box>
        <Typography variant="h5" fontWeight="600">
          In{" "}
          {statesList.find((item) => item.value === rateOptions?.state)?.label},
          most lenders in our data are offering rates at or below 7.000%.
        </Typography>
        <DownloadChartBtn handleHtmlToImage={handleHtmlToImage} />
        <Box width="100%" height="520px" ref={elementRef}>
          <ResponsiveContainer width="100%" height="100%">
            <BarChart
              width={500}
              height={300}
              data={data}
              margin={{
                top: 5,
                right: 0,
                left: 0,
                bottom: 40,
              }}
              barSize={25}
            >
              <CartesianGrid strokeDasharray="3 5" vertical={false} />
              <XAxis
                dataKey="name"
                label={{
                  value: " Interest rates for your situation",
                  position: "insideBottom",
                  offset: "-35",
                }}
                name="Interest rates for your situation"
                tick={customizedGroupTick}
              />
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
              <Bar dataKey="value" fill="#82ca9d" />
            </BarChart>
          </ResponsiveContainer>
        </Box>
        <Typography display="flex" justifyContent="flex-end" mt="5px" gap="4px">
          These rates are current as of
          <Typography fontWeight="600">
            {dayjs(timeStamp).format("MM/DD/YYYY")}
          </Typography>
        </Typography>
      </Box>
    </Box>
  );
};

export default BarCharts;
