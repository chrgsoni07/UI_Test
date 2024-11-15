import React from "react";
import { Image, StyleSheet, Text, View } from "@react-pdf/renderer";

import { type Education } from "../../app/resume/Resume";
import Title from "./Title";

const styles = StyleSheet.create({
  container: {
    marginBottom: 10,
  },
  school: {
    fontFamily: "Lato Bold",
    fontSize: 10,
  },
  degree: {
    fontFamily: "Lato",
    fontSize: 10,
  },
  candidate: {
    fontFamily: "Lato Italic",
    fontSize: 10,
  },
});

const EducationDisplay = ({ education }: { education?: Education[] }) => {
  if (!education) {
    return <p />;
  }
  return (
    <View style={styles.container}>
      <Title>Education</Title>
      {education.map((edu, eduIdx) => (
        <>
          <Text key={`degree${eduIdx}`} style={styles.degree}>
            {edu.degree}
          </Text>

          <Text key={`school${eduIdx}`} style={styles.school}>
            {edu.university}
          </Text>

          <Text key={`duration${eduIdx}`} style={styles.candidate}>
            <Image
              src={{
                uri: "/assets/Icons/calendar-dots.png",
                method: "GET",
                headers: { "Cache-Control": "no-cache" },
                body: "",
              }}
            />
            {edu.duration}
          </Text>

          <Text key={`degree${eduIdx}`} style={styles.degree}>
            <Image
              src={{
                uri: "/assets/Icons/map-pin.png",
                method: "GET",
                headers: { "Cache-Control": "no-cache" },
                body: "",
              }}
            />
            {edu.location}
          </Text>
        </>
      ))}
    </View>
  );
};
export default EducationDisplay;
