"use client";
import { useRouter } from "next/navigation";

export default function PokemonListRow({
  name,
  url,
}: {
  name: string;
  url: string;
}) {
  const id = transform(url);
  const router = useRouter();

  function transform(url: string): string {
    const regex = /\/(\d+)\/$/;
    const match = url.match(regex);
    if (match && match[1]) {
      return match[1];
    } else {
      return "";
    }
  }

  const handleClick = () => {
    router.push(`/pokemon-detail/${id}`);
  };

  return (
    <div className="table-row" onClick={handleClick}>
      <span className="table-row__id">{id}</span>
      <span className="table-row__name">{name}</span>
    </div>
  );
}
