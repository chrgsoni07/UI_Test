import React from "react";
import {
  Document,
  // Font,
  Image as PDFImage,
  Page,
  PDFViewer,
  StyleSheet,
  Text,
  View,
} from "@react-pdf/renderer";

import { type Resume } from "../../app/resume/Resume";
import List, { Item } from "./List";

// Ensure Lato font is loaded for consistency
// Font.register({
//   family: "Lato",
//   src: `https://fonts.gstatic.com/s/lato/v16/S6uyw4BMUTPHjx4wWw.ttf`,
// });

const ResumeTemplate3 = ({ resume }: { resume: Resume }) => (
  <PDFViewer width="100%" height="600">
    <Document keywords="resume, ATS, multinational company" title="Resume">
      <Page size="A4" style={styles.page}>
        <View style={styles.header}>
          <Text style={styles.name}>{resume.name}</Text>
          <Text style={styles.jobTitleHeader}>{resume.jobTitle}</Text>
        </View>

        <View style={styles.content}>
          {/* Left Side */}
          <View style={styles.leftColumn}>
            {/* Professional Summary Section */}
            {resume.careerObjective && (
              <View style={styles.section}>
                <Text style={styles.sectionTitle}>Summary</Text>
                <Text style={styles.text}>{resume.careerObjective}</Text>
              </View>
            )}

            {/* Experience Section */}
            <View style={styles.section}>
              <Text style={styles.sectionTitle}>Experience</Text>
              {resume.workExperience.map((exp, index) => (
                <View style={styles.job} key={index}>
                  <Text style={styles.jobTitle}>
                    {exp.company} | {exp.jobPosition}
                  </Text>
                  <Text style={styles.jobDates}>{exp.duration}</Text>
                  <List>
                    {exp.responsibilities.map((resp, idx) => (
                      <Item key={idx}>{resp}</Item>
                    ))}
                  </List>
                  {/* Experience Section achievements */}
                  {exp.achievements?.length > 0 && (
                    <>
                      <Text style={styles.jobTitle}>Achievements</Text>
                      <List>
                        {exp.achievements.map((achi, index) => (
                          <Item key={index}>{achi}</Item>
                        ))}
                      </List>
                    </>
                  )}
                </View>
              ))}
            </View>

            {/* Project Section */}
            {resume.projects && resume.projects.length > 0 && (
              <View style={styles.section}>
                <Text style={styles.sectionTitle}>Project</Text>
                {resume.projects.map((project, index) => (
                  <View style={styles.job} key={index}>
                    <Text style={styles.jobTitle}>{project.name}</Text>
                    <Text style={styles.jobDates}>{project.year}</Text>
                    <List>
                      {project.details.map((resp, idx) => (
                        <Item key={idx}>{resp}</Item>
                      ))}
                    </List>
                  </View>
                ))}
              </View>
            )}
          </View>

          {/* Right Side */}
          <View style={styles.rightColumn}>
            {/* Contact Information Section */}
            <View style={styles.section}>
              <Text style={styles.sectionTitle}>Contact</Text>
              <View>
                <Text style={styles.contact}>
                  {/* <PDFImage
                    src={{
                      uri: "/img/Icons/envelope.png",
                      method: "GET",
                      headers: { "Cache-Control": "no-cache" },
                      body: "",
                    }}
                  /> */}
                  <Text style={styles.contactText}>{resume.email}</Text>
                </Text>

                <Text style={styles.contact}>
                  {/* <PDFImage
                    src={{
                      uri: "/img/Icons/phone.png",
                      method: "GET",
                      headers: { "Cache-Control": "no-cache" },
                      body: "",
                    }}
                  /> */}
                  <Text style={styles.contactText}>{resume.phone}</Text>
                </Text>

                <Text style={styles.contact}>
                  {/* <PDFImage
                    src={{
                      uri: "/img/Icons/map-pin.png",
                      method: "GET",
                      headers: { "Cache-Control": "no-cache" },
                      body: "",
                    }}
                  /> */}
                  <Text style={styles.contactText}>{resume.location}</Text>
                </Text>

                <Text style={styles.contact}>
                  {/* <PDFImage
                    src={{
                      uri: "/img/Icons/linkedin-logo.png",
                      method: "GET",
                      headers: { "Cache-Control": "no-cache" },
                      body: "",
                    }}
                  /> */}
                  <Text style={styles.contactText}>{resume.linkedIn}</Text>
                </Text>

                <Text style={styles.contact}>
                  {/* <PDFImage
                    src={{
                      uri: "/img/Icons/github-logo.png",
                      method: "GET",
                      headers: { "Cache-Control": "no-cache" },
                      body: "",
                    }}
                  /> */}
                  <Text style={styles.contactText}>{resume.github}</Text>
                </Text>
              </View>
            </View>
            {/* Education Section */}
            <View style={styles.section}>
              <Text style={styles.sectionTitle}>Education</Text>
              {resume.education.map((edu, index) => (
                <View key={index} style={styles.educationContainer}>
                  <Text style={styles.education}>{edu.degree}</Text>
                  <Text style={styles.education}>{edu.university}</Text>
                  <Text style={styles.education}>
                    {/* <PDFImage
                      src={{
                        uri: "/img/Icons/map-pin.png",
                        method: "GET",
                        headers: { "Cache-Control": "no-cache" },
                        body: "",
                      }}
                    /> */}
                    {edu.location}
                  </Text>
                  <Text style={styles.education}>
                    {/* <PDFImage
                      src={{
                        uri: "/img/Icons/calendar-dots.png",
                        method: "GET",
                        headers: { "Cache-Control": "no-cache" },
                        body: "",
                      }}
                    /> */}
                    {edu.duration}
                  </Text>
                </View>
              ))}
            </View>
            {/* Skills Section */}
            <View style={styles.section}>
              <Text style={styles.sectionTitle}>Skills</Text>
              <Text style={styles.skills}>{resume.skills?.join(", ")}</Text>
            </View>
            {/* Certifications Section */}
            {resume.certifications && resume.certifications.length > 0 && (
              <View style={styles.section}>
                <Text style={styles.sectionTitle}>Certifications</Text>

                {resume.certifications.length > 6 ? (
                  <Text style={styles.skills}>
                    {resume.certifications.join(", ")}
                  </Text> // Join certifications with commas
                ) : (
                  <List>
                    {resume.certifications.map((cert, index) => (
                      <Item key={index}>{cert}</Item> // List item for each certification
                    ))}
                  </List>
                )}
              </View>
            )}{" "}
          </View>
        </View>
      </Page>
    </Document>
  </PDFViewer>
);

const styles = StyleSheet.create({
  page: {
    padding: 20,
    fontFamily: "Lato",
  },
  header: {
    textAlign: "center",
    marginBottom: 20,
  },
  name: {
    fontSize: 16,
    fontWeight: "bold",
    marginBottom: 5,
  },
  jobTitleHeader: {
    fontSize: 12,
    fontWeight: "bold",
  },
  jobTitle: {
    fontSize: 12,
    color: "#555",
    marginBottom: 10,
  },
  contact: {
    fontSize: 10, // Smaller font size for contact details
    lineHeight: 1.5,
    flexDirection: "row",
    alignItems: "center",
  },
  contactText: {
    marginLeft: 5, // Space between icon and text
    flexWrap: "wrap", // Allow text to wrap
    maxWidth: "90%", // Limit width of text
  },
  content: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  leftColumn: {
    width: "70%",
    paddingRight: 15,
  },
  rightColumn: {
    width: "30%",
    paddingLeft: 15,
    borderLeft: "1px solid #3f51b5",
    flexShrink: 0, // Prevent shrinking if the content overflows
  },
  section: {
    marginBottom: 15,
  },
  sectionTitle: {
    fontSize: 13,
    fontWeight: "bold",
    borderBottom: "1px solid #3f51b5",
    paddingBottom: 5,
    marginBottom: 10,
  },
  text: {
    fontSize: 10, // Smaller font size for all details
    lineHeight: 1.5, // Adjust line height
    textAlign: "left", // Left alignment for better readability
    marginBottom: 10, // Add margin for spacing
  },
  job: {
    marginBottom: 15,
    paddingBottom: 10,
    borderBottom: "1px solid #E0E0E0",
  },
  jobDates: {
    fontSize: 10, // Consistent smaller font size
    color: "#888",
    marginBottom: 5,
  },
  educationContainer: {
    marginBottom: 10, // Add space between education entries
  },
  education: {
    fontSize: 10, // Consistent smaller font size
    textAlign: "left", // Change to left for better readability
  },
  skills: {
    fontSize: 10, // Consistent smaller font size
    textAlign: "left", // Change to left for better readability
  },
});

export default ResumeTemplate3;
