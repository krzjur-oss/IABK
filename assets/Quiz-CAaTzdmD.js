import{c as W,r as f,Q,j as e,a as K,m as D,S as Se,C as Ae,I as te,R as Pe}from"./index-WgCNjL0I.js";import{S as Te}from"./sliders-vertical-DcnzlR9e.js";import{C as Ce}from"./check-CVJyeynU.js";import{S as Oe}from"./shield-fHQHngmb.js";import{Z as ae}from"./zap-Cllrino_.js";import{C as se}from"./clock-CHCV-idq.js";import{C as Ie}from"./circle-check-big-BVJXiwe6.js";import{C as Me}from"./circle-x-XxlPp0mL.js";import{A as De}from"./arrow-right-CrWYCQ6j.js";import{A as $}from"./award-DNE3vEM3.js";import{F as Ee}from"./file-text-BzwqN5_F.js";import{T as Re}from"./trash-2-TflIkE6t.js";/**
 * @license lucide-react v0.546.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const Ue=[["path",{d:"M8 2v4",key:"1cmpym"}],["path",{d:"M16 2v4",key:"4m81vk"}],["rect",{width:"18",height:"18",x:"3",y:"4",rx:"2",key:"1hopcy"}],["path",{d:"M3 10h18",key:"8toen8"}]],We=W("calendar",Ue);/**
 * @license lucide-react v0.546.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const _e=[["path",{d:"M15 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V7Z",key:"1rqfz7"}],["path",{d:"M14 2v4a2 2 0 0 0 2 2h4",key:"tnqrlb"}],["path",{d:"M12 18v-6",key:"17g6i2"}],["path",{d:"m9 15 3 3 3-3",key:"1npd3o"}]],oe=W("file-down",_e);/**
 * @license lucide-react v0.546.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const qe=[["path",{d:"M10 14.66v1.626a2 2 0 0 1-.976 1.696A5 5 0 0 0 7 21.978",key:"1n3hpd"}],["path",{d:"M14 14.66v1.626a2 2 0 0 0 .976 1.696A5 5 0 0 1 17 21.978",key:"rfe1zi"}],["path",{d:"M18 9h1.5a1 1 0 0 0 0-5H18",key:"7xy6bh"}],["path",{d:"M4 22h16",key:"57wxv0"}],["path",{d:"M6 9a6 6 0 0 0 12 0V3a1 1 0 0 0-1-1H7a1 1 0 0 0-1 1z",key:"1mhfuq"}],["path",{d:"M6 9H4.5a1 1 0 0 1 0-5H6",key:"tex48p"}]],F=W("trophy",qe);/**
 * @license lucide-react v0.546.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const Le=[["path",{d:"m16 11 2 2 4-4",key:"9rsbq5"}],["path",{d:"M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2",key:"1yyitq"}],["circle",{cx:"9",cy:"7",r:"4",key:"nufk8"}]],Be=W("user-check",Le),R=["Podzespoły","Peryferia","Sieci","Historia","Systemy operacyjne"],Ke={Podzespoły:{label:"Podzespoły",icon:"⚙️",desc:"CPU, GPU, RAM, Płyta główna, SSD, Zasilacz"},Peryferia:{label:"Peryferia",icon:"🖱️",desc:"Mysz, klawiatura, monitor, tablet, gamepady"},Sieci:{label:"Sieci",icon:"🌐",desc:"WAN/LAN, topologie, routery, kable i światłowody"},Historia:{label:"Historia",icon:"📜",desc:"ENIAC, tranzystory, IBM PC 5150, prawo Moore'a"},"Systemy operacyjne":{label:"Systemy operacyjne",icon:"🖥️",desc:"Jądro OS, pierścienie Ring, planista CPU, CLI"}},E=[{id:"all",title:"Pełny Egzamin (Wszystkie)",badge:"Poziom 1–6",diffLevels:[1,2,3,4,5,6],desc:"Po 1 pytaniu z każdego poziomu trudności (od podstaw do inżynierii)"},{id:"sp",title:"Zestaw podstawówka",badge:"Klasy 4–6 SP · Poziom 1–2",diffLevels:[1,2],desc:"Przystępne pytania o fundamenty komputera, urządzenia peryferyjne i proste pojęcia",isPresetSp:!0},{id:"medium",title:"Szkoła ponadpodstawowa",badge:"Poziom 3–4",diffLevels:[3,4],desc:"Specyfikacje, procedury montażowe, podstawy sieci LAN oraz architektury jądra"},{id:"hard",title:"Ekspert / Technik",badge:"Poziom 5–6",diffLevels:[5,6],desc:"Fizyka półprzewodników, protokoły transportowe, COW, RTOS i zaawansowane systemy"}],$e=b=>{const r=b.options.map((x,P)=>P).filter(x=>x!==b.correctAnswer);return r.length===0?-1:r[b.id%r.length]},U=(b,r=R,x=[1,2,3,4,5,6])=>{const P=b.filter(m=>r.length===0||r.includes(m.category)),w=P.length>0?P:b,T=[],h=new Set,k=[];if(x.length===6)k.push(1,2,3,4,5,6);else if(x.length===2)k.push(x[0],x[0],x[0],x[1],x[1],x[1]);else for(let m=0;m<6;m++)k.push(x[m%x.length]);for(const m of k){let l=w.filter(i=>i.difficulty===m&&!h.has(i.id));if(l.length===0&&(l=w.filter(i=>i.difficulty===m)),l.length===0&&(l=w.filter(i=>!h.has(i.id))),l.length===0&&(l=w),l.length===0&&(l=b.filter(i=>!h.has(i.id))),l.length===0&&(l=b),l.length>0){const i=l[Math.floor(Math.random()*l.length)];h.add(i.id);const y=i.options.map((p,O)=>({text:p,isCorrect:O===i.correctAnswer}));for(let p=y.length-1;p>0;p--){const O=Math.floor(Math.random()*(p+1));[y[p],y[O]]=[y[O],y[p]]}const A=y.map(p=>p.text),z=y.findIndex(p=>p.isCorrect);T.push({...i,options:A,correctAnswer:z===-1?i.correctAnswer:z})}}return T},re=b=>({1:"Model 3D i Podzespoły ➔ Komputer stacjonarny ➔ Szybki dysk SSD M.2 NVMe",2:"Makieta Peryferii ➔ Mysz komputerowa (GUI)",3:"Model 3D i Podzespoły ➔ Komputer stacjonarny ➔ Obudowa (PC Case)",4:"Makieta Peryferii ➔ Słuchawki / Karta dźwiękowa",5:"Makieta Peryferii ➔ Karta graficzna (GPU – poziome porty wideo)",6:"Budowa Sieci WAN/LAN ➔ Urządzenia aktywne: Router",7:"Historia i Ewolucja PC ➔ Generacja II – Tranzystory",8:"Makieta Peryferii ➔ Klawiatura mechaniczna",9:"Model 3D i Podzespoły ➔ Komputer stacjonarny ➔ Pamięć operacyjna RAM (tryb Dual-Channel)",10:"Budowa Sieci WAN/LAN ➔ Słownik sieciowy: Sieć WAN / Internet",11:"Historia i Ewolucja PC ➔ Lata 1980-1990: IBM PC model 5150",12:"Budowa Sieci WAN/LAN ➔ Okablowanie sieciowe ➔ Światłowód",13:"Model 3D i Podzespoły ➔ Komputer stacjonarny ➔ Chłodzenie procesora (Cooler CPU) i pasta termoprzewodząca",14:"Budowa Sieci WAN/LAN ➔ Przełącznik (Switch) vs Router sieciowy",15:"Historia i Ewolucja PC ➔ Generacja I – Lampy Próżniowe (np. ENIAC)",16:"Symulator Montażu PC ➔ Przebieg montażu ➔ Krok 4 (Cooler CPU - Wskazówki eksperta)",17:"Model 3D i Podzespoły ➔ Komputer stacjonarny ➔ Zasilacz (PSU) ➔ Sprawność elektryczna",18:"Model 3D i Podzespoły ➔ Komputer stacjonarny ➔ Procesor (CPU) ➔ Zabezpieczenie termiczne (włącz Tryb Naukowy)",19:"Budowa Sieci WAN/LAN ➔ Architektura i Adresowanie IP oraz brama domyślna",20:"Model 3D i Podzespoły ➔ Komputer stacjonarny ➔ Karta graficzna (GPU) ➔ Rodzaje pamięci i taktowanie",21:"Symulator Montażu PC ➔ Przestrogi w Kroku 1 i 5 o kołkach dystansowych instalowanych w obudowie",22:"Model 3D i Podzespoły ➔ Komputer stacjonarny ➔ Pamięć operacyjna RAM ➔ Technologia XMP i EXPO",23:"Historia i Ewolucja PC ➔ Prorocza teza z 1965 r.: Empiryczne Prawo Moore’a i krzem",24:"Budowa Sieci WAN/LAN ➔ Protokół transportowy bezpołączeniowy UDP",25:"Model 3D i Podzespoły ➔ Wybierz kategorię urządzenia: Tablet",26:"Makieta Peryferii ➔ Urządzenia kontrolne: Gamepad",27:"Model 3D i Podzespoły ➔ Wybierz kategorię urządzenia: Komputer Jednopłytkowy (SBC)",28:"Model 3D i Podzespoły ➔ Komputer Jednopłytkowy (SBC) ➔ Uniwersalne złącze GPIO",29:"Model 3D i Podzespoły ➔ Wybierz kategorię urządzenia: Konsola do gier ➔ Odprowadzanie ciepła APU",30:"Model 3D i Podzespoły ➔ Wybierz kategorię urządzenia: Superkomputer ➔ Bezpośrednie chłodzenie cieczą (DLC)",31:"Historia i Ewolucja PC ➔ Oś Czasu Peryferii ➔ Sekcja Drukarek (Druk igłowy)",32:"Historia i Ewolucja PC ➔ Oś Czasu Peryferii ➔ Sekcja Myszy (Zabrudzenia i regeneracja wałków)",33:"Diagnostyka, Złącza & Media ➔ Baza Wiedzy o Złączach ➔ TOSLINK",34:"Historia i Ewolucja PC ➔ Oś Czasu Peryferii ➔ Sekcja Klawiatur (Przełączniki Halla & Rapid Trigger)",35:"Historia i Ewolucja PC ➔ Oś Czasu Peryferii ➔ Sekcja Monitorów (CRT vs OLED, fizyka i pomiary emisyjności)",36:"Diagnostyka, Złącza & Media ➔ Baza Wiedzy o Mediach Transmisyjnych (Miedź vs Światłowód)",37:"Budowa Sieci WAN/LAN ➔ Interaktywny Analizator Topologii Sieciowych ➔ Topologia Siatki",38:"Budowa Sieci WAN/LAN ➔ Interaktywny Analizator Topologii Sieciowych ➔ Topologia Magistrali",39:"Budowa Sieci WAN/LAN ➔ Interaktywny Analizator Topologii Sieciowych ➔ Topologia Gwiazdy",40:"Systemy Operacyjne (OS) ➔ Rola OS i abstrakcja sprzętowa",41:"Systemy Operacyjne (OS) ➔ Interfejsy ➔ Wiersz poleceń (CLI) vs Graficzny (GUI)",42:"Systemy Operacyjne (OS) ➔ Pierścienie Ochrony CPU ➔ User Space (Ring 3) vs Kernel Space (Ring 0)",43:"Systemy Operacyjne (OS) ➔ Przejścia stanów ➔ Wywołania systemowe (Syscalls)",44:"Systemy Operacyjne (OS) ➔ Architektury Jądra ➔ Jądro Monolityczne vs Mikrojądro (Microkernel)",45:"Systemy Operacyjne (OS) ➔ Systemy Specjalne ➔ Czas Rzeczywisty (RTOS)",46:"Systemy Operacyjne (OS) ➔ Planista CPU ➔ Przełączanie kontekstu (Context Switching)",47:"Systemy Operacyjne (OS) ➔ Planista CPU ➔ Algorytm Round Robin (RR) i kwant czasu",48:"Systemy Operacyjne (OS) ➔ Uprawnienia POSIX ➔ Notacja chmod 755 (rwxr-xr-x)",49:"Systemy Operacyjne (OS) ➔ Konsola i Diagnostyka ➔ Polecenia top / htop i Get-Process",50:"Systemy Operacyjne (OS) ➔ Systemy Plików ➔ Węzły Inode (ext4) oraz Księgowanie (NTFS Journaling)",51:"Systemy Operacyjne (OS) ➔ Systemy Plików ➔ Mechanizm Copy-On-Write (APFS / Btrfs)"})[b]||"Baza Wiedzy programu",Fe=()=>{try{const b=localStorage.getItem("quiz_active_session");if(!b)return null;const r=JSON.parse(b);return!r||typeof r!="object"?null:{quizStarted:!!r.quizStarted,quizFinished:!!r.quizFinished,activeQuestions:Array.isArray(r.activeQuestions)&&r.activeQuestions.length>0?r.activeQuestions:U(Q),currentQuestionIdx:typeof r.currentQuestionIdx=="number"?r.currentQuestionIdx:0,selectedOption:r.selectedOption!==void 0&&r.selectedOption!==null?Number(r.selectedOption):null,isAnswerSubmitted:!!r.isAnswerSubmitted,score:typeof r.score=="number"?r.score:0,secondsElapsed:typeof r.secondsElapsed=="number"?r.secondsElapsed:0,hasSwitchedTabs:!!r.hasSwitchedTabs,hintMode:!!r.hintMode}}catch{return null}};function ot(){const[b,r]=f.useState(Q),[x,P]=f.useState(()=>Fe()||{quizStarted:!1,quizFinished:!1,activeQuestions:U(Q),currentQuestionIdx:0,selectedOption:null,isAnswerSubmitted:!1,score:0,secondsElapsed:0,hasSwitchedTabs:!1,hintMode:!1}),{quizStarted:w,quizFinished:T,activeQuestions:h,currentQuestionIdx:k,selectedOption:m,isAnswerSubmitted:l,score:i,secondsElapsed:y,hasSwitchedTabs:A,hintMode:z}=x,p=t=>{P(s=>{const a=typeof t=="function"?t(s):t;return{...s,...a}})},O=t=>p({quizFinished:t}),ne=t=>p(s=>({activeQuestions:typeof t=="function"?t(s.activeQuestions):t})),ie=t=>p(s=>({currentQuestionIdx:typeof t=="function"?t(s.currentQuestionIdx):t})),Z=t=>p({selectedOption:t}),H=t=>p({isAnswerSubmitted:t}),ce=t=>p(s=>({score:typeof t=="function"?t(s.score):t})),le=t=>p(s=>({secondsElapsed:typeof t=="function"?t(s.secondsElapsed):t})),de=t=>p({hasSwitchedTabs:t}),pe=t=>p(s=>({hintMode:typeof t=="function"?t(s.hintMode):t})),[N,xe]=f.useState(()=>{try{return localStorage.getItem("quiz_student_name")||""}catch{return""}}),[_,q]=f.useState(["Podzespoły","Peryferia","Sieci","Historia","Systemy operacyjne"]),[I,G]=f.useState("all"),[Y,L]=f.useState(0),[me,B]=f.useState(0),[v,ue]=f.useState(!1),[S,J]=f.useState(()=>{try{const t=localStorage.getItem("quiz_attempts");return t?JSON.parse(t):[]}catch{return[]}}),u=h[k];f.useEffect(()=>{let t;return w&&!T&&(t=setInterval(()=>{le(s=>s+1)},1e3)),()=>{t&&clearInterval(t)}},[w,T]),f.useEffect(()=>{const t=()=>{document.hidden&&w&&!T&&de(!0)};return document.addEventListener("visibilitychange",t),()=>{document.removeEventListener("visibilitychange",t)}},[w,T]),f.useEffect(()=>{try{v&&N.trim()?localStorage.setItem("quiz_student_name",N):v||localStorage.removeItem("quiz_student_name")}catch{}},[N,v]),f.useEffect(()=>{(async()=>{try{const s=await fetch("./quiz-questions.json");if(!s.ok)throw new Error(`Failed to fetch quiz questions: ${s.statusText}`);const a=await s.json();if(Array.isArray(a)&&a.length>0&&(r(a),!w)){const o=E.find(n=>n.id===I)||E[0];ne(U(a,_,o.diffLevels))}}catch{}})()},[w]);const j=t=>{try{const s=window.AudioContext||window.webkitAudioContext;if(!s)return;const a=new s;if(t==="correct"){const o=a.createOscillator(),n=a.createGain();o.frequency.setValueAtTime(523.25,a.currentTime),o.frequency.setValueAtTime(659.25,a.currentTime+.1),n.gain.setValueAtTime(.08,a.currentTime),n.gain.exponentialRampToValueAtTime(.01,a.currentTime+.35),o.connect(n),n.connect(a.destination),o.start(),o.stop(a.currentTime+.35)}else if(t==="incorrect"){const o=a.createOscillator(),n=a.createGain();o.type="sawtooth",o.frequency.setValueAtTime(180,a.currentTime),n.gain.setValueAtTime(.1,a.currentTime),n.gain.exponentialRampToValueAtTime(.01,a.currentTime+.3),o.connect(n),n.connect(a.destination),o.start(),o.stop(a.currentTime+.3)}else if(t==="victory")[261.63,329.63,392,523.25].forEach((n,c)=>{const d=a.createOscillator(),g=a.createGain();d.frequency.setValueAtTime(n,a.currentTime+c*.12),g.gain.setValueAtTime(.08,a.currentTime+c*.12),g.gain.exponentialRampToValueAtTime(.001,a.currentTime+c*.12+.25),d.connect(g),g.connect(a.destination),d.start(a.currentTime+c*.12),d.stop(a.currentTime+c*.12+.25)});else if(t==="click"||t==="start"){const o=a.createOscillator(),n=a.createGain();o.frequency.setValueAtTime(t==="start"?600:400,a.currentTime),n.gain.setValueAtTime(.05,a.currentTime),n.gain.exponentialRampToValueAtTime(.001,a.currentTime+.05),o.connect(n),n.connect(a.destination),o.start(),o.stop(a.currentTime+.05)}}catch{}},ye=t=>{l||(j("click"),Z(t))},be=()=>{if(m===null||l)return;if(H(!0),m===u.correctAnswer){j("correct"),ce(c=>c+1);const s=u.difficulty*100,a=y-me,o=a<20?(20-a)*5:0,n=s+o;L(c=>c+n)}else j("incorrect")},C=t=>{const s=Math.floor(t/60),a=t%60;return`${s}:${a<10?"0":""}${a}`},he=()=>{j("click"),Z(null),H(!1),k+1<h.length?(ie(t=>t+1),B(y)):(j("victory"),O(!0),fe(i))},fe=t=>{const s=C(y),a=new Date().toLocaleString("pl-PL",{year:"numeric",month:"2-digit",day:"2-digit",hour:"2-digit",minute:"2-digit"}),o=ee(t),c=[{id:Date.now(),studentName:N.trim()||"Anonimowy Uczeń",score:t,total:h.length,duration:s,date:a,rankTitle:o.title,hasSwitchedTabs:A},...S];J(c);try{localStorage.setItem("quiz_attempts",JSON.stringify(c))}catch(d){console.error("Failed to write quiz stats locally",d)}},we=()=>{j("click"),G("sp"),q([...R])},ze=t=>{t==="sp"?we():(j("click"),G(t))},ge=t=>{j("click"),q(s=>s.includes(t)?s.length===1?s:s.filter(a=>a!==t):[...s,t])},je=()=>{if(!v)return;j("start"),L(0),B(0);const t=E.find(a=>a.id===I)||E[0],s=U(b,_,t.diffLevels);P({quizStarted:!0,quizFinished:!1,activeQuestions:s,currentQuestionIdx:0,selectedOption:null,isAnswerSubmitted:!1,score:0,secondsElapsed:0,hasSwitchedTabs:!1,hintMode:z})},ke=()=>{L(0),B(0),P(t=>({...t,quizStarted:!1,quizFinished:!1,hasSwitchedTabs:!1,currentQuestionIdx:0,selectedOption:null,isAnswerSubmitted:!1,score:0,secondsElapsed:0}));try{localStorage.removeItem("quiz_active_session")}catch{}};f.useEffect(()=>{try{x.quizStarted&&!x.quizFinished?localStorage.setItem("quiz_active_session",JSON.stringify(x)):x.quizFinished&&localStorage.removeItem("quiz_active_session")}catch(t){console.error("Failed to sync quiz session to localStorage",t)}},[x]);const Ne=()=>{if(confirm("Czy na pewno chcesz usunąć całą historię prób na tym urządzeniu? Operacja jest nieodwracalna.")){J([]);try{localStorage.removeItem("quiz_attempts")}catch(t){console.error("Clean local storage failed",t)}}},V=t=>{const s=Math.abs((t.studentName+t.score+t.duration).split("").reduce((g,ve)=>(g=(g<<5)-g+ve.charCodeAt(0),g&g),0)).toString(16).toUpperCase(),a=Math.round(t.score/t.total*100),o=`<!DOCTYPE html>
<html lang="pl">
<head>
  <meta charset="UTF-8">
  <title>Certyfikat Wiedzy - ${t.studentName}</title>
  <style>
    @import url('https://fonts.googleapis.com/css2?family=Cinzel:wght@600;700&family=Inter:wght@400;600;700;800&family=JetBrains+Mono:wght@400;700&display=swap');
    
    @page {
      size: A4 landscape;
      margin: 8mm;
    }

    * {
      box-sizing: border-box;
    }

    body {
      margin: 0;
      padding: 20px;
      background: #090a10;
      color: #e2e8f0;
      font-family: 'Inter', sans-serif;
      display: flex;
      justify-content: center;
      align-items: center;
      min-height: 100vh;
      -webkit-print-color-adjust: exact;
      print-color-adjust: exact;
    }

    .certificate-container {
      width: 850px;
      height: 600px;
      background: radial-gradient(circle at center, #0e1424 0%, #07090f 100%);
      border: 12px double #06b6d4;
      padding: 40px;
      box-sizing: border-box;
      position: relative;
      text-align: center;
      border-radius: 8px;
      box-shadow: 0 25px 50px -12px rgba(0, 0, 0, 0.5);
      overflow: hidden;
    }

    .certificate-container::before {
      content: '';
      position: absolute;
      top: -200px;
      left: -200px;
      width: 400px;
      height: 400px;
      background: rgba(6, 182, 212, 0.03);
      border-radius: 50%;
      filter: blur(50px);
    }
    
    .certificate-container::after {
      content: '';
      position: absolute;
      bottom: -200px;
      right: -200px;
      width: 400px;
      height: 400px;
      background: rgba(99, 102, 241, 0.03);
      border-radius: 50%;
      filter: blur(50px);
    }

    .org-banner {
      font-size: 10px;
      font-family: 'JetBrains Mono', monospace;
      color: #06b6d4;
      letter-spacing: 2px;
      text-transform: uppercase;
    }

    .header-title {
      font-family: 'Cinzel', serif;
      font-size: 32px;
      color: #06b6d4;
      margin-top: 10px;
      margin-bottom: 5px;
      letter-spacing: 3px;
      text-transform: uppercase;
      text-shadow: 0 0 15px rgba(6, 182, 212, 0.4);
    }

    .subtitle {
      font-size: 11px;
      font-family: 'JetBrains Mono', monospace;
      color: #64748b;
      text-transform: uppercase;
      letter-spacing: 4px;
      margin-bottom: 35px;
    }

    .presented-to {
      font-size: 14px;
      color: #94a3b8;
      font-style: italic;
      margin-bottom: 10px;
    }

    .student-name {
      font-size: 38px;
      font-weight: 800;
      color: #ffffff;
      border-bottom: 2px solid #1e293b;
      display: inline-block;
      padding-bottom: 8px;
      margin-bottom: 20px;
      min-width: 400px;
    }

    .cert-text {
      font-size: 15px;
      color: #cbd5e1;
      max-width: 620px;
      margin: 0 auto 30px auto;
      line-height: 1.6;
    }

    .rank-highlight {
      font-size: 18px;
      display: block;
      margin-top: 10px;
      color: #38bdf8;
      font-weight: 700;
    }

    .badge-container {
      display: flex;
      justify-content: space-around;
      align-items: center;
      margin-top: 25px;
      border-top: 1px solid #1e293b;
      padding-top: 25px;
    }

    .stat-item {
      display: flex;
      flex-direction: column;
      align-items: center;
    }

    .stat-val {
      font-family: 'JetBrains Mono', monospace;
      font-size: 18px;
      font-weight: bold;
    }

    .val-score { color: #34d399; }
    .val-percent { color: #60a5fa; }
    .val-integrity-ok { color: #10b981; }
    .val-integrity-warn { color: #f43f5e; }

    .stat-label {
      font-size: 9px;
      color: #64748b;
      text-transform: uppercase;
      margin-top: 5px;
      letter-spacing: 1px;
    }

    .seal {
      width: 90px;
      height: 90px;
      background: radial-gradient(circle, #0e2938 0%, #03141f 100%);
      border: 3px dashed #06b6d4;
      border-radius: 50%;
      display: flex;
      flex-direction: column;
      justify-content: center;
      align-items: center;
      box-shadow: 0 0 15px rgba(6, 182, 212, 0.2);
    }

    .seal-text-main {
      font-size: 8px;
      font-family: 'JetBrains Mono', monospace;
      font-weight: bold;
      color: #06b6d4;
      text-align: center;
    }

    .seal-text-sub {
      color: #f1f5f9;
      font-size: 7px;
      margin-top: 2px;
      font-family: 'JetBrains Mono', monospace;
      font-weight: bold;
    }

    .seal-text-foot {
      font-size: 5px;
      color: #64748b;
      margin-top: 2px;
      font-family: 'JetBrains Mono', monospace;
    }

    .checksum-box {
      position: absolute;
      bottom: 15px;
      left: 15px;
      right: 15px;
      font-family: 'JetBrains Mono', monospace;
      font-size: 9px;
      color: #334155;
      display: flex;
      justify-content: space-between;
    }

    .checksum-box span {
      color: #475569;
    }

    .print-button {
      position: fixed;
      top: 20px;
      right: 20px;
      background: #06b6d4;
      color: #090a10;
      border: none;
      padding: 10px 20px;
      font-weight: bold;
      border-radius: 6px;
      cursor: pointer;
      font-family: 'Inter', sans-serif;
      box-shadow: 0 4px 14px rgba(6, 182, 212, 0.4);
      transition: all 0.2s;
      z-index: 100;
    }

    .print-button:hover {
      background: #22d3ee;
      transform: translateY(-1px);
    }

    /* ========================================================= */
    /* DEDYKOWANE STYLE WYDRUKU I ZAPISU DO PDF (A4 LANDSCAPE)  */
    /* Zapewniają perfekcyjną czytelność na białym papierze/PDF  */
    /* ========================================================= */
    @media print {
      * {
        -webkit-print-color-adjust: exact !important;
        print-color-adjust: exact !important;
      }

      body {
        background: #ffffff !important;
        color: #0f172a !important;
        padding: 0 !important;
        margin: 0 !important;
        min-height: auto !important;
        display: block !important;
      }

      .print-button {
        display: none !important;
      }

      .certificate-container {
        width: 100% !important;
        max-width: 960px !important;
        height: auto !important;
        min-height: 560px !important;
        margin: 0 auto !important;
        background: #ffffff !important;
        border: 8px double #0284c7 !important;
        box-shadow: none !important;
        color: #0f172a !important;
        padding: 35px 40px !important;
        page-break-inside: avoid !important;
        break-inside: avoid !important;
      }

      .certificate-container::before,
      .certificate-container::after {
        display: none !important;
      }

      .org-banner {
        color: #0284c7 !important;
      }

      .header-title {
        color: #0284c7 !important;
        text-shadow: none !important;
      }

      .subtitle {
        color: #475569 !important;
      }

      .presented-to {
        color: #475569 !important;
      }

      .student-name {
        color: #0f172a !important;
        border-bottom: 2px solid #0284c7 !important;
      }

      .cert-text {
        color: #1e293b !important;
      }

      .rank-highlight {
        color: #0369a1 !important;
      }

      .badge-container {
        border-top: 1px solid #cbd5e1 !important;
      }

      .val-score {
        color: #059669 !important;
      }

      .val-percent {
        color: #2563eb !important;
      }

      .val-integrity-ok {
        color: #059669 !important;
      }

      .val-integrity-warn {
        color: #dc2626 !important;
      }

      .stat-label {
        color: #475569 !important;
        font-weight: 600 !important;
      }

      .seal {
        background: #f0f9ff !important;
        border: 2px dashed #0284c7 !important;
        box-shadow: none !important;
      }

      .seal-text-main {
        color: #0284c7 !important;
      }

      .seal-text-sub {
        color: #0f172a !important;
      }

      .seal-text-foot {
        color: #64748b !important;
      }

      .checksum-box {
        color: #64748b !important;
      }

      .checksum-box span {
        color: #334155 !important;
        font-weight: 600 !important;
      }
    }
  </style>
</head>
<body>

  <button class="print-button" onclick="window.print()">🖨️ Drukuj lub Zapisz PDF</button>

  <div class="certificate-container">
    <div class="org-banner">INTERAKTYWNY ATLAS BUDOWY KOMPUTERA</div>
    <div class="header-title">CERTYFIKAT WIEDZY</div>
    <div class="subtitle">Poświadczenie Samodzielności Dydaktycznej</div>

    <div class="presented-to">Niniejszy dokument z dumą poświadcza, że</div>
    <div class="student-name">${t.studentName}</div>

    <div class="cert-text">
      pomyślnie ukończył cykl interaktywnych analiz technicznych i złożył syntetyczny sprawdzian wiedzy z zakresu fizycznej struktury podzespołów, sieci miedzianych oraz światłowodowych uzyskując tytuł: <br>
      <strong class="rank-highlight">${t.rankTitle}</strong>
    </div>

    <div class="badge-container">
      <div class="stat-item">
        <div class="stat-val val-score">${t.score} / ${t.total}</div>
        <div class="stat-label">Wynik punktowy</div>
      </div>

      <div class="seal">
        <div class="seal-text-main">IABK</div>
        <div class="seal-text-sub">STABLE v5.3.0</div>
        <div class="seal-text-foot">INTEGRITY CHECK</div>
      </div>

      <div class="stat-item">
        <div class="stat-val val-percent">${a}%</div>
        <div class="stat-label">Wskaźnik poprawności</div>
      </div>

      <div class="stat-item">
        <div class="stat-val ${t.hasSwitchedTabs?"val-integrity-warn":"val-integrity-ok"}">${t.hasSwitchedTabs?"NIE":"TAK"}</div>
        <div class="stat-label">Test samodzielny</div>
      </div>
    </div>

    <div class="checksum-box">
      <span>METRYKA: CORE_ATLAS_V5.3.0_STABLE</span>
      <span>IDENTYFIKATOR RAPORTU: [IABK-ID-${s}-${t.id.toString(36).toUpperCase()}]</span>
      <span>DATA: ${t.date}</span>
    </div>
  </div>

</body>
</html>`,n=new Blob([o],{type:"text/html;charset=utf-8"}),c=URL.createObjectURL(n),d=document.createElement("a");d.href=c,d.download=`Certyfikat_Quiz_${t.studentName.replace(/\\s+/g,"_")}_${a}pct.html`,d.click(),URL.revokeObjectURL(c)},X=t=>{const s=Math.abs((t.studentName+t.score+t.duration).split("").reduce((d,g)=>(d=(d<<5)-d+g.charCodeAt(0),d&d),0)).toString(16).toUpperCase(),a=`=====================================================
          INTERAKTYWNY ATLAS BUDOWY KOMPUTERA - RAPORT QUIZU
=====================================================
Imię i Nazwisko / ID ucznia: ${t.studentName}
Data zakończenia testu:     ${t.date}
Czas trwania testu:          ${t.duration}
Uzyskany wynik punktowy:     ${t.score} / ${t.total} (${Math.round(t.score/t.total*100)}%)
Uzyskany poziom i ranga:     ${t.rankTitle}
Weryfikacja rzetelności:     ${t.hasSwitchedTabs?"OSTRZEŻENIE: Wykryto zmianę modułów / opuszczenie testu!":"ZALICZONY SAMODZIELNIE (brak opuszczenia modułu)"}

Status weryfikacji danych (RODO/GDPR):
- Dane osobowe przetworzone wyłącznie w lokalnej pamięci podręcznej przeglądarki.
- Brak transmisji danych na zewnętrzne serwery bazodanowe.

Ważna informacja o autentyczności wyniku:
- Wynik testu nie jest kryptograficznie zabezpieczony i może zostać zmieniony lokalnie przez ucznia.
- Niniejszy dokument stanowi wyłącznie pomocnicze podsumowanie dydaktyczne.

Identyfikator raportu (wyłącznie pomocniczy, nie stanowi weryfikacji tożsamości ani zabezpieczenia przed edycją):
[IABK-ID-${s}-${t.id.toString(36).toUpperCase()}]
=====================================================
Autor i Patroni: Interaktywny Atlas Budowy Komputera
Metryka Programu: Core Atlas v5.3.0-STABLE
Darmowy Wolny Model Dydaktyczny dla Szkół i Placówek.
=====================================================`,o=new Blob([a],{type:"text/plain;charset=utf-8"}),n=URL.createObjectURL(o),c=document.createElement("a");c.href=n,c.download=`Raport_Quiz_${t.studentName.replace(/\s+/g,"_")}_${Math.round(t.score/t.total*100)}pct.txt`,c.click(),URL.revokeObjectURL(n)},ee=t=>t<=2?{title:"Kolekcjoner Elektrośmieci 🔌",desc:"Dopiero zaczynasz swoją przygodę ze sprzętem. Nie przejmuj się! Zapoznaj się z naszym interaktywnym modelem 3D i wykonaj montaż w symulatorze.",color:"text-red-400 bg-red-950/20 border-red-500/20"}:t<=4?{title:"Domowy Serwisant 🖥️",desc:"Znasz podstawowe podzespoły i potrafisz odróżnić procesor od dysku. Trochę praktyki i zostaniesz profesjonalistą!",color:"text-amber-400 bg-amber-955/20 border-amber-500/20"}:{title:"Mistrz Overclockingu & Montażu 🚀",desc:"Niewiarygodne! Masz perfekcyjną wiedzę na temat sprzętu komputerowego, okablowania oraz zasad działania komponentów PC.",color:"text-cyan-400 bg-cyan-950/20 border-cyan-500/20 shadow-[0_0_12px_rgba(6,182,212,0.05)]"},M=ee(i);return e.jsxs("div",{className:"max-w-4xl mx-auto space-y-8",id:"quiz-page-container",children:[e.jsx(K,{mode:"wait",children:w?T?e.jsx(D.div,{initial:{opacity:0,scale:.95},animate:{opacity:1,scale:1},className:"space-y-6",children:e.jsxs("div",{className:"bg-[#0F0F12] border border-slate-800/80 rounded-2xl p-6 md:p-8 text-center shadow-2xl relative overflow-hidden",children:[e.jsx("div",{className:"absolute top-0 left-1/2 -translate-x-1/2 w-48 h-48 bg-cyan-500/10 rounded-full blur-3xl pointer-events-none"}),e.jsx("div",{className:"w-16 h-16 rounded-full bg-cyan-500/15 border border-cyan-500/40 flex items-center justify-center mb-5 mx-auto shadow-[0_0_15px_rgba(6,182,212,0.15)]",children:e.jsx(F,{className:"w-8 h-8 text-cyan-400"})}),e.jsx("h1",{className:"text-2xl font-bold text-slate-100",children:"Gratulacje!"}),e.jsx("p",{className:"text-slate-400 text-xs mt-1",children:"Ukończyłeś interaktywny quiz sprzętowy."}),e.jsxs("div",{className:"my-6 grid grid-cols-1 md:grid-cols-12 gap-5 items-stretch",children:[e.jsxs("div",{className:"md:col-span-5 p-4 bg-slate-950/60 border border-slate-800/80 rounded-xl flex flex-col justify-center",children:[e.jsx("span",{className:"text-xs text-slate-500 uppercase tracking-wider font-bold block mb-1",children:"Uzyskany Wynik"}),e.jsxs("span",{className:"text-4xl font-extrabold text-cyan-400 font-mono",children:[i," ",e.jsxs("span",{className:"text-lg text-slate-500 font-normal",children:["/ ",h.length]})]}),e.jsxs("div",{className:"mt-2 flex items-center justify-center text-xs font-bold text-cyan-400 bg-cyan-950/30 border border-cyan-500/20 px-2.5 py-1 rounded-lg self-center",children:["⚡ ",Y," XP"]}),e.jsxs("span",{className:"text-xs text-slate-400 font-mono mt-1",children:["Skuteczność: ",Math.round(i/h.length*100),"%"]}),e.jsxs("p",{className:"text-[10px] text-slate-500 font-mono mt-2 flex items-center justify-center",children:[e.jsx(se,{className:"w-3.5 h-3.5 mr-1"}),"Czas rozwiązania: ",C(y)]})]}),e.jsx("div",{className:`md:col-span-7 p-4 rounded-xl border text-left flex flex-col justify-between ${M.color}`,children:e.jsxs("div",{children:[e.jsxs("span",{className:"text-[10px] uppercase font-bold tracking-widest text-slate-500 flex items-center mb-1",children:[e.jsx($,{className:"w-3.5 h-3.5 mr-1 text-cyan-400 animate-pulse"}),"Twoja Ranga sprzętowa"]}),e.jsx("p",{className:"font-extrabold text-sm uppercase tracking-tight text-white",children:M.title}),e.jsx("p",{className:"text-slate-350 font-normal mt-1.5 text-xs leading-relaxed",children:M.desc})]})})]}),A?e.jsxs("div",{className:"bg-amber-500/10 border border-amber-500/20 rounded-xl p-3.5 text-left flex items-start space-x-2.5 my-4 max-w-2xl mx-auto",children:[e.jsx("span",{className:"text-amber-500 text-sm mt-0.5",children:"⚠️"}),e.jsxs("div",{children:[e.jsx("p",{className:"font-bold text-amber-500 text-xs",children:"Wykryto przełączanie modułów podczas testu"}),e.jsx("p",{className:"text-slate-400 text-[10px] leading-relaxed mt-1",children:"System odnotował, że w trakcie aktywnej sesji quizu przechodziłeś do innych sekcji Atlasu (prawdopodobnie w celu sprawdzenia odpowiedzi). Wygenerowany raport oraz certyfikat zawierają adnotację zabezpieczającą."})]})]}):e.jsxs("div",{className:"bg-emerald-500/10 border border-emerald-500/20 rounded-xl p-3.5 text-left flex items-start space-x-2.5 my-4 max-w-2xl mx-auto",children:[e.jsx("span",{className:"text-emerald-500 text-sm mt-0.5",children:"✓"}),e.jsxs("div",{children:[e.jsx("p",{className:"font-bold text-emerald-400 text-xs",children:"Weryfikacja samodzielności pomyślna"}),e.jsx("p",{className:"text-slate-400 text-[10px] leading-relaxed mt-1",children:"Test został ukończony rzetelnie, bez opuszczania modułu Quizu ani przełączania sekcji. Gratulujemy pełnej, samodzielnej pracy naukowej!"})]})]}),e.jsxs("div",{className:"border border-slate-850 bg-slate-950/80 rounded-xl p-5 md:p-8 text-center relative overflow-hidden text-slate-300 shadow-inner max-w-2xl mx-auto border-double border-4 border-slate-800",children:[e.jsx("div",{className:"absolute inset-0 flex items-center justify-center opacity-[0.015] pointer-events-none select-none",children:e.jsx(F,{className:"w-80 h-80 text-white"})}),e.jsxs("div",{className:"space-y-4",children:[e.jsxs("div",{className:"flex items-center justify-between opacity-80 pb-2 border-b border-slate-900",children:[e.jsx("span",{className:"text-[8px] font-mono tracking-widest text-slate-500 uppercase",children:"AKADEMIA SPRZĘTOWA IABK"}),e.jsxs("span",{className:"text-[8px] font-mono tracking-widest text-cyan-502 uppercase",children:["SERIA: ",Math.abs(N.split("").reduce((t,s)=>(t<<5)-t+s.charCodeAt(0)|0,43101)).toString(16).toUpperCase()]})]}),e.jsx("span",{className:"text-[9px] font-bold text-cyan-400 uppercase tracking-wider font-mono bg-cyan-950/20 border border-cyan-800/15 px-2.5 py-0.5 rounded-full inline-block",children:"CERTYFIKAT ZALICZENIA ATLASU"}),e.jsx("h3",{className:"text-xs text-slate-400 font-medium italic mt-2.5",children:"Niniejszym dokumentem cyfrowej platformy uroczyście oświadcza się, że:"}),e.jsx("h2",{className:"text-lg md:text-xl font-black text-white tracking-wide border-b border-cyan-500/20 pb-1 max-w-sm mx-auto uppercase",children:N.trim()||"Anonimowy Uczeń"}),e.jsx("p",{className:"text-xs text-slate-300 max-w-md mx-auto leading-relaxed pt-1",children:"zakończył z wynikiem pozytywnym cykl interaktywnych analiz technicznych i pomyślnie złożył syntetyczny test wiedzy, uzyskując tytuł dynamiczny:"}),e.jsx("div",{className:"p-2.5 bg-[#0F0F12]/80 border border-slate-850 rounded-lg max-w-xs mx-auto",children:e.jsx("span",{className:"font-bold text-xs text-cyan-400 block uppercase font-mono",children:M.title})}),e.jsxs("div",{className:"grid grid-cols-2 gap-4 pt-6 text-left border-t border-slate-900 mt-6 md:px-8",children:[e.jsxs("div",{className:"space-y-1",children:[e.jsx("span",{className:"text-[8px] text-slate-500 font-mono uppercase block",children:"METRYKA PRÓBY:"}),e.jsxs("p",{className:"text-[10px] text-slate-300 font-semibold font-mono",children:["Wynik: ",i," / ",h.length," pkt"]}),e.jsxs("p",{className:"text-[9px] text-slate-400 font-mono",children:["Czas: ",C(y)]}),e.jsxs("p",{className:"text-[9px] text-slate-400 font-mono",children:["Data: ",new Date().toLocaleDateString("pl-PL")]}),e.jsxs("p",{className:`text-[9px] font-bold font-mono ${A?"text-amber-550/90":"text-emerald-450/90"}`,children:["Samodzielność: ",A?"Ostrzeżenie (odnotowano zmianę modułów)":"PEŁNA WERYFIKACJA"]})]}),e.jsxs("div",{className:"text-right space-y-1 self-end",children:[e.jsx("span",{className:"text-[8px] text-slate-500 font-mono uppercase block",children:"Platforma edukacyjna:"}),e.jsx("p",{className:"text-[10px] text-slate-300 italic font-bold",children:"Interaktywny Atlas Budowy Komputera"}),e.jsx("p",{className:"text-[8.5px] text-emerald-400 font-bold font-mono",children:"Serdeczne gratulacje!"})]})]}),e.jsxs("div",{className:"text-[8px] text-slate-600 font-mono text-center pt-4 opacity-50",children:["Identyfikator certyfikatu (pomocniczy, nie stanowi weryfikacji tożsamości): [IABK-ID-",(N||"Guest").split("").reduce((t,s)=>t+s.charCodeAt(0),1).toString(16).toUpperCase(),"-",i,"-",y,"]"]})]})]}),e.jsxs("div",{className:"mt-8 flex flex-col sm:flex-row items-center justify-center gap-3.5",children:[e.jsxs("button",{onClick:ke,className:"w-full sm:w-auto px-5 py-2.5 bg-slate-800 hover:bg-slate-700 text-slate-200 border border-slate-700 font-bold text-xs rounded-xl flex items-center justify-center space-x-2 transition-all active:scale-95 cursor-pointer hover:text-white",id:"btn-quiz-restart",children:[e.jsx(Pe,{className:"w-4 h-4"}),e.jsx("span",{children:"Wróć do Panelu Startowego"})]}),e.jsxs("button",{onClick:()=>X({id:Date.now(),studentName:N.trim()||"Anonimowy Uczeń",score:i,total:h.length,duration:C(y),date:new Date().toLocaleString("pl-PL"),rankTitle:M.title,hasSwitchedTabs:A}),className:"w-full sm:w-auto px-5 py-2.5 bg-slate-800 hover:bg-slate-750 text-slate-300 border border-slate-700 font-bold text-xs rounded-xl flex items-center justify-center space-x-2 transition-all shadow-sm active:scale-95 cursor-pointer hover:text-white",title:"Pobierz oficjalny plik raportu dydaktycznego do przedłożenia nauczycielowi",id:"btn-quiz-download-report",children:[e.jsx(oe,{className:"w-4 h-4"}),e.jsx("span",{children:"Pobierz Raport (.TXT)"})]}),e.jsxs("button",{onClick:()=>V({id:Date.now(),studentName:N.trim()||"Anonimowy Uczeń",score:i,total:h.length,duration:C(y),date:new Date().toLocaleString("pl-PL"),rankTitle:M.title,hasSwitchedTabs:A}),className:"w-full sm:w-auto px-5 py-2.5 bg-cyan-600 hover:bg-cyan-500 text-slate-950 font-bold text-xs rounded-xl flex items-center justify-center space-x-2 transition-all shadow-md active:scale-95 cursor-pointer text-white",title:"Pobierz piękny, graficzny certyfikat wiedzy w formacie HTML do druku lub zapisu do PDF",id:"btn-quiz-download-cert",children:[e.jsx($,{className:"w-4 h-4"}),e.jsx("span",{children:"Pobierz Certyfikat (.HTML)"})]})]})]})},"quiz-finished-card"):e.jsxs(D.div,{initial:{opacity:0,y:15},animate:{opacity:1,y:0},exit:{opacity:0,scale:.95},className:"bg-[#0F0F12] border border-slate-800/80 rounded-2xl p-6 md:p-8 shadow-2xl relative overflow-hidden",children:[e.jsxs("div",{className:"flex flex-col sm:flex-row justify-between sm:items-center gap-3 text-slate-400 text-xs border-b border-slate-800/80 pb-4 mb-6",children:[e.jsxs("div",{className:"flex flex-wrap items-center gap-2",children:[e.jsxs("span",{className:"font-bold uppercase tracking-wider text-slate-400 flex items-center bg-slate-950 px-2.5 py-1 rounded-md border border-slate-800 self-start text-[10px]",children:[e.jsx(ae,{className:"w-3.5 h-3.5 mr-1 text-cyan-400 animate-pulse"}),u.category," · Poziom ",u.difficulty,"/6"]}),z&&e.jsx("span",{className:"text-[10px] bg-amber-500/10 text-amber-400 font-bold border border-amber-500/20 px-2.5 py-0.5 rounded-md flex items-center shrink-0",children:"💡 Tryb podpowiedzi"}),e.jsxs("span",{className:"text-[10px] bg-cyan-500/10 text-cyan-400 font-bold border border-cyan-500/20 px-2.5 py-0.5 rounded-md flex items-center shrink-0",children:["⚡ ",Y," XP"]}),A&&e.jsx("span",{className:"text-[10px] bg-amber-500/10 text-amber-500 font-bold border border-amber-500/20 px-2.5 py-0.5 rounded-md flex items-center shrink-0",children:"⚠️ Wykryto zmianę modułu"})]}),e.jsxs("div",{className:"flex items-center space-x-4 self-end sm:self-auto font-mono text-xs text-slate-300",children:[e.jsxs("span",{className:"flex items-center text-cyan-400 bg-cyan-950/25 px-2 py-0.5 rounded border border-cyan-800/20 font-bold",children:[e.jsx(se,{className:"w-3.5 h-3.5 mr-1 select-none"}),C(y)]}),e.jsxs("span",{className:"font-semibold",children:["Pytanie ",e.jsx("span",{className:"text-cyan-400 font-bold",children:k+1})," z ",e.jsx("span",{className:"text-slate-200",children:h.length})]})]})]}),e.jsx(K,{mode:"wait",children:e.jsxs(D.div,{initial:{opacity:0,x:25},animate:{opacity:1,x:0},exit:{opacity:0,x:-25},transition:{duration:.22,ease:"easeOut"},children:[e.jsx("h2",{className:"text-base md:text-lg font-bold text-slate-100 leading-relaxed mb-6",children:u.question}),e.jsx("div",{className:"space-y-3.5",children:u.options.map((t,s)=>{const a=m===s,o=u.correctAnswer===s,n=a&&!o,c=z&&!l&&s===$e(u);let d="bg-slate-950/50 border-slate-800/80 text-slate-300 hover:border-slate-700 hover:bg-slate-900/60";return l?o?d="bg-emerald-950/30 border-emerald-500 text-emerald-400 font-semibold shadow-[0_0_10px_rgba(16,185,129,0.05)]":n?d="bg-red-950/30 border-red-500 text-red-400":d="bg-slate-950/40 border-slate-900 text-slate-500 opacity-60":c?d="bg-slate-950/25 border-slate-900 text-slate-500 opacity-40 hover:opacity-60 cursor-pointer":a&&(d="bg-cyan-950/20 border-cyan-500 text-cyan-300 ring-1 ring-cyan-500/30 shadow-[0_0_12px_rgba(6,182,212,0.15)]"),e.jsxs(D.button,{onClick:()=>ye(s),disabled:l,initial:{opacity:0,y:8},animate:{opacity:1,y:0},transition:{duration:.2,delay:s*.04},className:`w-full text-left p-4 rounded-xl border transition-all flex items-start space-x-3.5 ${d} group cursor-pointer`,id:`quiz-option-${s}`,children:[e.jsx("span",{className:`w-6 h-6 rounded-lg border text-xs font-bold font-mono flex items-center justify-center shrink-0 mt-0.5 ${l&&o?"bg-emerald-500 text-slate-950 border-emerald-500":l&&n?"bg-red-500 text-slate-950 border-red-500":a?"bg-cyan-500 text-slate-950 border-cyan-500":c?"bg-slate-950 border-slate-900 text-slate-600 line-through":"bg-slate-900 border-slate-800 text-slate-400 group-hover:bg-slate-800 group-hover:text-slate-200"}`,children:String.fromCharCode(65+s)}),e.jsxs("div",{className:"flex-1 flex items-center justify-between gap-2 pt-0.5",children:[e.jsx("span",{className:`text-xs md:text-sm leading-snug ${c?"line-through text-slate-500":""}`,children:t}),c&&e.jsx("span",{className:"text-[9px] font-mono font-bold bg-amber-950/40 text-amber-400/90 border border-amber-600/30 px-2 py-0.5 rounded shrink-0 not-italic flex items-center space-x-1",children:e.jsx("span",{children:"💡 Odrzucono"})})]})]},s)})})]},k)}),e.jsxs("div",{className:"mt-8 pt-6 border-t border-slate-800/80 flex flex-col space-y-4",children:[e.jsx(K,{children:l&&e.jsxs(D.div,{initial:{opacity:0,height:0},animate:{opacity:1,height:"auto"},className:"bg-slate-950/90 border border-slate-800 rounded-xl p-4 flex items-start space-x-3 text-xs",children:[m===u.correctAnswer?e.jsx(Ie,{className:"w-5 h-5 text-emerald-400 shrink-0 self-start mt-0.5"}):e.jsx(Me,{className:"w-5 h-5 text-red-400 shrink-0 self-start mt-0.5"}),e.jsxs("div",{children:[e.jsx("h4",{className:"font-bold text-slate-200 uppercase tracking-wide text-[10px] mb-1",children:m===u.correctAnswer?e.jsx("span",{className:"text-emerald-400 text-xs font-bold",children:"Doskonała odpowiedź!"}):e.jsxs("span",{className:"text-red-400 text-xs font-bold",children:["Pudło! Poprawna odpowiedź to ",String.fromCharCode(65+u.correctAnswer)]})}),e.jsxs("p",{className:"text-slate-400 leading-relaxed font-sans mt-1.5",children:[e.jsx(te,{className:"w-3.5 h-3.5 text-cyan-400 inline-block mr-1 align-sub shrink-0"}),e.jsx("span",{className:"font-semibold text-slate-300",children:"Ciekawostka / Uzasadnienie:"})," ",u.explanation]}),e.jsxs("div",{className:`mt-3 pt-2.5 border-t ${m===u.correctAnswer?"border-slate-800/60 text-slate-400":"border-red-950 text-slate-300 bg-red-950/20 p-2.5 rounded-lg border border-red-900/30"} flex items-start space-x-2 text-[11px] leading-relaxed`,children:[e.jsx("div",{className:`px-1.5 py-0.5 rounded font-mono text-[9px] uppercase tracking-wider font-bold shrink-0 mt-0.5 ${m===u.correctAnswer?"bg-slate-900 border border-slate-800 text-slate-400":"bg-red-950/60 border border-red-500/35 text-red-400 animate-pulse"}`,children:m===u.correctAnswer?"Referencja":"Gdzie szukać?"}),e.jsx("div",{className:"flex-1",children:m===u.correctAnswer?e.jsxs("span",{children:["To zagadnienie opiera się na wiedzy zawartej w: ",e.jsx("strong",{className:"text-emerald-400/90 font-semibold",children:re(u.id)})]}):e.jsxs("span",{children:["Temat ten oraz poprawną odpowiedź z pełnym opisem technicznym odnajdziesz w sekcji: ",e.jsx("strong",{className:"text-cyan-400 font-bold decoration-cyan-500/20 underline underline-offset-2",children:re(u.id)}),". Zapoznaj się z tym materiałem!"]})})]})]})]})}),e.jsxs("div",{className:"flex justify-between items-center",children:[e.jsxs("span",{className:"text-xs text-slate-500 font-sans",children:["Twój wynik: ",e.jsxs("span",{className:"font-bold text-slate-300",children:[i," pkt"]})]}),l?e.jsxs("button",{onClick:he,className:"px-5 py-2.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-200 border border-slate-700 font-bold text-xs flex items-center space-x-1.5 hover:text-white transition-all active:scale-95 cursor-pointer",id:"btn-quiz-next",children:[e.jsx("span",{children:k+1<h.length?"Następne pytanie":"Zakończ test i zobacz dyplom"}),e.jsx(De,{className:"w-4 h-4"})]}):e.jsx("button",{onClick:be,disabled:m===null,className:`px-5 py-2.5 rounded-xl font-bold text-xs flex items-center space-x-1.5 transition-all ${m!==null?"bg-cyan-600 hover:bg-cyan-500 text-white shadow-lg cursor-pointer active:scale-95":"bg-slate-800 text-slate-500 border border-slate-800 cursor-not-allowed"}`,id:"btn-quiz-submit",children:e.jsx("span",{children:"Zatwierdź odpowiedź"})})]})]})]},"quiz-question-card"):e.jsxs(D.div,{initial:{opacity:0,y:15},animate:{opacity:1,y:0},exit:{opacity:0,y:-15},className:"bg-[#0F0F12] border border-slate-800/80 rounded-2xl p-6 md:p-8 shadow-2xl space-y-6 relative overflow-hidden",children:[e.jsx("div",{className:"absolute top-0 right-0 w-[240px] h-[120px] bg-cyan-500/5 rounded-full blur-2xl pointer-events-none"}),e.jsx("div",{className:"absolute -bottom-12 -left-12 w-[240px] h-[120px] bg-indigo-500/5 rounded-full blur-2xl pointer-events-none"}),e.jsxs("div",{className:"flex items-center space-x-3.5 border-b border-slate-800/80 pb-4",children:[e.jsx("div",{className:"p-2.5 rounded-xl bg-cyan-950/40 border border-cyan-500/30 text-cyan-400",children:e.jsx(F,{className:"w-6 h-6 animate-pulse"})}),e.jsxs("div",{children:[e.jsx("span",{className:"text-[10px] font-mono uppercase tracking-widest text-cyan-405 font-bold",children:"Autocertyfikacja wiedzy"}),e.jsx("h1",{className:"text-lg md:text-xl font-bold text-white tracking-tight",children:"Regulamin i Panel Startowy Testu"})]})]}),e.jsx("p",{className:"text-slate-300 text-xs md:text-sm leading-relaxed",children:"Przed Tobą interaktywny, 6-stopniowy test badający wiedzę o budowie współczesnych urządzeń komputerowych, historii mikroprocesorów oraz fizycznej strukturze warstwowych modeli 3D. Każde pytanie losowane jest z innej kategorii i poziomu trudności."}),e.jsxs("div",{className:"p-4 md:p-5 bg-slate-950/60 border border-slate-800/85 rounded-xl space-y-4",children:[e.jsxs("label",{className:"block text-xs font-bold text-slate-300 uppercase tracking-wider flex items-center",children:[e.jsx(Be,{className:"w-4 h-4 mr-1.5 text-cyan-400"}),"Imię i Nazwisko Ucznia (Opcjonalne)"]}),e.jsx("input",{type:"text",placeholder:"Np. Jan Kowalski, Klasa 1A",value:N,onChange:t=>xe(t.target.value),className:"w-full bg-[#0F0F12] border border-slate-800 rounded-lg px-4 py-2.5 text-xs text-slate-200 placeholder-slate-600 focus:outline-none focus:border-cyan-500/60 focus:ring-1 focus:ring-cyan-500/20"}),e.jsxs("div",{className:"space-y-2 pt-2 text-left",children:[e.jsxs("div",{className:"flex items-center justify-between",children:[e.jsxs("label",{className:"text-xs font-bold text-slate-300 uppercase tracking-wider flex items-center",children:[e.jsx(Te,{className:"w-4 h-4 mr-1.5 text-cyan-400"}),"Wybierz Poziom Trudności i Presety"]}),e.jsx("span",{className:"text-[10px] text-slate-500 font-mono",children:I==="sp"?"Preset Podstawówka (Poziomy 1–2)":I==="medium"?"Poziomy 3–4":I==="hard"?"Poziomy 5–6":"Pełny Egzamin (1–6)"})]}),e.jsx("div",{className:"grid grid-cols-1 sm:grid-cols-2 gap-2.5",children:E.map(t=>{const s=I===t.id,a=t.isPresetSp;return e.jsxs("button",{type:"button",onClick:()=>ze(t.id),className:`p-3 rounded-xl border text-left transition-all cursor-pointer relative overflow-hidden ${s?a?"bg-gradient-to-br from-amber-950/30 via-slate-900 to-cyan-950/30 border-amber-500/80 text-white shadow-[0_0_15px_rgba(245,158,11,0.2)] ring-1 ring-amber-500/40":"bg-cyan-950/25 border-cyan-500 text-white shadow-[0_0_12px_rgba(6,182,212,0.18)] ring-1 ring-cyan-500/30":a?"bg-slate-950/70 border-amber-500/30 text-slate-300 hover:border-amber-500/60 hover:bg-slate-900":"bg-[#0F0F12] border-slate-800 text-slate-400 hover:border-slate-700 hover:text-slate-300"}`,children:[a&&e.jsx("div",{className:"absolute top-2 right-2 flex items-center space-x-1 bg-amber-500/20 text-amber-300 text-[9px] font-mono font-bold px-1.5 py-0.5 rounded border border-amber-500/40 uppercase",children:e.jsx("span",{children:"🎒 Gotowy Preset"})}),e.jsx("span",{className:"text-xs font-bold block pr-20",children:t.title}),e.jsx("span",{className:"text-[10px] text-cyan-400 font-mono block mt-0.5",children:t.badge}),e.jsx("span",{className:"text-[10px] text-slate-400 block mt-1 leading-snug",children:t.desc})]},t.id)})})]}),e.jsxs("div",{className:"space-y-2.5 pt-2 text-left border-t border-slate-800/60 mt-3 pt-3",children:[e.jsxs("div",{className:"flex flex-wrap items-center justify-between gap-2",children:[e.jsxs("label",{className:"text-xs font-bold text-slate-300 uppercase tracking-wider flex items-center",children:[e.jsx(Se,{className:"w-4 h-4 mr-1.5 text-cyan-400"}),"Filtr Kategorii Tematycznych (Wielokrotny Wybór)"]}),e.jsxs("button",{type:"button",onClick:()=>{j("click"),q([...R])},className:"text-[10px] text-cyan-400 hover:text-cyan-300 font-mono underline cursor-pointer",children:["Zaznacz wszystkie (",R.length,")"]})]}),e.jsx("p",{className:"text-[11px] text-slate-400 leading-relaxed",children:"Możesz wybrać jedną lub więcej kategorii. Quiz wylosuje pytania wyłącznie ze zaznaczonych dziedzin:"}),e.jsx("div",{className:"flex flex-wrap gap-2 pt-1",children:R.map(t=>{const s=_.includes(t),a=Ke[t];return e.jsxs("button",{type:"button",onClick:()=>ge(t),className:`px-3 py-2 rounded-xl border text-xs font-medium flex items-center space-x-2 transition-all cursor-pointer ${s?"bg-cyan-950/30 border-cyan-500 text-white shadow-[0_0_12px_rgba(6,182,212,0.18)] ring-1 ring-cyan-500/30 font-semibold":"bg-slate-950/60 border-slate-800 text-slate-400 hover:border-slate-700 hover:text-slate-300"}`,title:a.desc,children:[e.jsx("span",{className:"text-sm",children:a.icon}),e.jsx("span",{children:a.label}),s?e.jsx(Ce,{className:"w-3.5 h-3.5 text-cyan-400 shrink-0"}):e.jsx("span",{className:"w-3.5 h-3.5 text-slate-600 text-center leading-none shrink-0",children:"+"})]},t)})})]}),e.jsx("div",{className:"p-3.5 bg-slate-900/60 border border-slate-800 rounded-xl hover:border-slate-700 transition-colors mt-3",children:e.jsxs("div",{className:"flex items-center justify-between gap-3",children:[e.jsxs("div",{className:"flex items-center space-x-3",children:[e.jsx("div",{className:`p-2 rounded-lg border shrink-0 ${z?"bg-amber-500/10 border-amber-500/40 text-amber-400":"bg-slate-950 border-slate-800 text-slate-500"}`,children:e.jsx(Ae,{className:"w-4 h-4"})}),e.jsxs("div",{children:[e.jsxs("div",{className:"flex items-center space-x-2",children:[e.jsx("span",{className:"text-xs font-bold text-slate-200",children:"Tryb podpowiedzi (Koło ratunkowe)"}),z&&e.jsx("span",{className:"text-[9px] font-mono bg-amber-500/20 text-amber-300 border border-amber-500/30 px-1.5 py-0.2 rounded font-bold uppercase",children:"Włączony"})]}),e.jsx("p",{className:"text-[10px] text-slate-400 mt-0.5 leading-snug",children:"Gdy aktywny, przed wyborem odpowiedzi jedna z błędnych opcji jest wizualnie wyszarzona i wykreślona (odrzucona)."})]})]}),e.jsx("button",{type:"button",role:"switch","aria-checked":z,onClick:()=>{j("click"),pe(!z)},className:`relative inline-flex h-6 w-11 shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out focus:outline-none ${z?"bg-amber-500":"bg-slate-800"}`,children:e.jsx("span",{className:`pointer-events-none inline-block h-5 w-5 transform rounded-full bg-white shadow-lg ring-0 transition duration-200 ease-in-out ${z?"translate-x-5":"translate-x-0"}`})})]})}),e.jsxs("div",{className:"p-3.5 bg-cyan-950/15 border border-cyan-900/30 rounded-lg flex items-start space-x-3 text-xs",children:[e.jsx(Oe,{className:"w-4 h-4 text-cyan-400 shrink-0 mt-0.5"}),e.jsxs("div",{className:"space-y-1",children:[e.jsx("p",{className:"font-bold text-cyan-400 tracking-wide text-[10px] uppercase",children:"🛡️ Oświadczenie o zgodności z RODO / GDPR"}),e.jsxs("p",{className:"text-slate-400 text-[10px] leading-relaxed",children:["Twoje dane są w pełni bezpieczne. Podane w polu powyżej imię i nazwisko przetwarzane jest ",e.jsx("strong",{children:"wyłącznie lokalnie w Twojej przeglądarce internetowej"})," (RAM oraz HTML5 LocalStorage) w celu automatycznego wygenerowania dynamicznego dyplomu po zakończeniu testu. Nasz program ",e.jsx("strong",{children:"nie wysyła, nie gromadzi i nie udostępnia"})," żadnych informacji serwerom zewnętrznym ani bazom danych (Zgodność z art. 6 ust. 1 lit. a RODO)."]})]})]}),e.jsxs("label",{className:"flex items-start space-x-3 p-3 bg-slate-900/70 border border-slate-800 rounded-lg cursor-pointer select-none hover:bg-slate-900 transition-colors",children:[e.jsx("input",{type:"checkbox",id:"quiz-rodo-consent",checked:v,onChange:t=>ue(t.target.checked),className:"mt-0.5 w-4 h-4 rounded border-slate-700 bg-slate-950 text-cyan-500 focus:ring-cyan-500 focus:ring-offset-slate-950 cursor-pointer accent-cyan-500 shrink-0"}),e.jsx("span",{className:"text-xs text-slate-200 leading-snug",children:"Wyrażam zgodę na lokalne przetwarzanie danych osobowych (imię i nazwisko / ID ucznia) w pamięci podręcznej przeglądarki w celu generowania certyfikatu i raportu końcowego."})]}),e.jsxs("div",{className:"p-3.5 bg-amber-950/15 border border-amber-900/30 rounded-lg flex items-start space-x-3 text-xs",children:[e.jsx(te,{className:"w-4 h-4 text-amber-500 shrink-0 mt-0.5"}),e.jsxs("div",{className:"space-y-1",children:[e.jsx("p",{className:"font-bold text-amber-500 tracking-wide text-[10px] uppercase",children:"⚡ WAŻNA INSTRUKCJA DOTYCZĄCA PRZEBIEGU TESTU"}),e.jsxs("p",{className:"text-slate-400 text-[10px] leading-relaxed",children:[e.jsx("strong",{children:"Pamięć Absolutna Sesji:"})," Twoje postępy w quizie są na bieżąco automatycznie zapisywane – przypadkowe przełączenie karty czy nawet odświeżenie strony nie zresetuje Twojego testu!"]}),e.jsxs("p",{className:"text-slate-400 text-[10px] leading-relaxed",children:["⚠️ ",e.jsx("strong",{children:"Weryfikacja Rzetelności Dydaktycznej:"})," Podczas trwania testu nie powinno się przełączać do innych modułów Atlasu (np. w celu wyszukania odpowiedzi). Każde opuszczenie modułu Quizu zostanie automatycznie odnotowane w raporcie końcowym jako ostrzeżenie dla Nauczyciela! Rozwiązuj test w pełni samodzielnie."]})]})]})]}),e.jsxs("button",{onClick:je,disabled:!v,className:`w-full py-3 font-bold rounded-xl flex items-center justify-center space-x-2 shadow-lg transition-all text-xs ${v?"bg-gradient-to-r from-cyan-600 to-cyan-500 hover:from-cyan-500 hover:to-cyan-400 text-white cursor-pointer hover:shadow-cyan-500/10 active:scale-99":"bg-slate-900 border border-slate-800 text-slate-500 cursor-not-allowed opacity-60"}`,id:"quiz-start-button",title:v?"Rozpocznij test wiedzy":"Zaznacz powyższą zgodę RODO, aby odblokować rozpoczęcie testu",children:[e.jsx(ae,{className:`w-4 h-4 ${v?"fill-white animate-bounce":"text-slate-600"}`}),e.jsx("span",{children:v?"ROZPOCZNIJ TEST WIEDZY":"WYMAGANA ZGODA RODO DO STARTU"})]})]},"quiz-landing")}),e.jsxs("div",{className:"bg-[#0F0F12] border border-slate-800/80 rounded-2xl p-5 md:p-6 shadow-xl space-y-5",id:"quiz-history-section",children:[e.jsxs("div",{className:"flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-800/80 pb-4",children:[e.jsxs("div",{className:"flex items-center space-x-2.5",children:[e.jsx("div",{className:"w-8 h-8 rounded-lg bg-indigo-950/40 border border-indigo-500/20 text-indigo-400 flex items-center justify-center",children:e.jsx(Ee,{className:"w-4 h-4"})}),e.jsxs("div",{children:[e.jsx("h3",{className:"font-bold text-slate-100 text-sm",children:"📜 Historia Wyników i Dziennik Dydaktyczny"}),e.jsx("p",{className:"text-[10px] text-slate-500 font-mono",children:"Baza danych prób rozwiązanych na tym stanowisku komputerowym"})]})]}),S.length>0&&e.jsxs("button",{onClick:Ne,className:"text-xs font-mono font-semibold text-red-400 hover:text-red-300 bg-red-950/15 border border-red-900/30 hover:bg-red-950/30 px-3 py-1.5 rounded-lg flex items-center space-x-1.5 transition-colors self-start cursor-pointer transition-all active:scale-95",id:"btn-clear-quiz-history",title:"Usuń wszystkie zapisy",children:[e.jsx(Re,{className:"w-3.5 h-3.5"}),e.jsx("span",{children:"Wyczyść Historię"})]})]}),S.length===0?e.jsxs("div",{className:"text-center py-6 border border-dashed border-slate-850 rounded-xl",children:[e.jsx(We,{className:"w-8 h-8 text-slate-700 mx-auto mb-2"}),e.jsx("p",{className:"text-xs text-slate-500 font-sans",children:"Brak zapisanych wyników w historii. Twoja pierwsza próba pojawi się tutaj."})]}):e.jsxs("div",{className:"space-y-4",children:[e.jsxs("div",{className:"grid grid-cols-2 sm:grid-cols-4 gap-3 bg-slate-950/45 p-3 rounded-lg border border-slate-850 text-center",children:[e.jsxs("div",{children:[e.jsx("span",{className:"text-[9px] text-slate-500 uppercase font-bold block",children:"Próby lekcyjne"}),e.jsx("span",{className:"text-base font-extrabold text-slate-200 font-mono",children:S.length})]}),e.jsxs("div",{className:"border-l border-slate-900",children:[e.jsx("span",{className:"text-[9px] text-slate-500 uppercase font-bold block font-sans",children:"Średni Wynik"}),e.jsxs("span",{className:"text-base font-extrabold text-cyan-404 font-mono",children:[(S.reduce((t,s)=>t+s.score,0)/S.length).toFixed(1)," / 6"]})]}),e.jsxs("div",{className:"border-l border-slate-900",children:[e.jsx("span",{className:"text-[9px] text-slate-500 uppercase font-bold block font-sans",children:"Najlepszy Wynik"}),e.jsxs("span",{className:"text-base font-extrabold text-emerald-400 font-mono",children:[Math.max(...S.map(t=>t.score))," pkt"]})]}),e.jsxs("div",{className:"border-l border-slate-900",children:[e.jsx("span",{className:"text-[9px] text-slate-500 uppercase font-bold block font-sans",children:"Średni Czas"}),e.jsx("span",{className:"text-base font-extrabold text-amber-500 font-mono",children:C(Math.round(S.reduce((t,s)=>{const a=s.duration.split(":");return t+(parseInt(a[0],10)*60+parseInt(a[1],10))},0)/S.length))})]})]}),e.jsx("div",{className:"overflow-x-auto rounded-xl border border-slate-850",children:e.jsxs("table",{className:"w-full text-left border-collapse font-sans text-xs min-w-[500px]",children:[e.jsx("thead",{children:e.jsxs("tr",{className:"bg-slate-950 text-slate-400 border-b border-slate-850 uppercase font-bold text-[9px] tracking-widest",children:[e.jsx("th",{className:"py-2.5 px-4 font-mono",children:"Data i Czas"}),e.jsx("th",{className:"py-2.5 px-4",children:"Imię i Nazwisko / ID Ucznia"}),e.jsx("th",{className:"py-2.5 px-4 text-center",children:"Wynik (pkt)"}),e.jsx("th",{className:"py-2.5 px-4 text-center",children:"Czas testu"}),e.jsx("th",{className:"py-2.5 px-4",children:"Uzyskany Tytuł / Ranga"}),e.jsx("th",{className:"py-2.5 px-4 text-center",children:"Uczciwość"}),e.jsx("th",{className:"py-2.5 px-4 text-center",children:"Eksport"})]})}),e.jsx("tbody",{className:"divide-y divide-slate-850 bg-[#0F0F12]/30",children:S.map((t,s)=>e.jsxs("tr",{className:"hover:bg-slate-950/30 transition-colors",children:[e.jsx("td",{className:"py-3 px-4 font-mono text-slate-400 whitespace-nowrap",children:t.date}),e.jsx("td",{className:"py-3 px-4 font-semibold text-slate-200",children:t.studentName}),e.jsx("td",{className:"py-3 px-4 text-center whitespace-nowrap",children:e.jsxs("span",{className:`px-2 py-0.5 rounded-full text-xs font-bold font-mono ${t.score>=5?"bg-emerald-500/10 text-emerald-400 border border-emerald-500/20":t.score>=3?"bg-amber-500/10 text-amber-400 border border-amber-500/25":"bg-red-500/10 text-red-400 border border-red-500/20"}`,children:[t.score," / ",t.total]})}),e.jsx("td",{className:"py-3 px-4 text-center font-mono text-slate-300",children:t.duration}),e.jsx("td",{className:"py-3 px-4",children:e.jsx("span",{className:"text-slate-200 font-medium",children:t.rankTitle})}),e.jsx("td",{className:"py-3 px-4 text-center whitespace-nowrap",children:t.hasSwitchedTabs?e.jsx("span",{className:"px-2 py-0.5 rounded-full text-[10px] font-bold bg-amber-500/10 text-amber-500 border border-amber-500/20",title:"Wykryto przełączanie modułów",children:"⚠️ Ostrzeżenie"}):e.jsx("span",{className:"px-2 py-0.5 rounded-full text-[10px] font-bold bg-emerald-500/10 text-emerald-400 border border-emerald-500/20",title:"Rozwiązano w pełni samodzielnie",children:"✓ Samodzielny"})}),e.jsx("td",{className:"py-3 px-4 text-center",children:e.jsxs("div",{className:"flex justify-center items-center gap-1.5",children:[e.jsxs("button",{onClick:()=>X(t),className:"p-1 px-2.5 rounded-md bg-slate-950 hover:bg-slate-850 hover:text-slate-200 border border-slate-800 transition-all font-mono font-semibold text-[10px] cursor-pointer inline-flex items-center space-x-1",title:"Pobierz raport w formacie tekstowym .TXT",children:[e.jsx(oe,{className:"w-3 h-3 text-slate-400"}),e.jsx("span",{children:"TXT"})]}),e.jsxs("button",{onClick:()=>V(t),className:"p-1 px-2.5 rounded-md bg-cyan-950/45 hover:bg-cyan-900/50 hover:text-cyan-400 border border-cyan-800/50 hover:border-cyan-500/50 transition-all font-mono font-semibold text-[10px] cursor-pointer inline-flex items-center space-x-1 text-cyan-400",title:"Pobierz certyfikat w formacie graficznym .HTML",children:[e.jsx($,{className:"w-3 h-3 text-cyan-400 animate-pulse"}),e.jsx("span",{children:"Dyplom"})]})]})})]},t.id))})]})})]})]})]})}export{R as ALL_QUIZ_CATEGORIES,Ke as CATEGORY_META,E as DIFFICULTY_PRESETS,ot as default};
