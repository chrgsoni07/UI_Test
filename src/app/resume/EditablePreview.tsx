import React, { useState } from "react";
import styled from "@emotion/styled";
import DeleteIcon from "@mui/icons-material/Delete";
import {
  Chip,
  Divider,
  Grid,
  IconButton,
  Popover,
  TextareaAutosize,
  TextField,
  Typography,
} from "@mui/material";
//import { MuiChipsInput } from 'mui-chips-input';

import { type Resume, type Suggestion } from "./Resume";

type PropTypes = {
  resumeData: Resume;
  setResumeData: (data: Resume) => void;
};

const EditablePreview: React.FC<PropTypes> = ({
  resumeData,
  setResumeData,
}) => {
  const [hoveredSuggestion, setHoveredSuggestion] = useState<Suggestion>();
  const [anchorEl, setAnchorEl] = useState<HTMLElement>();
  const suggestionArray = resumeData.suggestions;

  const handleApplySuggestion = () => {
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

  const handelSkillChange = (e: any) => {
    setResumeData({ ...resumeData, skills: e });
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

  function removeAchivements(index: number, achIndex: number): void {
    const filterdAch = resumeData.workExperience[index].achievements.filter(
      (_, i) => i !== achIndex
    );
    const updateResumeData = { ...resumeData };
    updateResumeData.workExperience[index].achievements = filterdAch;
    setResumeData(updateResumeData);
  }
  const isMatchingSuggestion = (responsibility: string) => {
    return suggestionArray.find(
      (suggestion) => suggestion.originalText === responsibility
    );
  };

  return (
    <Grid item xs={12}>
      <Typography style={{ color: "#635BFF" }} variant="subtitle1" gutterBottom>
        Details
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
              setResumeData({ ...resumeData, careerObjective: e.target.value })
            }
            margin="normal"
          />
        </Grid>
      </Grid>

      {/* <Grid container spacing={1}>
        <Grid item xs={12}>
          {resumeData.skills ? (
            <MuiChipsInput
              value={resumeData.skills}
              onChange={handelSkillChange}
              label="Skills"
              margin="normal"
              fullWidth // Ensure it takes full width
            />
          ) : (
            <>
              {resumeData.skillsCategory &&
                Object.entries(resumeData.skillsCategory).map(([category, skillList]) => (
                  <MuiChipsInput
                    key={category}
                    value={skillList}
                    onChange={handelSkillChange}
                    label={category}
                    margin="normal"
                    fullWidth // Ensure it takes full width
                  />
                ))}
            </>
          )}
        </Grid>
      </Grid> */}

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
                <Grid item xs>
                  <StyledTextareaAutosize
                    value={resp}
                    onChange={(e) =>
                      handelWorkExOnResponsiblity(
                        e.target.value,
                        index,
                        respIndex
                      )
                    }
                    onMouseEnter={(e) => handleResponsibilityHover(resp, e)}
                    customColor={isMatchingSuggestion(resp) ? "orange" : ""}
                  />
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

            <Popover
              open={Boolean(hoveredSuggestion)}
              anchorEl={anchorEl}
              onClose={() => setHoveredSuggestion(undefined)}
              anchorOrigin={{
                vertical: "bottom",
                horizontal: "left",
              }}
              transformOrigin={{
                vertical: "top",
                horizontal: "left",
              }}
            >
              <PopoverContent onClick={handleApplySuggestion}>
                <Typography variant="caption" display="block" gutterBottom>
                  {hoveredSuggestion?.suggestedText}
                </Typography>
              </PopoverContent>
            </Popover>

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
    </Grid>
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

const PopoverContent = styled("div")({
  padding: "8px",
});

export default EditablePreview;
