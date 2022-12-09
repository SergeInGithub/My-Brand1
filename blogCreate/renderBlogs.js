const articles = document.querySelector('#t-body');
const articlesData = JSON.parse(localStorage.getItem('blogs')) ?? [];
console.log(articlesData);

articlesData.forEach((item, index) => {
  articles.insertAdjacentHTML(
    'afterbegin',
    `
    <tr>
    <td>${index}</td>
    <td>
    <img src="${item.image}" alt="" srcset="" />
    </td>
    <td>${item.title}</td>
    <td>${item.lang}</td>
    <td>${item.topic}</td>
    <td><button data-id = ${item.id} class= "delete-blog" name="button">Delete</button><a href="edit.html#${item.id}" rel="noopener noreferrer">
          <button id="edit" class="updateBlog">Edit</button>
          </a></td>

    </tr>

    `
  )
var coms=document.querySelector("#admincoments")
let comments= loadcomments(item.id)
comments.forEach(element => {
  coms.innerHTML+=`<tr><td>${element.user}</td><td>${element.comment}</td><td>${element.blogid}</td></td>`  
});



})


const deleteButtons = [...document.getElementsByClassName("delete-blog")];
deleteButtons.forEach((button) => {
  button.addEventListener("click", (e) => {
    const deleteID = e.target.dataset.id;
      deletePost(deleteID);
  });
});
function deletePost(deleteID) {
  localStorage.setItem(
    "blogs",
    JSON.stringify(articlesData.filter(({ id }) => id != deleteID))
  );
  location.reload();
}

function addcomment(id){
  var index=id.split("_")
  var blogid=index[1]
 var user = localStorage.getItem("signedin");
 var comment= document.querySelector("#text-message")

 var comments =  JSON.parse(localStorage.getItem("comments")) || []

var com={
  "user": user,
  "comment": comment,
  "blogid" : blogid
}
comments.push(com)
var newcomments= JSON.stringify(comments)
localStorage.setItem("comments", newcomments)

}

function loadcomments(id){
  var comments =  JSON.parse(localStorage.getItem("comments")) || []
  var blogcomments=[] 
  comments.forEach(element => {
    if (element.blogid==id){
      blogcomments.push(element)
    }    
  });
 return blogcomments

}