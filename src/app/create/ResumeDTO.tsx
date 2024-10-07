import { Resume } from './Resume';
import { ResumeEvalResult } from './ResumeEvalResult';

export type ResumeDTO = {
  resumeEvalResult: ResumeEvalResult;
  resume: Resume;
};
