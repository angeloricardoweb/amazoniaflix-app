import { Colors } from '@/constants/theme';
import React from 'react';
import { StyleSheet, Text } from 'react-native';

export default function Title({ children }: { children: React.ReactNode }) {
  return (
    <Text style={styles.title}>{children}</Text>
  )
}

const styles = StyleSheet.create({
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: Colors.text,
  },
});