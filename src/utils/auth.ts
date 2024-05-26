import { db } from "@/db/db";

export const isAuthenticated = async (): Promise<boolean> => {
  const userJSON = localStorage.getItem("pokedex-user");
  if (!userJSON) {
    return false;
  }

  const user = JSON.parse(userJSON);
  const dbUser = await db.users.get(user.email);
  return !!dbUser;
};
