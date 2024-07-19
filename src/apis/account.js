import { BASE_URL } from "@/constants";
import axios from "axios";

export const login = (data) => axios.post(`${BASE_URL}/account/login`, { ...data });

// get user info by token
export const getUserInfo = () => axios.get(`${BASE_URL}/account/user`);
export const getAnsewerHistoryPage = (params) => axios.get(`${BASE_URL}/account/answerHistoryPage`, { params: { ...params } });