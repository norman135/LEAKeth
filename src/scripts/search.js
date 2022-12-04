const searchButton = document.getElementById("search-button")
const searchField = document.getElementById("search-field")

searchButton.addEventListener("click", ()=>{
    window.location.replace("./index.html?search=" + searchField.value)
})

searchField.addEventListener("keypress", (event)=>{
    if (event.key == "Enter") {
        window.location.replace("./index.html?search=" + searchField.value)
    }
})