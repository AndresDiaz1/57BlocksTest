"use client";
import { PokemonBasicInfo } from "@/models/pokemon-model";
import "./pokemon-list.css";
import PokemonListRow from "./pokemon-list-row";
import { useEffect, useState } from "react";
import { getFavorites } from "@/app/actions/favorites";

export default function PokemonList({
  listOfPokemons,
}: {
  listOfPokemons: PokemonBasicInfo[];
}) {
  const [favorites, setFavorites] = useState<PokemonBasicInfo[]>([]);

  const fetchFavorites = async () => {
    const favoritePokemons = await getFavorites();
    setFavorites(favoritePokemons.map((pokemon) => pokemon));
  };

  useEffect(() => {
    fetchFavorites();
  }, [listOfPokemons]);

  const handleFavoriteToggle = () => {
    fetchFavorites();
  };

  const checkIfIsFavorite = (pokemon: PokemonBasicInfo) => {
    const isfavoriteArray = favorites.filter(
      (favPokemon) => favPokemon.name === pokemon.name
    );
    return isfavoriteArray.length > 0;
  };

  return (
    <div className="table app-border-style">
      <ul className="table__container">
        {listOfPokemons.map((pokemon) => (
          <li className="table__element" key={pokemon.name}>
            <PokemonListRow
              name={pokemon.name}
              url={pokemon.url}
              isFavorite={checkIfIsFavorite(pokemon)}
              onFavoriteToggle={handleFavoriteToggle}
            />
          </li>
        ))}
      </ul>
    </div>
  );
}
