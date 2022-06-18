import React from 'react';
import { StyleSheet, Text, View } from 'react-native';

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
    text: string;
};
export default function GoalItem({ text }: GoalItemProps) {
    return (
        <View style={styles.goalItemWrapper}>
            <Text style={styles.goalItem}>{text}</Text>
        </View>
    );
}
