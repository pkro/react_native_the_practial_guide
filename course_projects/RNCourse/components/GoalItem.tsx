import React from 'react';
import { ListRenderItemInfo, StyleSheet, Text, View } from 'react-native';
import { GoalType } from '../types';

const styles = StyleSheet.create({
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
});

type GoalItemProps = {
    listRenderItem: ListRenderItemInfo<GoalType>;
};
export default function GoalItem({ listRenderItem }: GoalItemProps) {
    return (
        <View style={styles.goalItemWrapper}>
            <Text style={styles.goalItem}>{listRenderItem.item.text}</Text>
        </View>
    );
}
