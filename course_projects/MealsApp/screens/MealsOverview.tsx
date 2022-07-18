import React, {useLayoutEffect} from 'react';
import {CATEGORIES, MEALS} from '../data/dummy-data';
import type {NativeStackScreenProps} from '@react-navigation/native-stack';
import {RootStackParamList} from "../types";
import MealsList from "../components/MealsList";

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



    return <MealsList ids={displayedMeals.map(m=>m.id)} title={`Meals for category ${categoryName}`}/>
}
