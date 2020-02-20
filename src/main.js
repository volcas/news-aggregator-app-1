import "../style.css";

const API_KEY = "fcf951aed5be4984ba5644d81df16a92";
//const API_KEY = "93f249bb19a7431c9f730ba11c16fc9e";

const getElemById = id => document.getElementById(id);
let articleContainerElem = getElemById("news-articles");

const renderNews = news => {
    if (news.articles.length) {
        const { articles } = news;
        console.log(articles);

        let articleListElem = "";

        articles.forEach(article => {
            const { author, description, title, urlToImage, url } = article;

            articleListElem += `
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

        articleContainerElem.innerHTML = articleListElem;
    } else {
        articleContainerElem.innerHTML =
            '<li class="not-found">No article was found based on the search.</li>';
    }
};


const getNews = async(searchText = "") => {
    articleContainerElem.innerHTML = '<li class="loading">Loading....</li>';
    const url = searchText ?
        `https://newsapi.org/v2/everything?q=${searchText}&apiKey=${API_KEY}` :
        `https://newsapi.org/v2/top-headlines?country=in&apiKey=${API_KEY}`;

    const newsResponse = await fetch(url);
    const news = await newsResponse.json();

    renderNews(news);
};


const searchNews = async evt => {
    if (event.which === 13 || event.keyCode === 13 || event.key === "Enter") {
        getNews(evt.target.value);
    }
};

const init = () => {
    const searchInput = getElemById("search");

    searchInput.addEventListener("keypress", searchNews);

    getNews();
};

(function() {
    articleContainerElem = getElemById("news-articles");

    init();
})();
