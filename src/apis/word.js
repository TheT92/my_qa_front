import { BASE_URL } from "@/constants";
import axios from "axios";

export const getWordPage = (params) => axios.get(`${BASE_URL}/word/page`, { params: { ...params } });
export const addword = (data) => axios.post(`${BASE_URL}/word/add`, { ...data });
// export const editword = (data) => axios.post(`${BASE_URL}/word/editword`, { ...data });
// export const getword = (id) => axios.get(`${BASE_URL}/word/${id}`);
export const deleteWord = (id) => axios.get(`${BASE_URL}/word/delete/${id}`);
// export const submitAnswer = (data) => axios.post(`${BASE_URL}/word/submitAnswer`, { ...data });