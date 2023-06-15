window.addEventListener("load", fetchNews("India"));

async function fetchNews(query) {
  let apiKey = "0b5ba870e945415dacf7940ff168dc30";
  let apiUrl = `https://newsapi.org/v2/everything?q=${query}&apiKey=${apiKey}`;

  const data = await fetch(apiUrl).then((response) => {
    return response.json();
  });
  // console.log(data);
  bindData(data.articles);
}

function bindData(articles) {
  let newsContainer = document.querySelector(".news-container");
  let tempplateNews = document.getElementById("tempplate-news");

  newsContainer.innerHTML = "";
  articles.forEach((article) => {
    if (!article.urlToImage) {
      return;
    }
    let clone = tempplateNews.content.cloneNode(true);
    fillDataInCard(clone, article);
    newsContainer.appendChild(clone);
  });
}

function fillDataInCard(clone, article) {
  const newsImg = clone.querySelector("#news-img");
  const newsTitle = clone.querySelector("#news-title");
  const newsSource = clone.querySelector("#news-source");
  const newsDesc = clone.querySelector("#news-desc");

  newsImg.src = article.urlToImage;
  newsTitle.innerHTML = article.title;
  newsDesc.innerHTML = article.description;

  const date = new Date(article.publishedAt).toLocaleString("en-US", {
    timeZone: "Asia/Jakarta",
  });

  newsSource.innerHTML = `${article.source.name} · ${date}`;

  clone.firstElementChild.addEventListener("click", () => {
    window.open(article.url, "_blank");
  });
}

function navItemClick(id) {
  fetchNews(id);
}

const newsInput = document.querySelector(".news-input");
const searchBtn = document.querySelector(".search-btn");
searchBtn.addEventListener("click", () => {
  const query = newsInput.value.trim();
  if (query === "") {
    return;
  }
  fetchNews(query);
  newsInput.value = "";
});

// --------------------- menu-Btn ---------------------
let menuBtn = document.querySelector(".menu-btn");
let navbarList = document.querySelector(".navbar-list");

menuBtn.addEventListener("click", () => {
  navbarList.classList.toggle("active-menu");
  if (menuBtn.children[0].classList.contains("fa-bars")) {
    menuBtn.children[0].classList.remove("fa-bars");
    menuBtn.children[0].classList.add("fa-xmark");
  } else {
    menuBtn.children[0].classList.add("fa-bars");
    menuBtn.children[0].classList.remove("fa-xmark");
  }
});
