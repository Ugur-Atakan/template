import axios from "axios";
import { BASE_URL } from "../constant";

const baseApi = axios.create({
  baseURL: BASE_URL,
});

export default baseApi;
