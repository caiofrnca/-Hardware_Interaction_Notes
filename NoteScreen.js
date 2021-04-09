import AsyncStorage from '@react-native-community/async-storage';
import React, { useState, useEffect } from 'react';
import { View, StyleSheet, Text, StatusBar, TextInput, FlatList, TouchableWithoutFeedback, Modal } from 'react-native';
import colors from './app/misc/colors';
import { RoundIconBtn } from './RoundIconBtn';
import { SearchBar } from './SearchBar';
import {NoteInputModal} from './NoteInputModal'



    export function NoteScreen({user}) {
    const [greet, setGreet] = useState('');
    const [modalVisible, setModalVisible] = useState(false);

    const findGreet = () => {
   const hours = new Date().getHours()
       if (hours === 0 || hours < 12) return setGreet('Morning!');
        if (hours === 1 || hours < 17) return setGreet('Afternoon!');
        setGreet('Evening!');
   }

   useEffect(()=>{
    findGreet();
   },[]);

   const handleOnSubmit = (title, desc) => {

     console.log (title, desc);

   }

    return (
        <>
        
            <StatusBar barStyle='dark-content' backgroundColor={colors.LIGHT}></StatusBar>
            <View style={styles.conatainer}>

              
               <Text style = {styles.header}>{`Good ${greet} ${user.name}`}</Text> 
               <SearchBar conatainerStyle = {{marginVertical: 15}}></SearchBar>
               <View style = {[StyleSheet.absoluteFillObject, styles.emptyHeaderContainer]}>
                 <Text style = {styles.emptyHeader}>Add notes</Text>

                 <RoundIconBtn onPress = {() => setModalVisible(true)} antIconName = 'plus' style ={styles.addBtn}></RoundIconBtn>
               </View>
               </View>
               
            <NoteInputModal visible = {modalVisible} 
            onClose = {() => setModalVisible(false)}
            onSubmit = {handleOnSubmit}
            />
        </>
    );
};



const styles = StyleSheet.create({
    header: {
        fontSize: 20,
        fontWeight: 'bold',
        color: colors.DARK,
      

    },
    conatainer: {

        paddingHorizontal: 20,
        flex: 1,
        zIndex: 1,
    },
    emptyHeader: {
        fontSize: 24,
        textTransform: 'uppercase',
        fontWeight: 'bold',
        opacity: 0.5,

    },
    emptyHeaderContainer: {
        justifyContent: 'center',
        alignItems: 'center',
        flex: 1,
        zIndex: -1,
    },
    addBtn: {
        position: 'absolute',
        right: 15,
        bottom: 50,
    }
});