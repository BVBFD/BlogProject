import axios from "axios";

export const axiosInstance = axios.create({
  baseURL: "https://myportfolioblogproject.herokuapp.com/",
});
