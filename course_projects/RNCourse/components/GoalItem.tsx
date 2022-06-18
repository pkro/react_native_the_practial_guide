import React from 'react';
import { Pressable, StyleSheet, Text, View } from 'react-native';
import { GoalType } from '../types';

type GoalItemProps = {
    goal: GoalType;
    onPress: (goalId: string) => void;
};

export default function GoalItem({ goal, onPress }: GoalItemProps) {
    return (
        <View style={styles.goalItemWrapper}>
            {/* could also be done with <Pressable onPress={onPress.bind(this, goal.id)}> */}
            <Pressable
                android_ripple={{ color: '#dddddd' }}
                style={({ pressed }) => pressed && styles.pressedItem}
                onPress={() => onPress(goal.id)}
            >
                <Text style={styles.goalItem}>{goal.text}</Text>
            </Pressable>
        </View>
    );
}

const styles = StyleSheet.create({
    goalItemWrapper: {
        borderRadius: 3,
        backgroundColor: 'orange',
        padding: 0,

        marginBottom: 6,
    },
    goalItem: {
        color: 'white',
        fontSize: 20,
        padding: 4,
        paddingLeft: 8,
    },
    pressedItem: {
        opacity: 0.5,
    },
});
