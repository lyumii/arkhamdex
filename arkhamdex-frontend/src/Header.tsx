import EldritchGod from "./assets/banner3.png";

export default function Header() {
  return (
    <div className="headerdiv">
      <img src={EldritchGod} alt="eldritch god" />
      <div className="headertextdiv">
        <h1>ARKHAMDEX</h1>
        <h3>Terrors Beyond The Veil</h3>
      </div>
    </div>
  );
}
