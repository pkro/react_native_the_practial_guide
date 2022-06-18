import React, { useState } from 'react';
import { Button, FlatList, StyleSheet, View } from 'react-native';
import GoalItem from './components/GoalItem';
import { GoalType } from './types';
import GoalInput from './components/GoalInput';
import { createEmptyGoal } from './lib/lib';

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
            <GoalInput
                currentGoal={currentGoal}
                onChangeText={goalInputHandler}
                onAddGoal={() => addGoalHandler()}
            />

            <View style={styles.goalItems}>
                <FlatList
                    data={goals}
                    keyExtractor={(item) => item.id}
                    renderItem={(itemData) => <GoalItem text={itemData.item.text} />}
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
    goalItems: {
        flex: 4,
        paddingVertical: 6,
        borderTopWidth: 1,
        borderTopColor: 'gray',
        borderBottomWidth: 1,
        borderBottomColor: 'gray',
        marginVertical: 8,
    },
    resetButton: {
        flex: 1,
        alignItems: 'center',
    },
});
