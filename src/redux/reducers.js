import {MEALS} from '../data/dummy-data';
import {SET_FILTERS, TOGGLE_FAVORITES} from './actions';

const initialState = {
  meals: MEALS, // Array of Objects that we are importing
  filteredMeals: MEALS,
  favoriteMeals: [],
};

const mealsReducer = (state = initialState, action) => {
  switch (action.type) {
    case TOGGLE_FAVORITES:
      const existingIndex = state.favoriteMeals.findIndex(
        (meal) => meal.id === action.payload,
      );
      if (existingIndex >= 0) {
        const updatedFavs = [...state.favoriteMeals];
        updatedFavs.splice(existingIndex, 1);
        console.log('asdasdasdasd');
        return {...state, favoriteMeals: updatedFavs};
      } else {
        const meal = state.meals.find((meal) => meal.id === action.payload);
        return {...state, favoriteMeals: state.favoriteMeals.concat(meal)};
      }
    case SET_FILTERS:
      const appliedFilters = action.payload;
      const filteredMeals = state.meals.filter((meal) => {
        if (appliedFilters.glutenFree & !meal.isGlutenFree) {
          return false;
        }
        if (appliedFilters.lactoseFree && !meal.isLactoseFree) {
          return false;
        }
        if (appliedFilters.vegetarian && !meal.isVegetarian) {
          return false;
        }
        if (appliedFilters.vegan && !meal.isVegan) {
          return false;
        }
        return true;
      });
      return {...state, filteredMeals};
    default:
      return state;
  }
  return state;
};

export default mealsReducer;
