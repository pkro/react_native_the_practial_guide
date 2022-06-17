import React from 'react';
import { StatusBar } from 'expo-status-bar';
import { Button, StyleSheet, Text, TextInput, View } from 'react-native';
import { useState } from 'react';

type goalType = { key: number; val: string };

export default function App() {
    const [goals, setGoals] = useState<Array<goalType>>([]);
    const [keyRunner, setKeyRunner] = useState(1);
    const [currentGoal, setCurrentGoal] = useState<goalType>({ key: keyRunner, val: '' });
    const addGoal = () => {
        setKeyRunner((prevState) => prevState + 1);
        setGoals((prevState) => [...prevState, currentGoal]);
        setCurrentGoal({ key: keyRunner, val: '' });
    };
    return (
        <View style={styles.appContainer}>
            <View style={styles.inputContainer}>
                <TextInput
                    style={styles.textInput}
                    placeholder={'Enter a goal'}
                    value={currentGoal.val}
                    onChangeText={(text) => setCurrentGoal({ key: keyRunner, val: text })}
                />

                <Button title={'Add goal'} onPress={() => addGoal()} />
            </View>

            <View>
                {goals.map((goal) => (
                    <Text key={goal.key}>{goal.val}</Text>
                ))}
            </View>
            <View>
                <Button
                    title={'Reset'}
                    onPress={() => {
                        setGoals([]);
                        setKeyRunner(0);
                        setCurrentGoal({ key: 0, val: '' });
                    }}
                />
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    appContainer: {
        paddingTop: 50,
        paddingHorizontal: 20,
        flex: 1,
        flexDirection: 'column',
        justifyContent: 'space-around',
    },
    inputContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
    },
    textInput: {
        borderWidth: 1,
        borderColor: '#DDDDDD',
        width: '80%',
        borderRadius: 6,
        marginRight: 4,
        paddingLeft: 4, // padding inside the text field
    },
});
