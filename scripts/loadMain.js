const main = document.getElementsByClassName("article-container")[0]

const getPosts = () => {
    let posts = localStorage.getItem('postsDb')
    posts = JSON.parse(posts).posts
    for (let i = 0; i < posts.length; i++) {
        let time = new Date()
        if ((time.getTime() / 1000) > (posts[i].time_posted + 12*60*60)) {
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
        } else {
            let postContainer = document.createElement('div')
            postContainer.className = "article-link-container"
            let postLink = document.createElement('div')
            postLink.className = ""
            let postTitle = document.createElement('h2')
            postTitle.className = "article-title"
            postTitle.innerHTML = posts[i].title
            let postDesc = document.createElement('div')
            postDesc.className = "article-description"
            postDesc.innerHTML = "Dropping in " +  parseInt(((posts[i].time_posted + 12*60*60) - (time.getTime() /1000)) / 60).toLocaleString() + " minutes."

            postLink.appendChild(postTitle)
            postLink.appendChild(postDesc)
            postContainer.appendChild(postLink)
            main.appendChild(postContainer)
        }
    }
}

getPosts()