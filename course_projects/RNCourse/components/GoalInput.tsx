import React from 'react';
import { GoalType } from '../types';
import { Button, StyleSheet, TextInput, View } from 'react-native';

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

export default function GoalInput(props: {
    currentGoal: GoalType;
    onChangeText: (text: string) => void;
    onAddGoal: () => void;
}) {
    return (
        <View style={styles.inputContainer}>
            <TextInput
                style={styles.textInput}
                placeholder={'Enter a goal'}
                value={props.currentGoal.text}
                onChangeText={props.onChangeText}
            />

            <Button title={'Add goal'} onPress={props.onAddGoal} />
        </View>
    );
}
