import React from 'react';
import{View, StyleSheet} from 'react-native';
import {AntDesign} from '@expo/vector-icons';//importing the icon from the icon provider
import colors from './app/misc/colors';



export function RoundIconBtn ({antIconName, size, color, style, onPress}) { 
    //to display the icon it is necessary to pass some properties
    return (<AntDesign name={antIconName}
         size={size || 24} 
        color={color || colors.LIGHT} 
        style ={[styles.icon, {...style}]}
        onPress = {onPress}
        /> //if size and color are not specified
    )
};
const styles = StyleSheet.create({
    icon: {
        backgroundColor: colors.PRIMARY,
        padding: 15,
        borderRadius:50,
        elevation: 5,
    }
});

