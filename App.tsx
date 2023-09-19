import React from 'react';
import { View, StyleSheet } from 'react-native';
import Header from './Components/Header';
import Main from './Components/Main';
import Footer from './Components/Footer';

const App: React.FC = () => {
  return (
    <View style={styles.container}>
      <Header />
      <Main />
      <Footer />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'space-between',
  },
});

export default App;


