import React, { useState } from 'react';
import { GoalType } from '../types';
import { Button, Modal, StyleSheet, TextInput, View, Image } from 'react-native';
import { createEmptyGoal } from '../lib/lib';

const styles = StyleSheet.create({
    inputContainer: {
        flexDirection: 'column',
        justifyContent: 'center',
        flex: 1,
        alignItems: 'center',
        backgroundColor: '#311b6b',
        marginBottom: 64,
    },
    textInput: {
        borderWidth: 1,
        borderColor: '#e4d0ff',
        backgroundColor: '#e4d0ff',
        borderRadius: 6,
        marginRight: 4,
        paddingLeft: 8, // padding inside the text field
        height: 34,
        marginBottom: 16,
        width: '90%',
        color: '#120438',
    },
    buttonContainer: {
        width: '80%',
        flexDirection: 'row',
        justifyContent: 'space-between',
    },
    outerContainer: {
        width: '40%',
    },
    goalImg: {
        width: 100,
        height: 100,
        marginBottom: 16,
    },
});

type GoalInputPropsType = {
    onAddGoal: (goal: GoalType) => void;
    modalOpen: boolean;
    closeFunc: () => void;
};
export default function GoalInput({ onAddGoal, modalOpen, closeFunc }: GoalInputPropsType) {
    const [currentGoal, setCurrentGoal] = useState(createEmptyGoal());
    const goalInputHandler = (text: string) => {
        setCurrentGoal({ ...currentGoal, text: text });
    };

    const saveAndClose = () => {
        onAddGoal(currentGoal);
        setCurrentGoal(createEmptyGoal());
        closeFunc();
    };

    const cancel = () => {
        setCurrentGoal(createEmptyGoal());
        closeFunc();
    };

    return (
        <Modal visible={modalOpen} animationType={'slide'}>
            <View style={styles.inputContainer}>
                <Image style={styles.goalImg} source={require('../assets/images/goal.png')} />
                <TextInput
                    style={styles.textInput}
                    placeholder={'Enter a goal'}
                    value={currentGoal.text}
                    onChangeText={goalInputHandler}
                />
                <View style={styles.buttonContainer}>
                    <View style={styles.outerContainer}>
                        <Button title={'Cancel'} onPress={cancel} color={'#924cee'} />
                    </View>
                    <View style={styles.outerContainer}>
                        <Button title={'Add goal'} onPress={saveAndClose} color={'#f31282'} />
                    </View>
                </View>
            </View>
        </Modal>
    );
}
