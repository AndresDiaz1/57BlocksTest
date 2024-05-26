"use client";
import PokemonList from "@/components/pokemon-list/pokemon-list";
import { PokemonBasicInfo } from "@/models/pokemon-model";
import { getFavorites } from "../actions/favorites";
import { getPokemonDetail } from "../actions/getPokemon";
import { useEffect, useState } from "react";
import getIdFromUrl from "@/utils/utils";
import "../home-list/home-list.css";

export default function FavoritesList() {
  const [favoritePokemons, setFavoritePokemons] = useState<PokemonBasicInfo[]>(
    []
  );

  useEffect(() => {
    const fetchFavoritePokemons = async () => {
      const favoritePokemons = getFavorites();
      const favoritePokemonsData = await Promise.all(
        favoritePokemons.map(async (pokemon) => {
          const id = getIdFromUrl(pokemon.url);
          const pokemonDetail = await getPokemonDetail(parseInt(id));
          return { name: pokemonDetail.name, url: pokemon.url };
        })
      );
      setFavoritePokemons(favoritePokemonsData);
    };
    fetchFavoritePokemons();
  }, []);

  return (
    <div className="favorites-list">
      <div className="table__content">
        <PokemonList listOfPokemons={favoritePokemons} />
      </div>
    </div>
  );
}
