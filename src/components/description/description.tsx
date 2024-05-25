import { PokemonType } from "@/models/pokemon-model";
import "./description.css";

export default function Description({
  name,
  weight,
  height,
  types,
  description,
}: {
  name: string;
  weight: number;
  height: number;
  types: PokemonType[];
  description: string;
}) {
  return (
    <div className="description app-border-style">
      <h2 className="description__name">{name}</h2>
      <span className="description__bio">{description}</span>
      <div className="description__info">
        <div className="description__info-body">
          <div className="description__info-body-weight">
            <label>Weight:</label>
            <span>{weight + "lbs."}</span>
          </div>
          <div className="description__info-body-height">
            <label>Height:</label>
            <span>{height + "'"}</span>
          </div>
        </div>
        <div className="description__info-types">
          <label>Type</label>
          <ul>
            {types.map((type) => (
              <li key={type.type.name}>
                <span>{type.type.name}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
}
