const uploadedImage = document.getElementsByClassName("upload-files")[0]
const showImage = (input) => {
    let fr = new FileReader()
    fr.readAsDataURL(input.files[0])
    fr.onload = () => {
        let image = document.createElement('img')
        image.className = "upload-files"
        image.src = fr.result
        document.getElementsByClassName("add-info-images")[0].appendChild(image)
        console.log(fr.result)
    }
    
}