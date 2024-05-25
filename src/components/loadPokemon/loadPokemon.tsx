"use client"
import { PokemonBasicInfo } from "@/models/pokemon-model";
import { useState } from "react";
import { useInView } from "react-intersection-observer";

export default function LoadPokemon({search, initialPokemon}:{
    search: string | undefined;
    initialPokemon: PokemonBasicInfo[] | undefined
}) {
    const [pokemon, setPokemon] = useState(initialPokemon);
    const [page, setPage] = useState(1);
    const [loading, setLoading] = useState(false);
    const { inView, ref} = useInView();

    return (

    )
}