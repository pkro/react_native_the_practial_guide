import {Pressable, View, Text, StyleSheet, Platform, Image, ListView} from 'react-native';
import {useNavigation} from '@react-navigation/native';
import React from "react";
import {mealsType} from "../data/dummy-data";
import {NativeStackNavigationProp, NativeStackScreenProps} from "@react-navigation/native-stack";
import {RootStackParamList} from "../types";

type MealItemPropsType = {
    id: string,
    title: string;
    imageUrl: string;
    duration: string;
    complexity: string;
    affordability: string;
};

function MealItem({id, title, imageUrl, complexity, duration, affordability}: MealItemPropsType) {

    const navigation = useNavigation<NativeStackNavigationProp<RootStackParamList>>();

    function pressHandler(id: string) {
        navigation.navigate('MealDetail', {
            id: id,
        });
    }

    return (
        <View style={styles.mealItem}>
            <Pressable android_ripple={{color: '#ccc'}} style={({ pressed }) =>  pressed ? styles.buttonPressed : null}
            onPress={()=>pressHandler(id)}>
                <View style={styles.innerWrapper}>
                <View>
                    <Image source={{uri: imageUrl}} style={styles.image}/>
                    <Text style={styles.title}>{title}</Text>
                </View>
                <View style={styles.details}>
                    <Text style={styles.detailsItem}>{duration}m</Text>
                    <Text style={styles.detailsItem}>{complexity}</Text>
                    <Text style={styles.detailsItem}>{affordability}</Text>
                </View>
                </View>
            </Pressable>
        </View>
    );
}

export default MealItem;

const styles = StyleSheet.create(
    {
        innerWrapper: {
            borderRadius: 8,
            overflow: 'hidden'
        },
        mealItem: {
            margin: 16,
            borderRadius: 8,
            overflow: Platform.OS === 'ios' ? 'visible' : 'hidden',
            backgroundColor: 'white',
            elevation: 4,
            shadowColor: 'white',
            shadowOffset: {width: 4, height: 4},
            shadowRadius: 4,
            shadowOpacity: 0.25,

        },
        image: {
            width: '100%',
            height: 200,
        },
        title: {
            paddingTop: 16,
            fontWeight: 'bold',
            textAlign: 'center',
            fontSize: 18
        },
        details: {
            flexDirection: 'row',
            flexWrap: 'wrap',
            fontSize: 12,
            paddingTop: 8,
            paddingBottom: 8,
            justifyContent: 'center',
            width: '100%',
        },
        detailsItem: {
            marginLeft: 4,
        },

        buttonPressed: {
            opacity: 0.5,
        },


    }
);
