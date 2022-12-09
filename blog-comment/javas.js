const newURL = new URL(location.href);
// console.log(newURL);
let blogData = JSON.parse(window.localStorage.getItem("blogs")) ?? [];
const ourBlog = blogData.find(({ id }) => {
  return id == newURL.hash.replace("#", "");
});
console.log(ourBlog);
const articleDOM = document.querySelector(".outter-div");
// const { lang, title, image,topic } = ourBlog;
articleDOM.insertAdjacentHTML(
  "afterbegin",
  `
  <div class="box-1">
    <p class="j-head">${ourBlog.lang}</p>
    <p class="j-head-2">${ourBlog.title}</p>
    <img class="blog-img" src="${ourBlog.image}" alt="">
    <p class="j-head-3">${ourBlog.topic}</p>
    </div>    
    <div class="box-2">
    <p class="box2-text">What do you think of the article? ;)</p>
    <div class="emojis"> 
    <p class="box2-text">Feel free to live a comment below!</p>  
        <textarea id="text-message" placeholder="Message" name="text-message" rows="8" cols="80"></textarea> 
    <button  class="button-1" id="button_${ourBlog.id}" onclick="addcomment(this.id)"  name="button">Send Message</button>
        <img class="like" src="addlikeimage" id="like_${ourBlog.id}"  width="20" height="20" onclick="addlike(this.id)" /> <p id="nlikes"></p>
        </div>   
    `

);
var cd= document.querySelector("#comment_div");
var lks= document.querySelector("#nlikes");

window.addEventListener('load' ,()=>{
  var comments = loadcomments(ourBlog.id)
  var likes = (loadlikes(ourBlog.id)).length
 console.log(comments);
  comments.forEach(element => {
    cd.innerHTML+=`<div class='comment '>
    <h1>${element.user}</h1>
    <p>${element.comment}</p>
    </div>  `    
    
  });
  lks.innerHTML= likes

})




function addcomment(id){
  var index=id.split("_")
  var blogid=index[1]
 var user = localStorage.getItem("signedin");
 var comment= document.querySelector("#text-message").value 

 var comments =  JSON.parse(localStorage.getItem("comments")) || []

var com={
  "user": user,
  "comment": comment,
  "blogid" : blogid
}
comments.push(com)
var newcomments= JSON.stringify(comments)
localStorage.setItem("comments", newcomments)
window.location.reload()
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
function addlike(id){
  var index=id.split("_")
  var blogid=index[1]
 var user = localStorage.getItem("signedin");
 
 var likes =  JSON.parse(localStorage.getItem("likes")) || []
var lk={
  "user": user,  
  "blogid" : blogid
}
likes.push(lk)
var newlikes= JSON.stringify(likes)
localStorage.setItem("likes", newlikes)
window.location.reload()
}
function loadlikes(id){
  var likes =  JSON.parse(localStorage.getItem("likes")) || []
  var nlikes=[] 
  likes.forEach(element => {
    if (element.blogid==id){
      nlikes.push(element)
    }    
  });
 return nlikes

}
// for
// var c = loadcomments(blogid)
// c=[{}]
// c.forEach(element => {
//  table.innerHTML=`
//  <tr>elment.user<td> element.comment
// </tr> ` 
// });
