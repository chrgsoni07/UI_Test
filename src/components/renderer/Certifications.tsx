// src/Skills.tsx
import React from "react";
import { StyleSheet, Text, View } from "@react-pdf/renderer";

import List, { Item } from "./List";
import Title from "./Title";

const Certifications = ({ certifications }: { certifications?: string[] }) => {
  if (!certifications?.length) {
    return <p />;
  }
  return (
    <View>
      <Title>Certifications</Title>
      <List>
        {certifications.map((cert, index) => (
          <Item key={index}>{cert}</Item>
        ))}
      </List>
    </View>
  );
};
export default Certifications;
