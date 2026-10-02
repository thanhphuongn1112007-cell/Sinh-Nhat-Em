// ===== Lấp lánh =====
const cv=document.getElementById('sparkle'),cx=cv.getContext('2d');let S=[];
function rs(){cv.width=innerWidth;cv.height=innerHeight}rs();addEventListener('resize',rs);
for(let i=0;i<90;i++)S.push({x:Math.random()*cv.width,y:Math.random()*cv.height,r:Math.random()*3+1,p:Math.random()*6,v:Math.random()*.03+.01,d:Math.random()*.5+.2});
(function loop(){cx.clearRect(0,0,cv.width,cv.height);
for(const s of S){s.p+=s.v;s.y-=s.d;if(s.y<-10){s.y=cv.height+10;s.x=Math.random()*cv.width}
const a=(Math.sin(s.p)+1)/2;cx.save();cx.globalAlpha=a;cx.translate(s.x,s.y);cx.fillStyle='#fff';cx.shadowColor='#ff5fa2';cx.shadowBlur=12;
cx.beginPath();for(let k=0;k<8;k++){const R=k%2?s.r:s.r*3.2,t=k*Math.PI/4;cx.lineTo(Math.cos(t)*R,Math.sin(t)*R)}cx.fill();cx.restore()}
requestAnimationFrame(loop)})();
// hiệu ứng tim khi bấm
addEventListener('click',e=>{for(let i=0;i<8;i++){const h=document.createElement('div');h.textContent=['💖','✨','💗','🌸'][i%4];
h.style.cssText=`position:fixed;left:${e.clientX}px;top:${e.clientY}px;font-size:22px;z-index:9;pointer-events:none;transition:all 1.2s;`;
document.body.appendChild(h);requestAnimationFrame(()=>{h.style.transform=`translate(${(Math.random()-.5)*160}px,${-60-Math.random()*120}px)`;h.style.opacity=0});setTimeout(()=>h.remove(),1300)}});

// ===== Tiện ích =====
const $=id=>document.getElementById(id);
function show(id){document.querySelectorAll('.page').forEach(p=>p.classList.remove('active'));$(id).classList.add('active')}
function type(el,text,speed,done){el.textContent='';let i=0;(function t(){if(i<text.length){el.textContent+=text[i++];setTimeout(t,speed)}else done&&done()})()}

// ===== Nhạc chúc mừng sinh nhật (Web Audio) =====
let ac,stopMusic=false;
function playBirthday(){
 ac=ac||new (window.AudioContext||window.webkitAudioContext)();
 const f={G4:392,A4:440,B4:494,C5:523,D5:587,E5:659,F5:698,G5:784};
 const m=[['G4',.75],['G4',.25],['A4',1],['G4',1],['C5',1],['B4',2],['G4',.75],['G4',.25],['A4',1],['G4',1],['D5',1],['C5',2],
 ['G4',.75],['G4',.25],['G5',1],['E5',1],['C5',1],['B4',1],['A4',2],['F5',.75],['F5',.25],['E5',1],['C5',1],['D5',1],['C5',2]];
 const beat=.5;let t=ac.currentTime+.1;
 for(const [n,d] of m){const o=ac.createOscillator(),g=ac.createGain();o.type='triangle';o.frequency.value=f[n];
 g.gain.setValueAtTime(0,t);g.gain.linearRampToValueAtTime(.25,t+.03);g.gain.exponentialRampToValueAtTime(.001,t+d*beat);
 o.connect(g).connect(ac.destination);o.start(t);o.stop(t+d*beat);t+=d*beat}
 setTimeout(()=>{if(!stopMusic)playBirthday()},(t-ac.currentTime+1)*1000);
}

// ===== Trang 1 =====
$('gift').addEventListener('click',function(){
 if(this.classList.contains('open'))return;this.classList.add('open');$('hint').style.display='none';
 setTimeout(()=>type($('wish'),'Chúc em người con gái anh yêu tuổi mới thật hạnh phúc nhé iu em',90,()=>$('next1').classList.remove('hidden')),900);
});
// ===== Trang 2 =====
$('next1').onclick=()=>{show('p2');stopMusic=false;playBirthday();
 [...$('gallery').children].forEach((im,i)=>setTimeout(()=>im.classList.add('show'),800+i*1500));
 setTimeout(()=>$('next2').classList.remove('hidden'),800+7*1500);};
// ===== Trang 3 =====
$('next2').onclick=()=>{show('p3');
 const msg='em à em biết không, em xinh lắm, em đáng yêu, đáng yêu tới mức anh có thể ngắm gương mặt em lúc ngủ cả ngày, hôm nay là 1 ngày đặc biệt của em, ngày mà thiên thần nhỏ của anh ra đời, anh nghĩ rằng em có lẽ là người mà anh dành trọn tình cảm. Cảm ơn em vì những lần bỏ qua, cảm ơn em vì đã yêu anh, xin lỗi em vì anh không tốt như em mong muốn, nhưng anh biết anh cần phải cố gắng rất nhiều để sau này cưới em làm vợ, chưa ai cho anh cảm giác như em cả. Sau tất cả vẫn là em, yêu em.';
 type($('letter'),msg,70,()=>$('sign').classList.remove('hidden'));};
