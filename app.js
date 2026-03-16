const API_KEY = "AIzaSyAclQXdDYMBODAjFfkdBU_kKPuSt0VNIRo";

async function search(){

const q = document.getElementById("search").value;

const url = `https://www.googleapis.com/youtube/v3/search?part=snippet&type=video&maxResults=20&q=${q}&key=${API_KEY}`;

const res = await fetch(url);
const data = await res.json();

const container = document.getElementById("results");
container.innerHTML = "";

for(const item of data.items){

const id = item.id.videoId;

const card = document.createElement("div");
card.className="card";

card.innerHTML = `
<img src="${item.snippet.thumbnails.medium.url}">
<div>${item.snippet.title}</div>
`;

card.onclick=()=>play(id);

container.appendChild(card);

}

}

function play(id){

document.getElementById("player").style.display="block";

document.getElementById("video").src =
`https://www.youtube.com/embed/${id}?rel=0`;

}

if("serviceWorker" in navigator){
navigator.serviceWorker.register("sw.js");
}
