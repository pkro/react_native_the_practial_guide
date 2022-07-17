import React, {useEffect, useLayoutEffect} from 'react';
import {MEALS, mealsType} from '../data/dummy-data';
import {Button, Image, Platform, ScrollView, StyleSheet, Text, View} from 'react-native';
import type {NativeStackScreenProps} from '@react-navigation/native-stack';
import {RootStackParamList} from "../types";
import {MealOverviewDetails} from "../components/MealOverviewDetails";
import {Subtitle} from "../components/MealDetail/Subitle";
import {List} from "../components/MealDetail/List";
import IconButton from "../components/IconButton";

type Props = NativeStackScreenProps<RootStackParamList, 'MealDetail'>;

export function MealDetail({navigation, route}: Props) {
    const {id} = route.params;
    const [meal, setMeal] = React.useState<mealsType>(MEALS[0]);

    useEffect(() => {
        setMeal(() => MEALS.find(meal => meal.id === id)!);
        const title = meal.title;
    }, [id, navigation, MEALS]);

    function headerButtonPressHandler() {
        console.log("Pressed")
    }
    useLayoutEffect(() => {
        navigation.setOptions({
            headerRight: () => <IconButton icon={"star"} color={"white"} onPress={headerButtonPressHandler} />
        });
    }, [navigation, headerButtonPressHandler]);

    if (!meal) return <Text>Loading</Text>

    return (
        <ScrollView>
            <View style={styles.container}>
            <View>
                <Image source={{uri: meal.imageUrl}} style={styles.image}/>
                <Text style={styles.title}>{meal.title}</Text>
            </View>
            <MealOverviewDetails affordability={meal.affordability} complexity={meal.complexity}
                                 duration={meal.duration} style={{color: 'white'}}/>

            <View style={styles.outerListWrapper}>
                <View style={styles.innerListWrapper}>
                    <Subtitle>Ingredients</Subtitle>
                    <List data={meal.ingredients}/>
                    <Subtitle>Preparation</Subtitle>
                    <List data={meal.steps}/>
                </View>
            </View>
            </View>
        </ScrollView>

    );
}

const styles = StyleSheet.create(
    {
        container: {
            marginBottom: 16
        },
        outerListWrapper: {
            maxWidth: '100%',
            alignItems: 'center'
        },
        innerListWrapper: {
            maxWidth: '80%',
        },

        image: {
            width: '100%',
            height: 200,
        },
        title: {
            color: 'white',
            paddingTop: 16,
            fontWeight: 'bold',
            textAlign: 'center',
            fontSize: 18
        },
    }
);
