import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

const Header: React.FC = () => {
  return (
    <View style={styles.header}>
      <Text style={styles.headerText}>Medicinminnesappen</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  header: {
    backgroundColor: 'blue',
    padding: 20,
    alignItems: 'center',
  },
  headerText: {
    color: 'white',
    fontSize: 24,
    fontWeight: 'bold',
  },
});

export default Header;
