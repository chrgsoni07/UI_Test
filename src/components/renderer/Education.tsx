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
        <React.Fragment key={edu.degree}>
          <Text key={`degree${eduIdx}`} style={styles.degree}>
            {edu.degree}
          </Text>

          <Text key={`school${eduIdx}`} style={styles.school}>
            {edu.university}
          </Text>

          <Text key={`duration${eduIdx}`} style={styles.candidate}>
            {/* <Image
              src={{
                uri: "/img/Icons/calendar-dots.png",
                method: "GET",
                headers: { "Cache-Control": "no-cache" },
                body: "",
              }}
            /> */}
            {edu.duration}
          </Text>

          <Text key={`degreeImg${eduIdx}`} style={styles.degree}>
            {/* <Image
              src={{
                uri: "/img/Icons/map-pin.png",
                method: "GET",
                headers: { "Cache-Control": "no-cache" },
                body: "",
              }}
            /> */}
            {edu.location}
          </Text>
        </React.Fragment>
      ))}
    </View>
  );
};
export default EducationDisplay;
