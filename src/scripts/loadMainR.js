let urlParam = new URLSearchParams(window.location.search);
search = urlParam.get('search')
if (search) {
	search = search.toLowerCase()
}


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
    
const connToBC =  async ()=> {
    const leaks = await contract.leak()
    return leaks
}

message = "Leaks equals transparency.|Leaks will always be transparent. Always."

const makeLeak = async (message) => {
    contractWithSigner = contract.connect(signer)
    contractWithSigner.makeLeak(message)
}


const leaksDecoder = async () => {
	const connection = connToBC()
	let leaks = await connection
	let data = []
	for (let i = 1; i < leaks.split("||").length; i++) {
		data.push({
			id: i,
			title: leaks.split("||")[i].split("|")[0],
			description: leaks.split("||")[i].split("|")[1],
			time_posted: leaks.split("||")[i].split("|")[2]
		})
	}
	const main = document.getElementsByClassName("article-container")[0]
	if (search) {
		for (let i = 0; i < data.length; i++) {
			if (data[i].title.toLowerCase().replace("\\comma\\", ",").includes(search) || data[i].description.toLowerCase().replace("\\comma\\", ",").includes(search)) {
				let postContainer = document.createElement('div')
				postContainer.className = "article-link-container"
				let postLink = document.createElement('a')
				postLink.className = "article"
				postLink.href = "read.html?id=" + data[i].id
				let postTitle = document.createElement('h2')
				postTitle.className = "article-title"
				postTitle.innerHTML = data[i].title.replace("\\comma\\", ",")
				let postDesc = document.createElement('div')
				postDesc.className = "article-description"
				postDesc.innerHTML = data[i].description.replace("\\comma\\", ",")
		
				postLink.appendChild(postTitle)
				postLink.appendChild(postDesc)
				postContainer.appendChild(postLink)
				main.appendChild(postContainer)
			}
		}
	} else {
		for (let i = 0; i < data.length; i++) {
			let postContainer = document.createElement('div')
			postContainer.className = "article-link-container"
			let postLink = document.createElement('a')
			postLink.className = "article"
			postLink.href = "read.html?id=" + data[i].id
			let postTitle = document.createElement('h2')
			postTitle.className = "article-title"
			postTitle.innerHTML = data[i].title.replace("\\comma\\", ",")
			let postDesc = document.createElement('div')
			postDesc.className = "article-description"
			postDesc.innerHTML = data[i].description.replace("\\comma\\", ",")

			postLink.appendChild(postTitle)
			postLink.appendChild(postDesc)
			postContainer.appendChild(postLink)
			main.appendChild(postContainer)
		}
	}
}

leaksDecoder()