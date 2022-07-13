import React, {useEffect, useLayoutEffect} from 'react';
import {CATEGORIES, MEALS} from '../data/dummy-data';
import {View, Text, StyleSheet, FlatList} from 'react-native';
import type {NativeStackScreenProps} from '@react-navigation/native-stack';
import MealItem from "../components/MealItem";
import {RootStackParamList} from "../types";


type Props = NativeStackScreenProps<RootStackParamList, 'MealsOverview'>;

export function MealsOverview({navigation, route}: Props) {
    const {categoryId, categoryName} = route.params;
    const displayedMeals = MEALS.filter(meal => meal.categoryIds.includes(categoryId));


    useLayoutEffect(() => {
        const categoryTitle = CATEGORIES.find(c => c.id === categoryId)!.title;
        navigation.setOptions({
            title: categoryTitle
        });
    }, [categoryId, navigation]);



    function renderMealItem(item: any) {
        const {id, title, imageUrl, duration, complexity, affordability} = item.item;
        return <MealItem id={id} title={title} imageUrl={imageUrl} duration={duration} complexity={complexity}
                         affordability={affordability}/>;
    }

    return (
        <View>
            <Text>Meals overview for {categoryName}</Text>
            <FlatList data={displayedMeals} keyExtractor={item => item.id} renderItem={renderMealItem}/>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 16,
    },
});
