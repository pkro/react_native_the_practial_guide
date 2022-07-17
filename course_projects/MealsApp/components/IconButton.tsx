import {Pressable, StyleSheet} from 'react-native';
import {Ionicons} from '@expo/vector-icons';
import React from "react";


type IconButtonPropsType = {
    onPress: () => void;
    icon: any;
    color: string;
};

function IconButton({onPress, icon, color}: IconButtonPropsType) {
    return (
        <Pressable android_ripple={{color: '#ccc'}} style={({pressed}) => pressed ? styles.buttonPressed : null}
                   onPress={onPress}>
            <Ionicons name={icon} size={24} color={color}/>
        </Pressable>
    );
}

export default IconButton;

const styles = StyleSheet.create(
    {

        buttonPressed: {
            opacity: 0.5,
        },


    }
);
