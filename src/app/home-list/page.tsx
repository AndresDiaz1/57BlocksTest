import PokemonList from "@/components/pokemon-list/pokemon-list";
import { getPokemons } from "../actions/getPokemon";
import "./home-list.css";

export default async function HomeList() {
  const pokemons = await getPokemons();
  return (
    <div className="home">
      <div className="table__content">
        <PokemonList listOfPokemons={pokemons} />
      </div>
    </div>
  );
}
