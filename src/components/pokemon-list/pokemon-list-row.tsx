"use client";
import { addToFavorites, removeFromFavorites } from "@/app/actions/favorites";
import getIdFromUrl from "@/utils/utils";
import { useRouter } from "next/navigation";
import { useState } from "react";

export default function PokemonListRow({
  name,
  url,
  isFavorite,
  onFavoriteToggle,
}: {
  name: string;
  url: string;
  isFavorite: boolean;
  onFavoriteToggle: () => void;
}) {
  const id = getIdFromUrl(url);
  const router = useRouter();
  const [isAFavorite, setIsAFavorite] = useState(isFavorite);

  const handleFavoriteToggle = (event: React.MouseEvent<HTMLButtonElement>) => {
    event.stopPropagation();

    if (isFavorite) {
      removeFromFavorites({ name, url });
    } else {
      addToFavorites({ name, url });
    }
    setIsAFavorite(!isAFavorite);
  };

  const handleClick = () => {
    router.push(`/pokemon-detail/${id}`);
  };

  return (
    <div className="table-row" onClick={handleClick}>
      <span className="table-row__id">{id}</span>
      <span className="table-row__name">{name}</span>
      <button className="favorite-button" onClick={handleFavoriteToggle}>
        {isAFavorite ? "Remove from Favorites" : "Add to Favorites"}
      </button>
    </div>
  );
}
