export interface PlayerCardProps {
  id: string;
  name: string;
  pack_name: string;
  faction_name: string;
  text: string;
  cost: number;
  slot: string;
  xp: number;
  traits: string;
  imagesrc: string;
}

export default function PlayerCard(props: PlayerCardProps) {
  return (
    <article className="playercard">
      <div className="playercarddiv">
        <img
          src={`https://arkhamdb.com${props.imagesrc}`}
          alt={props.name}
          className="cropped-card"
        />
        <div>
          <h2>{props.name}</h2>
          <h3>{props.faction_name}</h3>
          <h4>{props.traits}</h4>
          <p>
            {props.cost} |{props.xp} |{props.slot}
          </p>
        </div>
      </div>
      <p>{props.text}</p>

      <h5>{props.pack_name}</h5>
    </article>
  );
}
