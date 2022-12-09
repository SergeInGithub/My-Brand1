const articles = document.querySelector('#outter-blog');
const articlesData = JSON.parse(localStorage.getItem('blogs')) || [];
console.log(articlesData);

articlesData.forEach((item, index) => {
  articles.insertAdjacentHTML(
    'afterbegin',
    `
    <div class="box-1">   
      <a href="blog-comment/javas.html#${item.id}">
        <p class="j-head">${item.lang}</p>
        <p class="j-head-2">${item.topic}</p>
        <p class="j-head-3">${item.blog}</p>
        <img class="blog-img" src="${item.image}" alt="">
      </a>
    </div>
 
    `
  )
});
