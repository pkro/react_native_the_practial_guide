import {MEALS} from "../data/dummy-data";
import React from "react";
import MealItem from "./MealItem";
import {FlatList, Text, View} from "react-native";

export default function MealsList({ids, title}: { ids: string[], title: string }) {

    const displayedMeals = MEALS.filter(meal => ids.includes(meal.id));

    function renderMealItem(item: any) {
        const {id, title, imageUrl, duration, complexity, affordability} = item.item;
        return <MealItem id={id} title={title} imageUrl={imageUrl} duration={duration} complexity={complexity}
                         affordability={affordability}/>;
    }

    return (
        <View>
            <Text>{title}</Text>
            <FlatList data={displayedMeals} keyExtractor={item => item.id} renderItem={renderMealItem}/>
        </View>
    );
}
