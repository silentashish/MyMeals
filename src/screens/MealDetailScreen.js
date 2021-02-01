// italian, japanies
import React, { useCallback, useEffect } from "react";
import { View, Text, StyleSheet, Image } from "react-native";
import { HeaderButtons, Item } from "react-navigation-header-buttons";
import HeaderButton from "../components/HeaderButton";
import { ScrollView } from "react-native-gesture-handler";
import DefaultText from "../components/DefaultText";
import { useDispatch, useSelector } from "react-redux";
import { toggleFavorite } from "../redux/actions";

const ListItem = (props) => {
    return (
        <View style={styles.listItem}>
            <DefaultText>{props.children}</DefaultText>
        </View>
    );
};

const MealDetailScreen = (props) => {

    const mealId = props.navigation.getParam("mealId");

    const MEALS = useSelector(state => state.meals.meals)
    const isFav = useSelector(state => state.meals.favoriteMeals.some(meal => meal.id === mealId)) //some return true if element exist other wise false

    const selectedMeal = MEALS.find((meal) => meal.id === mealId);

    const dispatch = useDispatch();

    const toggleFavoriteHandler = useCallback(() => { //we use useCallback to avoid build functions again & again
        dispatch(toggleFavorite(mealId));             //which will cause infinite loop
    }, [mealId])

    useEffect(() => {
        props.navigation.setParams({ toggleFav: toggleFavoriteHandler })
    }, [toggleFavoriteHandler])

    useEffect(() => {
        props.navigation.setParams({isFav: isFav})
    }, [isFav])

    return (
        <ScrollView>
            <Image source={{ uri: selectedMeal.imageUrl }} style={styles.image} />
            <View style={styles.details}>
                <DefaultText>{selectedMeal.duration}m</DefaultText>
                <DefaultText>{selectedMeal.complexity.toUpperCase()}</DefaultText>
                <DefaultText>{selectedMeal.affordability.toUpperCase()}</DefaultText>
            </View>
            <Text style={styles.title}>Ingredients</Text>
            {selectedMeal.ingredients.map((ingredient) => (
                <ListItem>{ingredient}</ListItem>
            ))}
            <Text style={styles.title}>Steps</Text>
            {selectedMeal.steps.map((step) => (
                <ListItem>{step}</ListItem>
            ))}
        </ScrollView>
    );
};

MealDetailScreen.navigationOptions = (navigationData) => {
    // const mealId = navigationData.navigation.getParam("mealId");
    const title = navigationData.navigation.getParam('title')

    const fvrtHandler = navigationData.navigation.getParam('toggleFav');

    const isFav = navigationData.navigation.getParam('isFav');

    return {
        headerTitle: title,
        headerRight: () => (
            <HeaderButtons HeaderButtonComponent={HeaderButton}>
                <Item
                    title="Favorite"
                    iconName={ isFav ? "ios-star" : 'ios-star-outline'}
                    onPress={fvrtHandler}
                />
            </HeaderButtons>
        ),
    };
};

export default MealDetailScreen;

const styles = StyleSheet.create({
    image: {
        width: "100%",
        height: 200,
    },
    details: {
        flexDirection: "row",
        padding: 15,
        justifyContent: "space-around",
    },
    title: {
        fontFamily: "open-sans-bold",
        fontSize: 22,
        textAlign: "center",
    },
    listItem: {
        marginVertical: 10,
        marginHorizontal: 20,
        borderColor: "#ccc",
        borderWidth: 1,
        padding: 10,
    },
});
