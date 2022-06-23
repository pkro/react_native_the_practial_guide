import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import Title from '../components/Title';
type GameScreenPropsType = {
    number: number;
};
export function GameScreen({ number }: GameScreenPropsType) {
    return (
        <View style={styles.container}>
            <Title>Opponent&apos;s Guess</Title>
            <Text>{number}</Text>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'flex-start',
        paddingTop: 128,
    },
    bgImage: {
        width: '100%',
        height: '100%',
        flex: 1,
        justifyContent: 'center',
    },

    title: {
        borderWidth: 2,
        borderColor: '#FFFFFF',
        padding: 8,
        width: '60%',
        marginBottom: 32,
    },
    titleText: {
        color: '#FFFFFF',
        fontSize: 20,
        textAlign: 'center',
    },
    inputContainer: {
        width: '90%',
        height: 200,
        padding: 32,
        alignItems: 'center',
        justifyContent: 'space-evenly',
        flexDirection: 'column',
        backgroundColor: '#3b021f',
        borderRadius: 6,
        elevation: 8, // android
        // ios
        shadowOffset: { width: 8, height: 8 },
        shadowColor: 'black',
        shadowRadius: 6,
        shadowOpacity: 0.25,
    },
});
