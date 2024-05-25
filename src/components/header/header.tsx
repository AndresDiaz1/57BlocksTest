import Image from "next/image";
import "./header.css";
import NavBar from "../navbar/navbar";
export default function Header({ title }: { title: string }) {
  return (
    <header className="header">
      <h1>{title}</h1>
      <NavBar />
      <div className="header__pokeball">
        <Image
          className="header__pokeball-image"
          src="/img/pokeball.png"
          alt="Pokeball"
          width={50}
          height={50}
        />
      </div>
    </header>
  );
}
