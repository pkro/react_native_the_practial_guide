import React from 'react';
import {FlatList, StyleSheet, Text, View} from "react-native";

type ListPropsType = { data: string[] }

const ListItem = (item: any) => <Text style={styles.item}>- {item.item}</Text>

export function List({data}: ListPropsType) {

    return <View style={styles.wrapper}>

        <View style={styles.wrapper}>
            {data.map(item => <View key={item} style={styles.item}><Text style={styles.itemText}>{item}</Text></View>)}
        </View>
    </View>
}

const styles = StyleSheet.create({
    wrapper: {


    },
    item: {
        borderRadius: 6,
        paddingHorizontal: 8,
        paddingVertical: 4,
        marginVertical: 4,
        marginHorizontal: 8,
        backgroundColor: '#e2b497'

    },
    itemText: {
        color: '#351401',
        textAlign: 'center',

    },


})
