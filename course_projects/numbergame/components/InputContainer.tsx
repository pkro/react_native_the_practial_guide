import React, { ReactChildren, ReactNode } from 'react';
import { Text, View, StyleSheet, Dimensions } from 'react-native';
import colors from '../constants/colors';

type TitlePropsType = { children: ReactNode; title?: string };
export default function InputContainer({ title, children }: TitlePropsType) {
    return (
        <View style={styles.inputContainer}>
            <>
                {title && <Text style={styles.inputContainerTitleText}>{title}</Text>}
                {children}
            </>
        </View>
    );
}

const deviceWidth = Dimensions.get('window').width;

const styles = StyleSheet.create({
    inputContainerTitleText: {
        color: colors.accent500,
        fontSize: 20,
        fontFamily: 'open-sans-bold',
        textAlign: 'center',
    },
    inputContainer: {
        width: '90%',
        padding: deviceWidth < 380 ? 12 : 32,
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
