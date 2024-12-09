import React from 'react';
import {SafeAreaView, StatusBar, StyleSheet, Text, View} from 'react-native';
import Create from './Create';

function App() {
  return (
    <SafeAreaView>
      <StatusBar backgroundColor={'red'} />
      <Create />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({});

export default App;
