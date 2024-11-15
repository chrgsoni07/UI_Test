import React from "react";
import { StyleSheet, Text, View } from "@react-pdf/renderer";

import { type Projects } from "../../app/resume/Resume";
import List, { Item } from "./List";
import Title from "./Title";

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: "row",
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
  projectContainer: {
    flex: 1,
    paddingTop: 10,
    paddingLeft: 5,
    "@media max-width: 400": {
      paddingTop: 10,
      paddingLeft: 0,
    },
  },
  projectTitle: {
    fontSize: 18,
    marginBottom: 5,
    fontFamily: "Lato Bold",
  },
  project: {
    marginBottom: 10,
  },
  projectName: {
    fontSize: 14,
    fontWeight: "bold",
  },
  projectDescription: {
    fontSize: 12,
  },
  projectTech: {
    fontSize: 12,
    fontStyle: "italic",
  },
});

interface ProjectDataProps {
  name: string;
  description: string;
  technologies: string[];
}
const ProjectEntry: React.FC<ProjectDataProps> = ({
  name,
  description,
  technologies,
}) => {
  const title = name;
  return (
    <View style={styles.entryContainer}>
      <View style={styles.headerContainer}>
        <View style={styles.leftColumn}>
          <Text style={styles.title}>{title}</Text>
          <Text style={styles.title}>{description}</Text>
        </View>
      </View>
      <List>
        {technologies.map((detail, index) => (
          <Item key={index}>{detail}</Item>
        ))}
      </List>
    </View>
  );
};

const Project = ({ project }: { project?: Projects[] }) => {
  if (!project) {
    return <p />;
  }
  return (
    <View style={styles.container}>
      <Title>Project</Title>
      {project.map(({ name, description, technologies }) => (
        <ProjectEntry
          name={name}
          description={description}
          technologies={technologies}
          key={name}
        />
      ))}
    </View>
  );
};

export default Project;
