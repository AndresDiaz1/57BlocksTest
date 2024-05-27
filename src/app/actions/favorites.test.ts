import { db } from "@/db/db";
import { PokemonBasicInfo } from "@/models/pokemon-model";
import { addToFavorites, removeFromFavorites, getFavorites } from "./favorites";

const mockDb = db as jest.Mocked<typeof db>;

describe("Favorites actions", () => {
  const userEmail = "test@example.com";
  const mockPokemon: PokemonBasicInfo = {
    name: "pikachu",
    url: "https://pokeapi.co/api/v2/pokemon/25/",
  };

  beforeEach(() => {
    localStorage.setItem("pokedex-user", JSON.stringify({ email: userEmail }));
  });

  it("should add a pokemon to favorites", async () => {
    const user = { email: userEmail, favorites: [] };
    const getSpy = jest.spyOn(mockDb.users, "get").mockResolvedValue(user);
    const updateSpy = jest.spyOn(mockDb.users, "update").mockResolvedValue(1);
    await addToFavorites(mockPokemon);
    expect(getSpy).toHaveBeenCalledWith(userEmail);
    expect(updateSpy).toHaveBeenCalledWith(userEmail, {
      favorites: [mockPokemon],
    });
  });

  it("should remove a pokemon from favorites", async () => {
    const user = { email: userEmail, favorites: [mockPokemon] };
    const getSpy = jest.spyOn(mockDb.users, "get").mockResolvedValue(user);
    const updateSpy = jest.spyOn(mockDb.users, "update").mockResolvedValue(1);

    await removeFromFavorites(mockPokemon);

    expect(getSpy).toHaveBeenCalledWith(userEmail);
    expect(updateSpy).toHaveBeenCalledWith(userEmail, { favorites: [] });
  });

  it("should get the list of favorite pokemons", async () => {
    const user = { email: userEmail, favorites: [mockPokemon] };
    const getSpy = jest.spyOn(mockDb.users, "get").mockResolvedValue(user);

    const favorites = await getFavorites();

    expect(getSpy).toHaveBeenCalledWith(userEmail);
    expect(favorites).toEqual([mockPokemon]);
  });

  it("should return an empty array if the user does not exist", async () => {
    const getSpy = jest.spyOn(mockDb.users, "get").mockResolvedValue(undefined);

    const favorites = await getFavorites();

    expect(getSpy).toHaveBeenCalledWith(userEmail);
    expect(favorites).toEqual([]);
  });
});
