const $=id=>document.getElementById(id);
function confetti(n=30){
  const sym=["卍","✦","★","✺"];
  for(let k=0;k<n;k++){
    const e=document.createElement("div");
    e.className="confetti";e.textContent=sym[k%4];
    e.style.left=Math.random()*100+"vw";
    e.style.color=k%3?"#e8b923":"#d6282f";
    e.style.animationDuration=(2.2+Math.random()*2.6)+"s";
    document.body.appendChild(e);setTimeout(()=>e.remove(),5200);
  }
}
$("enter").onclick=()=>{$("gate").classList.add("off");confetti(40)};

/* cuenta regresiva: 10 de octubre de 2026 */
const target=new Date(2026,9,10,0,0,0);
function tick(){
  const diff=target-new Date();
  if(diff<=0){
    ["d","h","m","s"].forEach(k=>$(k).textContent="0");
    $("cdmsg").textContent="¡Ya llegó tu día, Hillary! Disfrútalo al máximo.";
    return;
  }
  $("d").textContent=Math.floor(diff/864e5);
  $("h").textContent=Math.floor(diff/36e5)%24;
  $("m").textContent=Math.floor(diff/6e4)%60;
  $("s").textContent=Math.floor(diff/1e3)%60;
  $("cdmsg").textContent=diff<864e5*1.01?"Es mañana. ¡Prepárate!":"";
}
setInterval(tick,1000);tick();

/* reloj */
let t=$("ticks");
for(let a=0;a<12;a++){
  const r=a*30*Math.PI/180;
  t.innerHTML+=`<line x1="${100+78*Math.sin(r)}" y1="${100-78*Math.cos(r)}" x2="${100+86*Math.sin(r)}" y2="${100-86*Math.cos(r)}"/>`;
}
const mems=[
  "Ese día en que nos reímos tanto que ya no podíamos respirar.",
  "La vez que me apoyaste cuando más lo necesitaba.",
  "Aquella conversación que se alargó horas y no queríamos terminar.",
  "El momento en que supe que eras de esas amigas para toda la vida."
];
let rot=0,mi=0;
$("rew").onclick=()=>{
  rot-=720;
  $("hm").style.transform=`rotate(${rot}deg)`;
  $("hh").style.transform=`rotate(${rot/12}deg)`;
  $("mem").textContent="";
  setTimeout(()=>{$("mem").textContent=mems[mi++%mems.length]},1500);
};

/* misiones */
const boxes=[...document.querySelectorAll(".mis input")];
boxes.forEach(b=>b.onchange=()=>{
  const n=boxes.filter(x=>x.checked).length;
  $("fill").style.width=(n/boxes.length*100)+"%";
  if(n===boxes.length){$("misdone").textContent="Misión cumplida, jefa. ¡Feliz cumpleaños, Hillary!";confetti(50)}
  else $("misdone").textContent="";
});

/* deseos */
const wishes=[
  "Que este año nunca te falten las ganas de seguir adelante.",
  "Que tus amigos siempre estén de tu lado, como tú del suyo.",
  "Que cada meta que te propongas se haga realidad.",
  "Que la suerte te acompañe en cada curva del camino.",
  "Que tengas un año lleno de risas y buenos recuerdos.",
  "Que nunca dejes de proteger a quienes quieres, y que ellos te cuiden a ti."
];
let wi=-1;
$("btn").onclick=()=>{
  wi=(wi+1+Math.floor(Math.random()*(wishes.length-1)))%wishes.length;
  $("wish").textContent=wishes[wi];confetti();
};
