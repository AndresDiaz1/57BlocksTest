import { PokemonBasicInfo } from "@/models/pokemon-model";

const FAVORITES_KEY = "favoritePokemons";

export const addToFavorites = (pokemon: PokemonBasicInfo) => {
  const favorites = getFavorites();
  favorites.push(pokemon);
  localStorage.setItem(FAVORITES_KEY, JSON.stringify(favorites));
};

export const removeFromFavorites = (pokemonName: string) => {
  let favorites = getFavorites();
  favorites = favorites.filter((pokemon) => pokemon.name !== pokemonName);
  localStorage.setItem(FAVORITES_KEY, JSON.stringify(favorites));
};

export const getFavorites = (): PokemonBasicInfo[] => {
  const favoritesJSON = localStorage.getItem(FAVORITES_KEY);
  return favoritesJSON ? JSON.parse(favoritesJSON) : [];
};
