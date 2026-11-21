var CH=[
    { n: 'العظام والعضلات', c: '#ef6f5e', ic: 'i1', open: 1, lessons: [{ t: 'العظام والعضلات', src: 'lessons/ch1/lesson1.html' }, { t: 'تركيب العظام', src: 'lessons/ch1/lesson2.html' }, { t: 'الهيكل العظمي الكامل للإنسان', src: 'lessons/ch1/lesson3.html' }, { t: 'أجسام الحيوانات', src: 'lessons/ch1/lesson4.html' }]},
 {n:'التغيرات في الفصول',c:'#f4b73f',ic:'i2'},
 {n:'شروط الإنبات',c:'#8cc63f',ic:'i3'},
 {n:'شروط النمو',c:'#2fb583',ic:'i4'},
 {n:'من الزهرة إلى الثمرة',c:'#ec6fa4',ic:'i5'},
 {n:'نمو الإنسان والتكاثر',c:'#7b72e0',ic:'i6'},
 {n:'نمو الحيوانات وتكاثرها',c:'#f08a3c',ic:'i7'},
 {n:'تغيرات الطقس',c:'#4aa3e8',ic:'i8'},
 {n:'دورة الماء',c:'#1ec0cf',ic:'i9'}];
var AR='٠١٢٣٤٥٦٧٨٩',$=function(s){return document.querySelector(s)};
function ar(n){return String(n).replace(/\d/g,function(d){return AR[d]})}
function icon(id){return '<svg class="ico" viewBox="0 0 48 48" aria-hidden="true"><use href="#'+id+'"/></svg>'}
$('#path').innerHTML=CH.map(function(c,i){return (i?'<b></b>':'')+'<i style="--c:'+c.c+'" class="'+(c.open?'on':'')+'"></i>'}).join('');
$('#grid').innerHTML=CH.map(function(c,i){
 return '<button class="card'+(c.open?'':' locked')+'" style="--c:'+c.c+'" data-i="'+i+'" aria-label="الفصل '+ar(i+1)+': '+c.n+(c.open?'':' (مقفول)')+'"><span class="band"><span class="num">'+ar(i+1)+'</span>'+icon(c.ic)+(c.open?'':'<svg class="lk" viewBox="0 0 48 48" aria-hidden="true"><use href="#lock"/></svg>')+'</span><span class="nm">الفصل '+ar(i+1)+': '+c.n+'</span><span class="st">'+(c.open?'مفتوح | '+ar(c.lessons.length)+' دروس':'هيتفتح قريبًا')+'</span></button>'}).join('');
var tt=0;function toast(t){var e=$('#toast');e.textContent=t;e.className='toast on';clearTimeout(tt);tt=setTimeout(function(){e.className='toast'},2200)}
$('#grid').onclick=function(e){var b=e.target.closest('.card');if(!b)return;var i=+b.dataset.i;
 if(CH[i].open)location.hash='ch'+(i+1)+'-l1';
 else{b.classList.remove('shake');void b.offsetWidth;b.classList.add('shake');toast('الفصل '+ar(i+1)+' لسه مقفول، هيتفتح قريبًا')}};
function load(src){var f=$('#fr');if(window.EMBED&&EMBED[src]){f.removeAttribute('src');f.srcdoc=new TextDecoder().decode(Uint8Array.from(atob(EMBED[src]),function(c){return c.charCodeAt(0)}))}else{f.removeAttribute('srcdoc');f.src=src}}
function track(p,t,ev){var n=0;(function go(){if(window.goatcounter&&goatcounter.count)goatcounter.count({path:p,title:t,event:!!ev});else if(n++<20)setTimeout(go,300)})()}
window.addEventListener('message',function(e){var d=e.data;
 if(!d||d.type!=='lfx'||e.source!==$('#fr').contentWindow)return;
 if(!/^ch\d+-l\d+$/.test(d.lesson)||(d.vote!=='up'&&d.vote!=='down'))return;
 track('feedback/'+d.lesson+'/'+d.vote,'feedback '+d.lesson+' '+d.vote,true)});
var tabsOpen=true;
function setTabs(o){tabsOpen=o;var n=$('#tabs');n.classList.toggle('closed',!o);var t=n.querySelector('.tgl');if(t){t.setAttribute('aria-expanded',o);t.setAttribute('aria-label',o?'إخفاء الدروس':'عرض الدروس');t.title=o?'إخفاء الدروس':'عرض الدروس'}}
function showChapter(i,l){var c=CH[i],s=$('#chapter');s.style.setProperty('--c',c.c);
 $('#cname').innerHTML='<span class="cb">'+icon(c.ic)+'الفصل '+ar(i+1)+'</span><h2>'+c.n+'</h2>';
 $('#tabs').innerHTML='<div class="th"><span class="tht">دروس الفصل</span><button class="tgl" aria-controls="tabs"><svg viewBox="0 0 24 24" aria-hidden="true"><path d="M9 6l6 6-6 6" fill="none" stroke="currentColor" stroke-width="3" stroke-linecap="round" stroke-linejoin="round"/></svg></button></div>'+c.lessons.map(function(x,k){return '<button class="tab'+(k==l?' on':'')+'" data-k="'+k+'" title="'+x.t+'" aria-label="الدرس '+ar(k+1)+': '+x.t+'"'+(k==l?' aria-current="page"':'')+'><span class="tn">'+ar(k+1)+'</span><span class="tt">'+x.t+'</span></button>'}).join('');
 setTabs(tabsOpen);
 $('#tabs').onclick=function(e){if(e.target.closest('.tgl')){setTabs(!tabsOpen);return}var b=e.target.closest('.tab');if(b)location.hash='ch'+(i+1)+'-l'+(+b.dataset.k+1)};
 $('#home').hidden=true;$('.top').hidden=true;s.hidden=false;document.documentElement.style.overflow='hidden';
 var src=c.lessons[l].src;if($('#fr').dataset.s!=src){$('#fr').dataset.s=src;load(src);track('lesson/ch'+(i+1)+'-l'+(l+1),c.n+' - '+c.lessons[l].t)}window.scrollTo(0,0)}
function route(){var m=/^ch(\d)(?:-l(\d))?$/.exec(location.hash.slice(1));
 if(m&&CH[m[1]-1]&&CH[m[1]-1].open&&CH[m[1]-1].lessons[(+m[2]||1)-1])showChapter(m[1]-1,(+m[2]||1)-1);
 else{document.documentElement.style.overflow='';$('#chapter').hidden=true;$('#home').hidden=false;$('.top').hidden=false;track('home','Home');var f=$('#fr');f.dataset.s='';f.removeAttribute('src');f.removeAttribute('srcdoc')}}
$('#back').onclick=function(){setTabs(true);location.hash='home'};
window.addEventListener('hashchange',route);route();
