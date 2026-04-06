
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
}

function play(id){

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
