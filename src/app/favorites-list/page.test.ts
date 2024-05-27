import { db } from "@/db/db";
import { PokemonBasicInfo } from "@/models/pokemon-model";
import {
  addToFavorites,
  getFavorites,
  removeFromFavorites,
} from "../actions/favorites";

const mockDb = db as jest.Mocked<typeof db>;

const mockLocalStorage = (() => {
  let store: Record<string, string> = {};
  return {
    getItem: jest.fn((key: string) => store[key] || null),
    setItem: jest.fn((key: string, value: string) => {
      store[key] = value.toString();
    }),
    clear: jest.fn(() => {
      store = {};
    }),
    removeItem: jest.fn((key: string) => {
      delete store[key];
    }),
  };
})();

Object.defineProperty(window, "localStorage", { value: mockLocalStorage });

describe("Favorite Pokemon Actions", () => {
  const mockPokemon: PokemonBasicInfo = {
    name: "bulbasaur",
    url: "https://pokeapi.co/api/v2/pokemon/1/",
  };
  const mockIvasur: PokemonBasicInfo = {
    name: "ivysaur",
    url: "https://pokeapi.co/api/v2/pokemon/2/",
  };
  const userEmail = "test@example.com";
  const userWithFavorites = { email: userEmail, favorites: [mockPokemon] };
  const userWithoutFavorites = { email: userEmail, favorites: [] };

  describe("addToFavorites", () => {
    it("should add a pokemon to favorites", async () => {
      jest
        .spyOn(window.localStorage, "getItem")
        .mockReturnValue('{"email":"test@example.com"}');
      const getSpy = jest
        .spyOn(mockDb.users, "get")
        .mockResolvedValue(userWithoutFavorites);
      const updateSpy = jest.spyOn(mockDb.users, "update").mockResolvedValue(1);

      await addToFavorites(mockPokemon);
      expect(getSpy).toHaveBeenCalledWith(userEmail);
      expect(updateSpy).toHaveBeenCalledWith(userEmail, {
        favorites: [mockPokemon],
      });
    });

    it("should append a pokemon to existing favorites", async () => {
      const anotherPokemon: PokemonBasicInfo = {
        name: "ivysaur",
        url: "https://pokeapi.co/api/v2/pokemon/2/",
      };

      jest
        .spyOn(window.localStorage, "getItem")
        .mockReturnValue('{"email":"test@example.com"}');
      const getSpy = jest
        .spyOn(mockDb.users, "get")
        .mockResolvedValue(userWithFavorites);
      const updateSpy = jest.spyOn(mockDb.users, "update").mockResolvedValue(1);

      await addToFavorites(anotherPokemon);
      expect(getSpy).toHaveBeenCalledWith(userEmail);
      expect(updateSpy).toHaveBeenCalledWith(userEmail, {
        favorites: [mockPokemon, anotherPokemon],
      });
    });
  });

  describe("removeFromFavorites", () => {
    it("should remove a pokemon from favorites", async () => {
      jest
        .spyOn(window.localStorage, "getItem")
        .mockReturnValue('{"email":"test@example.com"}');
      const getSpy = jest
        .spyOn(mockDb.users, "get")
        .mockResolvedValue(userWithFavorites);
      const updateSpy = jest.spyOn(mockDb.users, "update").mockResolvedValue(1);
      await removeFromFavorites(mockPokemon);
      expect(getSpy).toHaveBeenCalledWith(userEmail);
      expect(updateSpy).toHaveBeenCalledWith(userEmail, {
        favorites: [
          { name: "ivysaur", url: "https://pokeapi.co/api/v2/pokemon/2/" },
        ],
      });
    });
  });

  describe("getFavorites", () => {
    it("should return the list of favorite pokemons", async () => {
      jest
        .spyOn(window.localStorage, "getItem")
        .mockReturnValue('{"email":"test@example.com"}');

      const getSpy = jest
        .spyOn(mockDb.users, "get")
        .mockResolvedValue(userWithFavorites);

      const favorites = await getFavorites();
      expect(getSpy).toHaveBeenCalledWith(userEmail);
      expect(favorites).toEqual([mockPokemon, mockIvasur]);
    });
  });
});
