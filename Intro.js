//to display the intro for the app
import AsyncStorage from '@react-native-community/async-storage';
import React , {useState, setUser} from 'react';
import { View, StyleSheet, Text, Image, TextInput, StatusBar, Dimensions } from 'react-native';
import colors from './app/misc/colors';
import { RoundIconBtn } from './RoundIconBtn.js';


export function Intro({onFinish}) {
//to import the value from TextInput inside the user
  // and pass a callback funtion inside the inChangeText to grab the value
  // when some change happens inside the TextInput
 //setUser method to update the text
  const [name, setName] = useState('');

  const handleOnChangeText = (text) => {
    setName(text);
 };

const handleSubmit = async()=> {
const user =  {name: name };
//JSON.stringify to change the value to string, because AsyncStorage olny accept string
await AsyncStorage.setItem ('user', JSON.stringify(user));
if (onFinish) onFinish()
 };

    return (
        <>
            <StatusBar hidden />
            <View style={styles.container}>

            <Image
        source={require("./assets/logo_CA1.png")}
        style={{ width: 200, height: 200, marginTop: 64 }}
        resizeModo="contain"
      />
                <Text style={styles.inputTitle}>Enter your name to continue</Text>

                <TextInput value={name} onChangeText={handleOnChangeText} placeholder='Enter Name'
                    style={styles.textInput} />
                
                {name.trim().length > 3 ?  (<RoundIconBtn antIconName = 'arrowright' onPress={handleSubmit}></RoundIconBtn> ): null }
            </View>
        </>
    );
}
//imported dimentions from reatc-native
const width = Dimensions.get('window').width - 50;
const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        alignItems: 'center',
        justifyContent: 'center',
    },

    textInput: {
        borderWidth: 2,
        borderColor: colors.PRIMARY,// color imported from colors file
        color: colors.DARK,
        width,
        height: 50,
        borderRadius: 10,
        paddingLeft: 15,
        fontSize: 25,
        marginBottom: 15,
    },

    inputTitle: {
        alignSelf: 'flex-start',
        paddingLeft: 25,
        marginBottom: 5,
        opacity: 0.5,
        fontSize: 20,

    }

});
