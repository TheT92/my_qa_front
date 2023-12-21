import { BASE_URL } from "@/constants";
import axios from "axios";

export const login = (data) => axios.post(`${BASE_URL}/account/login`, { ...data });