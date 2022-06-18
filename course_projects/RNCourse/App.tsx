import React from 'react';
import { StatusBar } from 'expo-status-bar';
import { Button, ScrollView, StyleSheet, Text, TextInput, View } from 'react-native';
import { useState } from 'react';

export default function App() {
    const [goals, setGoals] = useState<Array<string>>([]);
    const [currentGoal, setCurrentGoal] = useState('');

    const addGoalHandler = () => {
        if (!currentGoal.trim().length || goals.includes(currentGoal)) return;
        setGoals((prevState) => [...prevState, currentGoal]);
        setCurrentGoal('');
    };

    return (
        <View style={styles.appContainer}>
            <View style={styles.inputContainer}>
                <TextInput
                    style={styles.textInput}
                    placeholder={'Enter a goal'}
                    value={currentGoal}
                    onChangeText={setCurrentGoal}
                />

                <Button title={'Add goal'} onPress={() => addGoalHandler()} />
            </View>

            <View style={styles.goalItems}>
                <ScrollView>
                    {goals.map((goal) => (
                        <View style={styles.goalItemWrapper} key={goal}>
                            <Text style={styles.goalItem}>{goal}</Text>
                        </View>
                    ))}
                </ScrollView>
            </View>

            <View style={styles.resetButton}>
                <Button
                    title={'Reset'}
                    onPress={() => {
                        setGoals([]);
                        setCurrentGoal('');
                    }}
                />
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    appContainer: {
        paddingTop: 50,
        paddingHorizontal: 16,
        flex: 1,
        flexDirection: 'column',
        justifyContent: 'space-around',
    },
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
    goalItems: {
        flex: 4,
        paddingVertical: 6,
        borderTopWidth: 1,
        borderTopColor: 'gray',
        borderBottomWidth: 1,
        borderBottomColor: 'gray',
        marginVertical: 8,
    },
    goalItemWrapper: {
        borderRadius: 3,
        backgroundColor: 'orange',
        paddingLeft: 4,
        marginBottom: 2,
    },
    goalItem: {
        color: 'white',
        fontSize: 20,
    },
    resetButton: {
        flex: 1,
        alignItems: 'center',
    },
});
