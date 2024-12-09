import React, {useEffect, useState} from 'react';
import {SafeAreaView, StatusBar, StyleSheet, Text, View} from 'react-native';
import firestore from '@react-native-firebase/firestore';

function AppThree() {
  // ==3== this is used for data show on screen
  const [myData, setMyData] = useState(null);

  // ==1== this is used for Api call
  // 1. api fatch krnt k liya
  // 2. event listner set krna
  // 3. component mount or unmount
  // 4. time set krna
  useEffect(() => {
    // api call into
    fireData();
  }, []);

  // ==2== below code is for firebase connect with async method use

  const fireData = async () => {
    try {
      const data = await firestore()
        .collection('testing')
        .doc('SgZAmnaNR4DsQxpCMdme')
        .get();
      // ==4== use it useState
      setMyData(data._data);
    } catch (err) {
      console.log('error' + err);
    }
  };

  return (
    <View>
      <Text>Firestore DB</Text>
      <Text style={styles.haed}>
        Name: {myData ? myData.name : 'Loading...'}
      </Text>
      <Text style={styles.haed}>Age: {myData ? myData.age : 'Loading...'}</Text>
      <Text style={styles.haed}>
        Hobby: {myData ? myData.hobby.map(list => `${list} `) : 'Loading...'}
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  haed: {
    color: '#fff',
    fontSize: 16,
  },
});

export default AppThree;
