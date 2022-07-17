import React from 'react';
import {StyleSheet, Text, View} from "react-native";

type MealOverviewDetailsPropsType = {duration: string, complexity: string, affordability: string, style?: any}
export function MealOverviewDetails({duration, complexity, affordability, style}: MealOverviewDetailsPropsType) {
    return <View style={[styles.details, style]}>
        <Text style={[styles.detailsItem, style]}>{duration}m</Text>
        <Text style={[styles.detailsItem, style]}>{complexity}</Text>
        <Text style={[styles.detailsItem, style]}>{affordability}</Text>
    </View>
}

const styles = StyleSheet.create({
    details: {
        flexDirection: 'row',
        flexWrap: 'wrap',
        fontSize: 12,
        paddingTop: 8,
        paddingBottom: 8,
        justifyContent: 'center',
        width: '100%',
    },
    detailsItem: {
        marginLeft: 4,
    },
})
