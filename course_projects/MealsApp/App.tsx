import React, {useState} from 'react';
import {StatusBar} from 'expo-status-bar';
import {StyleSheet} from 'react-native';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator, NativeStackNavigationOptions} from '@react-navigation/native-stack';

import MealsCategories from './screens/MealsCategories';
import {MealsOverview} from './screens/MealsOverview';
import {MealDetail} from "./screens/MealDetail";
import {RootStackParamList} from "./types";

const Stack = createNativeStackNavigator<RootStackParamList>();

export default function App() {
    return (
        <>
            <StatusBar style="light"/>
            <NavigationContainer>
                <Stack.Navigator screenOptions={{
                    animation: 'fade_from_bottom',
                    headerStyle: {
                        backgroundColor: '#351401'
                    },
                    headerTintColor: 'white',
                    contentStyle: {backgroundColor: '#3f2f25'}
                }}>
                    <Stack.Screen name="MealsCategories" component={MealsCategories} options={{
                        title: 'Meal Categories'
                    }}/>
                    <Stack.Screen name="MealsOverview" component={MealsOverview} />
                    <Stack.Screen name="MealDetail" component={MealDetail} />
                </Stack.Navigator>
            </NavigationContainer>
        </>
    );
}

const styles = StyleSheet.create({
    container: {},
});
