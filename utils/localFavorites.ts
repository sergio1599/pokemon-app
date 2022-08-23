/* eslint-disable import/no-anonymous-default-export */

const toggleFavorite = (id: number) => {
    console.log('toogleFavorite llamado');

    let favorites: number[] = JSON.parse(localStorage.getItem('favorites') || '[]');

    if (favorites.includes(id)) {
        favorites = favorites.filter(pokeId => pokeId !== id);
    } else {
        favorites.push(id);
    }

    localStorage.setItem('favorites', JSON.stringify(favorites));
}

const existInFavorites = (id: number): Boolean => {
    if (typeof window === 'undefined') return false;
    let favorites: number[] = JSON.parse(localStorage.getItem('favorites') || '[]');

    return favorites.includes(id);
}

export default {
    toggleFavorite,
    existInFavorites,
}