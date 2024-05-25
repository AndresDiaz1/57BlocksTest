import { PokemonBasicInfo } from "@/models/pokemon-model";
import "./pokemon-list.css";
import PokemonListRow from "./pokemon-list-row";

export default function PokemonList({
  listOfPokemons,
}: {
  listOfPokemons: PokemonBasicInfo[];
}) {
  return (
    <div className="table app-border-style">
      <ul className="table__container">
        {listOfPokemons.map((pokemon) => (
          <li className="table__element" key={pokemon.name}>
            <PokemonListRow name={pokemon.name} url={pokemon.url} />
          </li>
        ))}
      </ul>
    </div>
  );
}
