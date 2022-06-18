import React, { useState } from 'react';
import { GoalType } from '../types';
import { Button, StyleSheet, TextInput, View } from 'react-native';
import { createEmptyGoal } from '../lib/lib';

const styles = StyleSheet.create({
    inputContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        flex: 1,
        alignItems: 'center',
    },
    textInput: {
        borderWidth: 1,
        borderColor: '#DDDDDD',
        flex: 4,
        borderRadius: 6,
        marginRight: 4,
        paddingLeft: 4, // padding inside the text field
        height: 34,
    },
});

export default function GoalInput(props: { onAddGoal: (goal: GoalType) => void }) {
    const [currentGoal, setCurrentGoal] = useState(createEmptyGoal());
    const goalInputHandler = (text: string) => {
        setCurrentGoal({ ...currentGoal, text: text });
    };

    return (
        <View style={styles.inputContainer}>
            <TextInput
                style={styles.textInput}
                placeholder={'Enter a goal'}
                value={currentGoal.text}
                onChangeText={goalInputHandler}
            />

            <Button
                title={'Add goal'}
                onPress={() => {
                    props.onAddGoal(currentGoal);
                    setCurrentGoal(createEmptyGoal());
                }}
            />
        </View>
    );
}
