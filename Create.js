import {
  StyleSheet,
  Text,
  View,
  TextInput,
  TouchableOpacity,
  Dimensions,
  FlatList,
  Alert,
} from 'react-native';
import React, {useEffect, useState} from 'react';
import database from '@react-native-firebase/database';

// for Responsive design

const {height, width} = Dimensions.get('screen');

const Create = () => {
  // input data get or store data
  const [inputValue, setInputValue] = useState(null);

  // to get data or pull data
  const [list, setList] = useState(null);

  // update data
  const [updateData, setUpdateData] = useState(false);

  // selected card index

  const [selectCardIndex, setSelectCardIndex] = useState(null);

  useEffect(() => {
    getData();
  }, []);

  const getData = async () => {
    try {
      database()
        .ref('todo')
        .on('value', temData => {
          setList(temData.val());
          //  console.log(setList(temData.val()));
        });
    } catch (err) {
      console.log('Error fetching data:', err);
    }
  };

  // connect DB or add Data
  const addTodo = async () => {
    try {
      const index = list.length;
      // if (inputValue.length > 0) {
      database().ref(`todo/${index}`).set({
        value: inputValue,
      });
      // clear input after data sucessfully add into DB
      setInputValue('');
      //  } else {
      //   Alert.alert('Please Enter Todo');
      //  }
    } catch (err) {
      console.log(err);
    }
  };

  // when we click on card list after that this func can help us to modify the value in input
  const handleUpdateTodo = async () => {
    try {
      if (inputValue.length > 0) {
        database().ref(`todo/${selectCardIndex}`).update({
          value: inputValue,
        });
        //  console.log(response);
        setInputValue('');
        setUpdateData(false);
      }
    } catch (err) {
      console.log(err);
    }
  };

  // in Todo list which we want to chnage we can click on it this funcation chnage the btn
  // add to update
  const handleCardTodo = async (todoIndex, cardValue) => {
    setSelectCardIndex(todoIndex);
    setUpdateData(true);
    setInputValue(cardValue);
  };

  const deleteTodo = async (todoIndex, cardValue) => {
    try {
      Alert.alert('Alert', `Are you sure to delete ${cardValue} ?`, [
        {
          text: 'Cancel',
          onPress: () => {
            console.log('Cancel is pressed');
          },
        },
        {
          text: 'Ok',
          onPress: async () => {
            try {
              if (todoIndex !== 1) {
                database().ref(`todo/${todoIndex}`).remove();
                setInputValue('');
                setUpdateData(false);
              } else {
                Alert.alert('First Item only editable');
              }
            } catch (err) {
              console.log(err);
            }
          },
        },
      ]);
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <>
      <View style={styles.container}>
        <Text style={styles.headTodo}>Add Todo</Text>
        <View>
          <TextInput
            style={styles.inputTodo}
            placeholder="Enter Your todo"
            value={inputValue}
            onChangeText={value => setInputValue(value)}
          />
          {!updateData ? (
            <TouchableOpacity style={styles.btnTodo} onPress={() => addTodo()}>
              <Text style={styles.btnText}>Add</Text>
            </TouchableOpacity>
          ) : (
            <TouchableOpacity
              style={[styles.btnTodo, styles.btnUpdate]}
              onPress={() => handleUpdateTodo()}>
              <Text style={styles.btnText}>update</Text>
            </TouchableOpacity>
          )}
        </View>
      </View>
      <View style={styles.container}>
        <FlatList
          data={list}
          renderItem={item => {
            // item.index se use card ko update kry gy jis ki value chnage krni hai
            const todoIndex = item.index;
            if (item.item !== null) {
              return (
                <TouchableOpacity
                  style={styles.card}
                  onPress={() => handleCardTodo(todoIndex, item.item.value)}
                  onLongPress={() => deleteTodo(todoIndex, item.item.value)}>
                  <Text style={styles.cardTxt}>{item.item.value}</Text>
                </TouchableOpacity>
              );
            }
          }}
        />
      </View>
    </>
  );
};

export default Create;

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#fff',
    marginHorizontal: 10,
    borderRadius: 5,
    marginTop: 10,
  },
  headTodo: {
    color: '#000',
    textAlign: 'center',
    fontSize: 20,
    marginVertical: 10,
  },
  inputTodo: {
    borderColor: '#000',
    borderWidth: 1,
    width: width - 30,
    margin: 'auto',
    borderRadius: 5,
    color: '#000',
    backgroundColor: '#000',
    paddingHorizontal: 10,
    color: '#fff',
  },
  btnTodo: {
    backgroundColor: 'teal',
    width: width - 300,
    margin: 'auto',
    borderRadius: 5,
    paddingVertical: 10,
    marginVertical: 15,
  },
  btnText: {
    textAlign: 'center',
    color: '#fff',
  },
  card: {
    backgroundColor: '#aaa',
    width: width - 30,
    margin: 'auto',
    marginVertical: 2,
    padding: 10,
    borderRadius: 5,
  },
  cardTxt: {
    color: '#000',
  },
  btnUpdate: {
    backgroundColor: 'red',
  },
});
