import { headers } from "next/headers";
import axios from "axios";
import { type Resume } from "@/app/resume/Resume";
import { axiosWithAuth } from "@/app/api/auth/[...nextauth]/axiosWithAuth";
import { type JobDetail } from "@/app/apply/JobDetail";

const BASE_URL_API_GATEWAY = "http://localhost:8443";
const BASE_URL_RESUME = `${BASE_URL_API_GATEWAY}/api/0.1/resume/`;
const BASE_URL_JOB_DETAIL = `${BASE_URL_API_GATEWAY}/api/0.1/job/`;
const BASE_URL_FILE = `${BASE_URL_API_GATEWAY}/api/0.1/files/`;

export const getResumeById = async (id: string) => {
  const response = await (await axiosWithAuth()).get(BASE_URL_RESUME);

  return response.data;
};

export const getAllResumeOfUser = async () => {
  const response = await (await axiosWithAuth()).get(`${BASE_URL_RESUME}all`);

  return response.data;
};

export const updateResumeByResumeId = async (id: string) => {
  const response = await (await axiosWithAuth()).put(BASE_URL_RESUME, id);

  return response.data;
};

export const deleteResumeByResumeId = async (id: string) => {
  const response = await (await axiosWithAuth()).delete(BASE_URL_RESUME);

  return response;
};

export const saveResume = async (data: Resume) => {
  const saveDataURL = `${BASE_URL_RESUME}`;

  const response = await (await axiosWithAuth()).post(saveDataURL, data);

  return response.data;
};

export const getJobDetailsFromUrl = async (url: string) => {
  const response = await (
    await axiosWithAuth()
  ).get(`${BASE_URL_JOB_DETAIL}details?url=${url}`);

  return response;
};

export const extractDataFromFile = async (formData: FormData) => {
  const extractDataURL = `${BASE_URL_FILE}/extract`;

  const response = await (await axiosWithAuth()).post(extractDataURL, formData);

  return (await response).data;
};

export const saveJobSpecificResume = async (data: Resume) => {
  const saveDataURL = `${BASE_URL_RESUME}/job-specific}`;

  const response = await (await axiosWithAuth()).post(saveDataURL, data);

  return response.data;
};

export const assessResumeFit = async ({
  jobDetail,
  resumeId,
}: {
  jobDetail: JobDetail;
  resumeId: string;
}) => {
  const response = await (
    await axiosWithAuth()
  ).post(`${BASE_URL_JOB_DETAIL}/assess-fit/${resumeId}`, jobDetail);

  return response.data;
};
