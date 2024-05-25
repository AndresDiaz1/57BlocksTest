import type { Metadata } from "next";
import "./globals.css";
import Header from "@/components/header/header";

export const metadata: Metadata = {
  title: "Pokedex",
  description: "57Blocks Front End test",
};

export default function RootLayout({
  children,
  currentPath,
}: Readonly<{
  children: React.ReactNode;
  currentPath: string;
}>) {
  console.log("el curebfs", currentPath);
  return (
    <html lang="en">
      <body>
        <Header title="POKEDEX" />
        {children}
      </body>
    </html>
  );
}
