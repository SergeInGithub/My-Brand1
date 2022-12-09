const newURL = new URL(location.href);
let blogData = JSON.parse(window.localStorage.getItem("blogs")) ?? [];
const ourBlog = blogData.find(({ id }) => {
  return id == newURL.hash.replace("#", "");
});

const form = document.querySelector('#form');
let image = document.querySelector('#image');
const title = document.querySelector('#title');
const topic = document.querySelector('#topic');
const lang = document.querySelector('#lang');
const blog = document.querySelector('#blog');
const previewImage = document.querySelector('#previewImage');

title.value = ourBlog.title;
topic.value = ourBlog.topic;
lang.value = ourBlog.lang;
blog.value = ourBlog.blog;
previewImage.src = ourBlog.image;

async function showPreview(event) {
  if (event.target.files.length > 0) {
    previewImage.src = await readImage(event.target.files[0]);
    previewImage.style.display = "block";
  }
}

image.addEventListener('change', e=> {
  showPreview(e);

})

async function uploadImage(e) {
  if(e.target.files.length > 0){
    image = await readImage(e.target.files[0]);
  }

}

function readImage (file) {
  return new Promise((resolve, reject) => {
    const fileReader = new FileReader();
    fileReader.readAsDataURL(file);
    fileReader.addEventListener("load", (e) => {
      resolve(fileReader.result);
    });
  });
}

// handle submit
form.addEventListener("submit", (e) => {
  let { image, title, topic, lang, blog, previewImage} = form;
  e.preventDefault();

    const updatedBlog = blogData.map((item) => {
      if (item.id === ourBlog.id) {
        return {
          ...item,
          image: previewImage.src,
          title: title.value,
          topic: topic.value,
          lang: lang.value,
          blog: blog.value,
          updatedAt: Date.now(),
        };
      }
      return item;
    });
    localStorage.setItem("blogs", JSON.stringify(updatedBlog));
    window.location.replace("index.html");
});
