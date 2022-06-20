import React, { useState } from 'react';
import { Button, FlatList, StyleSheet, View } from 'react-native';
import GoalItem from './components/GoalItem';
import { GoalType } from './types';
import GoalInput from './components/GoalInput';
import { StatusBar } from 'expo-status-bar';

export default function App() {
    const [goals, setGoals] = useState<Array<GoalType>>([]);
    const [modalOpen, setModalOpen] = useState(false);
    console.log(modalOpen);
    const addGoalHandler = (goal: GoalType) => {
        if (
            !goal.text.trim().length ||
            goals.find((listGoal) => listGoal.text === goal.text.trim())
        )
            return;
        setGoals((prevState) => [...prevState, goal]);
    };

    const deleteGoalHandler = (goalId: string) => {
        setGoals((prevState) => prevState.filter((goal) => goal.id !== goalId));
    };
    return (
        <>
            <StatusBar style={'light'} />
            <View style={styles.appContainer}>
                <Button title={'Add goal'} color={'orange'} onPress={() => setModalOpen(true)} />
                <GoalInput
                    onAddGoal={addGoalHandler}
                    modalOpen={modalOpen}
                    closeFunc={() => setModalOpen(false)}
                />

                <View style={styles.goalItems}>
                    <FlatList
                        data={goals}
                        keyExtractor={(item) => item.id}
                        renderItem={(itemData) => (
                            <GoalItem goal={itemData.item} onPress={deleteGoalHandler} />
                        )}
                    />
                </View>
                <View style={styles.resetButton}>
                    <Button
                        title={'Reset'}
                        onPress={() => {
                            setGoals([]);
                        }}
                    />
                </View>
            </View>
        </>
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
