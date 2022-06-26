import React, { useEffect, useState } from 'react';
import { StatusBar } from 'expo-status-bar';
import { ImageBackground, SafeAreaView, StyleSheet, View, Text } from 'react-native';
import { StartGameScreen } from './screens/StartGameScreen';
import { LinearGradient } from 'expo-linear-gradient';
import { GameScreen } from './screens/GameScreen';
import colors from './constants/colors';
import { GameOverScreen } from './screens/GameOverScreen';
import { useFonts } from 'expo-font';
import AppLoading from 'expo-app-loading/build/AppLoadingNativeWrapper';

export default function App() {
    const [fontsLoaded] = useFonts({
        'open-sans-bold': require('./assets/fonts/OpenSans-Bold.ttf'),
        'open-sans': require('./assets/fonts/OpenSans-Regular.ttf'),
    });

    const [userNumber, setUserNumber] = useState<number | undefined>();
    const [gameOver, setGameOver] = useState(false);
    const [roundsNeeded, setRoundsNeeded] = useState(0);

    function setNumber(number: number) {
        setUserNumber(number);
    }

    function restart() {
        setGameOver(false);
        setUserNumber(undefined);
        setRoundsNeeded(0);
    }

    let screen = <StartGameScreen setNumber={setNumber} />;
    if (gameOver && userNumber) {
        screen = (
            <GameOverScreen restart={restart} userNumber={userNumber} roundsNeeded={roundsNeeded} />
        );
    }
    if (!gameOver && userNumber !== undefined) {
        screen = (
            <GameScreen
                userNumber={userNumber}
                setGameOver={setGameOver}
                setRoundsNeeded={setRoundsNeeded}
            />
        );
    }

    if (!fontsLoaded) {
        return <AppLoading />;
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
            <SafeAreaView style={styles.container}>{screen}</SafeAreaView>
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
        opacity: 0.5,
    },
});
