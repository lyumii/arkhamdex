export interface InvestigatorCardProps {
  id: string;
  name: string;
  subname: string;
  pack_name: string;
  faction_name: string;
  text: string;
  willpower: number;
  intellect: number;
  combat: number;
  agility: number;
  health: number;
  sanity: number;
  traits: string;
  imagesrc: string;
}

export default function InvestigatorCard(props: InvestigatorCardProps) {
  return (
    <article className="investigatorcard">
      <img
        src={
          props.imagesrc
            ? `https://arkhamdb.com${props.imagesrc}`
            : `/placeholder.png`
        }
        alt={props.name}
        className="cropped-investigator"
      />
      <div>
        <h2>{props.name}</h2>
        <h3>{props.subname}</h3>
        <h3>{props.faction_name}</h3>
        <h4>{props.traits}</h4>
        <h3>Stats:</h3>
        <ul>
          <li>Willpower: {props.willpower}</li>
          <li>Intellect: {props.intellect}</li>
          <li>Combat: {props.combat}</li>
          <li>Agility: {props.agility}</li>
        </ul>
        <ul>
          <li>Health Points: {props.health}</li>
          <li>Sanity Points: {props.sanity}</li>
        </ul>
        <p>{props.text}</p>
        <h5>{props.pack_name}</h5>
      </div>
    </article>
  );
}
