import React from 'react';
import { Text, View, StyleSheet, Platform } from 'react-native';

type TitlePropsType = { children: string };
export default function Title({ children }: TitlePropsType) {
    return (
        <View style={styles.title}>
            <Text style={styles.titleText}>{children}</Text>
        </View>
    );
}

const styles = StyleSheet.create({
    title: {
        borderWidth: Platform.OS === 'ios' ? 2 : 5,
        borderColor: Platform.select({
            ios: '#FFFFFF',
            android: '#cccccc',
        }),
        padding: 8,
        maxWidth: '80%',
        marginBottom: 32,
    },
    titleText: {
        color: '#FFFFFF',
        fontSize: 20,
        textAlign: 'center',
        fontWeight: 'bold',
        fontFamily: 'open-sans-bold',
    },
});
