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

/* postsList.insertAdjacentHTML("afterbegin", "<li>Aman</li>");*/

// Selecting DOM Elements
const btn = document.querySelector(".btn-open");
const form = document.querySelector(".post-form");
const postsList = document.querySelector(".posts-list");

// Create DOM Elements
postsList.innerHTML = "";

// Load date from Supabase
loadPosts();

async function loadPosts() {
  const res = await fetch(
    "https://hgxiuwuqnjtyhuvmntdz.supabase.co/rest/v1/posts",
    {
      headers: {
        apikey:
          "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImhneGl1d3Vxbmp0eWh1dm1udGR6Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3MDMzNzI0ODAsImV4cCI6MjAxODk0ODQ4MH0.YrNlho_dQJaQqwZOUYo2bu01BFVEQ2kDqGfwo5wM4Io",
        authorization:
          "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImhneGl1d3Vxbmp0eWh1dm1udGR6Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3MDMzNzI0ODAsImV4cCI6MjAxODk0ODQ4MH0.YrNlho_dQJaQqwZOUYo2bu01BFVEQ2kDqGfwo5wM4Io",
      },
    }
  );
  const data = await res.json();
  console.log(data);
  // const filteredData = data.filter((post) => post.category === "academics");
  createPostsList(data);
}

function createPostsList(dataArray) {
  const htmlArray = dataArray.map(
    (post) => `<li class="post">
  <p>
  ${post.text}
      <a
        class="link"
        href="${post.link}"
        target="_blank"
        >(Link)</a>
  </p>
  <span class="tag" style="background-color:
   ${CATEGORIES.find((cat) => cat.name === post.category).color}">${
      post.category
    }</span>
  </li>`
  );
  const html = htmlArray.join("");
  console.log(html);
  postsList.insertAdjacentHTML("afterbegin", html);
}

// Toggle form visiblity
btn.addEventListener("click", function () {
  if (form.classList.contains("hidden")) {
    form.classList.remove("hidden");
    btn.textContent = "Close";
  } else {
    form.classList.add("hidden");
    btn.textContent = "Make a post";
  }
});
