import React, { type ReactNode } from 'react';
import { StyleSheet, Text, View } from '@react-pdf/renderer';

const styles = StyleSheet.create({
  item: {
    flexDirection: 'row',
    marginBottom: 5,
  },
  bulletPoint: {
    width: 10,
    fontSize: 10,
  },
  itemContent: {
    flex: 1,
    fontSize: 10,
    fontFamily: 'Lato',
  },
});

interface ListProps {
  children: ReactNode;
}

const List: React.FC<ListProps> = ({ children }) => <>{children}</>;

interface ItemProps {
  children: ReactNode;
}

export const Item: React.FC<ItemProps> = ({ children }) => (
  <View style={styles.item}>
    <Text style={styles.bulletPoint}>•</Text>
    <Text style={styles.itemContent}>{children}</Text>
  </View>
);

export default List;
