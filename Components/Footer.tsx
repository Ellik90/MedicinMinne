import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

const Footer: React.FC = () => {
  return (
    <View style={styles.footer}>
      <Text style={styles.footerText}>© 2023 Medicinminnesappen</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  footer: {
    backgroundColor: 'blue',
    padding: 15,
    alignItems: 'center',
  },
  footerText: {
    color: 'white',
  },
});

export default Footer;
