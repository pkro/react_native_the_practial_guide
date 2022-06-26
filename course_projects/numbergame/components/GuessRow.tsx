import React from 'react';
import { Text, View, StyleSheet } from 'react-native';
import colors from '../constants/colors';

type GuessRowPropsType = { roundNumber: number; guess: number };
export default function GuessRow({ roundNumber, guess }: GuessRowPropsType) {
    return (
        <View style={styles.row}>
            <View>
                <Text style={styles.rowText}>#{roundNumber}</Text>
            </View>
            <View>
                <Text style={styles.rowText}>{guess}</Text>
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    row: {
        flexDirection: 'row',
        borderWidth: 1,
        justifyContent: 'space-between',
        borderColor: colors.primary300,
        backgroundColor: colors.accent500,
        paddingVertical: 2,
        paddingHorizontal: 16,
        width: 200,
        borderRadius: 999,
        marginBottom: 8,
        elevation: 4,
        shadowColor: colors.primary300,
        shadowOffset: { width: 3, height: 3 },
        shadowRadius: 3,
        shadowOpacity: 0.5,
    },
    rowText: {
        width: '100%',
        color: '#FFFFFF',
        fontSize: 20,
        textAlign: 'center',
        fontWeight: 'bold',
        fontFamily: 'open-sans',
    },
});
