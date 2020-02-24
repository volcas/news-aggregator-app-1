import "../styles/index.css";

const API_KEY = "93f249bb19a7431c9f730ba11c16fc9e";

const getElemById = id => document.getElementById(id);
let article_element = getElemById("news-articles");

const myNews = news => {
  if (news.articles.length) {
    const { articles } = news;
    console.log(articles);

    let list_element = "";

    articles.forEach(article => {
      const { author, description, title, urlToImage, url } = article;

      list_element += `
		    <li class="article">
		      <div class="article-img-wrap">
            <img class="article-img" src="${urlToImage}" alt="${title}" />
          </div>

		      <h2 class="article-title">${title}</h2>

		      <p class="article-description">${description ||
            "Description not available"}</p>

		      <span class="article-author">- ${author ? author : "Anon"}</span>

          <a class="article-link" href="${url}" target="_blank" rel="noopener noreferrer"></a>
		    </li>
		  `;
    });

    article_element.innerHTML = list_element;
  } else {
    article_element.innerHTML =
      '<li class="not-found">No article was found based on the search.</li>';
  }
};


const getNews = async (searchText = "") => {
  article_element.innerHTML = '<li class="loading">Loading....</li>';
  const url = searchText
    ? `https://newsapi.org/v2/everything?q=${searchText}&apiKey=${API_KEY}`
    : `https://newsapi.org/v2/top-headlines?country=in&apiKey=${API_KEY}`;

  const newsResponse = await fetch(url);
  const news = await newsResponse.json();

  myNews(news);
};


const newsSearch = async evt => {
  if (event.which === 13 || event.keyCode === 13 || event.key === "Enter") {
    getNews(evt.target.value);
  }
};


const init = () => {
  const searchInput = getElemById("search");

  searchInput.addEventListener("keypress", newsSearch);

  getNews();
};

(function() {
  article_element = getElemById("news-articles");

  init();
})();
