export type RootStackParamList = {
    // screenName: {props}
    MealsOverview: {
        categoryId: string;
        categoryName: string
    };
    MealDetail: { id: string };
    MealsCategories: undefined; // no "custom" props beside route & navigation
};
