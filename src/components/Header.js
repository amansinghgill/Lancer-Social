function Header({ showForm, setShowForm }) {
  const appTitle = "Lancer Social";

  return (
    <header className="header">
      <div className="logo">
        <img src="logo.png" width="75" height="100" alt="Lancer Social Logo" />
        <h1>{appTitle}</h1>
      </div>
      <button
        className="btn btn-large btn-open"
        onClick={() => setShowForm((show) => !show)}
      >
        {showForm ? "Close" : "Make a post"}
      </button>
    </header>
  );
}

export default Header;
