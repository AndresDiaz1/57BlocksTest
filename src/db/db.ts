import { PokemonBasicInfo } from "@/models/pokemon-model";
import Dexie, { Table } from "dexie";

interface User {
  email: string;
  password: string;
  favorites: PokemonBasicInfo[];
}

class MySubClassedDexie extends Dexie {
  users!: Table<User>;
  constructor() {
    super("pokemonDatabase");
    this.version(1)
      .stores({
        users: "email, pass",
      })
      .upgrade((tx) => {
        return tx
          .table("users")
          .toCollection()
          .modify((user) => {
            user.favorites = user.favorites || [];
          });
      });
  }
}

export const db = new MySubClassedDexie();
