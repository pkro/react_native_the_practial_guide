import React from 'react';
import { StyleSheet, View, Text, Pressable, Platform } from 'react-native';

type CategoryCardPropsType = {
    title: string;
    color: string;
};

export function CategoryCard({ title, color }: CategoryCardPropsType) {
    return (
        <View style={styles.gridItem}>
            <Pressable
                android_ripple={{ color: '#CCCCCC' }}
                style={({ pressed }) => [styles.button, pressed ? styles.buttonPressed : null]}
            >
                <View style={[styles.innerContainer, { backgroundColor: color }]}>
                    <Text style={styles.text}>{title}</Text>
                </View>
            </Pressable>
        </View>
    );
}

const styles = StyleSheet.create({
    gridItem: {
        height: 140,
        width: 140,
        margin: 12,
        padding: 0,
        borderRadius: 6,
        elevation: 4,
        shadowColor: 'black',
        shadowOpacity: 0.25,
        shadowOffset: { width: 0, height: 2 },
        shadowRadius: 8,
        overflow:
            Platform.OS === 'ios'
                ? 'visible' // so the shadow isn't clipped on iOS
                : 'hidden', // so the ripple effect doesn't go past the rounded corners on Android
    },
    button: {
        flex: 1,
    },
    buttonPressed: {
        opacity: 0.5,
    },
    innerContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        padding: 8,
        borderRadius: 8,
    },
    text: {
        fontFamily: 'open-sans-bold',
        fontSize: 18,
        textAlign: 'center',
        color: '#101010',
    },
});
