import { useState } from "react";
import "./style.css";

const initialPosts = [
  {
    id: 1,
    text: "Finally got my acceptance to the nursing program :)",
    link: "https://i.redd.it/3t0swz8x81d51.jpg",
    category: "admissions",
    votesUp: 24,
    votesMid: 9,
    votesDown: 4,
  },
  {
    id: 2,
    text: "Pickup Soccer on Alumni Field 6pm Today!",
    link: "https://maps.app.goo.gl/6T2PorfBevRgjvt78",
    category: "event",
    votesUp: 54,
    votesMid: 10,
    votesDown: 6,
  },
  {
    id: 3,
    text: "Anyone else fail the COMP 2540 Midterm...",
    link: "https://media1.giphy.com/media/OBhDa8A9ZBIUU/giphy.gif",
    category: "academics",
    votesUp: 5,
    votesMid: 2,
    votesDown: 10,
  },
];

function App() {
  const [showForm, setShowForm] = useState(false);

  return (
    <>
      <Header showForm={showForm} setShowForm={setShowForm} />
      {showForm ? <NewPostForm /> : null}

      <main className="main">
        <CategoryFilter />
        <PostList />
      </main>
    </>
  );
}

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

const CATEGORIES = [
  { name: "academics", color: "#3b82f6" },
  { name: "social", color: "#16a34a" },
  { name: "advice", color: "#ef4444" },
  { name: "news", color: "#eab308" },
  { name: "event", color: "#db2777" },
  { name: "athletics", color: "#14b8a6" },
  { name: "humour", color: "#f97316" },
  { name: "admissions", color: "#8b5cf6" },
];

function NewPostForm() {
  const [text, setText] = useState("");
  const [source, setSource] = useState("");
  const [category, setCategory] = useState("");
  const textLength = text.length;

  function handleSubmit(e) {
    e.preventDefault();
  }

  return (
    <form className="post-form" onSubmit={handleSubmit}>
      <input
        type="text"
        placeholder="Share something..."
        value={text}
        onChange={(e) => setText(e.target.value)}
      />
      <span>{200 - textLength}</span>
      <input
        value={source}
        type="text"
        placeholder="Trustworthy Link"
        onChange={(e) => setSource(e.target.value)}
      />
      <select value={category} onChange={(e) => setCategory(e.target.value)}>
        <option value="">Choose category:</option>
        {CATEGORIES.map((cat) => (
          <option value={cat.name}>{cat.name.toUpperCase()}</option>
        ))}
      </select>
      <button className="btn btn-large">Post</button>
    </form>
  );
}

function CategoryFilter() {
  return (
    <aside>
      <ul>
        <li className="category">
          <button className="btn btn-all-categories">All</button>
        </li>
        {CATEGORIES.map((cat) => (
          <li key={cat.name} className="category">
            <button
              className="btn btn-category"
              style={{ backgroundColor: cat.color }}
            >
              {cat.name}
            </button>
          </li>
        ))}
      </ul>
    </aside>
  );
}

function PostList() {
  //TEMPORARY

  const posts = initialPosts;

  return (
    <section>
      <ul className="posts-list">
        {posts.map((post) => (
          <Post key={post.id} post={post} />
        ))}
      </ul>
    </section>
  );
}

function Post({ post }) {
  return (
    <li className="post">
      <p>
        {post.text}
        <a className="link" href={post.link} target="_blank">
          (Link)
        </a>
      </p>
      <span
        className="tag"
        style={{
          backgroundColor: CATEGORIES.find((cat) => cat.name === post.category)
            .color,
        }}
      >
        {post.category}
      </span>
      <div className="vote-buttons">
        <button>👍{post.votesUp}</button>
        <button>😐{post.votesMid}</button>
        <button>👎{post.votesDown}</button>
      </div>
    </li>
  );
}
export default App;
