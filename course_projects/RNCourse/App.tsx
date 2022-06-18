import React from 'react';
import { StatusBar } from 'expo-status-bar';
import { Button, FlatList, ScrollView, StyleSheet, Text, TextInput, View } from 'react-native';
import { useState } from 'react';

type GoalType = {
    text: string;
    id: string;
};

function uniqueKey() {
    return Math.random().toString();
}

function createEmptyGoal(): GoalType {
    return { text: '', id: uniqueKey() };
}

export default function App() {
    const [goals, setGoals] = useState<Array<GoalType>>([]);
    const [currentGoal, setCurrentGoal] = useState(createEmptyGoal());
    const goalInputHandler = (text: string) => setCurrentGoal({ ...currentGoal, text: text });
    const addGoalHandler = () => {
        if (
            !currentGoal.text.trim().length ||
            goals.find((goal) => goal.text === currentGoal.text.trim())
        )
            return;
        setGoals((prevState) => [...prevState, currentGoal]);
        setCurrentGoal(createEmptyGoal());
    };

    return (
        <View style={styles.appContainer}>
            <View style={styles.inputContainer}>
                <TextInput
                    style={styles.textInput}
                    placeholder={'Enter a goal'}
                    value={currentGoal.text}
                    onChangeText={goalInputHandler}
                />

                <Button title={'Add goal'} onPress={() => addGoalHandler()} />
            </View>

            <View style={styles.goalItems}>
                <FlatList
                    data={goals}
                    keyExtractor={(item) => item.id}
                    renderItem={(itemData) => (
                        <View style={styles.goalItemWrapper}>
                            <Text style={styles.goalItem}>{itemData.item.text}</Text>
                        </View>
                    )}
                />
            </View>

            <View style={styles.resetButton}>
                <Button
                    title={'Reset'}
                    onPress={() => {
                        setGoals([]);
                        setCurrentGoal(() => createEmptyGoal());
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
        marginBottom: 6,
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
