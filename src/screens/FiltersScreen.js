// italian, japanies
import React, { useState, useCallback, useEffect } from 'react';
import { View, Text, StyleSheet, Switch, Platform } from 'react-native';
import { HeaderButtons, Item } from 'react-navigation-header-buttons';
import { useDispatch } from 'react-redux';
import CustomHeaderButton from '../components/HeaderButton';
import colors from '../constants/colors';
import { setFilters } from '../redux/actions';

const FilterSwitch = props => {
    return (
        <View style={styles.filterContainer}>
            <Text>{props.label}</Text>
            <Switch
                trackColor={{
                    true: colors.primaryColor
                }}
                thumbColor={Platform.OS === 'android' ? colors.primaryColor : ''}
                value={props.state}
                onValueChange={props.onChange} />

        </View>
    )
}

const FiltersScreen = props => {

    const [isGluttenFree, setIsGluttenFree] = useState(false);
    const [isLactoseFree, setIsLactoseFree] = useState(false);
    const [isVegan, setIsVegan] = useState(false);
    const [isVegetarian, setIsVegetarian] = useState(false);

    const dispatch = useDispatch();

    const saveFilters = useCallback(() => {
        const appliedFilters = {
            glutenFree: isGluttenFree,
            lactoseFree: isLactoseFree,
            vegan: isVegan,
            vegetarian: isVegetarian
        };
        dispatch(setFilters(appliedFilters));
    }, [isGluttenFree, isLactoseFree, isVegan, isVegetarian, dispatch])

    useEffect(() => {
        props.navigation.setParams({ save: saveFilters })
    }, [saveFilters])

    return (
        <View style={styles.screen}>
            <Text style={styles.title}>Availabe Filters / Restrictions</Text>
            <FilterSwitch
                label="Gluten-free"
                state={isGluttenFree}
                onChange={bool => { setIsGluttenFree(bool) }} />
            <FilterSwitch
                label="Lactose-free"
                state={isLactoseFree}
                onChange={bool => { setIsLactoseFree(bool) }} />
            <FilterSwitch
                label="Vegan"
                state={isVegan}
                onChange={bool => { setIsVegan(bool) }} />
            <FilterSwitch
                label="Vegetarian"
                state={isVegetarian}
                onChange={bool => { setIsVegetarian(bool) }} />
        </View>
    );
}

FiltersScreen.navigationOptions = navData => {
    return {
        headerTitle: 'Filter Meals',
        headerLeft: () => <HeaderButtons HeaderButtonComponent={CustomHeaderButton}>
            <Item
                title="Menu"
                iconName="ios-menu"
                onPress={() => { navData.navigation.toggleDrawer() }}
            />
        </HeaderButtons>
        ,
        headerRight: () => <HeaderButtons HeaderButtonComponent={CustomHeaderButton}>
            <Item
                title="Save"
                iconName="ios-save"
                onPress={navData.navigation.getParam('save')}
            />
        </HeaderButtons>
    }
}

export default FiltersScreen;

const styles = StyleSheet.create({
    screen: {
        flex: 1,
        alignItems: 'center'
    },
    title: {
        fontFamily: 'open-sans-bold',
        fontSize: 22,
        margin: 20,
        textAlign: 'center'
    },
    filterContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        width: '80%',
        marginVertical: 15
    }
});