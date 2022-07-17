import React from 'react';
import {FlatList, StyleSheet, Text, View} from "react-native";

type SubTitlePropsType = { children: any }

export function Subtitle({children}: SubTitlePropsType) {

    return <View style={styles.wrapper}>
        <Text style={styles.title}>{children}</Text>
    </View>
}

const styles = StyleSheet.create({
    wrapper: {
        padding: 6,
        marginHorizontal: 24,
        marginVertical: 4,
        borderBottomColor: '#e2b497',
        borderBottomWidth: 2,
    },
    title: {
        fontSize: 18,
        fontWeight: 'bold',
        color: '#e2b497',
        textAlign: 'center'

    },
})
