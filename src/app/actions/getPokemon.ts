"use server";

import {
  PokemonBasicInfo,
  PokemonList,
  PokemonRawDescription,
  PokemonRawDetail,
} from "@/models/pokemon-model";

const POKEAPI_URL = "https://pokeapi.co/api/v2";

export const getPokemons = async (page: number = 1): Promise<PokemonList> => {
  const offset = (page - 1) * 20;
  const response = await fetch(
    `${POKEAPI_URL}/pokemon/?offset=${offset}&limit=20`
  );
  const data: PokemonList = await response.json();
  if (!response.ok) {
    throw new Error("Failed to fetch Pokémon");
  }
  return data;
};

export const filterPokemon = async (
  filter: string
): Promise<PokemonBasicInfo[]> => {
  const response = await fetch(`${POKEAPI_URL}/pokemon?limit=100000`);
  if (!response.ok) {
    throw new Error("Failed to fetch Pokémon");
  }
  const data: PokemonList = await response.json();
  return data.results.filter((pokemon) => pokemon.name.includes(filter));
};

export const getPokemonDetail = async (
  id: number
): Promise<PokemonRawDetail> => {
  const response = await fetch(`${POKEAPI_URL}/pokemon/${id}`);
  const data = await response.json();
  if (!response.ok) {
    throw new Error("Failed to fetch Pokémon detail");
  }
  return data;
};

export const getPokemonDescriptionDetail = async (
  id: number
): Promise<PokemonRawDescription> => {
  const response = await fetch(`${POKEAPI_URL}/pokemon-species/${id}`);
  const data = await response.json();
  if (!response.ok) {
    throw new Error("Failed to fetch Pokémon description detail");
  }
  return data;
};
