<<<<<<< HEAD

const API_KEY = "AIzaSyAclQXdDYMBODAjFfkdBU_kKPuSt0VNIRo";

const searchBtn = document.getElementById("searchBtn");
const searchInput = document.getElementById("searchInput");
const row = document.getElementById("resultsRow");
const player = document.getElementById("player");

let cache = JSON.parse(localStorage.getItem("ytCache") || "{}");

searchBtn.onclick = search;
searchInput.addEventListener("keypress", e=>{
 if(e.key==="Enter") search();
});

async function search(){

 const query = searchInput.value.trim();

 if(!query) return;

 if(cache[query]){
   render(cache[query]);
   return;
 }

 const url=`https://www.googleapis.com/youtube/v3/search?part=snippet&type=video&maxResults=15&q=${encodeURIComponent(query)}&key=${API_KEY}`;

 const res = await fetch(url);
 const data = await res.json();

 if(!data.items) return;

 const filtered = data.items.filter(v=>{
   const title=v.snippet.title.toLowerCase();
   return !title.includes("#shorts") && !title.includes("shorts");
 });

 cache[query]=filtered;
 localStorage.setItem("ytCache",JSON.stringify(cache));

 render(filtered);
}

function render(videos){

 row.innerHTML="";

 videos.forEach(v=>{

   const id=v.id.videoId;

   const el=document.createElement("div");
   el.className="card";

   el.innerHTML=`
   <img src="${v.snippet.thumbnails.medium.url}">
   <p>${v.snippet.title}</p>
   `;

   el.onclick=()=>play(id);

   row.appendChild(el);

 });
=======
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

>>>>>>> 603f0858e704fd282ef89af6000fc0f83aa5cb5a
}

function play(id){

<<<<<<< HEAD
 player.src=`https://www.youtube.com/embed/${id}?autoplay=1&playsinline=1`;

 window.scrollTo({
   top:0,
   behavior:"smooth"
 });
}

// try to keep audio if tab becomes hidden
document.addEventListener("visibilitychange",()=>{

 if(document.hidden===false && player.src){
   const src=player.src;
   player.src="";
   player.src=src;
 }

});
=======
document.getElementById("player").style.display="block";

document.getElementById("video").src =
`https://www.youtube.com/embed/${id}?rel=0`;

}

if("serviceWorker" in navigator){
navigator.serviceWorker.register("sw.js");
}
>>>>>>> 603f0858e704fd282ef89af6000fc0f83aa5cb5a
