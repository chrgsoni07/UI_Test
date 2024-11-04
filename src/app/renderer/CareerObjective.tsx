import React from 'react';
import { StyleSheet, Text, View } from '@react-pdf/renderer';

import Title from './Title';

const styles = StyleSheet.create({
  container: {
    paddingTop: 15,
    paddingBottom: 10,
  },
  title: {
    fontSize: 11,
    color: 'black',
    textDecoration: 'none',
    fontFamily: 'Lato Bold',
  },
  text: {
    fontSize: 10,
    textAlign: 'justify',
  },
});

const CareerObjective = ({ careerObjective }: { careerObjective?: string }) => {
  if (!careerObjective) {
    return <p />;
  }
  return (
    <View style={styles.container}>
      <Title>Career Objective</Title>
      <Text style={styles.text}>{careerObjective}</Text>
    </View>
  );
}

export default CareerObjective;
