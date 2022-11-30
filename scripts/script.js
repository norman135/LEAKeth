const uploadedImage = document.getElementsByClassName("upload-files")[0]
const form = document.getElementById("add-info-form")

let data = {
    title: "",
    description: "",
    upvotes: 0,
    downvotes: 0,
    time_posted: 0,
    files_array: []
}

form.addEventListener("submit", (e)=>{
    e.preventDefault()
    let formData = new FormData(form)
    let timeNow = new Date()
    if (formData.get('title') != "" && formData.get('description') != "") {
        data.title = formData.get("title")
        data.description = formData.get("description")
        data.time_posted = parseInt(timeNow.getTime() / 1000)
        let existingData = JSON.parse(localStorage.getItem("postsDb"))
        data.id = existingData.posts.length + 1
        existingData.posts.push(data)
        localStorage.setItem("postsDb", JSON.stringify(existingData))
        window.location.replace("/leaks.eth/index.html")
    } else {
        console.log("Some data is still needed")
    }
})
const showImage = (input) => {
    let fr = new FileReader()
    fr.readAsDataURL(input.files[0])
    fr.onload = () => {
        let image = document.createElement('img')
        image.className = "upload-files"
        image.src = fr.result
        document.getElementsByClassName("add-info-images")[0].appendChild(image)
        data.files_array.push(fr.result.toString())
    }
    
}
