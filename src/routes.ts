interface Route {
  path: string;
  label: string;
}

export const routes: Route[] = [
  {
    path: "/home-list",
    label: "Home List",
  },
  {
    path: "/favorites-list",
    label: "Favorites List",
  },
];
