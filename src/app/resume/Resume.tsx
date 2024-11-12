export type Resume = {
  id: string;
  name: string;
  email: string;
  phone: string;
  location: string;
  careerObjective: string;
  education: Education[];
  linkedIn: string;
  github: string;
  skills?: string[];
  skillsCategory?: SkillsCategory;
  jobTitle: string;
  projects: Projects[];
  certifications: string[];
  workExperience: WorkExperience[];
  suggestions: Suggestion[];
  estimatedATSScore: number;
  metadata: Metadata;
};

type SkillsCategory = Record<string, string[]>;

export type Education = {
  degree: string;
  university: string;
  duration: string;
  location: string;
};

export type WorkExperience = {
  company: string;
  jobPosition: string;
  duration: string;
  location: string;
  responsibilities: string[];
  achievements: string[];
};

export type Projects = {
  name: string;
  description: string;
  year: string;
  details: string[];
  technologies: string[];
};

export type Suggestion = {
  originalText: string;
  suggestedText: string;
};

export type Metadata = {
  createdAt: Date;
  updatedAt: Date;
  baseResumeId: string;
  isActive: boolean;
};
