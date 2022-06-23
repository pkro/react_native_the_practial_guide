import React, { useState } from 'react';
import { StatusBar } from 'expo-status-bar';
import { ImageBackground, SafeAreaView, StyleSheet, View } from 'react-native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { StartGameScreen } from './screens/StartGameScreen';
import { LinearGradient } from 'expo-linear-gradient';
import { GameScreen } from './screens/GameScreen';
import colors from './constants/colors';
const Stack = createNativeStackNavigator();

export default function App() {
    const [enteredNumber, setEnteredNumber] = useState<number | undefined>();

    function setNumber(number: number) {
        setEnteredNumber(number);
    }

    return (
        <LinearGradient colors={[colors.primary700, colors.accent500]} style={styles.container}>
            <ImageBackground
                style={styles.backgroundImage}
                source={require('./assets/images/bg.jpg')}
                resizeMode={'cover'}
                imageStyle={{ opacity: 0.5 }}
            />
            <StatusBar style="auto" />
            <SafeAreaView style={styles.container}>
                {enteredNumber ? (
                    <GameScreen number={enteredNumber} />
                ) : (
                    <StartGameScreen setNumber={setNumber} />
                )}
            </SafeAreaView>
        </LinearGradient>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    backgroundImage: {
        flex: 1,
        position: 'absolute',
        width: '100%',
        height: '100%',
    },
});
