import React from "react";
import { Image, StyleSheet, Text, View } from "@react-pdf/renderer";

import { Projects, type WorkExperience } from "../../app/resume/Resume";
import List, { Item } from "./List";
import Title from "./Title";

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 10,
    paddingLeft: 5,
    "@media max-width: 400": {
      paddingTop: 10,
      paddingLeft: 0,
    },
  },
  entryContainer: {
    marginBottom: 10,
    textAlign: "justify",
  },
  date: {
    fontSize: 11,
    fontFamily: "Lato Italic",
  },
  detailLeftColumn: {
    flexDirection: "column",
    marginLeft: 10,
    marginRight: 10,
  },
  detailRightColumn: {
    flexDirection: "column",
    flexGrow: 9,
  },
  bulletPoint: {
    fontSize: 10,
  },
  details: {
    fontSize: 10,
    fontFamily: "Lato",
  },
  headerContainer: {
    flexDirection: "row",
    marginBottom: 10,
  },
  leftColumn: {
    flexDirection: "column",
    flexGrow: 9,
  },
  rightColumn: {
    flexDirection: "column",
    flexGrow: 1,
    alignItems: "flex-end",
    justifySelf: "flex-end",
  },
  title: {
    fontSize: 11,
    color: "black",
    textDecoration: "none",
    fontFamily: "Lato Bold",
  },
});

interface ExperienceEntryProps {
  company: string;
  details: string[];
  position: string;
  date: string;
  location: string;
}

interface ProjectEntryProps {
  name: string;
  description: string;
  details: string[];
  date: string;
  technology: string[];
}

const ExperienceEntry: React.FC<ExperienceEntryProps> = ({
  company,
  details,
  position,
  date,
  location,
}) => {
  const title = `${company} | ${position}`;
  return (
    <View style={styles.entryContainer}>
      <View style={styles.headerContainer}>
        <View style={styles.leftColumn}>
          <Text style={styles.title}>{title}</Text>
          <Text style={styles.title}>
            {/* <Image
              src={{
                uri: "/img/Icons/map-pin.png",
                method: "GET",
                headers: { "Cache-Control": "no-cache" },
                body: "",
              }}
            /> */}
            {location}
          </Text>
        </View>
        <View style={styles.rightColumn}>
          <Text style={styles.date}>
            {/* <Image
              src={{
                uri: "/img/Icons/calendar-dots.png",
                method: "GET",
                headers: { "Cache-Control": "no-cache" },
                body: "",
              }}
            /> */}
            {date}
          </Text>
        </View>
      </View>
      <List>
        {details.map((detail, index) => (
          <Item key={index}>{detail}</Item>
        ))}
      </List>
    </View>
  );
};

const ProjectEntry: React.FC<ProjectEntryProps> = ({
  name,
  details,
  description,
  date,
  technology,
}) => {
  const title = name;
  return (
    <View style={styles.entryContainer}>
      <View style={styles.headerContainer}>
        <View style={styles.leftColumn}>
          <Text style={styles.title}>{title}</Text>
          {/* <Text style={styles.bulletPoint}>{description}</Text> */}
        </View>
        <View style={styles.rightColumn}>
          <Text style={styles.date}>{date}</Text>
        </View>
      </View>
      <List>
        {details.map((detail, index) => (
          <Item key={index}>{detail}</Item>
        ))}
      </List>
    </View>
  );
};

const Experience = ({
  workExperience,
  projects,
}: {
  workExperience?: WorkExperience[];
  projects?: Projects[];
}) => {
  if (!workExperience) {
    return <p />;
  }
  return (
    <View style={styles.container}>
      <Title>Experience</Title>
      {workExperience.map(
        ({ company, duration, responsibilities, jobPosition, location }) => (
          <ExperienceEntry
            company={company}
            date={duration}
            details={responsibilities}
            key={company + jobPosition}
            position={jobPosition}
            location={location}
          />
        )
      )}

      {projects && projects.length > 0 && (
        <view>
          <Title>Projects</Title>
          {projects.map(
            ({ name, details, description, technologies, year }) => (
              <ProjectEntry
                name={name}
                details={details}
                technology={technologies}
                date={year}
                description={description}
              />
            )
          )}
        </view>
      )}
    </View>
  );
};

export default Experience;
