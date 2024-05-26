import { db } from "@/db/db";
import { PokemonBasicInfo } from "@/models/pokemon-model";
import getIdFromUrl from "@/utils/utils";

export const addToFavorites = async (pokemon: PokemonBasicInfo) => {
  const userEmail = JSON.parse(
    localStorage.getItem("pokedex-user") || "{}"
  ).email;
  const user = await db.users.get(userEmail);
  if (user) {
    const favorites = user.favorites || [];
    favorites.push(pokemon);
    await db.users.update(userEmail, { favorites });
  }
};

export const removeFromFavorites = async (
  pokemonToRemove: PokemonBasicInfo
) => {
  const userEmail = JSON.parse(
    localStorage.getItem("pokedex-user") || "{}"
  ).email;
  const user = await db.users.get(userEmail);
  if (user) {
    const favorites = user.favorites || [];
    const updatedFavorites = favorites.filter(
      (pokemon) => pokemon.name !== pokemonToRemove.name
    );
    await db.users.update(userEmail, { favorites: updatedFavorites });
  }
};

export const getFavorites = async (): Promise<PokemonBasicInfo[]> => {
  const userEmail = JSON.parse(
    localStorage.getItem("pokedex-user") || "{}"
  ).email;
  try {
    const user = await db.users.get(userEmail);
    return user?.favorites || [];
  } catch (err) {
    console.log("User does not exist, log in first");
    return [];
  }
};
