import React, { useState, useEffect } from 'react';
import { View, StyleSheet, Text, StatusBar, TextInput } from 'react-native';
import colors from './app/misc/colors';

export function SearchBar({containerStyle}) {
    return (
        <View style={[styles.container , {...containerStyle}]}>
            <TextInput style={styles.searchBar} placeholder = 'Search here'></TextInput>
        </View>
    )

};

const styles = StyleSheet.create({
    searchBar: {
        borderWidth: 0.5,
        borderColor: colors.PRIMARY,
        height: 40,
        borderRadius: 40,
        paddingLeft: 15, 
        fontSize: 20,
    }



});