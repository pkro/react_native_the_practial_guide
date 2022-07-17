import {NavigationContainer} from "@react-navigation/native";
import {createDrawerNavigator} from "@react-navigation/drawer";

import {Text} from 'react-native';
import UserScreen from "./screens/UserScreen";
import WelcomeScreen from "./screens/WelcomeScreen";
import {Ionicons} from '@expo/vector-icons';
import {createBottomTabNavigator} from "@react-navigation/bottom-tabs";

export default function App() {
    const BottomTab = createBottomTabNavigator();

    return <NavigationContainer>
        <BottomTab.Navigator screenOptions={{
            headerStyle: {backgroundColor: '#3c0a6b'},
            headerTintColor: 'white',
            tabBarActiveTintColor: '#3c0a6b'
        }
        }>
        <BottomTab.Screen name={'WelcomeScreen'} component={WelcomeScreen}
                          options={{
                              tabBarIcon: ({color, size}) => <Ionicons name={"home"} color={color} size={size}/>
                          }}/>
        <BottomTab.Screen name={'UserScreen'} component={UserScreen}
                          options={{
                              tabBarIcon: ({color, size}) => <Ionicons name={"person"} color={color} size={size}/>
                          }}/>

    </BottomTab.Navigator>
</NavigationContainer>
    ;
}
