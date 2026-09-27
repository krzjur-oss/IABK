/**
 * @file NetworkSecuritySection.tsx
 * @description Moduł dydaktyczny "Bezpieczeństwo w sieci" w ramach zakładki Sieci Teleinformatycznych.
 * Zawiera materiały edukacyjne dostosowane do poziomu Szkoły Podstawowej (SP) oraz Ponadpodstawowej.
 */

import React, { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import {
  Shield,
  ShieldAlert,
  ShieldCheck,
  Lock,
  Unlock,
  Key,
  KeyRound,
  AlertTriangle,
  HelpCircle,
  PhoneCall,
  CheckCircle2,
  XCircle,
  Eye,
  EyeOff,
  UserX,
  MessageSquareWarning,
  Sparkles,
  Server,
  Wifi,
  Globe,
  Radio,
  FileCheck,
  ChevronDown,
  ChevronUp,
  Cpu,
  Layers,
  Sliders,
  ExternalLink,
  Info,
  Check,
  Smartphone,
  Mail,
  Zap,
  BookmarkCheck
} from "lucide-react";

export type SecurityLevel = "SP" | "ponadpodstawowa";

export interface SecurityTopic {
  id: string;
  level: SecurityLevel;
  category: "netykieta" | "phishing" | "cyberprzemoc" | "szyfrowanie" | "vpn" | "firewall_vlan";
  title: string;
  subtitle: string;
  summary: string;
  icon: React.ElementType;
  colorHex: string;
  badge: string;
}

export interface PhishingExample {
  id: string;
  type: "SMS" | "E-mail" | "Komunikat WWW" | "Wiadomość z czatu";
  sender: string;
  mockSubject?: string;
  mockMessageText: string;
  suspiciousLink: string;
  redFlags: {
    flag: string;
    explanation: string;
  }[];
  correctReaction: string;
  realWorldScenario: string;
}

export interface EmergencyContact {
  name: string;
  numberOrUrl: string;
  isPhone: boolean;
  hours: string;
  description: string;
  badge: string;
}

// -------------------------------------------------------------
// DANE EDUKACYJNE: BAZA WIEDZY BEZPIECZEŃSTWA W SIECI
// -------------------------------------------------------------

export const SECURITY_TOPICS: SecurityTopic[] = [
  // --- SZKOŁA PODSTAWOWA (SP) ---
  {
    id: "sp-netykieta",
    level: "SP",
    category: "netykieta",
    title: "Netykieta — Dobre Wychowanie i Kultura w Sieci",
    subtitle: "Podstawowy kodeks postępowania: empatia, szacunek, wielkie litery i cyfrowy ślad",
    summary: "Internet to nie anonimowa przestrzeń bez zasad. Netykieta to zbiór niepisanych reguł kultury, które sprawiają, że wspólna komunikacja, gry i nauka online są bezpieczne i przyjemne dla każdego.",
    icon: CheckCircle2,
    colorHex: "#10b981",
    badge: "Szkoła Podstawowa (Klasy 4-8)"
  },
  {
    id: "sp-phishing",
    level: "SP",
    category: "phishing",
    title: "Rozpoznawanie Phishingu — Jak Nie Dać Się Złowić Oszustom",
    subtitle: "Analiza 4 fałszywych wiadomości: sztuczna presja czasu, podejrzane linki i wyłudzanie kont",
    summary: "Oszuści podszywają się pod kurierów, gry online, sklepy lub znajomych, by wyłudzić hasła i pieniądze. Naucz się bezbłędnie dostrzegać czerwone flagi w podejrzanych linkach i komunikatach.",
    icon: AlertTriangle,
    colorHex: "#f59e0b",
    badge: "Szkoła Podstawowa (Klasy 4-8)"
  },
  {
    id: "sp-cyberprzemoc",
    level: "SP",
    category: "cyberprzemoc",
    title: "Cyberprzemoc (Hejt i Cyberbullying) — Obrona i Zgłaszanie",
    subtitle: "Co robić krok po kroku w razie ataku oraz oficjalne bezpłatne numery zaufania w Polsce",
    summary: "Nękanie, wyśmiewanie na forach, kompromitujące zdjęcia czy podszywanie się pod kogoś w sieci to cyberprzemoc. Poznaj 5 żelaznych kroków obrony oraz miejsca, gdzie zawsze otrzymasz bezpłatną pomoc.",
    icon: UserX,
    colorHex: "#ef4444",
    badge: "Szkoła Podstawowa (Klasy 4-8)"
  },

  // --- SZKOŁA PONADPODSTAWOWA ---
  {
    id: "pp-encryption",
    level: "ponadpodstawowa",
    category: "szyfrowanie",
    title: "Podstawy Szyfrowania — Symetryczne, Asymetryczne i HTTPS",
    subtitle: "AES-256 vs RSA/ECC, dystrybucja kluczy, certyfikaty X.509 i Handshake TLS 1.3",
    summary: "Kryptografia stanowi fundament zaufania w globalnym Internecie. Dowiedz się, dlaczego współczesny protokół HTTPS łączy zalety powolnego szyfrowania asymetrycznego z błyskawicznym szyfrowaniem symetrycznym.",
    icon: Lock,
    colorHex: "#06b6d4",
    badge: "Szkoła Ponadpodstawowa (Liceum / Technikum)"
  },
  {
    id: "pp-vpn",
    level: "ponadpodstawowa",
    category: "vpn",
    title: "Wirtualna Sieć Prywatna (VPN) — Działanie, Zastosowanie i Mity",
    subtitle: "Szyfrowane tunele (WireGuard/OpenVPN), ochrona w publicznym Wi-Fi i maskowanie IP",
    summary: "Czym naprawdę jest VPN, a czym jedynie marketingową obietnicą? Poznaj architekturę tunelowania pakietów, scenariusze uzasadnionego użycia oraz ograniczenia, których żaden VPN nie rozwiąże.",
    icon: Globe,
    colorHex: "#8b5cf6",
    badge: "Szkoła Ponadpodstawowa (Liceum / Technikum)"
  },
  {
    id: "pp-firewall-vlan",
    level: "ponadpodstawowa",
    category: "firewall_vlan",
    title: "Zapora Sieciowa (Firewall) i Segmentacja VLAN w Domu",
    subtitle: "Inspekcja stanowa SPI, tagowanie 802.1Q oraz izolacja stref: LAN, Goście i urządzenia IoT",
    summary: "Standardowy dom ma dziesiątki urządzeń smart home podatnych na ataki. Zobacz, jak zapora stanowa SPI odrzuca niechciany ruch z zewnątrz oraz jak podział na 3 VLAN-y zapobiega rozprzestrzenianiu złośliwego oprogramowania.",
    icon: ShieldCheck,
    colorHex: "#3b82f6",
    badge: "Szkoła Ponadpodstawowa (Liceum / Technikum)"
  }
];

// Przykłady fałszywych wiadomości phishingowych (czysto edukacyjne/opisowe, brak linków do prawdziwych stron)
export const PHISHING_EXAMPLES: PhishingExample[] = [
  {
    id: "phish-sms-kurier",
    type: "SMS",
    sender: "+48 791 XX XX XX (Losowy numer komórkowy)",
    mockMessageText: "Paczka nr PL-98214 wstrzymana z powodu niedoplaty 1,49 PLN. Brak zaplaty w ciagu 2h spowoduje zwrot do nadawcy: hxxp://paczka-inpost-doplata24.top/pay/1829",
    suspiciousLink: "hxxp://paczka-inpost-doplata24.top/pay/1829",
    redFlags: [
      {
        flag: "Sztuczna presja czasu (2 godziny)",
        explanation: "Oszuści wywołują panikę i pośpiech, aby ofiara pod wpływem emocji kliknęła link bez zastanowienia i analizy."
      },
      {
        flag: "Niewielka kwota dopłaty (1,49 zł)",
        explanation: "Niska kwota usypia czujność („to tylko złotówka”). W rzeczywistości podrobiona bramka nie pobiera 1,49 zł, lecz kradnie dane karty lub kod BLIK, aby wyczyścić konto z tysięcy złotych."
      },
      {
        flag: "Fałszywa domena z końcówką .top",
        explanation: "Prawdziwa domena firmy kurierskiej to inpost.pl, a nie podejrzany twór z myślnikami i egzotyczną końcówką .top. Nigdy nie ufaj subdomenom podszywającym się pod znane marki."
      },
      {
        flag: "Zwykły protokół nieszyfrowany (hxxp)",
        explanation: "Brak certyfikatu SSL/TLS oraz brak oficjalnego identyfikatora nadawcy SMS (zamiast nazwy firmy widnieje prywatny numer telefonu)."
      }
    ],
    correctReaction: "Nigdy nie klikaj w link! Jeśli czekasz na paczkę, sprawdź jej status w oficjalnej aplikacji na telefonie lub na oficjalnej stronie firmy kurierskiej, wpisując numer przesyłki ręcznie.",
    realWorldScenario: "Masowa kampania SMS wysyłana w okresach przedświątecznych i w trakcie wyprzedaży internetowych."
  },
  {
    id: "phish-email-gra",
    type: "E-mail",
    sender: "no-reply@security-portal-verify99.xyz (Pole Od: „Dział Bezpieczeństwa Graczy”)",
    mockSubject: "🚨 ALARM: Twoje konto gracza zostanie trwale zablokowane w ciągu 15 minut!",
    mockMessageText: "Wykryliśmy nieautoryzowaną próbę logowania z nowego urządzenia w obcym kraju. Twoje konto oraz przedmioty w ekwipunku zostaną skasowane, chyba że natychmiast potwierdzisz tożsamość: hxxp://roblox-skin-security-check.cf/login?token=89431",
    suspiciousLink: "hxxp://roblox-skin-security-check.cf/login?token=89431",
    redFlags: [
      {
        flag: "Szantaż utratą konta i postaci",
        explanation: "Zastraszanie dziecka utratą osiągnięć, skórek czy znajomych w grze online paraliżuje racjonalne myślenie."
      },
      {
        flag: "Dziwny adres e-mail nadawcy",
        explanation: "Choć w nagłówku widnieje napis „Dział Bezpieczeństwa”, adres po znaku @ to `security-portal-verify99.xyz`, a nie oficjalna domena wydawcy gry."
      },
      {
        flag: "Darmowa końcówka domeny (.cf)",
        explanation: "Oszuści często rejestrują darmowe lub tanie domeny (.xyz, .top, .cf, .tk), które po kilku godzinach są usuwane."
      },
      {
        flag: "Żądanie wpisania loginu i hasła",
        explanation: "Podrobiona strona wygląda identycznie jak ekran logowania do gry, lecz wysyła wpisane poświadczenia prosto na serwer cyberprzestępcy."
      }
    ],
    correctReaction: "Nie klikaj w link. Otwórz osobną kartę przeglądarki, wejdź na oficjalną stronę gry i sprawdź powiadomienia na swoim profilu. Pamiętaj o włączeniu weryfikacji dwuetapowej (2FA)!",
    realWorldScenario: "Ataki wymierzone w młodzież grającą w gry sieciowe (Roblox, Minecraft, Fortnite, Steam) w celu kradzieży rzadkich przedmiotów i kont."
  },
  {
    id: "phish-www-konkurs",
    type: "Komunikat WWW",
    sender: "Wyskakujące okno (Pop-up) na stronie z darmowymi filmami / grami",
    mockSubject: "🎉 GRATULACJE! Jesteś 1.000.000 odwiedzającym naszą stronę!",
    mockMessageText: "Twój adres IP został wylosowany w Wielkiej Loterii Noworocznej! Wygrałeś najnowszego iPhone'a 16 Pro lub bon 2000 zł do sklepu odzieżowego. Zapłać symboliczne 4,90 zł za przesyłkę kurierską: hxxp://super-nagrody-polska-wygrana.club/odbierz-nagrode",
    suspiciousLink: "hxxp://super-nagrody-polska-wygrana.club/odbierz-nagrode",
    redFlags: [
      {
        flag: "Zbyt piękne, aby było prawdziwe",
        explanation: "Nikt w internecie nie rozdaje drogich telefonów ani tysięcy złotych nieznajomym za darmo. Nie da się wygrać w loterii, w której nie brało się udziału."
      },
      {
        flag: "Powoływanie się na Twój adres IP",
        explanation: "Wyświetlenie miasta czy dostawcy internetu to tani chwyt techniczny — każda odwiedzana strona widzi publiczny adres IP przeglądarki."
      },
      {
        flag: "Ukryta płatna subskrypcja",
        explanation: "Wpisanie danych karty pod pozorem opłaty 4,90 zł za wysyłkę w rzeczywistości oznacza akceptację mikroskopijnego regulaminu i cykliczne obciążanie konta kwotą np. 199 zł co miesiąc."
      },
      {
        flag: "Animowany, migający licznik sekund",
        explanation: "Zegar odliczający 2 minuty ma wymusić pochopne wpisanie numeru karty przed zorientowaniem się w oszustwie."
      }
    ],
    correctReaction: "Natychmiast zamknij kartę lub okno przeglądarki. Nie klikaj przycisków wewnątrz pop-upu (ani „Odbierz”, ani fałszywego „Anuluj”).",
    realWorldScenario: "Fałszywe loterie i quizy rozpowszechniane przez reklamy na pirackich portalach i podejrzanych forach."
  },
  {
    id: "phish-chat-znajomy",
    type: "Wiadomość z czatu",
    sender: "Konto kolegi z klasy na komunikatorze społecznościowym (np. Messenger / Discord)",
    mockMessageText: "Siema, zobacz co o Tobie wrzucili do neta!! To Ty jestes na tym nagraniu ze szkoły?? Masakra, kliknij szybko zanim skasuja: hxxp://tiktok-viral-szkola-wideo.site/watch?v=9941",
    suspiciousLink: "hxxp://tiktok-viral-szkola-wideo.site/watch?v=9941",
    redFlags: [
      {
        flag: "Wykorzystanie zaufania do znajomego",
        explanation: "Konto Twojego kolegi zostało wcześniej przejęte (bo sam kliknął ten sam link). Zautomatyzowany skrypt wysyła tę samą wiadomość do wszystkich osób z listy kontaktów."
      },
      {
        flag: "Silne emocje: wstyd, lęk i ciekawość",
        explanation: "Manipulacja strachem przed publicznym upokorzeniem („to Ty na tym filmie”) paraliżuje ostrożność."
      },
      {
        flag: "Wymuszenie logowania do obejrzenia rzekomego wideo",
        explanation: "Po wejściu na stronę pojawia się fałszywe okienko „Zaloguj się kontem Facebooka/TikToka, aby potwierdzić pełnoletność”. Wpisanie hasła natychmiast przekazuje konto oszustom."
      },
      {
        flag: "Dziwny styl i pora wiadomości",
        explanation: "Wiadomość często przychodzi w środku nocy, od osoby, z którą dawno nie rozmawiałeś, lub brzmi bezosobowo i szablonowo."
      }
    ],
    correctReaction: "Nie klikaj w link! Skontaktuj się z kolegą innym kanałem (zadzwoń telefonem, napisz SMS lub zapytaj w szkole), mówiąc mu: „Ktoś przejął Twoje konto i rozsyła wirusy, natychmiast zmień hasło i wyloguj sesje”.",
    realWorldScenario: "Lawinowe ataki w mediach społecznościowych przejmujące konta uczniów i rozsyłające złośliwe skrypty do całej klasy."
  }
];

// Oficjalne telefony zaufania i punkty zgłaszania cyberprzemocy w Polsce
export const EMERGENCY_CONTACTS: EmergencyContact[] = [
  {
    name: "Telefon Zaufania dla Dzieci i Młodzieży",
    numberOrUrl: "116 111",
    isPhone: true,
    hours: "Całodobowo, 7 dni w tygodniu (Bezpłatnie i Anonimowo)",
    description: "Prowadzony przez Fundację Dajemy Dzieciom Siłę. Możesz porozmawiać o hejcie, przemocy w szkole i internecie, problemach rodzinnych czy samotności. Konsultanci nie oceniają i są po Twojej stronie.",
    badge: "Główna bezpłatna linia dla młodzieży"
  },
  {
    name: "Dziecięcy Telefon Zaufania Rzecznika Praw Dziecka",
    numberOrUrl: "800 12 12 12",
    isPhone: true,
    hours: "Całodobowo, 7 dni w tygodniu (Bezpłatnie)",
    description: "Infolinia oraz interaktywny czat internetowy prowadzony przez psychologów i prawników Biura Rzecznika Praw Dziecka w sprawach bezpieczeństwa, przemocy i praw ucznia.",
    badge: "Wsparcie psychologiczne i prawne"
  },
  {
    name: "Dyżurnet.pl (NASK — Państwowy Instytut Badawczy)",
    numberOrUrl: "www.dyzurnet.pl",
    isPhone: false,
    hours: "Formularz online 24/7 (Anonimowe zgłoszenia)",
    description: "Polski punkt kontaktowy przyjmujący zgłoszenia o nielegalnych i szkodliwych treściach w Internecie (pornografia dziecięca, rasizm, kradzież tożsamości, ciężkie formy nękania i mowa nienawiści).",
    badge: "Zgłaszanie przestępstw sieciowych"
  },
  {
    name: "Telefon dla Rodziców i Nauczycieli w sprawach Bezpieczeństwa Dzieci",
    numberOrUrl: "800 100 100",
    isPhone: true,
    hours: "Pn-Pt: 12:00 - 15:00 (Bezpłatnie)",
    description: "Wsparcie dla dorosłych opiekunów w rozwiązywaniu kryzysów związanych z uzależnieniem od gier, cyberprzemocą w klasie i kontaktami dzieci z obcymi w sieci.",
    badge: "Dla rodziców i pedagogów"
  }
];

interface NetworkSecuritySectionProps {
  onSwitchToQuiz?: () => void;
}

export default function NetworkSecuritySection({ onSwitchToQuiz }: NetworkSecuritySectionProps) {
  const [selectedLevelFilter, setSelectedLevelFilter] = useState<"all" | "SP" | "ponadpodstawowa">("all");
  const [expandedTopicId, setExpandedTopicId] = useState<string>("sp-netykieta");
  
  // Stan analizatora phishingu
  const [selectedPhishExampleId, setSelectedPhishExampleId] = useState<string>(PHISHING_EXAMPLES[0].id);
  const activePhishExample = PHISHING_EXAMPLES.find(p => p.id === selectedPhishExampleId) || PHISHING_EXAMPLES[0];

  // Interaktywny symulator szyfrowania (Ponadpodstawowa)
  const [plainTextMessage, setPlainTextMessage] = useState<string>("TAJNE_HASLO_123");
  const [encryptionMethod, setEncryptionMethod] = useState<"symmetric" | "asymmetric">("symmetric");
  const [isEncrypted, setIsEncrypted] = useState<boolean>(true);

  // Interaktywny symulator VLAN (Ponadpodstawowa)
  const [isVlanActive, setIsVlanActive] = useState<boolean>(true);
  const [infectedDevice, setInfectedDevice] = useState<"iot" | "guest" | null>("iot");

  // Filtrowanie tematów
  const filteredTopics = SECURITY_TOPICS.filter(t => {
    if (selectedLevelFilter === "all") return true;
    return t.level === selectedLevelFilter;
  });

  return (
    <div className="flex flex-col space-y-8 w-full" id="network-security-root">
      
      {/* 1. Header Banner sekcji Bezpieczeństwa */}
      <div className="bg-slate-900/60 border border-slate-850 p-6 rounded-2xl relative overflow-hidden">
        <div className="absolute top-0 right-0 w-[350px] h-[120px] bg-emerald-500/10 rounded-full blur-3xl pointer-events-none" />
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <div className="flex items-center space-x-2">
              <span className="text-[10px] font-mono font-bold uppercase tracking-widest text-emerald-400 bg-emerald-950/40 border border-emerald-800/40 px-2 py-0.5 rounded">
                Bezpieczeństwo Teleinformatyczne i Cyberhigiena
              </span>
              <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
            </div>
            <h2 className="text-xl font-bold text-white mt-1.5 flex items-center">
              <Shield className="w-6 h-6 mr-2 text-emerald-400 inline" />
              Bezpieczeństwo w Sieci: Od Netykiety do Kryptografii i VLAN
            </h2>
            <p className="text-xs text-slate-400 mt-1 max-w-3xl leading-relaxed">
              Kompleksowy moduł edukacyjny przygotowany zgodnie z podstawą programową informatyki. Opanuj kulturę komunikacji,
              rozpoznawanie wyrafinowanych ataków socjotechnicznych (phishing), procedury reagowania na hejt oraz architekturę szyfrowania danych i segmentacji sieci.
            </p>
          </div>

          {/* Szybki przełącznik poziomu edukacyjnego */}
          <div className="flex flex-col sm:flex-row items-center gap-1.5 bg-slate-950/80 p-1.5 rounded-xl border border-slate-800 shrink-0">
            <button
              onClick={() => setSelectedLevelFilter("all")}
              className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-all cursor-pointer ${
                selectedLevelFilter === "all"
                  ? "bg-emerald-500/20 text-emerald-300 border border-emerald-500/40"
                  : "text-slate-400 hover:text-slate-200"
              }`}
            >
              Wszystkie poziomy
            </button>
            <button
              onClick={() => setSelectedLevelFilter("SP")}
              className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-all cursor-pointer flex items-center space-x-1.5 ${
                selectedLevelFilter === "SP"
                  ? "bg-emerald-600 text-white shadow-[0_0_12px_rgba(16,185,129,0.4)]"
                  : "text-slate-400 hover:text-slate-200"
              }`}
            >
              <span>Szkoła Podstawowa (SP)</span>
            </button>
            <button
              onClick={() => setSelectedLevelFilter("ponadpodstawowa")}
              className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-all cursor-pointer flex items-center space-x-1.5 ${
                selectedLevelFilter === "ponadpodstawowa"
                  ? "bg-indigo-600 text-white shadow-[0_0_12px_rgba(99,102,241,0.4)]"
                  : "text-slate-400 hover:text-slate-200"
              }`}
            >
              <span>Ponadpodstawowa</span>
            </button>
          </div>
        </div>
      </div>

      {/* 2. Zestawienie Kart Tematycznych (Format Accordion / Kart z wzorcami STATIONS) */}
      <div className="space-y-6">
        
        {filteredTopics.map((topic) => {
          const isExpanded = expandedTopicId === topic.id;
          const Icon = topic.icon;
          const isSP = topic.level === "SP";

          return (
            <div
              key={topic.id}
              className={`bg-[#0F0F12] border transition-all duration-300 rounded-2xl shadow-xl overflow-hidden ${
                isExpanded
                  ? isSP
                    ? "border-emerald-500/50 shadow-[0_0_20px_rgba(16,185,129,0.1)]"
                    : "border-indigo-500/50 shadow-[0_0_20px_rgba(99,102,241,0.1)]"
                  : "border-slate-800/80 hover:border-slate-700"
              }`}
            >
              {/* Header Karty / Akordeonu */}
              <button
                onClick={() => setExpandedTopicId(isExpanded ? "" : topic.id)}
                className="w-full p-5 text-left flex items-start justify-between gap-4 cursor-pointer hover:bg-slate-900/30 transition-colors"
                id={`accordion-btn-${topic.id}`}
              >
                <div className="flex items-start space-x-3.5">
                  <div
                    className={`w-11 h-11 rounded-xl flex items-center justify-center shrink-0 border mt-0.5 ${
                      isSP
                        ? "bg-emerald-950/40 border-emerald-800/40 text-emerald-400"
                        : "bg-indigo-950/40 border-indigo-800/40 text-indigo-400"
                    }`}
                  >
                    <Icon className="w-5 h-5" />
                  </div>
                  <div>
                    <div className="flex flex-wrap items-center gap-2">
                      <span
                        className={`text-[9px] font-mono font-bold uppercase tracking-wider px-2 py-0.5 rounded border ${
                          isSP
                            ? "bg-emerald-950/60 text-emerald-400 border-emerald-800/50"
                            : "bg-indigo-950/60 text-indigo-400 border-indigo-800/50"
                        }`}
                      >
                        {topic.badge}
                      </span>
                      <span className="text-[10px] text-slate-500 font-mono uppercase tracking-wider">
                        Kategoria: {topic.category}
                      </span>
                    </div>
                    <h3 className="text-base font-bold text-white mt-1.5 flex items-center">
                      {topic.title}
                    </h3>
                    <p className="text-xs text-slate-400 mt-0.5 font-normal">
                      {topic.subtitle}
                    </p>
                  </div>
                </div>

                <div className="p-2 rounded-lg bg-slate-900/60 border border-slate-800 text-slate-400 shrink-0 mt-1">
                  {isExpanded ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
                </div>
              </button>

              {/* Rozwijana treść dydaktyczna */}
              <AnimatePresence>
                {isExpanded && (
                  <motion.div
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: "auto" }}
                    exit={{ opacity: 0, height: 0 }}
                    transition={{ duration: 0.3 }}
                    className="border-t border-slate-850 p-5 bg-slate-950/40 space-y-6"
                  >
                    
                    {/* Wstęp teoretyczny */}
                    <div className="bg-slate-900/50 p-4 rounded-xl border border-slate-800/70 text-xs text-slate-300 leading-relaxed">
                      <p>{topic.summary}</p>
                    </div>

                    {/* SZCZEGÓŁOWA TREŚĆ W ZALEŻNOŚCI OD KATEGORII */}

                    {/* 1. NETYKIETA (SP) */}
                    {topic.category === "netykieta" && (
                      <div className="space-y-4">
                        <h4 className="text-xs font-bold text-emerald-400 uppercase tracking-wider font-mono flex items-center">
                          <CheckCircle2 className="w-4 h-4 mr-1.5" />
                          6 Żelaznych Zasad Netykiety dla Ucznia Szkoły Podstawowej
                        </h4>
                        
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3.5">
                          <div className="bg-slate-900/70 border border-slate-800 rounded-xl p-3.5 flex flex-col justify-between">
                            <div>
                              <div className="flex items-center space-x-2 text-emerald-400 font-bold text-xs mb-1.5">
                                <span className="w-5 h-5 rounded-full bg-emerald-950 border border-emerald-800 flex items-center justify-center text-[10px] font-mono">1</span>
                                <span>Pamiętaj o człowieku</span>
                              </div>
                              <p className="text-xs text-slate-300 leading-snug">
                                Za każdym nickiem i awatarem stoi żywa osoba z uczuciami. Nie pisz w komentarzu ani na czacie niczego, czego nie powiedziałbyś prosto w twarz koledze na korytarzu.
                              </p>
                            </div>
                            <span className="text-[10px] text-emerald-400/80 font-mono mt-2.5 block">Zasada empatii i szacunku</span>
                          </div>

                          <div className="bg-slate-900/70 border border-slate-800 rounded-xl p-3.5 flex flex-col justify-between">
                            <div>
                              <div className="flex items-center space-x-2 text-emerald-400 font-bold text-xs mb-1.5">
                                <span className="w-5 h-5 rounded-full bg-emerald-950 border border-emerald-800 flex items-center justify-center text-[10px] font-mono">2</span>
                                <span>Nie krzycz wielkimi literami</span>
                              </div>
                              <p className="text-xs text-slate-300 leading-snug">
                                Pisanie całych zdań z włączonym <strong className="text-white">CAPS LOCKIEM</strong> jest w internecie traktowane jako podnoszenie głosu i krzyk. Dbaj o przecinki i kropki!
                              </p>
                            </div>
                            <span className="text-[10px] text-emerald-400/80 font-mono mt-2.5 block">Kultura pisowni i ton głosu</span>
                          </div>

                          <div className="bg-slate-900/70 border border-slate-800 rounded-xl p-3.5 flex flex-col justify-between">
                            <div>
                              <div className="flex items-center space-x-2 text-emerald-400 font-bold text-xs mb-1.5">
                                <span className="w-5 h-5 rounded-full bg-emerald-950 border border-emerald-800 flex items-center justify-center text-[10px] font-mono">3</span>
                                <span>Chroń prywatność innych</span>
                              </div>
                              <p className="text-xs text-slate-300 leading-snug">
                                Nigdy nie publikuj bez zgody cudzych zdjęć, filmików z lekcji, numeru telefonu ani adresu domowego. Szanuj prawo kolegów do prywatności.
                              </p>
                            </div>
                            <span className="text-[10px] text-emerald-400/80 font-mono mt-2.5 block">Ochrona wizerunku i danych</span>
                          </div>

                          <div className="bg-slate-900/70 border border-slate-800 rounded-xl p-3.5 flex flex-col justify-between">
                            <div>
                              <div className="flex items-center space-x-2 text-emerald-400 font-bold text-xs mb-1.5">
                                <span className="w-5 h-5 rounded-full bg-emerald-950 border border-emerald-800 flex items-center justify-center text-[10px] font-mono">4</span>
                                <span>Pomyśl dwa razy przed wysłaniem</span>
                              </div>
                              <p className="text-xs text-slate-300 leading-snug">
                                Internet nie zapomina. Zanim klikniesz „Wyślij” lub „Opublikuj”, zastanów się, czy to zdjęcie lub komentarz nie zaszkodzi Tobie lub komuś innemu za kilka lat.
                              </p>
                            </div>
                            <span className="text-[10px] text-emerald-400/80 font-mono mt-2.5 block">Świadomość cyfrowego śladu</span>
                          </div>

                          <div className="bg-slate-900/70 border border-slate-800 rounded-xl p-3.5 flex flex-col justify-between">
                            <div>
                              <div className="flex items-center space-x-2 text-emerald-400 font-bold text-xs mb-1.5">
                                <span className="w-5 h-5 rounded-full bg-emerald-950 border border-emerald-800 flex items-center justify-center text-[10px] font-mono">5</span>
                                <span>Nie karm trolla / Nie hejtuj</span>
                              </div>
                              <p className="text-xs text-slate-300 leading-snug">
                                Osoby celowo prowokujące i szukające kłótni żywią się Twoją złością. Zamiast się kłócić: wycisz (mute), zablokuj i zgłoś moderatorom grupy lub gry.
                              </p>
                            </div>
                            <span className="text-[10px] text-emerald-400/80 font-mono mt-2.5 block">Reakcja na prowokacje</span>
                          </div>

                          <div className="bg-slate-900/70 border border-slate-800 rounded-xl p-3.5 flex flex-col justify-between">
                            <div>
                              <div className="flex items-center space-x-2 text-emerald-400 font-bold text-xs mb-1.5">
                                <span className="w-5 h-5 rounded-full bg-emerald-950 border border-emerald-800 flex items-center justify-center text-[10px] font-mono">6</span>
                                <span>Szanuj prawa autorskie</span>
                              </div>
                              <p className="text-xs text-slate-300 leading-snug">
                                Kiedy wykorzystujesz czyjś rysunek, zdjęcie, muzykę czy fragment artykułu do prezentacji na lekcję, zawsze wskaż autora i źródło, z którego korzystasz.
                              </p>
                            </div>
                            <span className="text-[10px] text-emerald-400/80 font-mono mt-2.5 block">Uczciwość i źródła wiedzy</span>
                          </div>
                        </div>

                        {/* Wskazówka dydaktyczna */}
                        <div className="bg-emerald-950/20 border border-emerald-800/30 rounded-xl p-3 flex items-start space-x-2 text-xs text-slate-300">
                          <Sparkles className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                          <p>
                            <strong>Złota reguła netykiety:</strong> Zachowuj się w sieci tak, jak chciałbyś, aby inni zachowywali się wobec Ciebie w świecie rzeczywistym. Dobra kultura online buduje trwałe i bezpieczne relacje.
                          </p>
                        </div>
                      </div>
                    )}

                    {/* 2. ROZPOZNAWANIE PHISHINGU (SP) */}
                    {topic.category === "phishing" && (
                      <div className="space-y-5">
                        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-slate-850 pb-3">
                          <h4 className="text-xs font-bold text-amber-400 uppercase tracking-wider font-mono flex items-center">
                            <AlertTriangle className="w-4 h-4 mr-1.5" />
                            Interaktywny Wykrywacz Phishingu — Analiza 4 Typowych Ataków
                          </h4>
                          <span className="text-[10px] font-mono text-slate-500">Wybierz przykład, aby zbadać czerwone flagi</span>
                        </div>

                        {/* Przyciski wyboru fałszywych wiadomości */}
                        <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
                          {PHISHING_EXAMPLES.map((ex, idx) => (
                            <button
                              key={ex.id}
                              onClick={() => setSelectedPhishExampleId(ex.id)}
                              className={`p-2.5 rounded-xl border text-left transition-all cursor-pointer ${
                                selectedPhishExampleId === ex.id
                                  ? "bg-amber-950/30 border-amber-500 text-amber-300 shadow-[0_0_12px_rgba(245,158,11,0.2)]"
                                  : "bg-slate-900/60 border-slate-800 hover:border-slate-700 text-slate-400"
                              }`}
                            >
                              <span className="text-[9px] font-mono font-bold uppercase block text-slate-500">
                                Przykład {idx + 1}
                              </span>
                              <p className="text-xs font-bold truncate mt-0.5 text-slate-200">
                                {ex.type}: {ex.id.replace("phish-", "")}
                              </p>
                            </button>
                          ))}
                        </div>

                        {/* Widok aktywnej podejrzanej wiadomości */}
                        <div className="grid grid-cols-1 lg:grid-cols-12 gap-5 items-stretch">
                          
                          {/* Lewa kolumna: Symulowany ekran smartfona / wiadomości (Span 6) */}
                          <div className="lg:col-span-6 bg-slate-950 rounded-xl border border-slate-800 p-4 flex flex-col justify-between relative shadow-inner">
                            <div>
                              <div className="flex items-center justify-between border-b border-slate-850 pb-2.5 mb-3 text-[10px] font-mono text-slate-400">
                                <span className="flex items-center space-x-1.5">
                                  <Smartphone className="w-3.5 h-3.5 text-amber-400" />
                                  <span>Typ wiadomości: <strong>{activePhishExample.type}</strong></span>
                                </span>
                                <span className="text-red-400 font-bold bg-red-950/60 px-2 py-0.5 rounded border border-red-900/50">
                                  NIEBEZPIECZEŃSTWO
                                </span>
                              </div>

                              <div className="space-y-2 mb-4">
                                <p className="text-[10px] text-slate-500 font-mono">Nadawca:</p>
                                <p className="text-xs font-mono font-bold text-slate-300 bg-slate-900 p-2 rounded border border-slate-800 break-all">
                                  {activePhishExample.sender}
                                </p>
                              </div>

                              {activePhishExample.mockSubject && (
                                <div className="space-y-1 mb-3">
                                  <p className="text-[10px] text-slate-500 font-mono">Temat:</p>
                                  <p className="text-xs font-bold text-red-300 leading-snug">
                                    {activePhishExample.mockSubject}
                                  </p>
                                </div>
                              )}

                              <div className="space-y-1">
                                <p className="text-[10px] text-slate-500 font-mono">Treść wiadomości:</p>
                                <div className="p-3 bg-red-950/20 border border-red-900/30 rounded-lg text-xs text-slate-200 leading-relaxed font-sans">
                                  <p>{activePhishExample.mockMessageText}</p>
                                </div>
                              </div>
                            </div>

                            <div className="mt-4 pt-3 border-t border-slate-850 flex items-center justify-between text-[10px] font-mono text-slate-500">
                              <span>Kontekst: {activePhishExample.realWorldScenario}</span>
                            </div>
                          </div>

                          {/* Prawa kolumna: Analiza czerwonych flag i wskazówka (Span 6) */}
                          <div className="lg:col-span-6 bg-slate-900/40 rounded-xl border border-slate-800 p-4 flex flex-col justify-between">
                            <div>
                              <h5 className="text-[11px] font-bold text-amber-400 uppercase font-mono tracking-wider mb-3 flex items-center">
                                <AlertTriangle className="w-3.5 h-3.5 mr-1" />
                                Zdemaskowane Czerwone Flagi (Dlaczego to oszustwo?):
                              </h5>

                              <div className="space-y-2.5">
                                {activePhishExample.redFlags.map((rf, i) => (
                                  <div key={i} className="bg-slate-950/60 border border-slate-850 p-2.5 rounded-lg">
                                    <p className="text-xs font-bold text-red-400 flex items-center">
                                      <XCircle className="w-3.5 h-3.5 mr-1.5 shrink-0" />
                                      {rf.flag}
                                    </p>
                                    <p className="text-[11px] text-slate-300 mt-1 leading-snug pl-5">
                                      {rf.explanation}
                                    </p>
                                  </div>
                                ))}
                              </div>
                            </div>

                            <div className="mt-4 p-3 bg-emerald-950/30 border border-emerald-800/40 rounded-xl">
                              <p className="text-[10px] font-bold uppercase text-emerald-400 font-mono flex items-center">
                                <Check className="w-3.5 h-3.5 mr-1" /> Prawidłowa reakcja:
                              </p>
                              <p className="text-xs text-slate-200 mt-1 leading-relaxed">
                                {activePhishExample.correctReaction}
                              </p>
                            </div>
                          </div>

                        </div>
                      </div>
                    )}

                    {/* 3. CYBERPRZEMOC (SP) */}
                    {topic.category === "cyberprzemoc" && (
                      <div className="space-y-6">
                        
                        {/* 5 Kroków Obrony */}
                        <div>
                          <h4 className="text-xs font-bold text-red-400 uppercase tracking-wider font-mono flex items-center mb-3">
                            <ShieldAlert className="w-4 h-4 mr-1.5" />
                            Plan Działania Krok po Kroku — Co robić, gdy doświadczasz hejtu lub cyberprzemocy?
                          </h4>

                          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-3">
                            <div className="bg-slate-900/70 border border-slate-800 rounded-xl p-3">
                              <span className="w-6 h-6 rounded-full bg-red-950 border border-red-800 flex items-center justify-center text-xs font-mono font-bold text-red-400 mb-2">1</span>
                              <h5 className="text-xs font-bold text-white">Nie odpowiadaj agresją</h5>
                              <p className="text-[11px] text-slate-400 mt-1 leading-snug">
                                Złość i wyzwiska dają hejterowi satysfakcję i napędzają atak. Zachowaj spokój.
                              </p>
                            </div>

                            <div className="bg-slate-900/70 border border-slate-800 rounded-xl p-3">
                              <span className="w-6 h-6 rounded-full bg-red-950 border border-red-800 flex items-center justify-center text-xs font-mono font-bold text-red-400 mb-2">2</span>
                              <h5 className="text-xs font-bold text-white">Zabezpiecz dowody</h5>
                              <p className="text-[11px] text-slate-400 mt-1 leading-snug">
                                Zrób zrzuty ekranu (screenshoty), zapisz wiadomości, nagrania, linki i daty zdarzenia.
                              </p>
                            </div>

                            <div className="bg-slate-900/70 border border-slate-800 rounded-xl p-3">
                              <span className="w-6 h-6 rounded-full bg-red-950 border border-red-800 flex items-center justify-center text-xs font-mono font-bold text-red-400 mb-2">3</span>
                              <h5 className="text-xs font-bold text-white">Zablokuj sprawcę</h5>
                              <p className="text-[11px] text-slate-400 mt-1 leading-snug">
                                Użyj opcji „Zablokuj użytkownika” i „Zgłoś profil” moderatorom platformy społecznościowej lub gry.
                              </p>
                            </div>

                            <div className="bg-slate-900/70 border border-slate-800 rounded-xl p-3">
                              <span className="w-6 h-6 rounded-full bg-red-950 border border-red-800 flex items-center justify-center text-xs font-mono font-bold text-red-400 mb-2">4</span>
                              <h5 className="text-xs font-bold text-white">Porozmawiaj z dorosłym</h5>
                              <p className="text-[11px] text-slate-400 mt-1 leading-snug">
                                Nie duś tego w sobie. Powiedz rodzicom, pedagogowi szkolnemu, wychowawcy lub zaufanemu nauczycielowi.
                              </p>
                            </div>

                            <div className="bg-slate-900/70 border border-slate-800 rounded-xl p-3">
                              <span className="w-6 h-6 rounded-full bg-red-950 border border-red-800 flex items-center justify-center text-xs font-mono font-bold text-red-400 mb-2">5</span>
                              <h5 className="text-xs font-bold text-white">Reaguj jako świadek</h5>
                              <p className="text-[11px] text-slate-400 mt-1 leading-snug">
                                Widzisz hejt na kogoś innego? Nie lajkuj, napisz do tej osoby słowa wsparcia i zgłoś sprawę dorosłym.
                              </p>
                            </div>
                          </div>
                        </div>

                        {/* Gdzie Zgłosić — Oficjalne bezpłatne kontakty pomocowe */}
                        <div>
                          <h4 className="text-xs font-bold text-emerald-400 uppercase tracking-wider font-mono flex items-center mb-3">
                            <PhoneCall className="w-4 h-4 mr-1.5" />
                            Gdzie Szukać Pomocy w Polsce? Oficjalne Bezpłatne Infolinie
                          </h4>

                          <div className="grid grid-cols-1 md:grid-cols-2 gap-3.5">
                            {EMERGENCY_CONTACTS.map((contact, i) => (
                              <div key={i} className="bg-slate-900/80 border border-slate-800 rounded-xl p-4 flex flex-col justify-between">
                                <div>
                                  <div className="flex items-start justify-between gap-2 mb-2">
                                    <span className="text-[10px] font-mono font-bold uppercase text-emerald-400 bg-emerald-950/60 px-2 py-0.5 rounded border border-emerald-800/40">
                                      {contact.badge}
                                    </span>
                                    <span className="text-[10px] text-slate-500 font-mono">{contact.hours}</span>
                                  </div>
                                  <h5 className="text-sm font-bold text-white">{contact.name}</h5>
                                  <p className="text-xs text-slate-300 mt-1.5 leading-relaxed">{contact.description}</p>
                                </div>

                                <div className="mt-4 pt-3 border-t border-slate-850 flex items-center justify-between">
                                  <div className="flex items-center space-x-2 text-cyan-400 font-mono font-bold text-sm">
                                    {contact.isPhone ? <PhoneCall className="w-4 h-4" /> : <Globe className="w-4 h-4" />}
                                    <span>{contact.numberOrUrl}</span>
                                  </div>
                                  <span className="text-[10px] font-mono text-emerald-400">100% Poufnie</span>
                                </div>
                              </div>
                            ))}
                          </div>

                          <div className="mt-3 text-[11px] font-mono text-slate-500 bg-slate-950 p-2.5 rounded-lg border border-slate-900">
                            Pamiętaj: Cyberstalking, podszywanie się pod kogoś i groźby karalne są w Polsce przestępstwami (art. 190a Kodeksu Karnego). W skrajnych przypadkach zawiadamiana jest Policja.
                          </div>
                        </div>

                      </div>
                    )}

                    {/* 4. SZYFROWANIE (PONADPODSTAWOWA) */}
                    {topic.category === "szyfrowanie" && (
                      <div className="space-y-6">
                        
                        {/* Porównanie tabelaryczne: Symetryczne vs Asymetryczne vs HTTPS */}
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                          
                          {/* Szyfrowanie symetryczne */}
                          <div className="bg-slate-900/70 border border-slate-800 rounded-xl p-4 flex flex-col justify-between">
                            <div>
                              <div className="flex items-center justify-between mb-2">
                                <span className="text-[10px] font-mono font-bold text-cyan-400 bg-cyan-950/60 px-2 py-0.5 rounded border border-cyan-800/40">
                                  Szyfrowanie Symetryczne
                                </span>
                                <span className="text-xs font-mono text-slate-400">Np. AES-256, ChaCha20</span>
                              </div>
                              <h5 className="text-sm font-bold text-white">Jeden Wspólny Klucz (Secret Key)</h5>
                              <p className="text-xs text-slate-300 mt-2 leading-relaxed">
                                Ten sam tajny klucz służy zarówno do zaszyfrowania tekstu jawnego, jak i do jego odszyfrowania przez odbiorcę.
                              </p>

                              <ul className="mt-3 space-y-1.5 text-xs text-slate-300">
                                <li className="flex items-start space-x-1.5">
                                  <Check className="w-3.5 h-3.5 text-emerald-400 mt-0.5 shrink-0" />
                                  <span><strong>Zaleta:</strong> Niezwykle szybkie. Wspierane sprzętowo przez instrukcje procesora (AES-NI).</span>
                                </li>
                                <li className="flex items-start space-x-1.5">
                                  <XCircle className="w-3.5 h-3.5 text-red-400 mt-0.5 shrink-0" />
                                  <span><strong>Problem dystrybucji klucza:</strong> Jak bezpiecznie przekazać klucz drugiej stronie przez niezabezpieczony Internet?</span>
                                </li>
                              </ul>
                            </div>

                            <div className="mt-4 pt-3 border-t border-slate-800 font-mono text-[11px] text-slate-400">
                              Zastosowanie: Szyfrowanie dysków (BitLocker), strumieni wideo, tuneli VPN i danych w sesji HTTPS.
                            </div>
                          </div>

                          {/* Szyfrowanie asymetryczne */}
                          <div className="bg-slate-900/70 border border-slate-800 rounded-xl p-4 flex flex-col justify-between">
                            <div>
                              <div className="flex items-center justify-between mb-2">
                                <span className="text-[10px] font-mono font-bold text-indigo-400 bg-indigo-950/60 px-2 py-0.5 rounded border border-indigo-800/40">
                                  Szyfrowanie Asymetryczne
                                </span>
                                <span className="text-xs font-mono text-slate-400">Np. RSA-4096, ECC (Ed25519)</span>
                              </div>
                              <h5 className="text-sm font-bold text-white">Para Kluczy: Publiczny i Prywatny</h5>
                              <p className="text-xs text-slate-300 mt-2 leading-relaxed">
                                <strong>Klucz publiczny</strong> jest jawny i każdy może nim zaszyfrować wiadomość. Tylko pasujący <strong>klucz prywatny</strong> (znany tylko odbiorcy) potrafi ją odszyfrować.
                              </p>

                              <ul className="mt-3 space-y-1.5 text-xs text-slate-300">
                                <li className="flex items-start space-x-1.5">
                                  <Check className="w-3.5 h-3.5 text-emerald-400 mt-0.5 shrink-0" />
                                  <span><strong>Zaleta:</strong> Rozwiązuje problem dystrybucji klucza. Klucz publiczny można wysłać otwartym tekstem.</span>
                                </li>
                                <li className="flex items-start space-x-1.5">
                                  <XCircle className="w-3.5 h-3.5 text-red-400 mt-0.5 shrink-0" />
                                  <span><strong>Wada:</strong> Złożone obliczenia matematyczne (nawet 1000x wolniejsze od AES).</span>
                                </li>
                              </ul>
                            </div>

                            <div className="mt-4 pt-3 border-t border-slate-800 font-mono text-[11px] text-slate-400">
                              Zastosowanie: Podpisy cyfrowe, certyfikaty SSL, klucze SSH, bezpieczna wymiana kluczy w protokole TLS.
                            </div>
                          </div>

                        </div>

                        {/* Jak działa HTTPS i Handshake TLS 1.3 */}
                        <div className="bg-slate-950 p-4 rounded-xl border border-slate-800">
                          <h5 className="text-xs font-bold text-cyan-400 uppercase font-mono tracking-wider mb-2 flex items-center">
                            <Lock className="w-4 h-4 mr-1.5" />
                            Jak Działa HTTPS w Praktyce? Hybrydowy Handshake TLS 1.3
                          </h5>
                          <p className="text-xs text-slate-300 leading-relaxed mb-3">
                            Protokół HTTPS łączy oba światy kryptografii w sprytny sposób, eliminując wady obu rozwiązań:
                          </p>

                          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 text-xs">
                            <div className="p-3 bg-slate-900/90 rounded-lg border border-slate-800">
                              <span className="font-mono text-[10px] text-cyan-400 font-bold block mb-1">KROK 1: CERTYFIKAT CA</span>
                              <p className="text-slate-300 leading-snug">
                                Przeglądarka łączy się z serwerem i weryfikuje certyfikat X.509 podpisany przez zaufany Urząd Certyfikacji (CA). Potwierdza to tożsamość domeny (ochrona przed atakiem Man-in-the-Middle).
                              </p>
                            </div>

                            <div className="p-3 bg-slate-900/90 rounded-lg border border-slate-800">
                              <span className="font-mono text-[10px] text-indigo-400 font-bold block mb-1">KROK 2: WYMIANA ASYMETRYCZNA</span>
                              <p className="text-slate-300 leading-snug">
                                Za pomocą kryptografii asymetrycznej (algorytm Diffiego-Hellmana / ECDHE) przeglądarka i serwer bezpiecznie uzgadniają tymczasowy <strong>symetryczny klucz sesyjny</strong>.
                              </p>
                            </div>

                            <div className="p-3 bg-slate-900/90 rounded-lg border border-slate-800">
                              <span className="font-mono text-[10px] text-emerald-400 font-bold block mb-1">KROK 3: SZYBKI TRANSFER AES</span>
                              <p className="text-slate-300 leading-snug">
                                Cała dalsza transmisja strony WWW (obrazki, hasła, formularze) szyfrowana jest superszybkim szyfrem symetrycznym AES-256-GCM.
                              </p>
                            </div>
                          </div>
                        </div>

                        {/* Interaktywny symulator transformacji kryptograficznej */}
                        <div className="bg-[#0C0D11] p-4 rounded-xl border border-slate-850">
                          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-3">
                            <h5 className="text-[11px] font-bold text-slate-300 uppercase font-mono tracking-wider flex items-center">
                              <Key className="w-3.5 h-3.5 mr-1.5 text-cyan-400" />
                              Interaktywna Wizualizacja Szyfru
                            </h5>
                            <div className="flex items-center space-x-2">
                              <button
                                onClick={() => setEncryptionMethod("symmetric")}
                                className={`px-2.5 py-1 rounded text-[10px] font-mono font-bold transition-all cursor-pointer ${
                                  encryptionMethod === "symmetric"
                                    ? "bg-cyan-950 text-cyan-400 border border-cyan-700"
                                    : "bg-slate-900 text-slate-400 hover:text-white"
                                }`}
                              >
                                Tryb Symetryczny (1 Klucz)
                              </button>
                              <button
                                onClick={() => setEncryptionMethod("asymmetric")}
                                className={`px-2.5 py-1 rounded text-[10px] font-mono font-bold transition-all cursor-pointer ${
                                  encryptionMethod === "asymmetric"
                                    ? "bg-indigo-950 text-indigo-400 border border-indigo-700"
                                    : "bg-slate-900 text-slate-400 hover:text-white"
                                }`}
                              >
                                Tryb Asymetryczny (Klucz Pub/Priv)
                              </button>
                            </div>
                          </div>

                          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 items-center">
                            <div>
                              <label className="text-[10px] font-mono text-slate-500 uppercase block mb-1">Tekst jawny (Wpisz własny):</label>
                              <input
                                type="text"
                                value={plainTextMessage}
                                onChange={(e) => setPlainTextMessage(e.target.value)}
                                className="w-full bg-slate-950 border border-slate-800 rounded-lg p-2 text-xs font-mono text-cyan-300 focus:outline-none focus:border-cyan-500"
                                placeholder="Wpisz słowo..."
                              />
                            </div>

                            <div>
                              <label className="text-[10px] font-mono text-slate-500 uppercase block mb-1">
                                {encryptionMethod === "symmetric" ? "Zaszyfrowany blok AES-256 (Ciphertext):" : "Szyfrogram RSA-4096:"}
                              </label>
                              <div className="bg-slate-950 border border-slate-800 rounded-lg p-2 text-xs font-mono text-emerald-400 truncate">
                                {plainTextMessage
                                  ? (encryptionMethod === "symmetric"
                                      ? "0x7F" + Array.from(plainTextMessage).map(c => c.charCodeAt(0).toString(16)).join("") + "E9B42A"
                                      : "RSA:8a4f9e1c2b5d03876e" + plainTextMessage.length * 31 + "f0c9a")
                                  : "Brak danych"}
                              </div>
                            </div>
                          </div>
                        </div>

                      </div>
                    )}

                    {/* 5. VPN (PONADPODSTAWOWA) */}
                    {topic.category === "vpn" && (
                      <div className="space-y-6">
                        
                        {/* Jak działa tunel VPN */}
                        <div className="bg-slate-950 p-4 rounded-xl border border-slate-800">
                          <h4 className="text-xs font-bold text-indigo-400 uppercase tracking-wider font-mono flex items-center mb-3">
                            <Globe className="w-4 h-4 mr-1.5" />
                            Architektura Tunelu VPN (Virtual Private Network)
                          </h4>
                          
                          <p className="text-xs text-slate-300 leading-relaxed mb-4">
                            VPN tworzy wirtualną kartę sieciową i zestawia <strong>zaszyfrowany tunel</strong> (najczęściej protokołami WireGuard lub OpenVPN) pomiędzy Twoim urządzeniem a serwerem pośredniczącym.
                          </p>

                          <div className="grid grid-cols-1 md:grid-cols-3 gap-3 font-mono text-xs">
                            <div className="bg-slate-900 p-3 rounded-lg border border-slate-800">
                              <span className="text-[10px] text-cyan-400 font-bold block mb-1">1. NA TWOIM URZĄDZENIU</span>
                              <p className="text-slate-300 text-[11px] leading-snug font-sans">
                                Cały ruch wychodzący jest szyfrowany zanim opuści kartę Wi-Fi lub gniazdo Ethernet.
                              </p>
                            </div>

                            <div className="bg-slate-900 p-3 rounded-lg border border-slate-800">
                              <span className="text-[10px] text-indigo-400 font-bold block mb-1">2. DLA TWOJEGO DOSTAWCY (ISP)</span>
                              <p className="text-slate-300 text-[11px] leading-snug font-sans">
                                Twój operator internetowy widzi tylko jeden strumień zaszyfrowanych danych płynący do serwera VPN. Nie widzi adresów odwiedzanych stron.
                              </p>
                            </div>

                            <div className="bg-slate-900 p-3 rounded-lg border border-slate-800">
                              <span className="text-[10px] text-emerald-400 font-bold block mb-1">3. DLA STRON DOCELOWYCH</span>
                              <p className="text-slate-300 text-[11px] leading-snug font-sans">
                                Serwer docelowy (np. sklep internetowy) widzi publiczny adres IP serwera VPN, a nie Twój domowy IP.
                              </p>
                            </div>
                          </div>
                        </div>

                        {/* Kiedy warto używać vs Powszechne mity */}
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                          
                          <div className="bg-emerald-950/20 border border-emerald-800/30 rounded-xl p-4">
                            <h5 className="text-xs font-bold text-emerald-400 uppercase font-mono tracking-wider mb-2 flex items-center">
                              <CheckCircle2 className="w-4 h-4 mr-1.5" />
                              Kiedy WARTO używać VPN?
                            </h5>
                            <ul className="space-y-2 text-xs text-slate-300">
                              <li className="flex items-start space-x-2">
                                <span className="text-emerald-400 mt-0.5">▪</span>
                                <span><strong>Publiczne hotspoty Wi-Fi:</strong> Na lotniskach, w kawiarniach i hotelach, chroniąc przed podsłuchem pakietów w sieci lokalnej (ataki ARP Spoofing).</span>
                              </li>
                              <li className="flex items-start space-x-2">
                                <span className="text-emerald-400 mt-0.5">▪</span>
                                <span><strong>Praca zdalna i Intranet szkolny:</strong> Bezpieczny dostęp do dysków sieciowych, baz danych i serwerów firmowych z domu.</span>
                              </li>
                              <li className="flex items-start space-x-2">
                                <span className="text-emerald-400 mt-0.5">▪</span>
                                <span><strong>Ochrona prywatności przed profilem ISP:</strong> Dostawca internetu nie może monitorować zapytań DNS ani katalogować Twoich zainteresowań w celach reklamowych.</span>
                              </li>
                            </ul>
                          </div>

                          <div className="bg-red-950/20 border border-red-900/30 rounded-xl p-4">
                            <h5 className="text-xs font-bold text-red-400 uppercase font-mono tracking-wider mb-2 flex items-center">
                              <XCircle className="w-4 h-4 mr-1.5" />
                              Czego VPN NIE ROBI? (Mity marketingowe)
                            </h5>
                            <ul className="space-y-2 text-xs text-slate-300">
                              <li className="flex items-start space-x-2">
                                <span className="text-red-400 mt-0.5">▪</span>
                                <span><strong>VPN NIE chroni przed wirusami:</strong> Jeśli pobierzesz zainfekowany plik .exe lub ransomware, VPN w żaden sposób Cię nie ochroni.</span>
                              </li>
                              <li className="flex items-start space-x-2">
                                <span className="text-red-400 mt-0.5">▪</span>
                                <span><strong>VPN NIE chroni przed phishingiem:</strong> Jeśli wpiszesz hasło na fałszywej stronie, oszust i tak je przejmie.</span>
                              </li>
                              <li className="flex items-start space-x-2">
                                <span className="text-red-400 mt-0.5">▪</span>
                                <span><strong>VPN NIE daje 100% anonimowości:</strong> Strony mogą identyfikować użytkownika przez pliki cookies, zalogowane konta Google/Meta i tzw. browser fingerprinting.</span>
                              </li>
                            </ul>
                          </div>

                        </div>

                        {/* Wskazówka o zaufaniu do dostawcy */}
                        <div className="bg-slate-900/60 p-3.5 rounded-xl border border-slate-800 text-xs text-slate-400">
                          <strong className="text-white">Uwaga dydaktyczna o zaufaniu:</strong> Używając VPN, przenosisz zaufanie z dostawcy internetu (ISP) na operatora VPN. Nigdy nie korzystaj z podejrzanych „darmowych” VPN-ów na telefonie — darmowe usługi często zarabiają na sprzedaży danych o Twojej aktywności podmiotom trzecim.
                        </div>

                      </div>
                    )}

                    {/* 6. FIREWALL I SEGMENTACJA VLAN (PONADPODSTAWOWA) */}
                    {topic.category === "firewall_vlan" && (
                      <div className="space-y-6">
                        
                        {/* Teoria: Zapora stanowa SPI */}
                        <div className="bg-slate-950 p-4 rounded-xl border border-slate-800">
                          <h4 className="text-xs font-bold text-blue-400 uppercase tracking-wider font-mono flex items-center mb-2">
                            <ShieldCheck className="w-4 h-4 mr-1.5" />
                            Zapora Ogniowa: Filtrowanie Bezstanowe vs Stanowe (SPI)
                          </h4>
                          <p className="text-xs text-slate-300 leading-relaxed mb-3">
                            Firewall to strażnik graniczny na styku sieci domowej (LAN) i publicznego internetu (WAN).
                          </p>

                          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
                            <div className="bg-slate-900 p-3 rounded-lg border border-slate-800">
                              <span className="font-mono text-[10px] text-slate-400 font-bold uppercase block mb-1">
                                Filtrowanie bezstanowe (Stateless ACL)
                              </span>
                              <p className="text-slate-300 text-[11px] leading-snug">
                                Sprawdza każdy pakiet w izolacji na podstawie sztywnych reguł: numer portu (np. blokuj port 23 Telnet), docelowy adres IP lub protokół (TCP/UDP).
                              </p>
                            </div>

                            <div className="bg-slate-900 p-3 rounded-lg border border-slate-800">
                              <span className="font-mono text-[10px] text-cyan-400 font-bold uppercase block mb-1">
                                Inspekcja stanowa (Stateful Packet Inspection — SPI)
                              </span>
                              <p className="text-slate-300 text-[11px] leading-snug">
                                Śledzi całą sesję połączenia (np. trójstronny uścisk TCP: SYN, SYN-ACK, ACK). Przepuszcza pakiety powrotne tylko wtedy, gdy to urządzenie z Twojego domu samo pierwsze zainicjowało połączenie. Niezaproszone pakiety z Internetu są natychmiast odrzucane (DROP).
                              </p>
                            </div>
                          </div>
                        </div>

                        {/* Segmentacja VLAN (IEEE 802.1Q) */}
                        <div>
                          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 mb-3">
                            <h4 className="text-xs font-bold text-cyan-400 uppercase tracking-wider font-mono flex items-center">
                              <Layers className="w-4 h-4 mr-1.5" />
                              Segmentacja Domowa VLAN (Standard IEEE 802.1Q)
                            </h4>
                            <button
                              onClick={() => setIsVlanActive(!isVlanActive)}
                              className={`px-3 py-1 rounded-lg text-xs font-mono font-bold transition-all cursor-pointer border ${
                                isVlanActive
                                  ? "bg-emerald-950/60 border-emerald-500/50 text-emerald-400"
                                  : "bg-red-950/60 border-red-500/50 text-red-400"
                              }`}
                            >
                              Tryb sieci: {isVlanActive ? "✅ Podział na 3 VLAN-y (Bezpieczny)" : "❌ Brak segmentacji (Płaski LAN)"}
                            </button>
                          </div>

                          <p className="text-xs text-slate-300 leading-relaxed mb-4">
                            VLAN (Virtual LAN) pozwala logicznie podzielić jeden fizyczny przełącznik i router na odizolowane podsieci. Urządzenia w VLAN 30 nie widzą ani nie mogą nawiązać połączenia z urządzeniami w VLAN 10.
                          </p>

                          {/* 3 Strefy VLAN */}
                          <div className="grid grid-cols-1 md:grid-cols-3 gap-3.5">
                            
                            {/* Strefa 1: Główny LAN */}
                            <div className={`p-4 rounded-xl border transition-all ${
                              isVlanActive
                                ? "bg-slate-900/90 border-cyan-800/50 shadow-[0_0_10px_rgba(6,182,212,0.1)]"
                                : "bg-red-950/20 border-red-900/50"
                            }`}>
                              <div className="flex items-center justify-between mb-2">
                                <span className="text-[10px] font-mono font-bold text-cyan-400 bg-cyan-950 px-2 py-0.5 rounded border border-cyan-800/40">
                                  VLAN 10: Zaufany LAN
                                </span>
                                <span className="text-[10px] font-mono text-slate-500">192.168.10.0/24</span>
                              </div>
                              <h5 className="text-xs font-bold text-white">Główne Urządzenia Domowe</h5>
                              <p className="text-[11px] text-slate-300 mt-1 leading-snug">
                                Laptopy domowników, komputery stacjonarne, domowy serwer plików NAS z prywatnymi zdjęciami i dokumentami.
                              </p>
                              <div className="mt-3 pt-2.5 border-t border-slate-800 text-[10px] font-mono text-emerald-400">
                                Status: {isVlanActive ? "● Odizolowany od Smart Home" : "⚠️ Zagrożony infekcją!"}
                              </div>
                            </div>

                            {/* Strefa 2: Sieć gościnna */}
                            <div className="bg-slate-900/90 border border-slate-800 p-4 rounded-xl">
                              <div className="flex items-center justify-between mb-2">
                                <span className="text-[10px] font-mono font-bold text-amber-400 bg-amber-950 px-2 py-0.5 rounded border border-amber-800/40">
                                  VLAN 20: Sieć Gościnna
                                </span>
                                <span className="text-[10px] font-mono text-slate-500">192.168.20.0/24</span>
                              </div>
                              <h5 className="text-xs font-bold text-white">Guest Wi-Fi (Smartfony znajomych)</h5>
                              <p className="text-[11px] text-slate-300 mt-1 leading-snug">
                                Dostęp wyłącznie do Internetu. Całkowity zakaz komunikacji z komputerami domowymi i serwerem NAS (izolacja AP).
                              </p>
                              <div className="mt-3 pt-2.5 border-t border-slate-800 text-[10px] font-mono text-slate-400">
                                Dostęp: Tylko do bramy WAN (Internet)
                              </div>
                            </div>

                            {/* Strefa 3: IoT Smart Home */}
                            <div className={`p-4 rounded-xl border transition-all ${
                              isVlanActive
                                ? "bg-slate-900/90 border-purple-800/50"
                                : "bg-red-950/30 border-red-500 animate-pulse"
                            }`}>
                              <div className="flex items-center justify-between mb-2">
                                <span className="text-[10px] font-mono font-bold text-purple-400 bg-purple-950 px-2 py-0.5 rounded border border-purple-800/40">
                                  VLAN 30: Smart Home / IoT
                                </span>
                                <span className="text-[10px] font-mono text-slate-500">192.168.30.0/24</span>
                              </div>
                              <h5 className="text-xs font-bold text-white">Inteligentne Urządzenia Rzeczy</h5>
                              <p className="text-[11px] text-slate-300 mt-1 leading-snug">
                                Kamery IP, odkurzacze automatyczne, inteligentne żarówki i gniazdka Wi-Fi. Urządzenia te rzadko mają aktualizacje.
                              </p>
                              <div className="mt-3 pt-2.5 border-t border-slate-800 text-[10px] font-mono text-purple-300">
                                {isVlanActive ? "Kwarantanna: Włamanie nie grozi LAN" : "🚨 Złośliwy kod może zaatakować NAS!"}
                              </div>
                            </div>

                          </div>
                        </div>

                      </div>
                    )}

                    {/* Przycisk przejścia do Quizu */}
                    {onSwitchToQuiz && (
                      <div className="pt-2 flex justify-end">
                        <button
                          onClick={onSwitchToQuiz}
                          className="px-4 py-2 bg-slate-900 hover:bg-slate-850 border border-slate-800 hover:border-slate-700 text-xs font-mono font-bold text-cyan-400 rounded-xl transition-colors flex items-center space-x-2 cursor-pointer"
                        >
                          <BookmarkCheck className="w-4 h-4" />
                          <span>Sprawdź wiedzę o bezpieczeństwie w Quizie</span>
                        </button>
                      </div>
                    )}

                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          );
        })}

      </div>

    </div>
  );
}
