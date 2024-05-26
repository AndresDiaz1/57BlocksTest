import Dexie, { Table } from "dexie";

interface User {
  email: string;
  password: string;
}

class MySubClassedDexie extends Dexie {
  users!: Table<User>;
  constructor() {
    super("pokemonDatabase");
    this.version(1).stores({
      users: "email, pass",
    });
  }
}

export const db = new MySubClassedDexie();
