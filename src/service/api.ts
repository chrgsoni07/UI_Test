import { type Resume } from "@/app/resume/Resume";
import { axiosWithAuth } from "@/app/api/auth/[...nextauth]/axiosWithAuth";
import { type JobDetail } from "@/app/apply/JobDetail";
import extractDataMock from "@/mock/extractDataMock.json";
import resumeByIdMock from "@/mock/resumeByIdMock.json";
import jobDetailsMock from "@/mock/jobDetailsMock.json";
import allUsersResume from "@/mock/allUsersResumeMock.json";
import assessFitResponse from "@/mock/assessFitResponse.json";
import { UserSignUp } from "@/app/auth/model/UserSignUp";
import { extractedResumeMock } from "@/mock/mockResume";
import { BASE_URL_API_GATEWAY } from "./constants";
import { ApplyResumeDTO } from "@/app/resume/ApplyResumeDTO";

const BASE_URL_RESUME = `${BASE_URL_API_GATEWAY}/api/0.1/resume/`;
const BASE_URL_JOB_DETAIL = `${BASE_URL_API_GATEWAY}/api/0.1/job/`;
const BASE_URL_FILE = `${BASE_URL_API_GATEWAY}/api/0.1/files/`;

export const signUp = async (signUpFormValues: UserSignUp) => {
  if (process.env.RETURN_MOCK === "true") {
    return { response: "ok" };
  }
  const response = await (
    await axiosWithAuth()
  ).post(`${BASE_URL_API_GATEWAY}/signup`, signUpFormValues);

  return response.data;
};

export const getResumeById = async (id: string) => {
  if (process.env.RETURN_MOCK === "true") {
    const fakeApi = new Promise((res) => {
      setTimeout(() => res(resumeByIdMock), 1000);
    });

    return await fakeApi;
    // return resumeByIdMock;
  }
  const response = await (await axiosWithAuth()).get(`${BASE_URL_RESUME}${id}`);

  return response.data;
};

export const getAllResumeOfUser = async () => {
  if (process.env.RETURN_MOCK === "true") {
    return allUsersResume;
  }
  const response = await (await axiosWithAuth()).get(`${BASE_URL_RESUME}all`);

  return response.data;
};

export const updateTemplateIdOfResume = async (
  id: string,
  templateId: number
) => {
  if (process.env.RETURN_MOCK === "true") {
    return resumeByIdMock;
  }

  const url = `${BASE_URL_RESUME}updateTemplate/${id}/template/${templateId}`;

  const response = await (await axiosWithAuth()).put(url);

  return response.data;
};

export const deleteResumeByResumeId = async (id: string) => {
  const response = await (await axiosWithAuth()).delete(BASE_URL_RESUME);

  return response;
};

export const saveResume = async (data: Resume) => {
  if (process.env.RETURN_MOCK === "true") {
    return resumeByIdMock;
  }

  const saveDataURL = `${BASE_URL_RESUME}`;

  const response = await (await axiosWithAuth()).post(saveDataURL, data);

  return response.data;
};

export const updateResumeByResumeId = async (data: Resume) => {
  if (process.env.RETURN_MOCK === "true") {
    return resumeByIdMock;
  }

  const updateResumeURL = `${BASE_URL_RESUME}${data.id}`;
  const response = await (await axiosWithAuth()).put(updateResumeURL, data);

  return response.data;
};

export const getJobDetailsFromUrl = async (url: string) => {
  if (process.env.RETURN_MOCK === "true") {
    return jobDetailsMock;
  }
  const response = await (
    await axiosWithAuth()
  ).get(`${BASE_URL_JOB_DETAIL}details?url=${url}`);

  return response.data;
};

export const isUserUploadLimitReached = async () => {
  if (process.env.RETURN_MOCK === "true") {
    return false;
  }
  const response = await (
    await axiosWithAuth()
  ).get(`${BASE_URL_RESUME}uploads/limit-reached`);

  return response.data;
};

export const extractDataFromFile = async (
  formData: FormData
): Promise<Resume> => {
  if (process.env.RETURN_MOCK === "true") {
    const fakeApi = new Promise((res) => {
      setTimeout(() => res(extractedResumeMock), 1000);
    }) as Promise<Resume>;

    return await fakeApi;
    // return extractDataMock;
  }
  const extractDataURL = `${BASE_URL_FILE}extract`;
  const response = await (
    await axiosWithAuth()
  ).post<Resume>(extractDataURL, formData);

  return response.data;
};

export const saveJobSpecificResume = async (data: Resume) => {
  const saveDataURL = `${BASE_URL_RESUME}job-specific`;

  if (process.env.RETURN_MOCK === "true") {
    return extractDataMock;
  }
  const response = await (await axiosWithAuth()).post(saveDataURL, data);

  return response.data;
};

export const saveAppliedResume = async (data: ApplyResumeDTO) => {
  const saveDataURL = `${BASE_URL_RESUME}apply`;

  if (process.env.RETURN_MOCK === "true") {
    return extractDataMock;
  }
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
  if (process.env.RETURN_MOCK === "true") {
    return assessFitResponse;
  }
  const response = await (
    await axiosWithAuth()
  ).post(`${BASE_URL_RESUME}assess-fit/${resumeId}`, jobDetail);
  return response.data;
};
