import React from 'react';
import { View, Text, FlatList, StyleSheet } from 'react-native';
import MealItem from './MealItem';
import propTypes from 'prop-types';
import { useSelector } from 'react-redux';

const MealList = props => {

    const favoriteMeals = useSelector(state => state.meals.favoriteMeals)

    const renderMealItem = itemData => {

        const isFav = favoriteMeals.some(meal => meal.id === itemData.item.id)
        console.log(isFav)

        return <MealItem
            title={itemData.item.title}
            image={itemData.item.imageUrl}
            duration={itemData.item.duration}
            complexity={itemData.item.complexity}
            affordability={itemData.item.affordability}
            onSelectMeal={() => {
                props.navigation.navigate('MealDetail', {
                    mealId: itemData.item.id,
                    title: itemData.item.title,
                    isFav: isFav
                })
            }} />
    }

    return (
        <View style={styles.list}>
            <FlatList
                keyExtractor={(item, index) => item.id}
                data={props.listData}
                renderItem={renderMealItem}
                style={{ width: '100%' }}
            />
        </View>
    );
}

MealList.propTypes = {
    listData: propTypes.array,
    navigation: propTypes.object
}

export default MealList;

const styles = StyleSheet.create({
    list: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center'
    }
});
