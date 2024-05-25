"use client";
import PokemonList from "@/components/pokemon-list/pokemon-list";
import { getPokemons } from "../actions/getPokemon";
import "./home-list.css";
import Paginator from "@/components/paginator/paginator";
import { useEffect, useState } from "react";
import { PokemonBasicInfo } from "@/models/pokemon-model";

export default function HomeList() {
  const [currentPage, setCurrentPage] = useState(1);
  const [pokemonList, setPokemonList] = useState<PokemonBasicInfo[]>([]);
  const [totalPokemons, setTotalPokemons] = useState(0);

  useEffect(() => {
    const fetchPokemons = async () => {
      const pokemonsData = await getPokemons(currentPage);
      setPokemonList(pokemonsData.results);
      setTotalPokemons(pokemonsData.count);
    };
    fetchPokemons();
  }, [currentPage]);

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
  };

  return (
    <div className="home">
      <div className="table__content">
        <PokemonList listOfPokemons={pokemonList} />
        <Paginator
          currentPage={currentPage}
          limit={20}
          total={totalPokemons}
          onPageChange={handlePageChange}
        />
      </div>
    </div>
  );
}
