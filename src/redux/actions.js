export const TOGGLE_FAVORITES = 'TOGGLE_FAVORITES';
export const SET_FILTERS = 'SET_FILTERS';

//Action Creators
export const toggleFavorite = (id) => { //It takes id of meal
    return {
        type: TOGGLE_FAVORITES,
        payload: id
    }
} 

export const setFilters = filterSettings => { //It take object
    return {
        type: SET_FILTERS,
        payload: filterSettings
    }
}
