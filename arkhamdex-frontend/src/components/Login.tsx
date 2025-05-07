export default function LoginPage() {
  return (
    <section>
      <h1>Log in or register:</h1>
      <label htmlFor="username">
        <input type="text" />
      </label>
      <label htmlFor="password">
        <input type="text" />
      </label>
      <button>Log In</button>
      <button>Make an account</button>
    </section>
  );
}
