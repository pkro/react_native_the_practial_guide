import React from 'react';
import { StatusBar } from 'expo-status-bar';
import { Button, StyleSheet, Text, TextInput, View } from 'react-native';
import { useState } from 'react';

type goalType = { key: number; val: string };

export default function App() {
    const [goals, setGoals] = useState<Array<goalType>>([]);
    const [keyRunner, setKeyRunner] = useState(0);
    const [currentGoal, setCurrentGoal] = useState<goalType>({ key: keyRunner, val: '' });
    const addGoal = (goal: goalType) => {
        setGoals((prevState) => [...prevState, currentGoal]);
        setKeyRunner((prevState) => prevState++);
        setCurrentGoal({ key: keyRunner, val: '' });
    };
    return (
        <View style={styles.appContainer}>
            <View>
                <TextInput
                    placeholder={'Enter a goal'}
                    value={currentGoal.val}
                    onChangeText={(text) => setCurrentGoal({ key: keyRunner, val: text })}
                />
            </View>
            <View>
                <Button
                    title={'Add goal'}
                    onPress={() => setGoals((prevState) => [...prevState, currentGoal])}
                />
            </View>
            <View>
                {goals.map((goal) => (
                    <Text key={goal.key}>{goal.val}</Text>
                ))}
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    appContainer: {
        padding: 50,
    },
});
