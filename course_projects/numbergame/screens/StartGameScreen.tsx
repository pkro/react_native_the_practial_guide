import React, { useState } from 'react';
import { Alert, StyleSheet, Text, TextInput, View } from 'react-native';
import { PrimaryButton } from '../components/PrimaryButton';
import Title from '../components/Title';
import colors from '../constants/colors';
import InputContainer from '../components/InputContainer';

type StartGameScreenPropTypes = {
    setNumber: (number: number) => void;
};

export function StartGameScreen({ setNumber }: StartGameScreenPropTypes) {
    const [enteredNumber, setEnteredNumber] = useState('');

    const confirmInputHandler = () => {
        const parsedNumber = enteredNumber && enteredNumber.length ? parseInt(enteredNumber) : null;
        if (!parsedNumber || isNaN(parsedNumber) || parsedNumber <= 0 || parsedNumber > 99) {
            Alert.alert('Please enter a number', 'The number must be between 0 and 99!', [
                { text: 'OK', style: 'destructive', onPress: () => setEnteredNumber('') },
            ]);
            return;
        }
        setNumber(parsedNumber);
    };

    return (
        <View style={styles.container}>
            <Title>Guess My Number</Title>
            <InputContainer title={'Enter a number'}>
                <View style={styles.textInputWrapper}>
                    <TextInput
                        keyboardType={'number-pad'}
                        maxLength={2}
                        autoCapitalize={'none'}
                        autoCorrect={false}
                        style={styles.textInput}
                        value={enteredNumber}
                        onChangeText={setEnteredNumber}
                    />
                </View>
                <View style={styles.buttonRow}>
                    <View style={styles.buttonContainer}>
                        <PrimaryButton onPress={() => setEnteredNumber('')}>clear</PrimaryButton>
                    </View>
                    <View style={styles.buttonContainer}>
                        <PrimaryButton onPress={confirmInputHandler}>confirm</PrimaryButton>
                    </View>
                </View>
            </InputContainer>
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
    inputContainerTitleText: {
        color: '#ddb52f',
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
        backgroundColor: colors.primary500,
        borderRadius: 6,
        elevation: 8, // android
        // ios
        shadowOffset: { width: 8, height: 8 },
        shadowColor: 'black',
        shadowRadius: 6,
        shadowOpacity: 0.25,
    },
    textInputWrapper: {},
    textInput: {
        width: 60,
        height: 50,
        fontSize: 32,
        padding: 4,
        borderBottomWidth: 2,
        borderBottomColor: colors.accent500,
        color: colors.accent500,
        marginVertical: 8,
        fontWeight: 'bold',
        textAlign: 'center',
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

    inputTitle: {},
    numberInput: {},
    guess: {},
    gameInput: {},
    guessList: {},
});
