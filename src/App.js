import "./style.css";

function App() {
  const appTitle = "Lancer Social";

  return (
    <>
      {/* HEADER  */}
      <header className="header">
        <div className="logo">
          <img
            src="logo.png"
            width="75"
            height="100"
            alt="Lancer Social Logo"
          />
          <h1>{appTitle}</h1>
        </div>
        <button className="btn btn-large btn-open">Make a post</button>
      </header>

      <NewPostForm />

      <main className="main">
        <CategoryFilter />
        <PostList />
      </main>
    </>
  );
}

function NewPostForm() {
  return <form className="post-form">Fact Form</form>;
}

function CategoryFilter() {
  return <aside>Category Filter</aside>;
}

function PostList() {
  return <section>Facts List</section>;
}

export default App;
