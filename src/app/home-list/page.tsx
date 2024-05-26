"use client";
import PokemonList from "@/components/pokemon-list/pokemon-list";
import { filterPokemon, getPokemons } from "../actions/getPokemon";
import "./home-list.css";
import Paginator from "@/components/paginator/paginator";
import { useEffect, useState } from "react";
import { PokemonBasicInfo } from "@/models/pokemon-model";
import Filter from "@/components/filter/filter";
import withAuth from "@/components/withAuth/withAuth";

function HomeList() {
  const [currentPage, setCurrentPage] = useState(1);
  const [pokemonList, setPokemonList] = useState<PokemonBasicInfo[]>([]);
  const [totalPokemons, setTotalPokemons] = useState(0);
  const [filter, setFilter] = useState("");

  useEffect(() => {
    const fetchPokemons = async () => {
      let filteredPokemons: PokemonBasicInfo[] = [];
      if (filter) {
        const filteredData = await filterPokemon(filter.toLowerCase());
        filteredPokemons = filteredData;
      } else {
        const pokemonsData = await getPokemons(currentPage);
        filteredPokemons = pokemonsData.results;
        setTotalPokemons(pokemonsData.count);
      }
      setPokemonList(filteredPokemons);
    };
    fetchPokemons();
  }, [currentPage, filter]);

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
  };

  const handleFilterChange = (filter: string) => {
    setFilter(filter);
  };

  return (
    <div className="home">
      <div className="table__content">
        <Filter onFilterChange={handleFilterChange} />
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
export default withAuth(HomeList);
