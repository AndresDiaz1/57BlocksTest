import {
  getPokemonDescriptionDetail,
  getPokemonDetail,
} from "@/app/actions/getPokemon";
import Description from "@/components/description/description";
import Picture from "@/components/picture/picture";

export default async function PokemonDetail({
  params,
}: {
  params: { id: number };
}) {
  const pokemon = await getPokemonDetail(params.id);
  const pokemonDescriptionDetail = await getPokemonDescriptionDetail(params.id);
  return (
    <div className="pokemon-detail">
      <Picture name={pokemon.name} imageSrc={pokemon.sprites.front_default} />
      <Description
        name={pokemon.name}
        weight={pokemon.weight}
        height={pokemon.height}
        types={pokemon.types}
        description={
          pokemonDescriptionDetail.flavor_text_entries[0].flavor_text
        }
      />
    </div>
  );
}
