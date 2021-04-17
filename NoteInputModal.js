import React, { useState } from 'react';
import { View, StyleSheet, Modal, Text, StatusBar, TextInput, TouchableWithoutFeedback, Keyboard } from 'react-native';
import colors from './app/misc/colors';
import { RoundIconBtn } from './RoundIconBtn';


//visible property to display and hide the Modal component (true/false)
export function NoteInputModal({ visible, onClose, onSubmit }) {

    //Methods to storage the title and description
    //empty string as as defaul value
    const [title, setTitle] = useState('');
    const [desc, setDesc] = useState('');

    const handleModalClose = () => {
        Keyboard.dismiss();
    };

    // Method to save the data from the onChangeText in title and desc
    //Check if the valueFor is equal to title 
    //Check if the valueFor is equal to desc
    const handleOnChangeText = (text, valueFor) => {
        if (valueFor === 'title') setTitle(text);
        if (valueFor === 'desc') setDesc(text);

    };

    const handleSubmit = () => {
        if (!title.trim() && !desc.trim()) return onClose();
        onSubmit(title, desc);
        setTitle('');
        setDesc('');
        onClose();
    };

    const closeModal = () => {
        setTitle('');
        setDesc('');
        onClose();
    }
//onChangeText property to grab the value inside the TextInput to save the title and description
    return (
        <>
            <StatusBar hidden></StatusBar>
            <Modal visible={visible} animationType='fade'>
                <View style={styles.container}>
                    <TextInput
                        value={title}
                        placeholder='Title'
                        style={[styles.input, styles.title]}
                        onChangeText={(text) => handleOnChangeText(text, 'title')}>
                    </TextInput>

                    <TextInput
                        value={desc}
                        placeholder='Note'
                        multiline
                        style={[styles.input, styles.desc]}
                        onChangeText={(text) => handleOnChangeText(text, 'desc')}>
                    </TextInput>
                    <View style={styles.btnContainer}>
                        <RoundIconBtn
                            size={15}
                            antIconName='check'
                            onPress={handleSubmit}

                        >
                        </RoundIconBtn>

                      { title.trim() || desc.trim() ? <RoundIconBtn
                            size={15}
                            style={{ marginLeft: 15 }}
                            antIconName='close'
                            onPress= {closeModal}
                        >
                        </RoundIconBtn> : null}

                    </View>

                </View>

                <TouchableWithoutFeedback onPress={handleModalClose}>
                    <View style={[styles.modalBG, StyleSheet.absoluteFillObject]}></View>
                </TouchableWithoutFeedback>

            </Modal>
        </>
    );

};

const styles = StyleSheet.create({

    input: {
        borderBottomWidth: 2,
        borderBottomColor: colors.PRIMARY,
        fontSize: 20,
        color: colors.DARK
    },
    container: {
        paddingHorizontal: 20,
        paddingTop: 15,
    },
    title: {
        height: 40,
        marginBottom: 15,
        fontWeight: 'bold',
    },
    desc: {
        height: 100,
    },
    modalBG: {
        flex: 1,
        zIndex: -1,
    },
    btnContainer: {
        flexDirection: 'row',
        justifyContent: 'center',
        paddingVertical: 15,
    }

});