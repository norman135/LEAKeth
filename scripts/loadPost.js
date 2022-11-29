let urlParam = new URLSearchParams(window.location.search);
id = urlParam.get('id')
const articleHeading = document.getElementsByClassName("main-article-heading")[0]
const articleDesc = document.getElementsByClassName("main-article-description")[0]
const upVotes = document.getElementsByClassName("upvotes")[0]
const downVotes = document.getElementsByClassName("downvotes")[0]
const main = document.getElementsByClassName("other-info-container")[0]
const imagesContainer = document.getElementsByClassName("main-article-images-section")[0]

const getPosts = () => {
    let posts = localStorage.getItem('postsDb')
    posts = JSON.parse(posts)
    for (let i = 0; i < posts.length; i++) {
        if (posts[i].id == id) {
            articleHeading.innerHTML = posts[i].title
            articleDesc.innerHTML = posts[i].description
            upVotes.innerHTML = posts[i].upvotes
            downVotes.innerHTML = posts[i].downvotes
            if (posts[i].files_array.length > 0) {
                for (let x = 0; x < posts[i].files_array.length; x++) {
                    let image = document.createElement("img")
                    image.className = "main-article-images"
                    image.src = posts[i].files_array[x]
                    imagesContainer.appendChild(image)
                }
            }
        }
        break
    }
    for (let i = 0; i < posts.length; i++) {
        if (posts[i].id != id) {
            let postContainer = document.createElement('div')
            postContainer.className = "article-link-container"
            let postLink = document.createElement('a')
            postLink.className = "article"
            postLink.href = "read.html?id=" + posts[i].id
            let postTitle = document.createElement('h2')
            postTitle.className = "article-title"
            postTitle.innerHTML = posts[i].title
            let postDesc = document.createElement('div')
            postDesc.className = "article-description"
            postDesc.innerHTML = posts[i].description

            postLink.appendChild(postTitle)
            postLink.appendChild(postDesc)
            postContainer.appendChild(postLink)
            main.appendChild(postContainer)
        }
        
    }
}

getPosts()