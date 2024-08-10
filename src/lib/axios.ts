import axios from "axios";

const axiosInstance = axios.create({
  baseURL: "http://www.consumerfinance.gov/oah-api/rates/",
});

export default axiosInstance;
