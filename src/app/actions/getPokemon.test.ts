import {
  getPokemons,
  filterPokemon,
  getPokemonDetail,
  getPokemonDescriptionDetail,
} from "./getPokemon";
import {
  PokemonList,
  PokemonBasicInfo,
  PokemonRawDetail,
  PokemonRawDescription,
} from "@/models/pokemon-model";

describe("Pokemon API actions", () => {
  beforeEach(() => {
    global.fetch = jest.fn().mockImplementation(() => undefined);
  });

  it("should fetch the list of pokemons", async () => {
    const mockPokemonList: PokemonList = {
      count: 1118,
      next: "",
      previous: "",
      results: [
        { name: "bulbasaur", url: "https://pokeapi.co/api/v2/pokemon/1/" },
      ],
    };

    const mockResponse = {
      ok: true,
      json: async () => mockPokemonList,
    } as Response;

    const spyFetch = jest
      .spyOn(window, "fetch")
      .mockResolvedValue(mockResponse);

    const data = await getPokemons(1);
    expect(data).toEqual(mockPokemonList);
    expect(spyFetch).toHaveBeenCalledWith(
      "https://pokeapi.co/api/v2/pokemon/?offset=0&limit=20"
    );
  });

  it("should filter pokemons by name", async () => {
    const mockPokemonList: PokemonList = {
      count: 1118,
      next: "",
      previous: "",
      results: [
        { name: "bulbasaur", url: "https://pokeapi.co/api/v2/pokemon/1/" },
        { name: "ivysaur", url: "https://pokeapi.co/api/v2/pokemon/2/" },
      ],
    };

    const mockResponse = {
      ok: true,
      json: async () => mockPokemonList,
    } as Response;

    const spyFetch = jest
      .spyOn(window, "fetch")
      .mockResolvedValue(mockResponse);

    const data = await filterPokemon("bulba");
    expect(data).toEqual([
      { name: "bulbasaur", url: "https://pokeapi.co/api/v2/pokemon/1/" },
    ]);
    expect(fetch).toHaveBeenCalledWith(
      "https://pokeapi.co/api/v2/pokemon?limit=100000"
    );
  });

  it("should fetch the pokemon details", async () => {
    const mockPokemonDetail: PokemonRawDetail = {
      name: "bulbasaur",
      weight: 10,
      height: 10,
      sprites: {
        front_default: "",
      },
      types: [],
    };

    const mockResponse = {
      ok: true,
      json: async () => mockPokemonDetail,
    } as Response;

    const spyFetch = jest
      .spyOn(window, "fetch")
      .mockResolvedValue(mockResponse);

    const data = await getPokemonDetail(1);
    expect(data).toEqual(mockPokemonDetail);
    expect(fetch).toHaveBeenCalledWith("https://pokeapi.co/api/v2/pokemon/1");
  });

  it("should fetch the pokemon description details", async () => {
    const mockPokemonDescriptionDetail: PokemonRawDescription = {
      flavor_text_entries: [],
    };

    const mockResponse = {
      ok: true,
      json: async () => mockPokemonDescriptionDetail,
    } as Response;

    const spyFetch = jest
      .spyOn(window, "fetch")
      .mockResolvedValue(mockResponse);

    const data = await getPokemonDescriptionDetail(1);
    expect(data).toEqual(mockPokemonDescriptionDetail);
    expect(fetch).toHaveBeenCalledWith(
      "https://pokeapi.co/api/v2/pokemon-species/1"
    );
  });
});
