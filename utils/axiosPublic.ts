import axios from "axios";
import { Config } from "src/config";

export const axiosPublic = axios.create({
  baseURL: Config.baseUrl,
  headers: {
    "Content-Type": "application/json",
  },
});
