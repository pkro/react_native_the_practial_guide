import React, {useState} from 'react';
import {createContext} from "react";

type contextType = {
    ids: string[],
    addFavorite: (id: string) => void,
    removeFavorite: (id: string) => void,
}
export const FavoritesContext = createContext<contextType>({
    ids: [],
    addFavorite: (id: string) => null,
    removeFavorite: (id: string) => null,
});

function FavoritesContextProvider({children}: { children: React.ReactChildren | React.ReactChild }) {
    const [favoriteMealIds, setFavoriteMealIds] = useState<string[]>([]);

    function addFavorite(id: string) {
        setFavoriteMealIds(oldState => [...oldState, id])
    }

    function removeFavorite(id: string) {
        setFavoriteMealIds(oldState => oldState.filter(val => val !== id))
    }

    const value = {ids: favoriteMealIds, addFavorite: addFavorite, removeFavorite: removeFavorite};

    return <FavoritesContext.Provider value={value}>{children}</FavoritesContext.Provider>
}

export default FavoritesContextProvider;
