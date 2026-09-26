import{c as D,r as b,Q as L,j as e,a as U,m as I,S as he,I as Y,R as fe}from"./index-BOlRrUyX.js";import{S as we}from"./shield-CyJJ1PIN.js";import{Z as J}from"./zap-BY308hMM.js";import{C as V}from"./clock-DjblrHMO.js";import{C as ze}from"./circle-check-big-DZkNHb3G.js";import{C as ge}from"./circle-x-DmHYhltR.js";import{A as je}from"./arrow-right-CpO4Kg53.js";import{A as _}from"./award-Bc1XDa05.js";import{F as ke}from"./file-text-BwLwfhxq.js";import{T as Ne}from"./trash-2-iU-8_k32.js";/**
 * @license lucide-react v0.546.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const ve=[["path",{d:"M8 2v4",key:"1cmpym"}],["path",{d:"M16 2v4",key:"4m81vk"}],["rect",{width:"18",height:"18",x:"3",y:"4",rx:"2",key:"1hopcy"}],["path",{d:"M3 10h18",key:"8toen8"}]],Se=D("calendar",ve);/**
 * @license lucide-react v0.546.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const Ae=[["path",{d:"M15 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V7Z",key:"1rqfz7"}],["path",{d:"M14 2v4a2 2 0 0 0 2 2h4",key:"tnqrlb"}],["path",{d:"M12 18v-6",key:"17g6i2"}],["path",{d:"m9 15 3 3 3-3",key:"1npd3o"}]],X=D("file-down",Ae);/**
 * @license lucide-react v0.546.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const Te=[["path",{d:"M10 14.66v1.626a2 2 0 0 1-.976 1.696A5 5 0 0 0 7 21.978",key:"1n3hpd"}],["path",{d:"M14 14.66v1.626a2 2 0 0 0 .976 1.696A5 5 0 0 1 17 21.978",key:"rfe1zi"}],["path",{d:"M18 9h1.5a1 1 0 0 0 0-5H18",key:"7xy6bh"}],["path",{d:"M4 22h16",key:"57wxv0"}],["path",{d:"M6 9a6 6 0 0 0 12 0V3a1 1 0 0 0-1-1H7a1 1 0 0 0-1 1z",key:"1mhfuq"}],["path",{d:"M6 9H4.5a1 1 0 0 1 0-5H6",key:"tex48p"}]],W=D("trophy",Te);/**
 * @license lucide-react v0.546.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const Pe=[["path",{d:"m16 11 2 2 4-4",key:"9rsbq5"}],["path",{d:"M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2",key:"1yyitq"}],["circle",{cx:"9",cy:"7",r:"4",key:"nufk8"}]],Ce=D("user-check",Pe),Oe=(h,r)=>r==="all"?h:h.filter(z=>{const o=B(z.id).toLowerCase();return r==="hardware"?o.includes("podzespoły")||o.includes("peryferii")||o.includes("montażu")||o.includes("złącz")||o.includes("komputer")||o.includes("karta")||o.includes("pamięć"):r==="network"?o.includes("sieć")||o.includes("router")||o.includes("switch")||o.includes("światłowód")||o.includes("adresowanie")||o.includes("protokół")||o.includes("brama")||o.includes("mediach"):r==="os"?o.includes("systemy operacyjne")||o.includes("os")||o.includes("jądro")||o.includes("kernel")||o.includes("cli")||o.includes("planista")||o.includes("posix")||o.includes("pliki"):r==="history"?o.includes("historia")||o.includes("ewolucja")||o.includes("generacja")||o.includes("lata")||o.includes("moore"):!0}),R=(h,r="all")=>{const z=[],o=Oe(h,r);for(let f=1;f<=6;f++){let g=o.filter(d=>d.difficulty===f);if(g.length===0&&(g=h.filter(d=>d.difficulty===f)),g.length>0){const d=g[Math.floor(Math.random()*g.length)],u=d.options.map((l,m)=>({text:l,isCorrect:m===d.correctAnswer}));for(let l=u.length-1;l>0;l--){const m=Math.floor(Math.random()*(l+1));[u[l],u[m]]=[u[m],u[l]]}const y=u.map(l=>l.text),j=u.findIndex(l=>l.isCorrect);z.push({...d,options:y,correctAnswer:j===-1?d.correctAnswer:j})}}return z},B=h=>({1:"Model 3D i Podzespoły ➔ Komputer stacjonarny ➔ Szybki dysk SSD M.2 NVMe",2:"Makieta Peryferii ➔ Mysz komputerowa (GUI)",3:"Model 3D i Podzespoły ➔ Komputer stacjonarny ➔ Obudowa (PC Case)",4:"Makieta Peryferii ➔ Słuchawki / Karta dźwiękowa",5:"Makieta Peryferii ➔ Karta graficzna (GPU – poziome porty wideo)",6:"Budowa Sieci WAN/LAN ➔ Urządzenia aktywne: Router",7:"Historia i Ewolucja PC ➔ Generacja II – Tranzystory",8:"Makieta Peryferii ➔ Klawiatura mechaniczna",9:"Model 3D i Podzespoły ➔ Komputer stacjonarny ➔ Pamięć operacyjna RAM (tryb Dual-Channel)",10:"Budowa Sieci WAN/LAN ➔ Słownik sieciowy: Sieć WAN / Internet",11:"Historia i Ewolucja PC ➔ Lata 1980-1990: IBM PC model 5150",12:"Budowa Sieci WAN/LAN ➔ Okablowanie sieciowe ➔ Światłowód",13:"Model 3D i Podzespoły ➔ Komputer stacjonarny ➔ Chłodzenie procesora (Cooler CPU) i pasta termoprzewodząca",14:"Budowa Sieci WAN/LAN ➔ Przełącznik (Switch) vs Router sieciowy",15:"Historia i Ewolucja PC ➔ Generacja I – Lampy Próżniowe (np. ENIAC)",16:"Symulator Montażu PC ➔ Przebieg montażu ➔ Krok 4 (Cooler CPU - Wskazówki eksperta)",17:"Model 3D i Podzespoły ➔ Komputer stacjonarny ➔ Zasilacz (PSU) ➔ Sprawność elektryczna",18:"Model 3D i Podzespoły ➔ Komputer stacjonarny ➔ Procesor (CPU) ➔ Zabezpieczenie termiczne (włącz Tryb Naukowy)",19:"Budowa Sieci WAN/LAN ➔ Architektura i Adresowanie IP oraz brama domyślna",20:"Model 3D i Podzespoły ➔ Komputer stacjonarny ➔ Karta graficzna (GPU) ➔ Rodzaje pamięci i taktowanie",21:"Symulator Montażu PC ➔ Przestrogi w Kroku 1 i 5 o kołkach dystansowych instalowanych w obudowie",22:"Model 3D i Podzespoły ➔ Komputer stacjonarny ➔ Pamięć operacyjna RAM ➔ Technologia XMP i EXPO",23:"Historia i Ewolucja PC ➔ Prorocza teza z 1965 r.: Empiryczne Prawo Moore’a i krzem",24:"Budowa Sieci WAN/LAN ➔ Protokół transportowy bezpołączeniowy UDP",25:"Model 3D i Podzespoły ➔ Wybierz kategorię urządzenia: Tablet",26:"Makieta Peryferii ➔ Urządzenia kontrolne: Gamepad",27:"Model 3D i Podzespoły ➔ Wybierz kategorię urządzenia: Komputer Jednopłytkowy (SBC)",28:"Model 3D i Podzespoły ➔ Komputer Jednopłytkowy (SBC) ➔ Uniwersalne złącze GPIO",29:"Model 3D i Podzespoły ➔ Wybierz kategorię urządzenia: Konsola do gier ➔ Odprowadzanie ciepła APU",30:"Model 3D i Podzespoły ➔ Wybierz kategorię urządzenia: Superkomputer ➔ Bezpośrednie chłodzenie cieczą (DLC)",31:"Historia i Ewolucja PC ➔ Oś Czasu Peryferii ➔ Sekcja Drukarek (Druk igłowy)",32:"Historia i Ewolucja PC ➔ Oś Czasu Peryferii ➔ Sekcja Myszy (Zabrudzenia i regeneracja wałków)",33:"Diagnostyka, Złącza & Media ➔ Baza Wiedzy o Złączach ➔ TOSLINK",34:"Historia i Ewolucja PC ➔ Oś Czasu Peryferii ➔ Sekcja Klawiatur (Przełączniki Halla & Rapid Trigger)",35:"Historia i Ewolucja PC ➔ Oś Czasu Peryferii ➔ Sekcja Monitorów (CRT vs OLED, fizyka i pomiary emisyjności)",36:"Diagnostyka, Złącza & Media ➔ Baza Wiedzy o Mediach Transmisyjnych (Miedź vs Światłowód)",37:"Budowa Sieci WAN/LAN ➔ Interaktywny Analizator Topologii Sieciowych ➔ Topologia Siatki",38:"Budowa Sieci WAN/LAN ➔ Interaktywny Analizator Topologii Sieciowych ➔ Topologia Magistrali",39:"Budowa Sieci WAN/LAN ➔ Interaktywny Analizator Topologii Sieciowych ➔ Topologia Gwiazdy",40:"Systemy Operacyjne (OS) ➔ Rola OS i abstrakcja sprzętowa",41:"Systemy Operacyjne (OS) ➔ Interfejsy ➔ Wiersz poleceń (CLI) vs Graficzny (GUI)",42:"Systemy Operacyjne (OS) ➔ Pierścienie Ochrony CPU ➔ User Space (Ring 3) vs Kernel Space (Ring 0)",43:"Systemy Operacyjne (OS) ➔ Przejścia stanów ➔ Wywołania systemowe (Syscalls)",44:"Systemy Operacyjne (OS) ➔ Architektury Jądra ➔ Jądro Monolityczne vs Mikrojądro (Microkernel)",45:"Systemy Operacyjne (OS) ➔ Systemy Specjalne ➔ Czas Rzeczywisty (RTOS)",46:"Systemy Operacyjne (OS) ➔ Planista CPU ➔ Przełączanie kontekstu (Context Switching)",47:"Systemy Operacyjne (OS) ➔ Planista CPU ➔ Algorytm Round Robin (RR) i kwant czasu",48:"Systemy Operacyjne (OS) ➔ Uprawnienia POSIX ➔ Notacja chmod 755 (rwxr-xr-x)",49:"Systemy Operacyjne (OS) ➔ Konsola i Diagnostyka ➔ Polecenia top / htop i Get-Process",50:"Systemy Operacyjne (OS) ➔ Systemy Plików ➔ Węzły Inode (ext4) oraz Księgowanie (NTFS Journaling)",51:"Systemy Operacyjne (OS) ➔ Systemy Plików ➔ Mechanizm Copy-On-Write (APFS / Btrfs)"})[h]||"Baza Wiedzy programu",Ie=()=>{try{const h=localStorage.getItem("quiz_active_session");if(!h)return null;const r=JSON.parse(h);return!r||typeof r!="object"?null:{quizStarted:!!r.quizStarted,quizFinished:!!r.quizFinished,activeQuestions:Array.isArray(r.activeQuestions)&&r.activeQuestions.length>0?r.activeQuestions:R(L),currentQuestionIdx:typeof r.currentQuestionIdx=="number"?r.currentQuestionIdx:0,selectedOption:r.selectedOption!==void 0&&r.selectedOption!==null?Number(r.selectedOption):null,isAnswerSubmitted:!!r.isAnswerSubmitted,score:typeof r.score=="number"?r.score:0,secondsElapsed:typeof r.secondsElapsed=="number"?r.secondsElapsed:0,hasSwitchedTabs:!!r.hasSwitchedTabs}}catch{return null}};function Fe(){const[h,r]=b.useState(L),[z,o]=b.useState(()=>Ie()||{quizStarted:!1,quizFinished:!1,activeQuestions:R(L),currentQuestionIdx:0,selectedOption:null,isAnswerSubmitted:!1,score:0,secondsElapsed:0,hasSwitchedTabs:!1}),{quizStarted:f,quizFinished:g,activeQuestions:d,currentQuestionIdx:u,selectedOption:y,isAnswerSubmitted:j,score:l,secondsElapsed:m,hasSwitchedTabs:P}=z,T=t=>{o(a=>{const s=typeof t=="function"?t(a):t;return{...a,...s}})},ee=t=>T({quizFinished:t}),te=t=>T(a=>({activeQuestions:typeof t=="function"?t(a.activeQuestions):t})),se=t=>T(a=>({currentQuestionIdx:typeof t=="function"?t(a.currentQuestionIdx):t})),F=t=>T({selectedOption:t}),K=t=>T({isAnswerSubmitted:t}),ae=t=>T(a=>({score:typeof t=="function"?t(a.score):t})),oe=t=>T(a=>({secondsElapsed:typeof t=="function"?t(a.secondsElapsed):t})),re=t=>T({hasSwitchedTabs:t}),[N,ne]=b.useState(()=>{try{return localStorage.getItem("quiz_student_name")||""}catch{return""}}),[v,M]=b.useState("all"),[$,E]=b.useState(0),[ie,q]=b.useState(0),[S,ce]=b.useState(!1),[A,Q]=b.useState(()=>{try{const t=localStorage.getItem("quiz_attempts");return t?JSON.parse(t):[]}catch{return[]}}),p=d[u];b.useEffect(()=>{let t;return f&&!g&&(t=setInterval(()=>{oe(a=>a+1)},1e3)),()=>{t&&clearInterval(t)}},[f,g]),b.useEffect(()=>{const t=()=>{document.hidden&&f&&!g&&re(!0)};return document.addEventListener("visibilitychange",t),()=>{document.removeEventListener("visibilitychange",t)}},[f,g]),b.useEffect(()=>{try{S&&N.trim()?localStorage.setItem("quiz_student_name",N):S||localStorage.removeItem("quiz_student_name")}catch{}},[N,S]),b.useEffect(()=>{(async()=>{try{const a=await fetch("./quiz-questions.json");if(!a.ok)throw new Error(`Failed to fetch quiz questions: ${a.statusText}`);const s=await a.json();Array.isArray(s)&&s.length>0&&(r(s),f||te(R(s)))}catch{}})()},[f]);const k=t=>{try{const a=window.AudioContext||window.webkitAudioContext;if(!a)return;const s=new a;if(t==="correct"){const n=s.createOscillator(),i=s.createGain();n.frequency.setValueAtTime(523.25,s.currentTime),n.frequency.setValueAtTime(659.25,s.currentTime+.1),i.gain.setValueAtTime(.08,s.currentTime),i.gain.exponentialRampToValueAtTime(.01,s.currentTime+.35),n.connect(i),i.connect(s.destination),n.start(),n.stop(s.currentTime+.35)}else if(t==="incorrect"){const n=s.createOscillator(),i=s.createGain();n.type="sawtooth",n.frequency.setValueAtTime(180,s.currentTime),i.gain.setValueAtTime(.1,s.currentTime),i.gain.exponentialRampToValueAtTime(.01,s.currentTime+.3),n.connect(i),i.connect(s.destination),n.start(),n.stop(s.currentTime+.3)}else if(t==="victory")[261.63,329.63,392,523.25].forEach((i,c)=>{const x=s.createOscillator(),w=s.createGain();x.frequency.setValueAtTime(i,s.currentTime+c*.12),w.gain.setValueAtTime(.08,s.currentTime+c*.12),w.gain.exponentialRampToValueAtTime(.001,s.currentTime+c*.12+.25),x.connect(w),w.connect(s.destination),x.start(s.currentTime+c*.12),x.stop(s.currentTime+c*.12+.25)});else if(t==="click"||t==="start"){const n=s.createOscillator(),i=s.createGain();n.frequency.setValueAtTime(t==="start"?600:400,s.currentTime),i.gain.setValueAtTime(.05,s.currentTime),i.gain.exponentialRampToValueAtTime(.001,s.currentTime+.05),n.connect(i),i.connect(s.destination),n.start(),n.stop(s.currentTime+.05)}}catch{}},le=t=>{j||(k("click"),F(t))},de=()=>{if(y===null||j)return;if(K(!0),y===p.correctAnswer){k("correct"),ae(c=>c+1);const a=p.difficulty*100,s=m-ie,n=s<20?(20-s)*5:0,i=a+n;E(c=>c+i)}else k("incorrect")},C=t=>{const a=Math.floor(t/60),s=t%60;return`${a}:${s<10?"0":""}${s}`},xe=()=>{k("click"),F(null),K(!1),u+1<d.length?(se(t=>t+1),q(m)):(k("victory"),ee(!0),pe(l))},pe=t=>{const a=C(m),s=new Date().toLocaleString("pl-PL",{year:"numeric",month:"2-digit",day:"2-digit",hour:"2-digit",minute:"2-digit"}),n=G(t),c=[{id:Date.now(),studentName:N.trim()||"Anonimowy Uczeń",score:t,total:d.length,duration:a,date:s,rankTitle:n.title,hasSwitchedTabs:P},...A];Q(c);try{localStorage.setItem("quiz_attempts",JSON.stringify(c))}catch(x){console.error("Failed to write quiz stats locally",x)}},me=()=>{if(!S)return;k("start"),E(0),q(0);const t=R(h,v);o({quizStarted:!0,quizFinished:!1,activeQuestions:t,currentQuestionIdx:0,selectedOption:null,isAnswerSubmitted:!1,score:0,secondsElapsed:0,hasSwitchedTabs:!1})},ue=()=>{E(0),q(0),o(t=>({...t,quizStarted:!1,quizFinished:!1,hasSwitchedTabs:!1}));try{localStorage.removeItem("quiz_active_session")}catch{}};b.useEffect(()=>{try{z.quizStarted&&!z.quizFinished?localStorage.setItem("quiz_active_session",JSON.stringify(z)):z.quizFinished&&localStorage.removeItem("quiz_active_session")}catch(t){console.error("Failed to sync quiz session to localStorage",t)}},[z]);const ye=()=>{if(confirm("Czy na pewno chcesz usunąć całą historię prób na tym urządzeniu? Operacja jest nieodwracalna.")){Q([]);try{localStorage.removeItem("quiz_attempts")}catch(t){console.error("Clean local storage failed",t)}}},Z=t=>{const a=Math.abs((t.studentName+t.score+t.duration).split("").reduce((w,be)=>(w=(w<<5)-w+be.charCodeAt(0),w&w),0)).toString(16).toUpperCase(),s=Math.round(t.score/t.total*100),n=`<!DOCTYPE html>
<html lang="pl">
<head>
  <meta charset="UTF-8">
  <title>Certyfikat Wiedzy - ${t.studentName}</title>
  <style>
    @import url('https://fonts.googleapis.com/css2?family=Cinzel:wght@600;700&family=Inter:wght@400;600;700;800&family=JetBrains+Mono:wght@400;700&display=swap');
    
    body {
      margin: 0;
      padding: 0;
      background: #090a10;
      color: #e2e8f0;
      font-family: 'Inter', sans-serif;
      display: flex;
      justify-content: center;
      align-items: center;
      min-height: 100vh;
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
      margin-bottom: 40px;
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
      max-width: 600px;
      margin: 0 auto 35px auto;
      line-height: 1.6;
    }

    .cert-text strong {
      color: #06b6d4;
    }

    .badge-container {
      display: flex;
      justify-content: space-around;
      align-items: center;
      margin-top: 30px;
      border-top: 1px solid #1e293b;
      padding-top: 30px;
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
      color: #f1f5f9;
    }

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

    .seal-text {
      font-size: 8px;
      font-family: 'JetBrains Mono', monospace;
      font-weight: bold;
      color: #06b6d4;
      text-align: center;
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
    }

    .print-button:hover {
      background: #22d3ee;
      transform: translateY(-1px);
    }

    @media print {
      .print-button {
        display: none;
      }
      body {
        background: white;
      }
      .certificate-container {
        box-shadow: none;
        border-color: #0284c7;
      }
    }
  </style>
</head>
<body>

  <button class="print-button" onclick="window.print()">🖨️ Drukuj lub Zapisz PDF</button>

  <div class="certificate-container">
    <div style="font-size: 10px; font-family: 'JetBrains Mono', monospace; color: #06b6d4; letter-spacing: 2px;">INTERAKTYWNY ATLAS BUDOWY KOMPUTERA</div>
    <div class="header-title">CERTYFIKAT WIEDZY</div>
    <div class="subtitle">Poświadczenie Samodzielności Dydaktycznej</div>

    <div class="presented-to">Niniejszy dokument z dumą poświadcza, że</div>
    <div class="student-name">${t.studentName}</div>

    <div class="cert-text">
      pomyślnie ukończył cykl interaktywnych analiz technicznych i złożył syntetyczny sprawdzian wiedzy z zakresu fizycznej struktury podzespołów, sieci miedzianych oraz światłowodowych uzyskując tytuł: <br>
      <strong style="font-size: 18px; display: block; margin-top: 10px; color: #38bdf8;">${t.rankTitle}</strong>
    </div>

    <div class="badge-container">
      <div class="stat-item">
        <div class="stat-val" style="color: #34d399;">${t.score} / ${t.total}</div>
        <div class="stat-label">Wynik punktowy</div>
      </div>

      <div class="seal">
        <div class="seal-text">IABK</div>
        <div class="seal-text" style="color: #f1f5f9; font-size: 7px; margin-top: 2px;">STABLE v5.0</div>
        <div class="seal-text" style="font-size: 5px; color: #64748b; margin-top: 2px;">INTEGRITY CHECK</div>
      </div>

      <div class="stat-item">
        <div class="stat-val" style="color: #60a5fa;">${s}%</div>
        <div class="stat-label">Wskaźnik poprawności</div>
      </div>

      <div class="stat-item">
        <div class="stat-val" style="color: #f43f5e;">${t.hasSwitchedTabs?"NIE":"TAK"}</div>
        <div class="stat-label">Test samodzielny</div>
      </div>
    </div>

    <div class="checksum-box">
      <span>METRYKA: CORE_ATLAS_V5.3.0_STABLE</span>
      <span>IDENTYFIKATOR RAPORTU: [IABK-ID-${a}-${t.id.toString(36).toUpperCase()}]</span>
      <span>DATA: ${t.date}</span>
    </div>
  </div>

</body>
</html>`,i=new Blob([n],{type:"text/html;charset=utf-8"}),c=URL.createObjectURL(i),x=document.createElement("a");x.href=c,x.download=`Certyfikat_Quiz_${t.studentName.replace(/\\s+/g,"_")}_${s}pct.html`,x.click(),URL.revokeObjectURL(c)},H=t=>{const a=Math.abs((t.studentName+t.score+t.duration).split("").reduce((x,w)=>(x=(x<<5)-x+w.charCodeAt(0),x&x),0)).toString(16).toUpperCase(),s=`=====================================================
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
[IABK-ID-${a}-${t.id.toString(36).toUpperCase()}]
=====================================================
Autor i Patroni: Interaktywny Atlas Budowy Komputera
Metryka Programu: Core Atlas v5.3.0-STABLE
Darmowy Wolny Model Dydaktyczny dla Szkół i Placówek.
=====================================================`,n=new Blob([s],{type:"text/plain;charset=utf-8"}),i=URL.createObjectURL(n),c=document.createElement("a");c.href=i,c.download=`Raport_Quiz_${t.studentName.replace(/\s+/g,"_")}_${Math.round(t.score/t.total*100)}pct.txt`,c.click(),URL.revokeObjectURL(i)},G=t=>t<=2?{title:"Kolekcjoner Elektrośmieci 🔌",desc:"Dopiero zaczynasz swoją przygodę ze sprzętem. Nie przejmuj się! Zapoznaj się z naszym interaktywnym modelem 3D i wykonaj montaż w symulatorze.",color:"text-red-400 bg-red-950/20 border-red-500/20"}:t<=4?{title:"Domowy Serwisant 🖥️",desc:"Znasz podstawowe podzespoły i potrafisz odróżnić procesor od dysku. Trochę praktyki i zostaniesz profesjonalistą!",color:"text-amber-400 bg-amber-955/20 border-amber-500/20"}:{title:"Mistrz Overclockingu & Montażu 🚀",desc:"Niewiarygodne! Masz perfekcyjną wiedzę na temat sprzętu komputerowego, okablowania oraz zasad działania komponentów PC.",color:"text-cyan-400 bg-cyan-950/20 border-cyan-500/20 shadow-[0_0_12px_rgba(6,182,212,0.05)]"},O=G(l);return e.jsxs("div",{className:"max-w-4xl mx-auto space-y-8",id:"quiz-page-container",children:[e.jsx(U,{mode:"wait",children:f?g?e.jsx(I.div,{initial:{opacity:0,scale:.95},animate:{opacity:1,scale:1},className:"space-y-6",children:e.jsxs("div",{className:"bg-[#0F0F12] border border-slate-800/80 rounded-2xl p-6 md:p-8 text-center shadow-2xl relative overflow-hidden",children:[e.jsx("div",{className:"absolute top-0 left-1/2 -translate-x-1/2 w-48 h-48 bg-cyan-500/10 rounded-full blur-3xl pointer-events-none"}),e.jsx("div",{className:"w-16 h-16 rounded-full bg-cyan-500/15 border border-cyan-500/40 flex items-center justify-center mb-5 mx-auto shadow-[0_0_15px_rgba(6,182,212,0.15)]",children:e.jsx(W,{className:"w-8 h-8 text-cyan-400"})}),e.jsx("h1",{className:"text-2xl font-bold text-slate-100",children:"Gratulacje!"}),e.jsx("p",{className:"text-slate-400 text-xs mt-1",children:"Ukończyłeś interaktywny quiz sprzętowy."}),e.jsxs("div",{className:"my-6 grid grid-cols-1 md:grid-cols-12 gap-5 items-stretch",children:[e.jsxs("div",{className:"md:col-span-5 p-4 bg-slate-950/60 border border-slate-800/80 rounded-xl flex flex-col justify-center",children:[e.jsx("span",{className:"text-xs text-slate-500 uppercase tracking-wider font-bold block mb-1",children:"Uzyskany Wynik"}),e.jsxs("span",{className:"text-4xl font-extrabold text-cyan-400 font-mono",children:[l," ",e.jsxs("span",{className:"text-lg text-slate-500 font-normal",children:["/ ",d.length]})]}),e.jsxs("div",{className:"mt-2 flex items-center justify-center text-xs font-bold text-cyan-400 bg-cyan-950/30 border border-cyan-500/20 px-2.5 py-1 rounded-lg self-center",children:["⚡ ",$," XP"]}),e.jsxs("span",{className:"text-xs text-slate-400 font-mono mt-1",children:["Skuteczność: ",Math.round(l/d.length*100),"%"]}),e.jsxs("p",{className:"text-[10px] text-slate-500 font-mono mt-2 flex items-center justify-center",children:[e.jsx(V,{className:"w-3.5 h-3.5 mr-1"}),"Czas rozwiązania: ",C(m)]})]}),e.jsx("div",{className:`md:col-span-7 p-4 rounded-xl border text-left flex flex-col justify-between ${O.color}`,children:e.jsxs("div",{children:[e.jsxs("span",{className:"text-[10px] uppercase font-bold tracking-widest text-slate-500 flex items-center mb-1",children:[e.jsx(_,{className:"w-3.5 h-3.5 mr-1 text-cyan-400 animate-pulse"}),"Twoja Ranga sprzętowa"]}),e.jsx("p",{className:"font-extrabold text-sm uppercase tracking-tight text-white",children:O.title}),e.jsx("p",{className:"text-slate-350 font-normal mt-1.5 text-xs leading-relaxed",children:O.desc})]})})]}),P?e.jsxs("div",{className:"bg-amber-500/10 border border-amber-500/20 rounded-xl p-3.5 text-left flex items-start space-x-2.5 my-4 max-w-2xl mx-auto",children:[e.jsx("span",{className:"text-amber-500 text-sm mt-0.5",children:"⚠️"}),e.jsxs("div",{children:[e.jsx("p",{className:"font-bold text-amber-500 text-xs",children:"Wykryto przełączanie modułów podczas testu"}),e.jsx("p",{className:"text-slate-400 text-[10px] leading-relaxed mt-1",children:"System odnotował, że w trakcie aktywnej sesji quizu przechodziłeś do innych sekcji Atlasu (prawdopodobnie w celu sprawdzenia odpowiedzi). Wygenerowany raport oraz certyfikat zawierają adnotację zabezpieczającą."})]})]}):e.jsxs("div",{className:"bg-emerald-500/10 border border-emerald-500/20 rounded-xl p-3.5 text-left flex items-start space-x-2.5 my-4 max-w-2xl mx-auto",children:[e.jsx("span",{className:"text-emerald-500 text-sm mt-0.5",children:"✓"}),e.jsxs("div",{children:[e.jsx("p",{className:"font-bold text-emerald-400 text-xs",children:"Weryfikacja samodzielności pomyślna"}),e.jsx("p",{className:"text-slate-400 text-[10px] leading-relaxed mt-1",children:"Test został ukończony rzetelnie, bez opuszczania modułu Quizu ani przełączania sekcji. Gratulujemy pełnej, samodzielnej pracy naukowej!"})]})]}),e.jsxs("div",{className:"border border-slate-850 bg-slate-950/80 rounded-xl p-5 md:p-8 text-center relative overflow-hidden text-slate-300 shadow-inner max-w-2xl mx-auto border-double border-4 border-slate-800",children:[e.jsx("div",{className:"absolute inset-0 flex items-center justify-center opacity-[0.015] pointer-events-none select-none",children:e.jsx(W,{className:"w-80 h-80 text-white"})}),e.jsxs("div",{className:"space-y-4",children:[e.jsxs("div",{className:"flex items-center justify-between opacity-80 pb-2 border-b border-slate-900",children:[e.jsx("span",{className:"text-[8px] font-mono tracking-widest text-slate-500 uppercase",children:"AKADEMIA SPRZĘTOWA IABK"}),e.jsxs("span",{className:"text-[8px] font-mono tracking-widest text-cyan-502 uppercase",children:["SERIA: ",Math.abs(N.split("").reduce((t,a)=>(t<<5)-t+a.charCodeAt(0)|0,43101)).toString(16).toUpperCase()]})]}),e.jsx("span",{className:"text-[9px] font-bold text-cyan-400 uppercase tracking-wider font-mono bg-cyan-950/20 border border-cyan-800/15 px-2.5 py-0.5 rounded-full inline-block",children:"CERTYFIKAT ZALICZENIA ATLASU"}),e.jsx("h3",{className:"text-xs text-slate-400 font-medium italic mt-2.5",children:"Niniejszym dokumentem cyfrowej platformy uroczyście oświadcza się, że:"}),e.jsx("h2",{className:"text-lg md:text-xl font-black text-white tracking-wide border-b border-cyan-500/20 pb-1 max-w-sm mx-auto uppercase",children:N.trim()||"Anonimowy Uczeń"}),e.jsx("p",{className:"text-xs text-slate-300 max-w-md mx-auto leading-relaxed pt-1",children:"zakończył z wynikiem pozytywnym cykl interaktywnych analiz technicznych i pomyślnie złożył syntetyczny test wiedzy, uzyskując tytuł dynamiczny:"}),e.jsx("div",{className:"p-2.5 bg-[#0F0F12]/80 border border-slate-850 rounded-lg max-w-xs mx-auto",children:e.jsx("span",{className:"font-bold text-xs text-cyan-400 block uppercase font-mono",children:O.title})}),e.jsxs("div",{className:"grid grid-cols-2 gap-4 pt-6 text-left border-t border-slate-900 mt-6 md:px-8",children:[e.jsxs("div",{className:"space-y-1",children:[e.jsx("span",{className:"text-[8px] text-slate-500 font-mono uppercase block",children:"METRYKA PRÓBY:"}),e.jsxs("p",{className:"text-[10px] text-slate-300 font-semibold font-mono",children:["Wynik: ",l," / ",d.length," pkt"]}),e.jsxs("p",{className:"text-[9px] text-slate-400 font-mono",children:["Czas: ",C(m)]}),e.jsxs("p",{className:"text-[9px] text-slate-400 font-mono",children:["Data: ",new Date().toLocaleDateString("pl-PL")]}),e.jsxs("p",{className:`text-[9px] font-bold font-mono ${P?"text-amber-550/90":"text-emerald-450/90"}`,children:["Samodzielność: ",P?"Ostrzeżenie (odnotowano zmianę modułów)":"PEŁNA WERYFIKACJA"]})]}),e.jsxs("div",{className:"text-right space-y-1 self-end",children:[e.jsx("span",{className:"text-[8px] text-slate-500 font-mono uppercase block",children:"Platforma edukacyjna:"}),e.jsx("p",{className:"text-[10px] text-slate-300 italic font-bold",children:"Interaktywny Atlas Budowy Komputera"}),e.jsx("p",{className:"text-[8.5px] text-emerald-400 font-bold font-mono",children:"Serdeczne gratulacje!"})]})]}),e.jsxs("div",{className:"text-[8px] text-slate-600 font-mono text-center pt-4 opacity-50",children:["Cyfrowy token autentyczności: [IABK-VERIFY-SECURE-",(N||"Guest").split("").reduce((t,a)=>t+a.charCodeAt(0),1).toString(16).toUpperCase(),"-",l,"-",m,"]"]})]})]}),e.jsxs("div",{className:"mt-8 flex flex-col sm:flex-row items-center justify-center gap-3.5",children:[e.jsxs("button",{onClick:ue,className:"w-full sm:w-auto px-5 py-2.5 bg-slate-800 hover:bg-slate-700 text-slate-200 border border-slate-700 font-bold text-xs rounded-xl flex items-center justify-center space-x-2 transition-all active:scale-95 cursor-pointer hover:text-white",id:"btn-quiz-restart",children:[e.jsx(fe,{className:"w-4 h-4"}),e.jsx("span",{children:"Wróć do Panelu Startowego"})]}),e.jsxs("button",{onClick:()=>H({id:Date.now(),studentName:N.trim()||"Anonimowy Uczeń",score:l,total:d.length,duration:C(m),date:new Date().toLocaleString("pl-PL"),rankTitle:O.title,hasSwitchedTabs:P}),className:"w-full sm:w-auto px-5 py-2.5 bg-slate-800 hover:bg-slate-750 text-slate-300 border border-slate-700 font-bold text-xs rounded-xl flex items-center justify-center space-x-2 transition-all shadow-sm active:scale-95 cursor-pointer hover:text-white",title:"Pobierz oficjalny plik raportu dydaktycznego do przedłożenia nauczycielowi",id:"btn-quiz-download-report",children:[e.jsx(X,{className:"w-4 h-4"}),e.jsx("span",{children:"Pobierz Raport (.TXT)"})]}),e.jsxs("button",{onClick:()=>Z({id:Date.now(),studentName:N.trim()||"Anonimowy Uczeń",score:l,total:d.length,duration:C(m),date:new Date().toLocaleString("pl-PL"),rankTitle:O.title,hasSwitchedTabs:P}),className:"w-full sm:w-auto px-5 py-2.5 bg-cyan-600 hover:bg-cyan-500 text-slate-950 font-bold text-xs rounded-xl flex items-center justify-center space-x-2 transition-all shadow-md active:scale-95 cursor-pointer text-white",title:"Pobierz piękny, graficzny certyfikat wiedzy w formacie HTML do druku lub zapisu do PDF",id:"btn-quiz-download-cert",children:[e.jsx(_,{className:"w-4 h-4"}),e.jsx("span",{children:"Pobierz Certyfikat (.HTML)"})]})]})]})},"quiz-finished-card"):e.jsxs(I.div,{initial:{opacity:0,y:15},animate:{opacity:1,y:0},exit:{opacity:0,scale:.95},className:"bg-[#0F0F12] border border-slate-800/80 rounded-2xl p-6 md:p-8 shadow-2xl relative overflow-hidden",children:[e.jsxs("div",{className:"flex flex-col sm:flex-row justify-between sm:items-center gap-3 text-slate-400 text-xs border-b border-slate-800/80 pb-4 mb-6",children:[e.jsxs("div",{className:"flex flex-wrap items-center gap-2",children:[e.jsxs("span",{className:"font-bold uppercase tracking-wider text-slate-400 flex items-center bg-slate-950 px-2.5 py-1 rounded-md border border-slate-800 self-start text-[10px]",children:[e.jsx(J,{className:"w-3.5 h-3.5 mr-1 text-cyan-400 animate-pulse"}),"Szybki Test: ",v==="all"?"Pełny Mix":v==="hardware"?"Podzespoły":v==="network"?"Sieci":v==="os"?"Systemy Operacyjne":"Historia PC"]}),e.jsxs("span",{className:"text-[10px] bg-cyan-500/10 text-cyan-400 font-bold border border-cyan-500/20 px-2.5 py-0.5 rounded-md flex items-center shrink-0",children:["⚡ ",$," XP"]}),P&&e.jsx("span",{className:"text-[10px] bg-amber-500/10 text-amber-500 font-bold border border-amber-500/20 px-2.5 py-0.5 rounded-md flex items-center shrink-0",children:"⚠️ Wykryto zmianę modułu"})]}),e.jsxs("div",{className:"flex items-center space-x-4 self-end sm:self-auto font-mono text-xs text-slate-300",children:[e.jsxs("span",{className:"flex items-center text-cyan-400 bg-cyan-950/25 px-2 py-0.5 rounded border border-cyan-800/20 font-bold",children:[e.jsx(V,{className:"w-3.5 h-3.5 mr-1 select-none"}),C(m)]}),e.jsxs("span",{className:"font-semibold",children:["Pytanie ",e.jsx("span",{className:"text-cyan-400 font-bold",children:u+1})," z ",e.jsx("span",{className:"text-slate-200",children:d.length})]})]})]}),e.jsx(U,{mode:"wait",children:e.jsxs(I.div,{initial:{opacity:0,x:25},animate:{opacity:1,x:0},exit:{opacity:0,x:-25},transition:{duration:.22,ease:"easeOut"},children:[e.jsx("h2",{className:"text-base md:text-lg font-bold text-slate-100 leading-relaxed mb-6",children:p.question}),e.jsx("div",{className:"space-y-3.5",children:p.options.map((t,a)=>{const s=y===a,n=p.correctAnswer===a,i=s&&!n;let c="bg-slate-950/50 border-slate-800/80 text-slate-300 hover:border-slate-700 hover:bg-slate-900/60";return j?n?c="bg-emerald-950/30 border-emerald-500 text-emerald-400 font-semibold shadow-[0_0_10px_rgba(16,185,129,0.05)]":i?c="bg-red-950/30 border-red-500 text-red-400":c="bg-slate-950/40 border-slate-900 text-slate-500 opacity-60":s&&(c="bg-cyan-950/20 border-cyan-500 text-cyan-300 ring-1 ring-cyan-500/30 shadow-[0_0_12px_rgba(6,182,212,0.15)]"),e.jsxs(I.button,{onClick:()=>le(a),disabled:j,initial:{opacity:0,y:8},animate:{opacity:1,y:0},transition:{duration:.2,delay:a*.04},className:`w-full text-left p-4 rounded-xl border transition-all flex items-start space-x-3.5 ${c} group cursor-pointer`,id:`quiz-option-${a}`,children:[e.jsx("span",{className:`w-6 h-6 rounded-lg border text-xs font-bold font-mono flex items-center justify-center shrink-0 mt-0.5 ${j&&n?"bg-emerald-500 text-slate-950 border-emerald-500":j&&i?"bg-red-500 text-slate-950 border-red-500":s?"bg-cyan-500 text-slate-950 border-cyan-500":"bg-slate-900 border-slate-800 text-slate-400 group-hover:bg-slate-800 group-hover:text-slate-200"}`,children:String.fromCharCode(65+a)}),e.jsx("span",{className:"text-xs md:text-sm pt-0.5 leading-snug",children:t})]},a)})})]},u)}),e.jsxs("div",{className:"mt-8 pt-6 border-t border-slate-800/80 flex flex-col space-y-4",children:[e.jsx(U,{children:j&&e.jsxs(I.div,{initial:{opacity:0,height:0},animate:{opacity:1,height:"auto"},className:"bg-slate-950/90 border border-slate-800 rounded-xl p-4 flex items-start space-x-3 text-xs",children:[y===p.correctAnswer?e.jsx(ze,{className:"w-5 h-5 text-emerald-400 shrink-0 self-start mt-0.5"}):e.jsx(ge,{className:"w-5 h-5 text-red-400 shrink-0 self-start mt-0.5"}),e.jsxs("div",{children:[e.jsx("h4",{className:"font-bold text-slate-200 uppercase tracking-wide text-[10px] mb-1",children:y===p.correctAnswer?e.jsx("span",{className:"text-emerald-400 text-xs font-bold",children:"Doskonała odpowiedź!"}):e.jsxs("span",{className:"text-red-400 text-xs font-bold",children:["Pudło! Poprawna odpowiedź to ",String.fromCharCode(65+p.correctAnswer)]})}),e.jsxs("p",{className:"text-slate-400 leading-relaxed font-sans mt-1.5",children:[e.jsx(Y,{className:"w-3.5 h-3.5 text-cyan-400 inline-block mr-1 align-sub shrink-0"}),e.jsx("span",{className:"font-semibold text-slate-300",children:"Ciekawostka / Uzasadnienie:"})," ",p.explanation]}),e.jsxs("div",{className:`mt-3 pt-2.5 border-t ${y===p.correctAnswer?"border-slate-800/60 text-slate-400":"border-red-950 text-slate-300 bg-red-950/20 p-2.5 rounded-lg border border-red-900/30"} flex items-start space-x-2 text-[11px] leading-relaxed`,children:[e.jsx("div",{className:`px-1.5 py-0.5 rounded font-mono text-[9px] uppercase tracking-wider font-bold shrink-0 mt-0.5 ${y===p.correctAnswer?"bg-slate-900 border border-slate-800 text-slate-400":"bg-red-950/60 border border-red-500/35 text-red-400 animate-pulse"}`,children:y===p.correctAnswer?"Referencja":"Gdzie szukać?"}),e.jsx("div",{className:"flex-1",children:y===p.correctAnswer?e.jsxs("span",{children:["To zagadnienie opiera się na wiedzy zawartej w: ",e.jsx("strong",{className:"text-emerald-400/90 font-semibold",children:B(p.id)})]}):e.jsxs("span",{children:["Temat ten oraz poprawną odpowiedź z pełnym opisem technicznym odnajdziesz w sekcji: ",e.jsx("strong",{className:"text-cyan-400 font-bold decoration-cyan-500/20 underline underline-offset-2",children:B(p.id)}),". Zapoznaj się z tym materiałem!"]})})]})]})]})}),e.jsxs("div",{className:"flex justify-between items-center",children:[e.jsxs("span",{className:"text-xs text-slate-500 font-sans",children:["Twój wynik: ",e.jsxs("span",{className:"font-bold text-slate-300",children:[l," pkt"]})]}),j?e.jsxs("button",{onClick:xe,className:"px-5 py-2.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-200 border border-slate-700 font-bold text-xs flex items-center space-x-1.5 hover:text-white transition-all active:scale-95 cursor-pointer",id:"btn-quiz-next",children:[e.jsx("span",{children:u+1<d.length?"Następne pytanie":"Zakończ test i zobacz dyplom"}),e.jsx(je,{className:"w-4 h-4"})]}):e.jsx("button",{onClick:de,disabled:y===null,className:`px-5 py-2.5 rounded-xl font-bold text-xs flex items-center space-x-1.5 transition-all ${y!==null?"bg-cyan-600 hover:bg-cyan-500 text-white shadow-lg cursor-pointer active:scale-95":"bg-slate-800 text-slate-500 border border-slate-800 cursor-not-allowed"}`,id:"btn-quiz-submit",children:e.jsx("span",{children:"Zatwierdź odpowiedź"})})]})]})]},"quiz-question-card"):e.jsxs(I.div,{initial:{opacity:0,y:15},animate:{opacity:1,y:0},exit:{opacity:0,y:-15},className:"bg-[#0F0F12] border border-slate-800/80 rounded-2xl p-6 md:p-8 shadow-2xl space-y-6 relative overflow-hidden",children:[e.jsx("div",{className:"absolute top-0 right-0 w-[240px] h-[120px] bg-cyan-500/5 rounded-full blur-2xl pointer-events-none"}),e.jsx("div",{className:"absolute -bottom-12 -left-12 w-[240px] h-[120px] bg-indigo-500/5 rounded-full blur-2xl pointer-events-none"}),e.jsxs("div",{className:"flex items-center space-x-3.5 border-b border-slate-800/80 pb-4",children:[e.jsx("div",{className:"p-2.5 rounded-xl bg-cyan-950/40 border border-cyan-500/30 text-cyan-400",children:e.jsx(W,{className:"w-6 h-6 animate-pulse"})}),e.jsxs("div",{children:[e.jsx("span",{className:"text-[10px] font-mono uppercase tracking-widest text-cyan-405 font-bold",children:"Autocertyfikacja wiedzy"}),e.jsx("h1",{className:"text-lg md:text-xl font-bold text-white tracking-tight",children:"Regulamin i Panel Startowy Testu"})]})]}),e.jsx("p",{className:"text-slate-300 text-xs md:text-sm leading-relaxed",children:"Przed Tobą interaktywny, 6-stopniowy test badający wiedzę o budowie współczesnych urządzeń komputerowych, historii mikroprocesorów oraz fizycznej strukturze warstwowych modeli 3D. Każde pytanie losowane jest z innej kategorii i poziomu trudności."}),e.jsxs("div",{className:"p-4 md:p-5 bg-slate-950/60 border border-slate-800/85 rounded-xl space-y-4",children:[e.jsxs("label",{className:"block text-xs font-bold text-slate-300 uppercase tracking-wider flex items-center",children:[e.jsx(Ce,{className:"w-4 h-4 mr-1.5 text-cyan-400"}),"Imię i Nazwisko Ucznia (Opcjonalne)"]}),e.jsx("input",{type:"text",placeholder:"Np. Jan Kowalski, Klasa 1A",value:N,onChange:t=>ne(t.target.value),className:"w-full bg-[#0F0F12] border border-slate-800 rounded-lg px-4 py-2.5 text-xs text-slate-200 placeholder-slate-600 focus:outline-none focus:border-cyan-500/60 focus:ring-1 focus:ring-cyan-500/20"}),e.jsxs("div",{className:"space-y-2 pt-2 text-left",children:[e.jsxs("label",{className:"block text-xs font-bold text-slate-300 uppercase tracking-wider flex items-center",children:[e.jsx(he,{className:"w-4 h-4 mr-1.5 text-cyan-405"}),"Wybierz Zakres / Zestaw Pytań"]}),e.jsxs("div",{className:"grid grid-cols-1 md:grid-cols-2 gap-2",children:[e.jsxs("button",{type:"button",onClick:()=>{M("all"),k("click")},className:`p-3 rounded-xl border text-left transition-all cursor-pointer ${v==="all"?"bg-cyan-950/20 border-cyan-500 text-white shadow-[0_0_10px_rgba(6,182,212,0.15)]":"bg-[#0F0F12] border-slate-800 text-slate-450 hover:border-slate-700"}`,children:[e.jsx("span",{className:"text-xs font-bold block",children:"🌌 Pełny Mix Pytań"}),e.jsx("span",{className:"text-[10px] text-slate-500 block mt-0.5",children:"Wszystkie kategorie z bazy wiedzy"})]}),e.jsxs("button",{type:"button",onClick:()=>{M("hardware"),k("click")},className:`p-3 rounded-xl border text-left transition-all cursor-pointer ${v==="hardware"?"bg-cyan-950/20 border-cyan-500 text-white shadow-[0_0_10px_rgba(6,182,212,0.15)]":"bg-[#0F0F12] border-slate-800 text-slate-455 hover:border-slate-700"}`,children:[e.jsx("span",{className:"text-xs font-bold block",children:"⚙️ Podzespoły i Hardware"}),e.jsx("span",{className:"text-[10px] text-slate-500 block mt-0.5",children:"Budowa PC, złącza i peryferia"})]}),e.jsxs("button",{type:"button",onClick:()=>{M("network"),k("click")},className:`p-3 rounded-xl border text-left transition-all cursor-pointer ${v==="network"?"bg-cyan-950/20 border-cyan-500 text-white shadow-[0_0_10px_rgba(6,182,212,0.15)]":"bg-[#0F0F12] border-slate-800 text-slate-455 hover:border-slate-700"}`,children:[e.jsx("span",{className:"text-xs font-bold block",children:"🌐 Sieci WAN/LAN i Media"}),e.jsx("span",{className:"text-[10px] text-slate-500 block mt-0.5",children:"Okablowanie, IP, routery i światłowód"})]}),e.jsxs("button",{type:"button",onClick:()=>{M("os"),k("click")},className:`p-3 rounded-xl border text-left transition-all cursor-pointer ${v==="os"?"bg-cyan-950/20 border-cyan-500 text-white shadow-[0_0_10px_rgba(6,182,212,0.15)]":"bg-[#0F0F12] border-slate-800 text-slate-455 hover:border-slate-700"}`,children:[e.jsx("span",{className:"text-xs font-bold block",children:"🖥️ Systemy Operacyjne (OS)"}),e.jsx("span",{className:"text-[10px] text-slate-500 block mt-0.5",children:"Jądro Ring 0, planista CPU, CLI i systemy plików"})]}),e.jsxs("button",{type:"button",onClick:()=>{M("history"),k("click")},className:`p-3 rounded-xl border text-left transition-all cursor-pointer ${v==="history"?"bg-cyan-950/20 border-cyan-500 text-white shadow-[0_0_10px_rgba(6,182,212,0.15)]":"bg-[#0F0F12] border-slate-800 text-slate-455 hover:border-slate-700"}`,children:[e.jsx("span",{className:"text-xs font-bold block",children:"📜 Historia i Ewolucja PC"}),e.jsx("span",{className:"text-[10px] text-slate-500 block mt-0.5",children:"Generacje maszyn, ENIAC, prawo Moore'a"})]})]})]}),e.jsxs("div",{className:"p-3.5 bg-cyan-950/15 border border-cyan-900/30 rounded-lg flex items-start space-x-3 text-xs",children:[e.jsx(we,{className:"w-4 h-4 text-cyan-400 shrink-0 mt-0.5"}),e.jsxs("div",{className:"space-y-1",children:[e.jsx("p",{className:"font-bold text-cyan-400 tracking-wide text-[10px] uppercase",children:"🛡️ Oświadczenie o zgodności z RODO / GDPR"}),e.jsxs("p",{className:"text-slate-400 text-[10px] leading-relaxed",children:["Twoje dane są w pełni bezpieczne. Podane w polu powyżej imię i nazwisko przetwarzane jest ",e.jsx("strong",{children:"wyłącznie lokalnie w Twojej przeglądarce internetowej"})," (RAM oraz HTML5 LocalStorage) w celu automatycznego wygenerowania dynamicznego dyplomu po zakończeniu testu. Nasz program ",e.jsx("strong",{children:"nie wysyła, nie gromadzi i nie udostępnia"})," żadnych informacji serwerom zewnętrznym ani bazom danych (Zgodność z art. 6 ust. 1 lit. a RODO)."]})]})]}),e.jsxs("label",{className:"flex items-start space-x-3 p-3 bg-slate-900/70 border border-slate-800 rounded-lg cursor-pointer select-none hover:bg-slate-900 transition-colors",children:[e.jsx("input",{type:"checkbox",id:"quiz-rodo-consent",checked:S,onChange:t=>ce(t.target.checked),className:"mt-0.5 w-4 h-4 rounded border-slate-700 bg-slate-950 text-cyan-500 focus:ring-cyan-500 focus:ring-offset-slate-950 cursor-pointer accent-cyan-500 shrink-0"}),e.jsx("span",{className:"text-xs text-slate-200 leading-snug",children:"Wyrażam zgodę na lokalne przetwarzanie danych osobowych (imię i nazwisko / ID ucznia) w pamięci podręcznej przeglądarki w celu generowania certyfikatu i raportu końcowego."})]}),e.jsxs("div",{className:"p-3.5 bg-amber-950/15 border border-amber-900/30 rounded-lg flex items-start space-x-3 text-xs",children:[e.jsx(Y,{className:"w-4 h-4 text-amber-500 shrink-0 mt-0.5"}),e.jsxs("div",{className:"space-y-1",children:[e.jsx("p",{className:"font-bold text-amber-500 tracking-wide text-[10px] uppercase",children:"⚡ WAŻNA INSTRUKCJA DOTYCZĄCA PRZEBIEGU TESTU"}),e.jsxs("p",{className:"text-slate-400 text-[10px] leading-relaxed",children:[e.jsx("strong",{children:"Pamięć Absolutna Sesji:"})," Twoje postępy w quizie są na bieżąco automatycznie zapisywane – przypadkowe przełączenie karty czy nawet odświeżenie strony nie zresetuje Twojego testu!"]}),e.jsxs("p",{className:"text-slate-400 text-[10px] leading-relaxed",children:["⚠️ ",e.jsx("strong",{children:"Weryfikacja Rzetelności Dydaktycznej:"})," Podczas trwania testu nie powinno się przełączać do innych modułów Atlasu (np. w celu wyszukania odpowiedzi). Każde opuszczenie modułu Quizu zostanie automatycznie odnotowane w raporcie końcowym jako ostrzeżenie dla Nauczyciela! Rozwiązuj test w pełni samodzielnie."]})]})]})]}),e.jsxs("button",{onClick:me,disabled:!S,className:`w-full py-3 font-bold rounded-xl flex items-center justify-center space-x-2 shadow-lg transition-all text-xs ${S?"bg-gradient-to-r from-cyan-600 to-cyan-500 hover:from-cyan-500 hover:to-cyan-400 text-white cursor-pointer hover:shadow-cyan-500/10 active:scale-99":"bg-slate-900 border border-slate-800 text-slate-500 cursor-not-allowed opacity-60"}`,id:"quiz-start-button",title:S?"Rozpocznij test wiedzy":"Zaznacz powyższą zgodę RODO, aby odblokować rozpoczęcie testu",children:[e.jsx(J,{className:`w-4 h-4 ${S?"fill-white animate-bounce":"text-slate-600"}`}),e.jsx("span",{children:S?"ROZPOCZNIJ TEST WIEDZY":"WYMAGANA ZGODA RODO DO STARTU"})]})]},"quiz-landing")}),e.jsxs("div",{className:"bg-[#0F0F12] border border-slate-800/80 rounded-2xl p-5 md:p-6 shadow-xl space-y-5",id:"quiz-history-section",children:[e.jsxs("div",{className:"flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-800/80 pb-4",children:[e.jsxs("div",{className:"flex items-center space-x-2.5",children:[e.jsx("div",{className:"w-8 h-8 rounded-lg bg-indigo-950/40 border border-indigo-500/20 text-indigo-400 flex items-center justify-center",children:e.jsx(ke,{className:"w-4 h-4"})}),e.jsxs("div",{children:[e.jsx("h3",{className:"font-bold text-slate-100 text-sm",children:"📜 Historia Wyników i Dziennik Dydaktyczny"}),e.jsx("p",{className:"text-[10px] text-slate-500 font-mono",children:"Baza danych prób rozwiązanych na tym stanowisku komputerowym"})]})]}),A.length>0&&e.jsxs("button",{onClick:ye,className:"text-xs font-mono font-semibold text-red-400 hover:text-red-300 bg-red-950/15 border border-red-900/30 hover:bg-red-950/30 px-3 py-1.5 rounded-lg flex items-center space-x-1.5 transition-colors self-start cursor-pointer transition-all active:scale-95",id:"btn-clear-quiz-history",title:"Usuń wszystkie zapisy",children:[e.jsx(Ne,{className:"w-3.5 h-3.5"}),e.jsx("span",{children:"Wyczyść Historię"})]})]}),A.length===0?e.jsxs("div",{className:"text-center py-6 border border-dashed border-slate-850 rounded-xl",children:[e.jsx(Se,{className:"w-8 h-8 text-slate-700 mx-auto mb-2"}),e.jsx("p",{className:"text-xs text-slate-500 font-sans",children:"Brak zapisanych wyników w historii. Twoja pierwsza próba pojawi się tutaj."})]}):e.jsxs("div",{className:"space-y-4",children:[e.jsxs("div",{className:"grid grid-cols-2 sm:grid-cols-4 gap-3 bg-slate-950/45 p-3 rounded-lg border border-slate-850 text-center",children:[e.jsxs("div",{children:[e.jsx("span",{className:"text-[9px] text-slate-500 uppercase font-bold block",children:"Próby lekcyjne"}),e.jsx("span",{className:"text-base font-extrabold text-slate-200 font-mono",children:A.length})]}),e.jsxs("div",{className:"border-l border-slate-900",children:[e.jsx("span",{className:"text-[9px] text-slate-500 uppercase font-bold block font-sans",children:"Średni Wynik"}),e.jsxs("span",{className:"text-base font-extrabold text-cyan-404 font-mono",children:[(A.reduce((t,a)=>t+a.score,0)/A.length).toFixed(1)," / 6"]})]}),e.jsxs("div",{className:"border-l border-slate-900",children:[e.jsx("span",{className:"text-[9px] text-slate-500 uppercase font-bold block font-sans",children:"Najlepszy Wynik"}),e.jsxs("span",{className:"text-base font-extrabold text-emerald-400 font-mono",children:[Math.max(...A.map(t=>t.score))," pkt"]})]}),e.jsxs("div",{className:"border-l border-slate-900",children:[e.jsx("span",{className:"text-[9px] text-slate-500 uppercase font-bold block font-sans",children:"Średni Czas"}),e.jsx("span",{className:"text-base font-extrabold text-amber-500 font-mono",children:C(Math.round(A.reduce((t,a)=>{const s=a.duration.split(":");return t+(parseInt(s[0],10)*60+parseInt(s[1],10))},0)/A.length))})]})]}),e.jsx("div",{className:"overflow-x-auto rounded-xl border border-slate-850",children:e.jsxs("table",{className:"w-full text-left border-collapse font-sans text-xs min-w-[500px]",children:[e.jsx("thead",{children:e.jsxs("tr",{className:"bg-slate-950 text-slate-400 border-b border-slate-850 uppercase font-bold text-[9px] tracking-widest",children:[e.jsx("th",{className:"py-2.5 px-4 font-mono",children:"Data i Czas"}),e.jsx("th",{className:"py-2.5 px-4",children:"Imię i Nazwisko / ID Ucznia"}),e.jsx("th",{className:"py-2.5 px-4 text-center",children:"Wynik (pkt)"}),e.jsx("th",{className:"py-2.5 px-4 text-center",children:"Czas testu"}),e.jsx("th",{className:"py-2.5 px-4",children:"Uzyskany Tytuł / Ranga"}),e.jsx("th",{className:"py-2.5 px-4 text-center",children:"Uczciwość"}),e.jsx("th",{className:"py-2.5 px-4 text-center",children:"Eksport"})]})}),e.jsx("tbody",{className:"divide-y divide-slate-850 bg-[#0F0F12]/30",children:A.map((t,a)=>e.jsxs("tr",{className:"hover:bg-slate-950/30 transition-colors",children:[e.jsx("td",{className:"py-3 px-4 font-mono text-slate-400 whitespace-nowrap",children:t.date}),e.jsx("td",{className:"py-3 px-4 font-semibold text-slate-200",children:t.studentName}),e.jsx("td",{className:"py-3 px-4 text-center whitespace-nowrap",children:e.jsxs("span",{className:`px-2 py-0.5 rounded-full text-xs font-bold font-mono ${t.score>=5?"bg-emerald-500/10 text-emerald-400 border border-emerald-500/20":t.score>=3?"bg-amber-500/10 text-amber-400 border border-amber-500/25":"bg-red-500/10 text-red-400 border border-red-500/20"}`,children:[t.score," / ",t.total]})}),e.jsx("td",{className:"py-3 px-4 text-center font-mono text-slate-300",children:t.duration}),e.jsx("td",{className:"py-3 px-4",children:e.jsx("span",{className:"text-slate-200 font-medium",children:t.rankTitle})}),e.jsx("td",{className:"py-3 px-4 text-center whitespace-nowrap",children:t.hasSwitchedTabs?e.jsx("span",{className:"px-2 py-0.5 rounded-full text-[10px] font-bold bg-amber-500/10 text-amber-500 border border-amber-500/20",title:"Wykryto przełączanie modułów",children:"⚠️ Ostrzeżenie"}):e.jsx("span",{className:"px-2 py-0.5 rounded-full text-[10px] font-bold bg-emerald-500/10 text-emerald-400 border border-emerald-500/20",title:"Rozwiązano w pełni samodzielnie",children:"✓ Samodzielny"})}),e.jsx("td",{className:"py-3 px-4 text-center",children:e.jsxs("div",{className:"flex justify-center items-center gap-1.5",children:[e.jsxs("button",{onClick:()=>H(t),className:"p-1 px-2.5 rounded-md bg-slate-950 hover:bg-slate-850 hover:text-slate-200 border border-slate-800 transition-all font-mono font-semibold text-[10px] cursor-pointer inline-flex items-center space-x-1",title:"Pobierz raport w formacie tekstowym .TXT",children:[e.jsx(X,{className:"w-3 h-3 text-slate-400"}),e.jsx("span",{children:"TXT"})]}),e.jsxs("button",{onClick:()=>Z(t),className:"p-1 px-2.5 rounded-md bg-cyan-950/45 hover:bg-cyan-900/50 hover:text-cyan-400 border border-cyan-800/50 hover:border-cyan-500/50 transition-all font-mono font-semibold text-[10px] cursor-pointer inline-flex items-center space-x-1 text-cyan-400",title:"Pobierz certyfikat w formacie graficznym .HTML",children:[e.jsx(_,{className:"w-3 h-3 text-cyan-400 animate-pulse"}),e.jsx("span",{children:"Dyplom"})]})]})})]},t.id))})]})})]})]})]})}export{Fe as default};
