import React from 'react';
import { View, Text, StyleSheet, Image, Dimensions, ScrollView } from 'react-native';
import { PrimaryButton } from '../components/PrimaryButton';
import Title from '../components/Title';
import InputContainer from '../components/InputContainer';
import colors from '../constants/colors';

type GameOverScreenPropsType = {
    restart: () => void;
    userNumber: number;
    roundsNeeded: number;
};

export function GameOverScreen({ restart, userNumber, roundsNeeded }: GameOverScreenPropsType) {
    return (
        <ScrollView style={{ flex: 1, flexDirection: 'column' }}>
            <View style={styles.container}>
                <Title>Game over</Title>
                <View style={styles.imageContainer}>
                    <Image source={require('../assets/images/success.png')} style={styles.image} />
                </View>
                <Text style={styles.text}>
                    Your phone needed <Text style={styles.highlightedText}>{roundsNeeded}</Text>{' '}
                    rounds to guess the number{' '}
                    <Text style={styles.highlightedText}>{userNumber}</Text>
                </Text>
                <View style={{ width: 200 }}>
                    <PrimaryButton onPress={() => restart()}>Restart</PrimaryButton>
                </View>
            </View>
        </ScrollView>
    );
}

const { width, height } = Dimensions.get('window');

const styles = StyleSheet.create({
    container: {
        marginVertical: height < 500 ? 32 : 64,
        flex: 1,
        alignItems: 'center',
        justifyContent: height < 500 ? 'space-between' : 'space-around',
    },
    imageContainer: {
        borderRadius: 999,
        width: Math.round(width * 0.25),
        height: Math.round(width * 0.25),
        borderColor: colors.primary800,
        borderWidth: 3,
        overflow: 'hidden',
    },
    image: {
        width: '100%',
        height: '100%',
    },
    highlightedText: {
        fontFamily: 'open-sans-bold',
        color: colors.primary500,
    },
    text: {
        textAlign: 'center',
        fontFamily: 'open-sans',
        fontSize: 24,

        padding: 8,
        borderRadius: 6,
    },
});
