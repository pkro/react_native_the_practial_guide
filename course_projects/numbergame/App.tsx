import React from 'react';
import {StatusBar} from 'expo-status-bar';
import {ImageBackground, StyleSheet, View} from 'react-native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {StartGameScreen} from "./screens/StartGameScreen";
//  style={styles.bgImage} source={require('./assets/images/bg.jpg')} resizeMode={'cover'}

const Stack = createNativeStackNavigator();
export default function App() {
    return (
        <>
            <StatusBar style="auto"/>
            <ImageBackground source={require('./assets/images/bg.jpg')} />
                <View style={styles.container}>
                    <StartGameScreen />
                </View>
        </>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#763f3c', // replace with bg image later
        alignItems: 'center',
        justifyContent: 'flex-start',
        paddingTop: 128,

    },
});
