import MealsList from "../components/MealsList";
import {useContext} from "react";
import {FavoritesContext} from "../store/context/favorites-context";
import {View, Text, StyleSheet} from "react-native";

function Favorites() {

    const {ids} = useContext(FavoritesContext);

    if (ids.length === 0) {
        return <View style={styles.rootContainer}><Text style={styles.text}>You have no favorite meals yet</Text></View>
    }
    return (
        <MealsList ids={ids} title={"Favorites"}/>
    );
}

const styles = StyleSheet.create({
    rootContainer: {
        flex: 1,
        alignItems: "center",
        justifyContent: "center"
    },
    text: {
        color: "white"
    }
})

export default Favorites;
