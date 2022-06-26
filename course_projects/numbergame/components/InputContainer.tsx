import React, { ReactChildren, ReactNode } from 'react';
import { Text, View, StyleSheet } from 'react-native';
import colors from '../constants/colors';

type TitlePropsType = { children: ReactNode; title: string };
export default function InputContainer({ title, children }: TitlePropsType) {
    return (
        <View style={styles.inputContainer}>
            <>
                <Text style={styles.inputContainerTitleText}>{title}</Text>
                {children}
            </>
        </View>
    );
}

const styles = StyleSheet.create({
    inputContainerTitleText: {
        color: colors.accent500,
        fontSize: 20,
        fontFamily: 'open-sans-bold',
        textAlign: 'center',
    },
    inputContainer: {
        width: '90%',

        padding: 32,
        alignItems: 'center',
        justifyContent: 'space-evenly',
        flexDirection: 'column',
        backgroundColor: colors.primary300,
        borderRadius: 6,
        elevation: 8, // android
        // ios
        shadowOffset: { width: 8, height: 8 },
        shadowColor: 'black',
        shadowRadius: 6,
        shadowOpacity: 0.25,
    },
});
