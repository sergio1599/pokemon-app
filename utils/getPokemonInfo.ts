import pokeApi from '../api/pokeApi';
import { Pokemon } from '../interfaces/pokemon-full';


export const getPokemonInfo = async (nameOrId: string) => {

    const { data } = await pokeApi.get<Pokemon>(`/pokemon/${nameOrId}`);

    return {
        id: data.id,
        name: data.name,
        sprites: data.sprites,
        types: data.types,
        moves: data.moves,
    };

}