import { headers } from "next/headers";
import axios from "axios";
import { type Resume } from "@/app/resume/Resume";

const BASE_URL = "http://localhost:8089/api/0.1";
const BASE_URL_RESUME = `${BASE_URL}/resume`;
const BASE_URL_JOB_DETAIL = `${BASE_URL}/job`;
const BASE_URL_FILE = `${BASE_URL}/files`;

const USER_ID = "uid112233";

const apiClient = axios.create({
  baseURL: "http://localhost:8089/api/0.1/resume",
  headers: {
    "Content-type": "application/json",
  },
});

export const getResumeById = async (id: string) => {
  const fetchDataURL = `${BASE_URL_RESUME}/${id}`;

  const response = await axios.get(fetchDataURL);

  return response.data;
};

export const getSavedResumeByUserId = async () => {
  const fatchAllResume = `${BASE_URL_RESUME}/user/${USER_ID}`;

  const response = await axios.get(fatchAllResume);

  return response.data;
};

// export const assessResumeFit = async ({
//   jobDetail,
//   resumeId,
// }: {
//   jobDetail: JobDetail;
//   resumeId: string;
// }) => {
//   const saveDataURL = `${BASE_URL_RESUME}/assess-fit/${resumeId}`;

//   const response = await axios.post(saveDataURL, jobDetail, {
//     headers: { "Content-Type": "application/json" },
//   });

//   return response.data;
// };

export const getJobDetailsFromURL = async (url: string) => {
  // Construct the URL with query parameters
  const fetchDataURL = `${BASE_URL_JOB_DETAIL}/details?url=${url}`;

  const response = await axios.get(fetchDataURL);

  return response.data;
};

export const extractDataFromFile = async (formData: FormData) => {
  const extractDataURL = `${BASE_URL_FILE}/extract`;
  const response = axios.post(extractDataURL, formData, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });
  return (await response).data;
};

export const saveResume = async (data: Resume, token: string) => {
  const saveDataURL = `${BASE_URL_RESUME}`;

  const response = await axios.post(saveDataURL, data, {
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
  });

  return response.data;
};

export const saveJobSpecificResume = async (data: Resume) => {
  const saveDataURL = `${BASE_URL_RESUME}/job-specific/${USER_ID}`;

  const response = await axios.post(saveDataURL, data, {
    headers: { "Content-Type": "application/json" },
  });

  return response.data;
};
