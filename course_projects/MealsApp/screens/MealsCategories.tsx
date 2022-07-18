import {FlatList} from 'react-native';
import CategoryGridTile from '../components/CategoryGridTile';

import {CATEGORIES, mealsType} from '../data/dummy-data';
import Meal from "../models/meal";

function MealsCategories({navigation}: any) {
    function renderCategoryItem(itemData: any) {
        function pressHandler(meal: mealsType) {
            navigation.navigate('MealsOverview', {
                categoryId: itemData.item.id,
                categoryName: itemData.item.title
            });
        }

        return (
            <CategoryGridTile
                title={itemData.item.title}
                color={itemData.item.color}
                onPress={() => pressHandler(itemData.item)}
            />
        );
    }

    return (
        <FlatList
            data={CATEGORIES}
            keyExtractor={(item) => item.id}
            renderItem={renderCategoryItem}
            numColumns={2}
        />
    );
}

export default MealsCategories;
