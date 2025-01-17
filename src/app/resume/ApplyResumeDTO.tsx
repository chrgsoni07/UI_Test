import { Resume } from "./Resume";
import { JobDetail } from "../apply/JobDetail";

export type ApplyResumeDTO = {
  jobDetail: JobDetail;
  resume: Resume;
};
