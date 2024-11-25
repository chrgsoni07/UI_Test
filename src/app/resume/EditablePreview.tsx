import React, { FormEvent, useEffect, useState } from "react";
import styled from "@emotion/styled";
import DeleteIcon from "@mui/icons-material/Delete";
import {
  Button,
  Chip,
  Divider,
  Grid,
  IconButton,
  Popover,
  TextareaAutosize,
  TextField,
  Typography,
  Autocomplete,
  Tooltip,
  TooltipProps,
  tooltipClasses,
} from "@mui/material";
import toast from "react-hot-toast";
import { Projects, type Resume, type Suggestion } from "./Resume";
import { useMutation } from "@tanstack/react-query";
import { saveResume } from "@/service/api";
import { redirect } from "next/navigation";

type PropTypes = {
  resumeData: Resume;
};

const EditablePreview: React.FC<PropTypes> = ({
  resumeData: resumeDataProp,
}) => {
  const [resumeData, setResumeData] = useState<Resume>(resumeDataProp);
  const [hoveredSuggestion, setHoveredSuggestion] = useState<Suggestion>();
  const [anchorEl, setAnchorEl] = useState<HTMLElement>();
  const suggestionArray = resumeData.suggestions;

  const { data: savedResume, mutate: postSave } = useMutation({
    mutationFn: (rData: Resume): Promise<Resume> => {
      return saveResume(rData);
    },
    onSuccess(data) {
      toast.success("Resume saved successfully !");
    },
    onError(error) {
      toast.error(error.message);
    },
  });

  useEffect(() => {
    if (savedResume?.id) {
      redirect(`/template/${savedResume.id}`);
    }
  }, [savedResume]);

  const handleSubmit = async () => {
    // event.preventDefault();

    if (!resumeData) return;

    postSave(resumeData);
  };

  const handleApplySuggestion = () => {
    console.log("click on handel apply suggestion");
    if (!(hoveredSuggestion && resumeData.workExperience)) {
      return;
    }
    const { originalText, suggestedText } = hoveredSuggestion;
    const updatedExperience = resumeData.workExperience.map((exp) => ({
      ...exp,
      responsibilities: exp.responsibilities.map((resp) =>
        resp === originalText ? suggestedText : resp
      ),
    }));
    setResumeData({ ...resumeData, workExperience: updatedExperience });
    setHoveredSuggestion(undefined);
    setAnchorEl(undefined);
  };

  const handleResponsibilityHover = (
    originalText: string,
    event: React.MouseEvent<HTMLTextAreaElement>
  ) => {
    const suggestion = suggestionArray.find(
      (suggestion) => suggestion.originalText === originalText
    );

    setHoveredSuggestion(suggestion);
    setAnchorEl(event.currentTarget);
  };

  const handelWorkExperienceChange = (
    index: number,
    field: string,
    value: string,
    type: "education" | "workExperience"
  ) => {
    const updatedArray = [...resumeData[type]];
    updatedArray[index] = { ...updatedArray[index], [field]: value };
    setResumeData({ ...resumeData, [type]: updatedArray });
  };

  const handelWorkExOnResponsiblity = (
    newValue: string,
    expIndex: number,
    respIndex: number
  ) => {
    const copyWorkExperience = [...resumeData.workExperience];
    copyWorkExperience[expIndex].responsibilities[respIndex] = newValue;
    setResumeData({ ...resumeData, workExperience: copyWorkExperience });
  };

  const handelWorkExOnAchievements = (
    newValue: string,
    expIndex: number,
    achIndex: number
  ) => {
    const copyWorkExperience = [...resumeData.workExperience];
    copyWorkExperience[expIndex].achievements[achIndex] = newValue;
    setResumeData({ ...resumeData, workExperience: copyWorkExperience });
  };

  const handelProjectsDetails = (
    newValue: string,
    prjIndex: number,
    detailIndex: number
  ) => {
    const copyProjects = [...resumeData.projects];
    copyProjects[prjIndex].details[detailIndex] = newValue;
    setResumeData({ ...resumeData, projects: copyProjects });
  };

  const handleSkillChange = (newValue: string[]) => {
    setResumeData({ ...resumeData, skills: newValue });
  };

  const handleSkillDelete = (deletedSkill: string) => {
    if (!resumeData.skills) {
      console.log("handleSkillDelte");
      return;
    }

    const updatedSkills = resumeData.skills.filter(
      (skill) => skill !== deletedSkill
    );
    setResumeData({ ...resumeData, skills: updatedSkills });
  };

  const handelCertificationChange = (e: any) => {
    setResumeData({ ...resumeData, certifications: e });
  };

  const handleCertificationDel = (deletedCert: string) => {
    if (!resumeData.certifications) {
      return;
    }

    const updatateCert = resumeData.certifications.filter(
      (cert) => cert !== deletedCert
    );
    setResumeData({ ...resumeData, certifications: updatateCert });
  };

  function removeResponsibility(expIndex: number, respIndex: number): void {
    const filteredRespon = resumeData.workExperience[
      expIndex
    ].responsibilities.filter((_, i) => i !== respIndex);
    const updateResumeData = { ...resumeData };
    updateResumeData.workExperience[expIndex].responsibilities = filteredRespon;
    setResumeData(updateResumeData);
  }

  function addResponsibility(expIndex: number): void {
    handelWorkExOnResponsiblity(
      "",
      expIndex,
      resumeData.workExperience[expIndex].responsibilities.length
    );
  }

  function addAchievements(expIndex: number): void {
    if (!resumeData.workExperience[expIndex].achievements) {
      resumeData.workExperience[expIndex].achievements = []; //
      return;
    }
    handelWorkExOnAchievements(
      "",
      expIndex,
      resumeData.workExperience[expIndex].achievements.length
    );
  }

  function addProjectDetail(prjIndex: number): void {
    if (!resumeData.projects[prjIndex].details) {
      resumeData.projects[prjIndex].details = []; //
      return;
    }
    handelProjectsDetails(
      "",
      prjIndex,
      resumeData.projects[prjIndex].details.length
    );
  }

  const addProject = () => {
    const newProject: Projects = {
      name: "",
      year: "",
      description: "",
      details: [],
      technologies: [],
    };

    const updatedResumeData = { ...resumeData };
    if (updatedResumeData.projects) updatedResumeData.projects.push(newProject);
    else updatedResumeData.projects = [newProject];
    setResumeData(updatedResumeData);
  };

  function removeAchivements(index: number, achIndex: number): void {
    const filterdAch = resumeData.workExperience[index].achievements.filter(
      (_, i) => i !== achIndex
    );
    const updateResumeData = { ...resumeData };
    updateResumeData.workExperience[index].achievements = filterdAch;
    setResumeData(updateResumeData);
  }

  function removeProjectDetails(index: number, detailIndex: number): void {
    const filterdDetails = resumeData.projects[index].details.filter(
      (_, i) => i !== detailIndex
    );
    const updateResumeData = { ...resumeData };
    updateResumeData.projects[index].details = filterdDetails;
    setResumeData(updateResumeData);
  }

  const isMatchingSuggestion = (responsibility: string) => {
    return suggestionArray.find(
      (suggestion) => suggestion.originalText === responsibility
    );
  };

  return (
    <div style={{ marginLeft: 20 }}>
      <Grid item xs={12}>
        <Typography
          style={{ color: "#635BFF" }}
          variant="subtitle1"
          gutterBottom
        >
          Basic Details
        </Typography>

        <Grid container spacing={1}>
          <Grid item xs={12} sm={4}>
            <TextField
              id="name"
              label="Name"
              value={resumeData.name}
              InputLabelProps={{ shrink: true }}
              onChange={(e) =>
                setResumeData({ ...resumeData, name: e.target.value })
              }
              fullWidth
              margin="normal"
            />
          </Grid>

          <Grid item xs={12} sm={4}>
            <TextField
              id="email"
              label="Email"
              value={resumeData.email}
              InputLabelProps={{ shrink: true }}
              type="email"
              onChange={(e) =>
                setResumeData({ ...resumeData, email: e.target.value })
              }
              fullWidth
              margin="normal"
            />
          </Grid>

          <Grid item xs={12} sm={4}>
            <TextField
              id="jobTitle"
              label="Job Title"
              value={resumeData.jobTitle}
              InputLabelProps={{ shrink: true }}
              onChange={(e) =>
                setResumeData({ ...resumeData, jobTitle: e.target.value })
              }
              fullWidth
              margin="normal"
            />
          </Grid>

          <Grid item xs={12} sm={3}>
            <TextField
              id="linkedin"
              label="LinkedIn Profile"
              value={resumeData.linkedIn}
              InputLabelProps={{ shrink: true }}
              onChange={(e) =>
                setResumeData({ ...resumeData, linkedIn: e.target.value })
              }
              fullWidth
              margin="normal"
            />
          </Grid>
          {resumeData.github && (
            <Grid item xs={12} sm={3}>
              <TextField
                id="github"
                label="GitHub Profile"
                value={resumeData.github}
                InputLabelProps={{ shrink: true }}
                onChange={(e) =>
                  setResumeData({ ...resumeData, github: e.target.value })
                }
                fullWidth
                margin="normal"
              />
            </Grid>
          )}
          <Grid item xs={12} sm={3}>
            <TextField
              id="phone"
              label="Phone"
              value={resumeData.phone}
              InputLabelProps={{ shrink: true }}
              onChange={(e) =>
                setResumeData({ ...resumeData, phone: e.target.value })
              }
              fullWidth
              margin="normal"
            />
          </Grid>

          <Grid item xs={12} sm={3}>
            <TextField
              id="location"
              label="Location/Place"
              value={resumeData.location}
              InputLabelProps={{ shrink: true }}
              onChange={(e) =>
                setResumeData({ ...resumeData, location: e.target.value })
              }
              fullWidth
              margin="normal"
            />
          </Grid>
        </Grid>

        <Grid container spacing={1}>
          <Grid item xs={12} sm={12}>
            <TextField
              id="careerObjective"
              label="Carrer Objective"
              value={resumeData.careerObjective}
              InputLabelProps={{ shrink: true }}
              multiline
              rows={4}
              fullWidth
              onChange={(e) =>
                setResumeData({
                  ...resumeData,
                  careerObjective: e.target.value,
                })
              }
              margin="normal"
            />
          </Grid>
        </Grid>

        <Grid container spacing={1}>
          <Grid item xs={12}>
            <Autocomplete
              multiple
              freeSolo
              options={[]}
              value={resumeData.skills}
              onChange={(event, newValue) => handleSkillChange(newValue)}
              clearIcon={false}
              renderTags={(value, props) =>
                value.map((option, index) => (
                  <Chip
                    label={option}
                    clickable
                    key={index}
                    {...props}
                    onDelete={() => handleSkillDelete(option)}
                  />
                ))
              }
              renderInput={(params) => (
                <TextField {...params} label="Skills" margin="normal" />
              )}
            />
          </Grid>
        </Grid>

        {resumeData.certifications && resumeData.certifications.length > 0 && (
          <Grid container spacing={1}>
            <Grid item xs={12}>
              <Typography
                style={{ color: "#635BFF" }}
                variant="subtitle1"
                gutterBottom
              >
                Certifications
              </Typography>

              <Autocomplete
                multiple
                freeSolo
                options={[]}
                value={resumeData.certifications}
                onChange={(newValue) => handelCertificationChange(newValue)}
                clearIcon={false}
                renderTags={(value, props) =>
                  value.map((option, index) => (
                    <Chip
                      label={option}
                      clickable
                      key={index}
                      {...props}
                      onDelete={() => handelCertificationChange(option)}
                    />
                  ))
                }
                renderInput={(params) => (
                  <TextField
                    {...params}
                    label="Certifications"
                    margin="normal"
                  />
                )}
              />
            </Grid>
          </Grid>
        )}

        <Grid container spacing={1}>
          <Grid item xs={12}>
            <Typography
              style={{ color: "#635BFF" }}
              variant="subtitle1"
              gutterBottom
            >
              Education
            </Typography>
          </Grid>

          {resumeData.education.map((edu, index) => (
            <Grid container spacing={1} item xs={12} key={edu.degree}>
              <Grid item xs={12} sm={3}>
                <TextField
                  id={`degree${index + 1}`}
                  label="Degree"
                  value={edu.degree}
                  InputLabelProps={{ shrink: true }}
                  margin="normal"
                  onChange={(e) =>
                    handelWorkExperienceChange(
                      index,
                      "degree",
                      e.target.value,
                      "education"
                    )
                  }
                  fullWidth
                />
              </Grid>

              <Grid item xs={12} sm={3}>
                <TextField
                  id={`university${index + 1}`}
                  label="University"
                  value={edu.university}
                  InputLabelProps={{ shrink: true }}
                  margin="normal"
                  onChange={(e) =>
                    handelWorkExperienceChange(
                      index,
                      "university",
                      e.target.value,
                      "education"
                    )
                  }
                  fullWidth
                />
              </Grid>

              <Grid item xs={12} sm={3}>
                <TextField
                  id={`duration${index + 1}`}
                  label="Duration"
                  value={edu.duration}
                  InputLabelProps={{ shrink: true }}
                  margin="normal"
                  onChange={(e) =>
                    handelWorkExperienceChange(
                      index,
                      "duration",
                      e.target.value,
                      "education"
                    )
                  }
                  fullWidth
                />
              </Grid>

              <Grid item xs={12} sm={3}>
                <TextField
                  id={`location${index + 1}`}
                  label="Location"
                  value={edu.location}
                  InputLabelProps={{ shrink: true }}
                  margin="normal"
                  onChange={(e) =>
                    handelWorkExperienceChange(
                      index,
                      "location",
                      e.target.value,
                      "education"
                    )
                  }
                  fullWidth
                />
              </Grid>
            </Grid>
          ))}
        </Grid>

        <div>
          <Typography
            style={{ color: "#635BFF" }}
            variant="subtitle1"
            gutterBottom
          >
            Work Experience
          </Typography>
          {resumeData.workExperience.map((exp, index) => (
            <div key={index} className="experience">
              <Divider>
                <Chip
                  label={`${exp.company} | ${exp.jobPosition}`}
                  size="small"
                />
              </Divider>

              <Grid container spacing={1}>
                <Grid item xs={12} sm={3}>
                  <TextField
                    id={`jobPosition${index + 1}`}
                    label="Job Position"
                    value={exp.jobPosition}
                    InputLabelProps={{ shrink: true }}
                    margin="normal"
                    onChange={(e) =>
                      handelWorkExperienceChange(
                        index,
                        "jobPosition",
                        e.target.value,
                        "workExperience"
                      )
                    }
                    fullWidth
                  />
                </Grid>

                <Grid item xs={12} sm={3}>
                  <TextField
                    id={`company${index + 1}`}
                    label="Company"
                    value={exp.company}
                    InputLabelProps={{ shrink: true }}
                    margin="normal"
                    onChange={(e) =>
                      handelWorkExperienceChange(
                        index,
                        "company",
                        e.target.value,
                        "workExperience"
                      )
                    }
                    fullWidth
                  />
                </Grid>

                <Grid item xs={12} sm={3}>
                  <TextField
                    id={`location${index + 1}`}
                    label="Location"
                    value={exp.location}
                    InputLabelProps={{ shrink: true }}
                    margin="normal"
                    onChange={(e) =>
                      handelWorkExperienceChange(
                        index,
                        "location",
                        e.target.value,
                        "workExperience"
                      )
                    }
                    fullWidth
                  />
                </Grid>

                <Grid item xs={12} sm={3}>
                  <TextField
                    id={`duration${index + 1}`}
                    label="Duration"
                    value={exp.duration}
                    InputLabelProps={{ shrink: true }}
                    margin="normal"
                    onChange={(e) =>
                      handelWorkExperienceChange(
                        index,
                        "duration",
                        e.target.value,
                        "workExperience"
                      )
                    }
                    fullWidth
                  />
                </Grid>
              </Grid>

              <Grid container alignItems="center" spacing={1}>
                <Grid item>
                  <Typography
                    style={{ color: "#635BFF" }}
                    variant="subtitle1"
                    gutterBottom
                  >
                    Responsibilities
                  </Typography>
                </Grid>
                <Grid item>
                  <IconButton
                    onClick={() => addResponsibility(index)}
                    aria-label="add"
                    color="primary"
                  >
                    +
                  </IconButton>
                </Grid>
              </Grid>

              {exp.responsibilities.map((resp, respIndex) => (
                <Grid container alignItems="center" key={respIndex}>
                  <Grid
                    item
                    xs
                    onMouseLeave={() => {
                      setAnchorEl(undefined);
                    }}
                  >
                    <NoMaxWidthTooltip
                      title={
                        hoveredSuggestion && (
                          <Typography
                            variant="caption"
                            display="block"
                            gutterBottom
                          >
                            {hoveredSuggestion?.suggestedText}
                          </Typography>
                        )
                      }
                      onClick={() => handleApplySuggestion()}
                    >
                      <StyledTextareaAutosize
                        value={resp}
                        onChange={(e) =>
                          handelWorkExOnResponsiblity(
                            e.target.value,
                            index,
                            respIndex
                          )
                        }
                        onMouseEnter={(e) => {
                          handleResponsibilityHover(resp, e);
                        }}
                        customColor={isMatchingSuggestion(resp) ? "orange" : ""}
                      />
                    </NoMaxWidthTooltip>
                  </Grid>
                  <Grid item>
                    <IconButton
                      onClick={() => removeResponsibility(index, respIndex)}
                      aria-label="delete"
                    >
                      <DeleteIcon />
                    </IconButton>
                  </Grid>
                </Grid>
              ))}

              {/* <Popover
                open={Boolean(anchorEl)}
                anchorEl={anchorEl}
                onClose={() => setAnchorEl(undefined)}
                anchorOrigin={{
                  vertical: "bottom",
                  horizontal: "left",
                }}
                transformOrigin={{
                  vertical: "top",
                  horizontal: "left",
                }}
                // pass these props to the popover component
                // disableAutoFocus={true}
                // disableEnforceFocus={true}
                // disablePortal
                disableAutoFocus
                disableEnforceFocus
                disablePortal
                disableRestoreFocus
                hideBackdrop
              >
                <PopoverContent onClick={handleApplySuggestion}>
                  <Typography variant="caption" display="block" gutterBottom>
                    {hoveredSuggestion?.suggestedText}
                  </Typography>
                </PopoverContent>
              </Popover> */}

              <Grid container alignItems="center" spacing={1}>
                <Grid item>
                  <Typography
                    style={{ color: "#635BFF" }}
                    variant="subtitle1"
                    gutterBottom
                  >
                    Achievements
                  </Typography>
                </Grid>
                <Grid item>
                  <IconButton
                    onClick={() => addAchievements(index)}
                    aria-label="add"
                    color="primary"
                  >
                    +
                  </IconButton>
                </Grid>
              </Grid>
              {exp.achievements && exp.achievements.length > 0 && (
                <div>
                  {exp.achievements.map((ach, achIndex) => (
                    <Grid container alignItems="center" key={achIndex}>
                      <Grid item xs>
                        <StyledTextareaAutosize value={ach} />
                      </Grid>
                      <Grid item>
                        <IconButton
                          onClick={() => removeAchivements(index, achIndex)}
                          aria-label="delete"
                        >
                          <DeleteIcon />
                        </IconButton>
                      </Grid>
                    </Grid>
                  ))}
                </div>
              )}
            </div>
          ))}
        </div>

        {/* Projects Section */}
        <Grid container spacing={1} alignItems="center">
          <Grid item>
            <Typography
              style={{ color: "#635BFF" }}
              variant="subtitle1"
              gutterBottom
            >
              Projects
            </Typography>
          </Grid>
          <Grid item>
            <IconButton
              onClick={() => addProject()}
              aria-label="add"
              color="primary"
            >
              +
            </IconButton>
          </Grid>

          {resumeData.projects &&
            resumeData.projects.length > 0 &&
            resumeData.projects.map((project, index) => (
              <Grid container spacing={1} item xs={12} key={index}>
                <Grid item xs={12} sm={4}>
                  <TextField
                    id={`projectName${index + 1}`}
                    label="Project Name"
                    value={project.name}
                    InputLabelProps={{ shrink: true }}
                    margin="normal"
                    onChange={(e) => {
                      const updatedProjects = [...resumeData.projects];
                      updatedProjects[index].name = e.target.value;
                      setResumeData({
                        ...resumeData,
                        projects: updatedProjects,
                      });
                    }}
                    fullWidth
                  />
                </Grid>

                <Grid item xs={12} sm={4}>
                  <TextField
                    id={`projectYear${index + 1}`}
                    label="Project Year"
                    value={project.year}
                    InputLabelProps={{ shrink: true }}
                    margin="normal"
                    onChange={(e) => {
                      const updatedProjects = [...resumeData.projects];
                      updatedProjects[index].year = e.target.value;
                      setResumeData({
                        ...resumeData,
                        projects: updatedProjects,
                      });
                    }}
                    fullWidth
                  />
                </Grid>

                <Grid item xs={12} sm={4}>
                  <TextField
                    id={`projectDescription${index + 1}`}
                    label="Description"
                    value={project.description}
                    InputLabelProps={{ shrink: true }}
                    margin="normal"
                    multiline
                    minRows={2}
                    maxRows={4}
                    onChange={(e) => {
                      const updatedProjects = [...resumeData.projects];
                      updatedProjects[index].description = e.target.value;
                      setResumeData({
                        ...resumeData,
                        projects: updatedProjects,
                      });
                    }}
                    fullWidth
                  />
                </Grid>

                <Grid item xs={12}>
                  <Grid container alignItems="center" spacing={1}>
                    <Grid item>
                      <Typography
                        style={{ color: "#635BFF" }}
                        variant="subtitle1"
                        gutterBottom
                      >
                        Details
                      </Typography>
                    </Grid>
                    <Grid item>
                      <IconButton
                        onClick={() => addProjectDetail(index)}
                        aria-label="add"
                        color="primary"
                      >
                        +
                      </IconButton>
                    </Grid>
                  </Grid>

                  {project.details && project.details.length > 0 && (
                    <div>
                      {project.details.map((prj, prjIndex) => (
                        <Grid
                          container
                          alignItems="center"
                          key={prjIndex}
                          spacing={1}
                        >
                          <Grid item xs>
                            <StyledTextareaAutosize
                              value={prj}
                              style={{ width: "100%", resize: "vertical" }}
                            />
                          </Grid>
                          <Grid item>
                            <IconButton
                              onClick={() =>
                                removeProjectDetails(index, prjIndex)
                              }
                              aria-label="delete"
                            >
                              <DeleteIcon />
                            </IconButton>
                          </Grid>
                        </Grid>
                      ))}
                    </div>
                  )}
                </Grid>
              </Grid>
            ))}
        </Grid>
      </Grid>
      <Grid item xs={12}>
        <Button
          type="submit"
          variant="contained"
          color="primary"
          disabled={!resumeData}
          onClick={handleSubmit}
        >
          Save
        </Button>
      </Grid>
    </div>
  );
};

const StyledTextareaAutosize = styled(TextareaAutosize)<{
  customColor?: string;
}>`
  color: ${(props) => props.customColor};
  width: 97%;
  padding: 8px;
  border: 1px solid #ccc;
  border-radius: 4px;
  margin-bottom: 2px;
  font-family: Inter, -apple-system, BlinkMacSystemFont, "Segoe UI", Helvetica,
    Arial, sans-serif, "Apple Color Emoji", "Segoe UI Emoji";
  font-weight: 400;
  font-size: 1rem;
  line-height: 1.4375em;
`;

const NoMaxWidthTooltip = styled(({ className, ...props }: TooltipProps) => (
  <Tooltip {...props} classes={{ popper: className }} />
))({
  [`& .${tooltipClasses.tooltip}`]: {
    maxWidth: "none",
  },
});

export default EditablePreview;
