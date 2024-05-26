"use client";
import {
  getPokemonDescriptionDetail,
  getPokemonDetail,
} from "@/app/actions/getPokemon";
import Description from "@/components/description/description";
import Picture from "@/components/picture/picture";
import "./pokemon-detail.css";
import withAuth from "@/components/withAuth/withAuth";
import { useParams } from "next/navigation";
import { useEffect, useState } from "react";
import {
  PokemonRawDescription,
  PokemonRawDetail,
} from "@/models/pokemon-model";

function PokemonDetail() {
  const { id } = useParams();
  const [pokemonDetail, setPokemonDetail] = useState<PokemonRawDetail>({
    name: "",
    weight: 0,
    height: 0,
    sprites: {
      front_default: "string",
    },
    types: [],
  });
  const [pokemonDescriptionDetail, setPokemonDescriptionDetail] =
    useState<PokemonRawDescription>({
      flavor_text_entries: [],
    });

  useEffect(() => {
    if (id) {
      const fetchPokemonDetail = async () => {
        try {
          const detail = await getPokemonDetail(Number(id));
          setPokemonDetail(detail);
          const pokemonDescriptionDetail = await getPokemonDescriptionDetail(
            Number(id)
          );
          setPokemonDescriptionDetail(pokemonDescriptionDetail);
        } catch (error) {
          console.error("Failed to fetch Pokémon details", error);
        }
      };

      fetchPokemonDetail();
    }
  }, [id]);

  return (
    <div className="pokemon-detail">
      {pokemonDetail && (
        <>
          <Picture
            name={pokemonDetail.name}
            imageSrc={pokemonDetail.sprites.front_default}
          />
          <Description
            name={pokemonDetail.name}
            weight={pokemonDetail.weight}
            height={pokemonDetail.height}
            types={pokemonDetail.types}
            description={
              pokemonDescriptionDetail.flavor_text_entries[0]?.flavor_text
            }
          />
        </>
      )}
    </div>
  );
}

export default withAuth(PokemonDetail);
