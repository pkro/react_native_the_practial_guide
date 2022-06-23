import React from 'react';
import { Text, View, StyleSheet } from 'react-native';

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
        borderWidth: 2,
        borderColor: '#FFFFFF',
        padding: 8,
        width: '60%',
        marginBottom: 32,
    },
    titleText: {
        color: '#FFFFFF',
        fontSize: 20,
        textAlign: 'center',
        fontWeight: 'bold',
    },
});
