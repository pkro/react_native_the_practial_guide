import React, { ReactChildren } from 'react';
import { Pressable, StyleSheet, Text, TextProps, View } from 'react-native';
import colors from '../constants/colors';

type CustomButtonPropsType = { onPress: () => void; children: string };

export function PrimaryButton({ onPress, children }: CustomButtonPropsType) {
    return (
        <View style={styles.outerContainer}>
            <Pressable
                style={({ pressed }) =>
                    pressed ? [styles.pressed, styles.innerContainer] : styles.innerContainer
                }
                onPress={onPress}
                android_ripple={{ color: colors.primary600 }}
            >
                <Text style={styles.buttonText}>{children}</Text>
            </Pressable>
        </View>
    );
}

const styles = StyleSheet.create({
    outerContainer: {
        borderRadius: 24,
        backgroundColor: colors.primary500,
        overflow: 'hidden', // avoid ripple to go outside of container
        elevation: 8,
        shadowColor: 'black',
        shadowOffset: { width: 4, height: 4 },
        shadowRadius: 8,
    },
    innerContainer: {
        paddingVertical: 6,
        paddingHorizontal: 8,
    },
    buttonText: {
        color: 'white',
        textAlign: 'center',
        fontSize: 20,
    },
    pressed: {
        opacity: 0.75, // to get some effect on IOS (same applied on android)
    },
});
