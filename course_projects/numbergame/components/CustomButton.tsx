import React from 'react';
import {Pressable, StyleSheet, Text} from "react-native";

type CustomButtonPropsType = {text: string, onPress: ()=>void}
export function CustomButton({text, onPress}: CustomButtonPropsType) {
    return <Pressable style={styles.button}><Text style={styles.buttonText} onPress={onPress}>{text}</Text></Pressable>;
}

const styles = StyleSheet.create({
    button: {width: 128, borderRadius: 24, backgroundColor: '#640a3b', padding: 8},
    buttonText: {
        color: 'white', textAlign: 'center', fontSize: 16
    },



});
