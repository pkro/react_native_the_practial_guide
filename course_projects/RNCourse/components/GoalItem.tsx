import React from 'react';
import { Pressable, StyleSheet, Text, View } from 'react-native';
import { GoalType } from '../types';

const styles = StyleSheet.create({
    goalItemWrapper: {
        borderRadius: 3,
        backgroundColor: 'orange',
        padding: 4,
        paddingLeft: 8,
        marginBottom: 6,
    },
    goalItem: {
        color: 'white',
        fontSize: 20,
    },
});

type GoalItemProps = {
    goal: GoalType;
    onPress: (goalId: string) => void;
};
export default function GoalItem({ goal, onPress }: GoalItemProps) {
    return (
        <Pressable onPress={() => onPress(goal.id)}>
            {/* could also be done with <Pressable onPress={onPress.bind(this, goal.id)}> */}
            <View style={styles.goalItemWrapper}>
                <Text style={styles.goalItem}>{goal.text}</Text>
            </View>
        </Pressable>
    );
}
