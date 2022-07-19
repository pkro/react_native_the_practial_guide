import React, {useContext, useEffect, useLayoutEffect} from 'react';
import {MEALS, mealsType} from '../data/dummy-data';
import {Image, ScrollView, StyleSheet, Text, View} from 'react-native';
import type {NativeStackScreenProps} from '@react-navigation/native-stack';
import {RootStackParamList} from "../types";
import {MealOverviewDetails} from "../components/MealOverviewDetails";
import {Subtitle} from "../components/MealDetail/Subitle";
import {List} from "../components/MealDetail/List";
import IconButton from "../components/IconButton";
import {useDispatch, useSelector} from "react-redux";
import {RootState} from "../store/redux/store";
import {addFavorite, removeFavorite} from "../store/redux/favoritesSlice";
//import {FavoritesContext} from "../store/context/favorites-context";

type Props = NativeStackScreenProps<RootStackParamList, 'MealDetail'>;

export function MealDetail({navigation, route}: Props) {
    const {id} = route.params;
    const [meal, setMeal] = React.useState<mealsType>(MEALS[0]);

    //const {ids, removeFavorite, addFavorite} = useContext(FavoritesContext);
    const favoriteMealIds = useSelector( (state: RootState) => state.favorites.ids )
    const dispatch = useDispatch();

    function headerButtonPressHandler() {
        if (favoriteMealIds.includes(id)) {
            // NOT just removeFavorite(id) - what we pass is the action.payload object,
            // which has an "id" property!
            dispatch(removeFavorite({id: id}));
            return;
        }
        dispatch(addFavorite({id: id}));
    }

    useLayoutEffect(() => {
        const icon = favoriteMealIds.includes(id) ? "star" : "star-outline";
        navigation.setOptions({
            headerRight: () => <IconButton icon={icon} color={"white"} onPress={headerButtonPressHandler} />
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
