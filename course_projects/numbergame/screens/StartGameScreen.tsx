import React, {useState} from 'react';
import {Pressable, StyleSheet, Text, TextInput, View} from "react-native";
import {CustomButton} from "../components/CustomButton";



export function StartGameScreen() {
    const [enteredNumber, setEnteredNumber] = useState<string | undefined>();


    return <><View style={styles.title}>
        <Text style={styles.titleText}>Guess My Number</Text>
    </View>
        <View style={styles.gameStarterInputBox}>
            <Text style={styles.titleText}>Enter a number</Text>
            <View style={styles.textInputWrapper}>
                <TextInput keyboardType={'numeric'} maxLength={3} style={styles.textInput} value={enteredNumber}
                           onChangeText={setEnteredNumber}/>
            </View>
            <View style={styles.buttonRow}>
                <CustomButton text={'cancel'} onPress={()=>null}/>
                <CustomButton text={'confirm'} onPress={()=>null}/>
            </View>
        </View></>
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#763f3c', // replace with bg image later
        alignItems: 'center',
        justifyContent: 'flex-start',
        paddingTop: 128,

    },
    bgImage: {
        width: '100%',
        height: '100%',
        flex: 1,
        justifyContent: "center"
    },

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
        textAlign: 'center'
    },
    gameStarterInputBox: {
        width: '90%',
        height: 200,
        padding: 32,
        alignItems: 'center',
        justifyContent: "space-evenly",
        flexDirection: 'column',
        backgroundColor: '#3b021f',
        borderRadius: 6
    },
    textInputWrapper: {},
    textInput: {
        width: 60,
        padding: 4,
        borderBottomWidth: 2,
        borderBottomColor: '#763f3c',
        color: '#FFFFFF'

    },
    buttonRow: {
        flexDirection: 'row',
        justifyContent: 'space-evenly',
        width: '100%',
        paddingTop: 16
    },

    inputTitle: {},
    numberInput: {},
    guess: {},
    gameInput: {},
    guessList: {}


});
