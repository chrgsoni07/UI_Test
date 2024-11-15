// src/Skills.tsx
import React from "react";
import { StyleSheet, Text, View } from "@react-pdf/renderer";

import List, { Item } from "./List";
import Title from "./Title";

// Define the types for SkillEntry props
interface SkillEntryProps {
  name: string;
  skills: string[];
}

// Define the styles
const styles = StyleSheet.create({
  title: {
    fontFamily: "Lato Bold",
    fontSize: 11,
    marginBottom: 10,
  },
  skills: {
    fontFamily: "Lato",
    fontSize: 10,
    marginBottom: 10,
    textAlign: "justify",
  },
  skills_comma: {
    fontFamily: "Lato",
    fontSize: 10,
    marginBottom: 10,
    textAlign: "justify",
    hyphens: "none",
    WebkitHyphens: "none",
    msHyphens: "none",
    overflowWrap: "break-word",
    wordBreak: "break-word",
  },
});

// SkillEntry component
const SkillEntry: React.FC<SkillEntryProps> = ({ name, skills }) => (
  <View>
    <Text style={styles.title}>{name}</Text>
    <List>
      {skills.map((skill) => (
        <Item key={skill}>{skill}</Item>
      ))}
    </List>
  </View>
);

// Skills component
const Skills = ({ skills }: { skills?: string[] }) => {
  if (!skills) {
    return <p />;
  } else if (skills.length > 12) {
    return (
      <View>
        <Title>Skills</Title>
        <Text style={styles.skills}>{skills.join(", ")}</Text>;
      </View>
    );
  }
  return (
    <View>
      <Title>Skills</Title>
      <List>
        {skills.map((skill, index) => (
          <Item key={index}>{skill}</Item>
        ))}
      </List>
    </View>
  );
};

export default Skills;
