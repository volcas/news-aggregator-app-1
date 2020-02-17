document.getElementById("getNews").addEventListener("click", getNews);


function getNews(){
fetch('https://newsapi.org/v2/top-headlines?country=in&apiKey=fcf951aed5be4984ba5644d81df16a92')
.then((res)=>res.json())
.then((data)=> {
let output ='<h1>News</h1>';
data.articles.forEach(article =>{
output+= 
`<div class="row">
	<div class="column">
	<div class="card">
		<ul id="news-articles">
			<li class="article"> 
			<img src="${article.urlToImage}" class="article-img">
			<h2 class="article-title">${article.title}</h2>
			<p class="article-description">${article.description}</p>
			<a class="article-link" href="${article.url}">${article.url} </a><br>
			<span class="article-author">-${article.author}</span><br>
			</li>
		</ul>
	</div>
	</div>
</div>`;
});
document.getElementById("output").innerHTML=output;
})
}


		function myFunction() {
		  
		  var input, filter, ul,li, a, i, txtValue;
		  input = document.getElementById('search');
		  filter = input.value.toUpperCase();
		  ul = document.querySelector(".card p");
		  li = ul.getElementsByTagName("li");
		  

		  
		  //for (i = 0; i < li.length; i++) {
		    a = li[i].getElementsByTagName("a")[0];
			txtValue = a.textContent || a.innerText;
			if (txtValue.toUpperCase().indexOf(filter) > -1) {
			  li[i].style.display = "";
			} else {
			  li[i].style.display = "none";
		}
		  
	 }
	