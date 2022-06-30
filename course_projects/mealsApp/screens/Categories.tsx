import React from 'react';
import { StyleSheet, View, Text, SafeAreaView, FlatList } from 'react-native';
import { CATEGORIES } from '../data/dummy-data';
import { CategoryCard } from '../components/CategoryCard';

type CategoriesPropsType = {
    placeholder?: string;
};

export function Categories({ placeholder }: CategoriesPropsType) {
    return (
        <SafeAreaView>
            <FlatList
                data={CATEGORIES}
                keyExtractor={(item) => item.id}
                style={styles.categoriesContainer}
                numColumns={2}
                renderItem={(item) => (
                    <CategoryCard title={item.item.title} color={item.item.color} />
                )}
            />
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    categoriesContainer: {
        paddingTop: 32,
        flex: 1,
        width: '100%',
    },
});
