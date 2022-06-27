import React, { useEffect, useState } from 'react';
import { Alert, FlatList, StyleSheet, Text, View } from 'react-native';
import Title from '../components/Title';
import colors from '../constants/colors';
import InputContainer from '../components/InputContainer';
import { PrimaryButton } from '../components/PrimaryButton';
import GuessRow from '../components/GuessRow';
import { AntDesign } from '@expo/vector-icons';
import { useGame } from '../hooks/useGame';

type GameScreenPropsType = {
    userNumber: number;
    setGameOver: (gameOver: boolean) => void;
    setRoundsNeeded: (rounds: number) => void;
};

export function GameScreen(
    this: any,
    { userNumber, setGameOver, setRoundsNeeded }: GameScreenPropsType,
) {
    const { guesses, currentGuess, game } = useGame(userNumber, setRoundsNeeded, setGameOver);

    return (
        <View style={styles.container}>
            <Title>Opponent&apos;s Guess</Title>
            <View style={styles.guess}>
                <Text style={styles.guessText}>{currentGuess}</Text>
            </View>

            <InputContainer title={'Lower or higher?'}>
                <View style={styles.buttonRow}>
                    <View style={styles.buttonContainer}>
                        <PrimaryButton onPress={game.bind(this, 'lower')}>
                            {/* eslint-disable-next-line @typescript-eslint/ban-ts-comment */}
                            {/* @ts-ignore */}
                            <AntDesign name="minuscircleo" size={24} color={'white'} />
                        </PrimaryButton>
                    </View>
                    <View style={styles.buttonContainer}>
                        <PrimaryButton onPress={game.bind(this, 'higher')}>
                            {/* eslint-disable-next-line @typescript-eslint/ban-ts-comment */}
                            {/* @ts-ignore */}
                            <AntDesign name="pluscircleo" size={24} color={'white'} />
                        </PrimaryButton>
                    </View>
                </View>
            </InputContainer>
            <View style={styles.flatListWrapper}>
                <FlatList
                    bounces={true}
                    alwaysBounceVertical={true}
                    style={styles.list}
                    data={guesses}
                    contentContainerStyle={styles.listContainer}
                    keyExtractor={(item) => item.toString()}
                    renderItem={(item) => (
                        <GuessRow guess={item.item} roundNumber={guesses.length - item.index} />
                    )}
                />
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'flex-start',
        paddingTop: 48,
    },

    guess: {
        borderWidth: 2,
        borderColor: colors.accent500,
        padding: 8,
        width: '40%',
        marginBottom: 32,
        borderRadius: 3,
    },
    guessText: {
        color: colors.accent500,
        fontSize: 24,
        textAlign: 'center',
        fontWeight: 'bold',
    },
    buttonRow: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        width: '100%',
        paddingTop: 16,
    },
    buttonContainer: {
        flex: 1, // makes sure each button gets the same size as both views get flex: 1
        marginHorizontal: 8,
    },
    flatListWrapper: {
        flex: 1,
        padding: 16,
    },
    list: {
        flex: 1,
        width: '100%',
        marginTop: 16,
    },
    listContainer: {
        justifyContent: 'flex-start',
        alignItems: 'center',
    },
});
