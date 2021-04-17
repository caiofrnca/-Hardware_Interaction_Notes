import AsyncStorage from '@react-native-community/async-storage';
import React, { useState, useEffect } from 'react';
import { View, StyleSheet, Text, StatusBar, TextInput, FlatList, TouchableWithoutFeedback, Modal, Keyboard} from 'react-native';
import colors from './app/misc/colors';
import { RoundIconBtn } from './RoundIconBtn';
import { SearchBar } from './SearchBar';
import { NoteInputModal } from './NoteInputModal';
import {Note} from './Note.js';




export function NoteScreen({ user }) {
    const [greet, setGreet] = useState('');
    const [modalVisible, setModalVisible] = useState(false);
    const [notes, setNotes] = useState([]);

    const findGreet = () => {
        const hours = new Date().getHours()
        if (hours === 0 || hours < 12) return setGreet('Morning!');
        if (hours === 1 || hours < 17) return setGreet('Afternoon!');
        setGreet('Evening!');
    };
    //to check if there is some notes inside the Asyncstorage. If there is any note store that in the app
    const findNotes = async () => {
        const result = await AsyncStorage.getItem('notes');
        if (result !== null) setNotes(JSON.parse(result));
    }

    useEffect(() => {
        //AsyncStorage.clear();
        findNotes();
        findGreet();
    }, []);

    const handleOnSubmit = async (title, desc) => {

        const note = { id: Date.now(), title, desc, time: Date.now() };
        const updateNotes = [...notes, note];
        setNotes(updateNotes)
        await AsyncStorage.getItem('notes', JSON.stringify(updateNotes));
    }

    return (
        <>

            <StatusBar barStyle='dark-content' backgroundColor={colors.LIGHT}></StatusBar>
            <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
                <View style={styles.conatainer}>


                    <Text style={styles.header}>{`Good ${greet} ${user.name}`}</Text>
                    {notes.length ?   <SearchBar conatainerStyle={{ marginVertical: 15 }}></SearchBar> : null}
                    <SearchBar conatainerStyle={{ marginVertical: 15 }}></SearchBar>
                    <FlatList data={notes} 
                    numColumns = {2}
                    columnWrapperStyle = {{justifyContent: 'space-between', marginBottom: 15, }}
                    keyExtractor={item => item.id.toString()}
                        renderItem={({ item }) => <Note item={item} />}
                    />
                    {!notes.length ? <View style={[StyleSheet.absoluteFillObject,
                    styles.emptyHeaderContainer]}>
                 <Text style={styles.emptyHeader}>Add notes</Text>
                    </View> : null};

                </View>
            </TouchableWithoutFeedback>
            <RoundIconBtn onPress={() => setModalVisible(true)}
                antIconName='plus' style={styles.addBtn}></RoundIconBtn>
            <NoteInputModal visible={modalVisible}
                onClose={() => setModalVisible(false)}
                onSubmit={handleOnSubmit}
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
        zIndex: 1,//to type inside the searchbar
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