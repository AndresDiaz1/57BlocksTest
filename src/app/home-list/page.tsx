import { getPokemons } from "../actions/getPokemon";

export default async function HomeList() {
  const pokemon = await getPokemons();
  console.log("pokemon", pokemon);

  return <div className="home">home</div>;
}
