import "./header.css";
export default function Header({ title }: { title: string }) {
  return (
    <div className="header">
      <h1>{title}</h1>
      <div className="header__pokeball">
        <img
          className="header__pokeball-image"
          src="/img/pokeball.png"
          alt="Pokeball"
        />
      </div>
    </div>
  );
}
