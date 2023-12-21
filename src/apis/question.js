import { BASE_URL } from "@/constants";
import axios from "axios";

export const getQuestionsPage = (params) => axios.get(`${BASE_URL}/question/questionsPage`, { params: { ...params } });
export const addQuestion = (data) => axios.post(`${BASE_URL}/question/addQuestion`, { ...data });
export const editQuestion = (data) => axios.post(`${BASE_URL}/question/editQuestion`, { ...data });
export const getQuestion = (id) => axios.get(`${BASE_URL}/question/${id}`);
export const deleteQuestion = (id) => axios.get(`${BASE_URL}/question/delete/${id}`);
export const submitAnswer = (data) => axios.post(`${BASE_URL}/question/submitAnswer`, { ...data });