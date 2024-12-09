import React, {useEffect, useState} from 'react';
import {StyleSheet, Text, View} from 'react-native';
import database from '@react-native-firebase/database';

function AppTwo() {
  // thrid step is data show into screen
  const [myData, setMyData] = useState(null);

  // second step fetch api u have to need useEffect
  useEffect(() => {
    fireData();
  }, []);

  // first step fetch api data
  const fireData = async () => {
    try {
      const data = await database().ref('users/1').once('value');
      console.log('Snapshot Value:', data.val()); // Log fetched data
      setMyData(data.val());
    } catch (err) {
      console.log('Error:', err.message); // Log errors
    }
  };

  return (
    <View>
      <Text>RealTime Firebase</Text>
      <Text style={styles.haed}>Name: {myData?.name || 'Loading...'}</Text>
      <Text style={styles.haed}>Age: {myData?.age || 'Loading...'}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  haed: {
    color: '#fff',
    fontSize: 16,
  },
});

export default AppTwo;
