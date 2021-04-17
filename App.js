import AsyncStorage from '@react-native-community/async-storage';
import React, { useEffect, useState } from 'react';
import { StyleSheet, Text, View, TextInput, StatusBar } from 'react-native';
import colors from './app/misc/colors';
import { Intro } from './Intro.js';
import { NoteScreen } from './NoteScreen.js';
import {Note} from './Note';

export default function App() {
  //find the user to greet
  const [user, setUser] = useState({});
  const findUser = async () => {

    const result = await AsyncStorage.getItem('user');
    if (result !==null) {
    setUser(JSON.parse(result));
  }
  };

  useEffect(() => {
    //findUser();
 AsyncStorage.clear();
  }, []);
//to appear NoteScreen page if the user is not null (run the app for the first time)
if (!user.name) return <Intro onFinish = {findUser}></Intro>
  return <NoteScreen user= {user}></NoteScreen>
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
