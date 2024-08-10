import { useEffect, useState, useRef } from "react";
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
import { rateData } from "../../../data";
// import { toPng, toJpeg, toBlob, toPixelData, toSvg } from 'html-to-image';
import * as htmlToImage from "html-to-image";

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

const BarCharts = () => {
  const [data, setData] = useState<any>();
  const elementRef = useRef(null);
  useEffect(() => {
    if (rateData) {
      const data = Object.entries(rateData?.data).map(([key, value]) => {
        return { name: key, value: value };
      });
      setData(data);
    }
  }, [rateData]);

  const handleHtmlToImage = () => {
    if (!elementRef.current) return;

    htmlToImage
      .toPng(elementRef.current, { cacheBust: false })
      .then((dataUrl) => {
        const link = document.createElement("a");
        link.download = "my-image-name.png";
        link.href = dataUrl;
        link.click();
      })
      .catch((err) => {
        console.log(err);
      });
  };
  return (
    <Box width="100%">
      <Typography variant="h5" fontWeight="600">
        In Alaska, most lenders in our data are offering rates at or below
        6.500%.
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
  );
};

export default BarCharts;
