import MealsList from "../components/MealsList";
import {useContext} from "react";
import {FavoritesContext} from "../store/context/favorites-context";
import {View, Text, StyleSheet} from "react-native";
import {RootState} from "../store/redux/store";
import {useSelector} from "react-redux";

function Favorites() {

    //const {ids} = useContext(FavoritesContext);
    const favoriteMealIds = useSelector((state: RootState) => state.favorites.ids);

    if (favoriteMealIds.length === 0) {
        return <View style={styles.rootContainer}><Text style={styles.text}>You have no favorite meals yet</Text></View>
    }
    return (
        <MealsList ids={favoriteMealIds} title={"Favorites"}/>
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
