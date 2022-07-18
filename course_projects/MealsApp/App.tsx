import React, {useState} from 'react';
import {StatusBar} from 'expo-status-bar';
import {Button, StyleSheet, Text} from 'react-native';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator, NativeStackNavigationOptions} from '@react-navigation/native-stack';

import MealsCategories from './screens/MealsCategories';
import {MealsOverview} from './screens/MealsOverview';
import {MealDetail} from "./screens/MealDetail";
import {RootStackParamList} from "./types";
import {createDrawerNavigator} from "@react-navigation/drawer";
import Favorites from "./screens/Favorites";
import {Ionicons} from "@expo/vector-icons";
import FavoritesContextProvider from "./store/context/favorites-context";

const Stack = createNativeStackNavigator<RootStackParamList>();
const Drawer = createDrawerNavigator<RootStackParamList>();

function DrawerNavigator() {
    return <Drawer.Navigator screenOptions={{
        headerStyle: {
            backgroundColor: '#351401'
        },
        headerTintColor: 'white',
        sceneContainerStyle: {backgroundColor: '#3f2f25'},
        drawerContentStyle: {backgroundColor: '#351401'},
        drawerInactiveTintColor: 'white',
        drawerActiveTintColor: '#351401',
        drawerActiveBackgroundColor: '#a68984'
    }}>
        <Drawer.Screen name={"MealsCategories"} component={MealsCategories} options={{
            title: 'All Categories',
            drawerIcon: ({color, size}) => <Ionicons color={color} size={size} name={'list'}/>
        }}/>
        <Drawer.Screen name={"Favorites"} component={Favorites} options={{
            title: 'Favorites',
            drawerIcon: ({color, size}) => <Ionicons color={color} size={size} name={'star'}/>
        }}/>
    </Drawer.Navigator>
}

export default function App() {
    return (
        <>
            <StatusBar style="light"/>
            <FavoritesContextProvider>
                <NavigationContainer>
                    <Stack.Navigator screenOptions={{
                        animation: 'fade_from_bottom',
                        headerStyle: {
                            backgroundColor: '#351401'
                        },
                        headerTintColor: 'white',
                        contentStyle: {backgroundColor: '#3f2f25'}
                    }}>
                        <Stack.Screen name="Drawer" component={DrawerNavigator} options={{
                            headerShown: false
                        }}/>
                        <Stack.Screen name="MealsOverview" component={MealsOverview}/>
                        <Stack.Screen name="MealDetail" component={MealDetail}/>
                    </Stack.Navigator>
                </NavigationContainer>
            </FavoritesContextProvider>
        </>
    );
}

const styles = StyleSheet.create({
    container: {},
});
