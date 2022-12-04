const uploadedImage = document.getElementsByClassName("upload-files")[0]
const form = document.getElementById("add-info-form")

// A Web3Provider wraps a standard Web3 provider, which is
// what MetaMask injects as window.ethereum into each page
const provider = new ethers.providers.Web3Provider(window.ethereum)

// MetaMask requires requesting permission to connect users accounts
provider.send("eth_requestAccounts", []);

// The MetaMask plugin also allows signing transactions to
// send ether and pay to change state within the blockchain.
// For this, you need the account signer...
const signer = provider.getSigner()

const humanReadable = (bn) => {
    return ethers.utils.formatEther(bn)
}

abi = [
	{
		"inputs": [],
		"stateMutability": "nonpayable",
		"type": "constructor"
	},
	{
		"inputs": [],
		"name": "leak",
		"outputs": [
			{
				"internalType": "string",
				"name": "",
				"type": "string"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "string",
				"name": "madeLeak",
				"type": "string"
			}
		],
		"name": "makeLeak",
		"outputs": [],
		"stateMutability": "nonpayable",
		"type": "function"
	}
]

contractAddress = "0xbEEB4D7bDea4AE0990086dcC69aB027eB19c0B5e"
const contract = new ethers.Contract(contractAddress, abi, provider)

const makeLeak = async (message) => {
    confirm("A metamask window should show up.")
    contractWithSigner = contract.connect(signer)
    await contractWithSigner.makeLeak(message)
    window.location.replace("./index.html")
}

let data = {
    title: "",
    description: "",
    time_posted: 0,
    files_array: []
} 

const encodeData = (data) => {
    let files = ""
    for (let i = 0; i < data.files_array.length; i++) {
        files += "|" + data.files_array[i].replace(",", "\\comma\\")
    }
    let codedData = data.title.replace(",", "\\comma\\") + "|" + data.description.replace(",", "\\comma\\") + "|" + data.time_posted.toString() + files
    return codedData
}

form.addEventListener("submit", (e)=>{
    e.preventDefault()
    let formData = new FormData(form)
    let timeNow = new Date()
    if (formData.get('title') != "" && formData.get('description') != "") {
        data.title = formData.get("title")
        data.description = formData.get("description")
        data.time_posted = parseInt(timeNow.getTime() / 1000)
        makeLeak(encodeData(data))
    } else {
        document.getElementById("missing-warning").style.display = "block"
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
