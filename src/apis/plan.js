import { BASE_URL } from "@/constants";
import axios from "axios";

export const getPlansPage = (params) => axios.get(`${BASE_URL}/plan/plansPage`, { params: { ...params } });
export const addPlan = (data) => axios.post(`${BASE_URL}/plan/addPlan`, { ...data });
export const editPlan = (data) => axios.post(`${BASE_URL}/plan/editPlan`, { ...data });
export const getPlan = (id) => axios.get(`${BASE_URL}/plan/${id}`);
export const getPlanItems = (params) => axios.get(`${BASE_URL}/plan/planItems`, { params: { ...params } });
export const addPlanItem = (data) => axios.post(`${BASE_URL}/plan/addItem`, { ...data });
export const deleteQuestion = (id) => axios.get(`${BASE_URL}/plan/delete/${id}`);
export const submitAnswer = (data) => axios.post(`${BASE_URL}/plan/submitAnswer`, { ...data });