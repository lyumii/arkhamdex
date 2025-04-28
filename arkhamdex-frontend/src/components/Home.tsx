import Header from "../Header";

export default function App() {
  return (
    <section>
      <Header />
      <div className="homebuttondiv">
        <button>Browse Investigators</button>
        <button>Browse Cards</button>
        <button>Log in</button>
      </div>
    </section>
  );
}
