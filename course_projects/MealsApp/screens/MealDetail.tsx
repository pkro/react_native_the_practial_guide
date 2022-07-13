import React, {useEffect, useLayoutEffect} from 'react';
import {CATEGORIES, MEALS} from '../data/dummy-data';
import {View, Text, StyleSheet, FlatList} from 'react-native';
import type {NativeStackScreenProps} from '@react-navigation/native-stack';
import MealItem from "../components/MealItem";
import {RootStackParamList} from "../types";

type Props = NativeStackScreenProps<RootStackParamList, 'MealDetail'>;

export function MealDetail({navigation, route}: Props) {
    const {id} = route.params;

    useLayoutEffect(() => {
        const title = MEALS.find(c => c.id === id)!.title;
        navigation.setOptions({
            title: title
        });
    }, [id, navigation]);

    return (
        <View>
            <Text>Meals {id}</Text>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 16,
    },
});
