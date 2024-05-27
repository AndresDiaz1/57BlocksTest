import { render, screen, fireEvent } from "@testing-library/react";
import PokemonListRow from "./pokemon-list-row";
import { addToFavorites, removeFromFavorites } from "@/app/actions/favorites";
import { useRouter } from "next/navigation";
import "@testing-library/jest-dom";

jest.mock("next/navigation", () => ({
  ...jest.requireActual("next/navigation"),
  useRouter: jest.fn().mockReturnValue({ push: jest.fn() }),
}));

jest.mock("../../app/actions/favorites", () => ({
  addToFavorites: jest.fn(),
  removeFromFavorites: jest.fn(),
}));

describe("PokemonListRow", () => {
  const mockPokemon = {
    name: "Pikachu",
    url: "https://pokeapi.co/api/v2/pokemon/25/",
    isFavorite: false,
    onFavoriteToggle: jest.fn(),
  };

  test("renders pokemon name", () => {
    render(<PokemonListRow {...mockPokemon} />);
    expect(screen.getByText("Pikachu")).toBeInTheDocument();
  });

  test("calls router.push when row is clicked", () => {
    render(<PokemonListRow {...mockPokemon} />);
    fireEvent.click(screen.getByText("Pikachu"));
    expect(useRouter().push).toHaveBeenCalledWith("/pokemon-detail/25");
  });

  test("calls addToFavorites when 'Add to Favorites' button is clicked", () => {
    render(<PokemonListRow {...mockPokemon} />);
    fireEvent.click(screen.getByText("Add to Favorites"));
    expect(addToFavorites).toHaveBeenCalledWith({
      name: "Pikachu",
      url: "https://pokeapi.co/api/v2/pokemon/25/",
    });
  });

  test("calls removeFromFavorites when 'Remove from Favorites' button is clicked", () => {
    const mockFavoritePokemon = { ...mockPokemon, isFavorite: true };
    render(<PokemonListRow {...mockFavoritePokemon} />);
    fireEvent.click(screen.getByText("Remove from Favorites"));
    expect(removeFromFavorites).toHaveBeenCalledWith({
      name: "Pikachu",
      url: "https://pokeapi.co/api/v2/pokemon/25/",
    });
  });
});
