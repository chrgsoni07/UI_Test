// src/Title.tsx
import React from 'react';
import { StyleSheet, Text } from '@react-pdf/renderer';

// Define the styles
const styles = StyleSheet.create({
  title: {
    fontFamily: 'Lato Bold',
    fontSize: 14,
    marginBottom: 10,
    textTransform: 'uppercase',
  },
});

// Define the props type
interface TitleProps {
  children: React.ReactNode;
}

// Create the Title component with typed props
const Title: React.FC<TitleProps> = ({ children }) => <Text style={styles.title}>{children}</Text>;

export default Title;
