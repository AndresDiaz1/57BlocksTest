"use client";
import { addToFavorites, removeFromFavorites } from "@/app/actions/favorites";
import getIdFromUrl from "@/utils/utils";
import { useRouter } from "next/navigation";
import { useState } from "react";

export default function PokemonListRow({
  name,
  url,
}: {
  name: string;
  url: string;
}) {
  const [isFavorite, setIsFavorite] = useState(false);
  const id = getIdFromUrl(url);
  const router = useRouter();

  const handleFavoriteToggle = (event: React.MouseEvent<HTMLButtonElement>) => {
    event.stopPropagation();

    if (isFavorite) {
      removeFromFavorites(name);
    } else {
      addToFavorites({ name, url });
    }
    setIsFavorite(!isFavorite);
  };

  const handleClick = () => {
    router.push(`/pokemon-detail/${id}`);
  };

  return (
    <div className="table-row" onClick={handleClick}>
      <span className="table-row__id">{id}</span>
      <span className="table-row__name">{name}</span>
      <button className="favorite-button" onClick={handleFavoriteToggle}>
        {isFavorite ? "Remove from Favorites" : "Add to Favorites"}
      </button>
    </div>
  );
}
