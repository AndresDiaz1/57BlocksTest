"use client";
import PokemonList from "@/components/pokemon-list/pokemon-list";
import { PokemonBasicInfo } from "@/models/pokemon-model";
import { getFavorites } from "../actions/favorites";
import { getPokemonDetail } from "../actions/getPokemon";
import { useEffect, useState } from "react";
import getIdFromUrl from "@/utils/utils";
import "../home-list/home-list.css";
import withAuth from "@/components/withAuth/withAuth";

function FavoritesList() {
  const [favoritePokemons, setFavoritePokemons] = useState<PokemonBasicInfo[]>(
    []
  );

  useEffect(() => {
    const fetchFavoritePokemons = async () => {
      const favoritePokemonsData = await getFavorites();
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

export default withAuth(FavoritesList);
