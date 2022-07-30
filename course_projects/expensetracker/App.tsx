import {StatusBar} from 'expo-status-bar';
import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from "@react-navigation/native-stack";
import AllExpenses from "./screens/AllExpenses";
import {createBottomTabNavigator} from "@react-navigation/bottom-tabs";
import ManageExpense from "./screens/ManageExpense";
import RecentExpenses from "./screens/RecentExpenses";

function ExpensesOverview() {
    const BottomTabs = createBottomTabNavigator();
    return <BottomTabs.Navigator>
        <BottomTabs.Screen name={'RecentExpenses'} component={RecentExpenses} />
        <BottomTabs.Screen name={'AllExpenses'} component={AllExpenses} />
    </BottomTabs.Navigator>
}

export default function App() {
    const Stack = createNativeStackNavigator();

    return (
        <>
            <StatusBar style="auto"/>
            <NavigationContainer>
                <Stack.Navigator initialRouteName={'ExpensesOverview'}>
                    <Stack.Screen name={'ExpensesOverview'} component={ExpensesOverview}/>
                    <Stack.Screen name={'ManageExpense'} component={ManageExpense}/>
                </Stack.Navigator>
            </NavigationContainer>

        </>
    );
}
