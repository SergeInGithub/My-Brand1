


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