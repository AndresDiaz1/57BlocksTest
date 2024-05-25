import "./picture.css";

export default function Picture({
  name,
  imageSrc,
}: {
  name: string;
  imageSrc: string;
}) {
  return (
    <div className="picture">
      <img className="picture__img" alt={name} src={imageSrc}></img>
    </div>
  );
}
