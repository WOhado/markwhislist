import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Download, ChevronLeft, Gamepad2, Info, ArrowRight, Monitor, Cpu, HardDrive, MessageSquare, Send, X } from 'lucide-react';

interface Game {
  id: string;
  title: string;
  description: string;
  capsuleImage: string;
  heroImage: string;
  instructions: string[];
  downloadLink?: string;
  fixDownloadLink?: string;
}

const GAMES: Game[] = [
  {
    id: 'apex-point',
    title: 'Apex Point',
    description: 'Az **Apex Point** egy nyílt világú játék, amelynek célja, hogy elmerítsen a japán autós kultúrában: a testreszabási lehetőségek és versenytípusok hatalmas választékával biztosítja, hogy a saját utadat járhasd.',
    capsuleImage: 'https://shared.steamstatic.com/store_item_assets/steam/apps/2102520/library_600x900_2x.jpg?t=1754510815',
    heroImage: 'https://shared.steamstatic.com/store_item_assets/steam/apps/2102520/library_hero_2x.jpg?t=1754510815',
    downloadLink: 'https://raw.githubusercontent.com/WOhado/markwhislist/main/games/apex-point.zip',
    instructions: [
      'Töltse le az Apex Point-ot a játék letöltés gombra kattintva.',
      'Csomagold ki a .zip fájlt.',
      'Húzd bele a benne lévő .lua és .mainfest fájlokat a steamtools-ba és nyomj egy restartot.',
      'Tölsd le a játékot a könyvtárban. (csak mit egy sima játékot).',
      'És kész, de ne felejts goonolni mert kell a dopamin!!! ÉS amilyen pro vagy tuti tudod 1 kézzel játszani 😎.'
    ]
  },
  {
    id: 'assetto-corsa-evo',
    title: 'Assetto Corsa Evo',
    description: 'Az **Assetto Corsa EVO** újradefiniálja a realizmust és a funkciókat minden idők egyik legnépszerűbb többplatformos autószimulációjában. Különböző kategóriájú autókat és pályákat kínál, felölelve az autózás történelmének számos korszakát.',
    capsuleImage: 'https://shared.steamstatic.com/store_item_assets/steam/apps/3058630/library_600x900_2x.jpg?t=1764776600',
    heroImage: 'https://shared.steamstatic.com/store_item_assets/steam/apps/3058630/library_hero_2x.jpg?t=1764776600',
    downloadLink: '/games/assetto-corsa-evo.zip',
    instructions: [
      'Töltse le az Assetto Corsa Evo-ot a játék letöltés gombra kattintva.',
      'Csomagold ki a .zip fájlt.',
      'Húzd bele a benne lévő .lua és .mainfest fájlokat a steamtools-ba és nyomj egy restartot.',
      'Tölsd le a játékot a könyvtárban. (csak mit egy sima játékot).',
      'Ha nem működik és content still encrypted hibát dob akkor a mappában lévő depotkeys_3058630 mappából húzd be a .lua meg .manifets fájlokat a steamtoolsba.',
      'De ezt tényleg csak akkor ha nem mükszik!',
      'És kész, kifogytam az ötletekből mit lehet ide írni :('
    ]
  },
  {
    id: 'carx-drift-dlc',
    title: 'CarX Drift Racing Online DLCs',
    description: 'Ide nem tudom mit írjak gondolom ez valami +mapot ad hozzá vagy nem tudom mit whistleteztél. *Megjegyzés: nem biztos működnek a dlck mivel online játék ez.*',
    capsuleImage: 'https://shared.steamstatic.com/store_item_assets/steam/apps/635260/cc7b938a66632bb35eef30bd1e1c097a16c96810/library_600x900_2x.jpg?t=1760100581',
    heroImage: 'https://shared.steamstatic.com/store_item_assets/steam/apps/635260/f9042f444521a002f20cc61f11d7b459d713685e/library_hero_2x.jpg?t=1760100581',
    downloadLink: '/games/carx-drift-dlc.zip',
    instructions: [
      'Töltse le az CarX Drift Racing Online DLC-it a játék letöltés gombra kattintva.',
      'Csomagold ki a .zip fájlt.',
      'Húzd bele a benne lévő .lua és .mainfest fájlokat a steamtools-ba és nyomj egy restartot.',
      'Lehet le kell törölnöd és vissza töltened a játékot hogy a dlck működjenek vagy a dlc-im kezelésénél ki kell pipálni utána be őket.',
      'Ha nem működik és content still encrypted hibát dob akkor a mappában lévő depotkeys_635260 mappából húzd be a .lua meh .manifets fájlokat a steamtoolsba.',
      'De ezt tényleg csak akkor ha nem mükszik!',
      'És kész, and its just hit the second tower :D'
    ]
  },
  {
    id: 'isaac-rebirth',
    title: 'The Binding of Isaac: Rebirth',
    description: 'A **The Binding of Isaac** egy véletlenszerűen generált akció-RPG shooter, erős roguelike elemekkel. Isaac útját követve a játékosok bizarr kincsekre bukkanhatnak, amelyek megváltoztatják Isaac formáját, emberfeletti képességekkel ruházva fel őt. Ez lehetővé teszi számára, hogy titkokat fedezzen fel, és rejtélyes teremtmények hadain áttörve küzdje magát a biztonság felé.',
    capsuleImage: 'https://shared.steamstatic.com/store_item_assets/steam/apps/250900/library_600x900_2x.jpg?t=1722458407',
    heroImage: 'https://shared.steamstatic.com/store_item_assets/steam/apps/250900/library_hero.jpg?t=1722458407',
    downloadLink: '/games/isaac-rebirth.zip',
    instructions: [
      'Töltse le a The Binding of Isaac: Rebirth-öt a játék letöltés gombra kattintva.',
      'Csomagold ki a .zip fájlt.',
      'Húzd bele a benne lévő .lua és .mainfest fájlokat a steamtools-ba és nyomj egy restartot.',
      'Tölsd le a játékot a könyvtárban. (csak mit egy sima játékot).',
      'Ha nem működik és content still encrypted hibát dob akkor a mappában lévő depotkeys_250900 mappából húzd be a .lua meg .manifets fájlokat a steamtoolsba.',
      'De ezt tényleg csak akkor ha nem mükszik!',
      'ÉS kész, mi bomboclad Marci fülcimpa.'
    ]
  },
  {
    id: 'hollow-knight',
    title: 'Hollow Knight',
    description: 'Alkosd meg a saját utadat a **Hollow Knightban**! Egy epikus akció-kaland vár a rovarok és hősök hatalmas, romos királyságán keresztül. Fedezz fel kanyargós barlangokat, harcolj megfertőzött lényekkel és köss barátságot különös bogarakkal – mindezt klasszikus, kézzel rajzolt 2D-s stílusban.',
    capsuleImage: 'https://shared.steamstatic.com/store_item_assets/steam/apps/367520/library_600x900_2x.jpg?t=1695270300',
    heroImage: 'https://shared.steamstatic.com/store_item_assets/steam/apps/367520/library_hero.jpg?t=1695270300',
    downloadLink: '/games/hollow-knight.zip',
    instructions: [
      'Töltse le a Hollow Knight-ot a játék letöltés gombra kattintva.',
      'Csomagold ki a .zip fájlt.',
      'Húzd bele a benne lévő .lua és .mainfest fájlokat a steamtools-ba és nyomj egy restartot.',
      'Tölsd le a játékot a könyvtárban. (csak mit egy sima játékot).',
      'Ha nem működik és content still encrypted hibát dob akkor a mappában lévő depotkeys_367520 mappából húzd be a .lua meg .manifets fájlokat a steamtoolsba.',
      'De ezt tényleg csak akkor ha nem mükszik!',
      'És kész, btw lehet én is kipróbálom ezt a játékot egyszer.'
    ]
  },
  {
    id: 'corn-kidz-64',
    title: 'Corn Kidz 64',
    description: 'A klasszikus Stephen King-thriller nem hivatalos, gyerekbarát változata (vagy talán mégsem, lehet, hogy ez csak egy játék egyfejű kecskebébikről).',
    capsuleImage: 'https://shared.steamstatic.com/store_item_assets/steam/apps/2575900/library_600x900_2x.jpg?t=1697518121',
    heroImage: 'https://shared.steamstatic.com/store_item_assets/steam/apps/2575900/library_hero_2x.jpg?t=1697518121',
    downloadLink: '/games/corn-kidz-64.zip',
    instructions: [
      'Töltse le a Corn Kidz 64-et a játék letöltés gombra kattintva.',
      'Csomagold ki a .zip fájlt.',
      'Húzd bele a benne lévő .lua és .mainfest fájlokat a steamtools-ba és nyomj egy restartot.',
      'Tölsd le a játékot a könyvtárban. (csak mit egy sima játékot).',
      'És kész, ez valami pornó game amúgy?'
    ]
  },
  {
    id: 'yakuza-0',
    title: 'Yakuza 0',
    description: 'Fedezd fel az 1980-as évek Japánjának dekadenciáját és veszélyeit, miközben tűzön-vizen át küzdesz a neonfényes szórakoztatónegyedekben a Yakuza-legendákat megteremtő akció-kaland bűnügyi dráma definitív kiadásában.',
    capsuleImage: 'https://shared.steamstatic.com/store_item_assets/steam/apps/638970/library_600x900_2x.jpg?t=1716363782',
    heroImage: 'https://shared.steamstatic.com/store_item_assets/steam/apps/638970/library_hero_2x.jpg?t=1716363782',
    downloadLink: '/games/yakuza-0.zip',
    instructions: [
      'Töltse le a Yakuza 0-t a játék letöltés gombra kattintva.',
      'Csomagold ki a .zip fájlt.',
      'Húzd bele a benne lévő .lua és .mainfest fájlokat a steamtools-ba és nyomj egy restartot.',
      'Tölsd le a játékot a könyvtárban. (csak mit egy sima játékot).',
      'Ha nem működik és content still encrypted hibát dob akkor a mappában lévő depotkeys_638970 mappából húzd be a .lua meg .manifets fájlokat a steamtoolsba.',
      'De ezt tényleg csak akkor ha nem mükszik!',
      'És kész, tuff Yaluza ugye Japán óráról megmaradt.'
    ]
  },
  {
    id: 'mgr-revengeance',
    title: 'Metal Gear Rising: Revengeance',
    description: 'A Kojima Productions és a PlatinumGames által fejlesztett **METAL GEAR RISING: REVENGEANCE** egy teljesen új akcióélménnyel repíti izgalmas, eddig ismeretlen területre a neves METAL GEAR franchise-t. A játék zökkenőmentesen ötvözi a tiszta akciót és az epikus történetmesélést, melynek középpontjában Raiden áll – egy egykori gyerekkatona, akiből félig ember, félig cyborg nindzsa vált. Raiden nagyfrekvenciás katanájával mindent és mindenkit kettészel, ami bosszúszomjas útjába áll!',
    capsuleImage: 'https://shared.steamstatic.com/store_item_assets/steam/apps/235460/library_600x900_2x.jpg?t=1677658058',
    heroImage: 'https://shared.steamstatic.com/store_item_assets/steam/apps/235460/library_hero_2x.jpg?t=1677658058',
    downloadLink: '/games/mgr-revengeance.zip',
    instructions: [
      'Töltse le a Metal Gear Rising: Revengeance-ot a játék letöltés gombra kattintva.',
      'Csomagold ki a .zip fájlt.',
      'Húzd bele a benne lévő .lua és .mainfest fájlokat a steamtools-ba és nyomj egy restartot.',
      'Tölsd le a játékot a könyvtárban. (csak mit egy sima játékot).',
      'Ha nem működik és content still encrypted hibát dob akkor a mappában lévő depotkeys_235460 mappából húzd be a .lua meg .manifets fájlokat a steamtoolsba.',
      'De ezt tényleg csak akkor ha nem mükszik!',
      'És kész, Im under water please help me.'
    ]
  },
  {
    id: 'desktop-teto',
    title: 'Desktop Mate Teto DLC',
description: 'Teto forever!!! (ezt csak a kedvetér amúgy MAI és RIAS FOREVER!!!!!)',
    capsuleImage: 'https://shared.steamstatic.com/store_item_assets/steam/apps/3301060/bb38fffd1573ff09922f1c0cb6ef15ae59c6bf5c/library_600x900_2x.jpg?t=1759981135',
    heroImage: 'https://shared.fastly.steamstatic.com/store_item_assets/steam/apps/3681410/25a84a3b58c1710a4b0884a6bd44c2b0b5579248/header.jpg?t=1754537110',
    downloadLink: '/games/desktop-teto.zip',
    instructions: [
      'Töltse le a Desktop Mate Teto DLC-t a játék letöltés gombra kattintva.',
      'Csomagold ki a .zip fájlt.',
      'Húzd bele a benne lévő .lua és .mainfest fájlokat a steamtools-ba és nyomj egy restartot.',
      'Tölsd le a játékot a könyvtárban. (csak mit egy sima játékot).',
      'Ha nem működik és content still encrypted hibát dob akkor a mappában lévő depotkeys_3301060 mappából húzd be a .lua meg .manifets fájlokat a steamtoolsba.',
      'De ezt tényleg csak akkor ha nem mükszik!',
      'És kész, remélem azért teto piros maradt és nem fehér lesz😉'
    ]
  },
  {
    id: 'pragmata',
    title: 'PRAGMATA',
    description: 'A **Pragmata** egy egyedülálló, sci-fi akció-kalandjáték a Capcomtól. Kövesd Hugh-t, egy balsorsú nyomozócsoport tagját, és Dianát, a fiatal androidot, amint egy lázadó mesterséges intelligencia által átvett holdbázison navigálnak keresztül, miközben a Földre vezető utat keresik.',
    capsuleImage: 'https://shared.steamstatic.com/store_item_assets/steam/apps/3357650/ffe0d0b1778821e7e63b0a57ee8a16b8ab749497/library_600x900_2x.jpg?t=1749097394',
    heroImage: 'https://cdn2.steamgriddb.com/hero_thumb/0b9f166f1f75217d3a28dc96e53eecfb.jpg',
    downloadLink: '/games/pragmata.zip',
    fixDownloadLink: '/games/PRAGMATA_3357650_MainShin02_1777325041986.zip',
    instructions: [
      'Töltse le a Pragmata a játék letöltés gombot.',
      'Csomagold ki a .zip fájlt.',
      'Húzd be a benne lévő .lua és .mainfest fájlokat a steamtools-ba és nyomj egy restartot.',
      'Töltse le a játékot a könyvtárban. (csak mit egy sima játékot).',
      'Ha nem működik és content still encrypted hibát dob akkor a mappában lévő depotkeys_3357650 mappából húzd be a .lua meg .manifets fájlokat a steamtoolsba.',
      'De ezt tényleg csak akkor ha nem mükszik!',
      'És tricky part jön ennél! miután letöltött töltsd le a fix fájlt is és csomagold ki (a fájlnak ez a neve: PRAGMATA_3357650_MainShin02_1777325041986).',
      'Majd lesz benne egy pub_pragmata mappa egy ColdClientLoader.ini és egy START_PRAGMATA.exe fájl.',
      'Húzd be ezeket a letöltött PRAGMATA mappába (ott a fogaskereken ---> kezelés ---> helyi fájlok kezelése.',
      '**EZ FONTOS!! A START_PRAGMATA.exe fájlt kell elindítanod a játék indításához, nem a sima exe-t!!**',
      'Az az ne nyomj soha a paly gombra hanem menj be a mappába ahol a START_PRAGMATA.exe van és indítsd el onnan.',
      'De ha egyszerűbben akarod akkor a steam bal asló sarkában van egy + gomb és mellette add game.',
      'Nyomj rá és válaszd ki az add non steam game-et. (legfelső a 3 közül)',
      'Ott felhoz egy panelt amin ott lesz hogy böngészés/explore (nyelvtől függ) a bal sarokban, nyomj rá.',
      'Keresd meg hol a START_PRAGMATA.exe fájl és válaszd ki. Általában ez a hely: C:\\Program Files (x86)\\Steam\\steamapps\\common\\PRAGMATA\\START_PRAGMATA.exe.',
      'Ha a helyi fájlok kezelésekor behúzod a fix fájlokat, ott is meg tudod nézni a telepítési útvonalat.',
      'Utána a könyvtárba lesz egy olyan játék hogy START_PRAGMATA arra rányomsz lehet customizálni a backroundot, stb... ha kellenek képek akkor itt találsz https://www.steamgriddb.com/game/5454532 (és itt majd a view oirginal assetsre tudsz nyomni az eredeti képekért vagy vannak alatta fan madek de ez csak izlés kérdése).',
      'És ha rányomsz a playre a START_PRAGMATA-nál akkor el isindul a játék és kész is. (Ha elakdsz írj a support gombnál ha funabb wayt akarsz vagy dcn)'
    ]
  }
];

const formatDescription = (description: string) =>
  description
    .replace(/\*\*(.+?)\*\*/g, '<strong>$1</strong>')
    .replace(/\*(.+?)\*/g, '<em>$1</em>');

export default function App() {
  const [selectedGameId, setSelectedGameId] = useState<string | null>(null);
  const [showSupport, setShowSupport] = useState(false);
  const [supportMessage, setSupportMessage] = useState('');
  const [sending, setSending] = useState(false);

  const selectedGame = GAMES.find(g => g.id === selectedGameId);
  const downloadUrl = selectedGame ? selectedGame.downloadLink ?? `/games/${selectedGame.id}.zip` : '#';

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [selectedGameId]);

  const handleSupportSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!supportMessage.trim()) return;

    setSending(true);
    try {
      // A "valami" helyére írd be a saját Renderes azonosítódat!
const response = await fetch('https://markwhislist.onrender.com/api/support', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ message: supportMessage }),
      });
      if (!response.ok) throw new Error('Hiba történt');
      
      setSending(false);
      setSupportMessage('');
      setShowSupport(false);
      alert('Üzenet elküldve!');
    } catch (err) {
      console.error(err);
      alert('Hiba történt az elküldés során.');
      setSending(false);
    }
  };

  return (
    <div className="min-h-screen bg-bg-dark text-[#e0e0e0] font-sans selection:bg-brand-red selection:text-white overflow-x-hidden select-none">
      {/* Dynamic Background Elements */}
      <div className="fixed inset-0 pointer-events-none z-0">
        <div className="absolute inset-0 opacity-[0.03] mix-blend-overlay bg-[url('https://grainy-gradients.vercel.app/noise.svg')]"></div>
        <div className="absolute -top-40 -left-40 w-[600px] h-[600px] bg-brand-red/10 rounded-full blur-[150px]" />
        <div className="absolute top-1/2 -right-40 w-[500px] h-[500px] bg-brand-red/5 rounded-full blur-[120px]" />
        
        {/* Half-Circle Decoration */}
        <svg className="absolute top-[10%] right-[-5%] w-96 h-96 text-brand-red opacity-10" viewBox="0 0 100 100">
          <path d="M 0 50 A 50 50 0 0 1 100 50" fill="none" stroke="currentColor" strokeWidth="0.5" />
        </svg>
      </div>

      <AnimatePresence mode="wait">
        {!selectedGameId ? (
          <motion.main
            key="home"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="p-8 lg:p-16 max-w-[1800px] mx-auto"
          >
            <div className="flex flex-col md:flex-row md:items-end justify-between mb-24 gap-8">
              <div className="flex items-center gap-10 group">
                <div className="w-2 h-40 bg-brand-red neon-glow rounded-full hidden md:block transition-all duration-500 group-hover:h-48" />
                <div>
                  <motion.h1 
                    className="font-display text-8xl md:text-[10rem] font-black tracking-tighter uppercase leading-[0.75] italic skew-x-[-3deg]"
                    initial={{ x: -50, opacity: 0 }}
                    animate={{ x: 0, opacity: 1 }}
                  >
                    Márk<br/><span className="text-brand-red drop-shadow-[0_0_20px_rgba(255,49,49,0.5)]">Whislist</span>
                  </motion.h1>
                </div>
              </div>
            </div>

            {/* Games Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-x-12 gap-y-24">
              {GAMES.map((game, idx) => (
                <motion.div
                  key={game.id}
                  initial={{ opacity: 0, scale: 0.95 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ delay: idx * 0.05 }}
                  onClick={() => setSelectedGameId(game.id)}
                  className="group cursor-pointer perspective-1000"
                >
                  <div 
                    className="relative overflow-hidden bg-neutral-900 border border-white/5 transition-all duration-500 group-hover:border-brand-red/60 glass rounded-3xl group-hover:-translate-y-6 shadow-2xl shadow-brand-red/5"
                  >
                    <div className="capsule-aspect w-full relative">
                      <img 
                        src={game.capsuleImage} 
                        alt={game.title}
                        className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-110 opacity-50 group-hover:opacity-100"
                      />
                      {/* Decorative half-circle on card */}
                      <div className="absolute -top-6 -right-6 w-24 h-24 border border-brand-red/10 rounded-full group-hover:border-brand-red/40 transition-colors duration-500" />
                    </div>
                    
                    <div className="absolute inset-0 bg-gradient-to-t from-bg-dark via-bg-dark/20 to-transparent opacity-90 group-hover:opacity-40 transition-opacity" />
                    
                    {/* Index Number */}
                    <div className="absolute top-10 left-10 font-mono text-6xl font-black text-white/5 group-hover:text-brand-red/20 transition-all duration-500 transform group-hover:scale-125">
                      {String(idx + 1).padStart(2, '0')}
                    </div>

                    <div className="absolute bottom-0 left-0 right-0 p-12">
                      <h2 className="text-4xl font-bold tracking-tight mb-4 uppercase italic text-white group-hover:text-brand-red transition-colors duration-300 drop-shadow-xl">{game.title}</h2>
                      <div className="flex items-center gap-3 opacity-0 group-hover:opacity-100 translate-y-4 group-hover:translate-y-0 transition-all duration-500">
                        <span className="text-[12px] uppercase font-mono tracking-[0.4em] text-brand-red font-black">Letöltés</span>
                        <div className="h-[1px] w-12 bg-brand-red" />
                        <ArrowRight size={20} className="text-brand-red" />
                      </div>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>

            <footer className="mt-32 pt-16 border-t border-white/5 flex flex-col md:flex-row justify-between items-center gap-8 text-neutral-600 text-[10px] font-mono uppercase tracking-[0.2em]">
              <div className="flex gap-8">
                <span>© 2026 MÁRK WHISLIST</span>
              </div>
            </footer>
          </motion.main>
        ) : (
          <motion.div
            key="detail"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="relative"
          >
            {/* Sticky Header */}
            <header className="fixed top-0 left-0 right-0 z-50 p-6 flex justify-between items-center bg-black/60 backdrop-blur-md border-b border-white/5">
              <button 
                onClick={() => setSelectedGameId(null)}
                className="flex items-center gap-2 bg-white text-black px-6 py-3 rounded-sm font-mono text-[10px] uppercase font-bold tracking-widest hover:scale-105 active:scale-95 transition-transform cursor-pointer shadow-2xl relative z-[60]"
              >
                <ChevronLeft size={16} /> [ Vissza ]
              </button>
              <div className="font-mono text-[10px] uppercase tracking-[0.4em] text-white hidden md:block bg-black/50 px-4 py-2 backdrop-blur-md rounded-sm border border-white/10">
                Márk Whislist // <span className="text-brand-red">{selectedGame?.title}</span>
              </div>
            </header>

            {/* Hero Section */}
            <div className="relative w-full overflow-hidden shadow-2xl" style={{ aspectRatio: '3840/1240' }}>
              <motion.img 
                initial={{ scale: 1.1, opacity: 0 }}
                animate={{ scale: 1, opacity: 0.7 }}
                src={selectedGame?.heroImage} 
                alt={selectedGame?.title}
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-bg-dark to-transparent" />
              
              <div className="absolute inset-0 flex flex-col items-center justify-center p-8 text-center pt-24">
                <motion.h1 
                  initial={{ y: 50, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  className="text-7xl md:text-[8vw] font-black uppercase italic tracking-tighter leading-none text-white"
                >
                  {selectedGame?.title}
                </motion.h1>
              </div>
            </div>

            {/* Content Area */}
            <div className="max-w-6xl mx-auto px-8 py-24">
              <div className="grid grid-cols-1 lg:grid-cols-12 gap-24">
                {/* Left Column: Description & Actions */}
                <div className="lg:col-span-7 space-y-16">
                  <section>
                    <div className="flex items-center gap-3 text-brand-red mb-6">
                      <div className="p-2 bg-brand-red/10 rounded-lg">
                        <Info size={20} />
                      </div>
                      <h3 className="font-mono text-xs uppercase tracking-widest font-bold">Metaadatok / Leírás</h3>
                    </div>
                    <p
                      className="text-2xl md:text-3xl font-light text-neutral-400 leading-tight"
                      dangerouslySetInnerHTML={{
                        __html: selectedGame ? formatDescription(selectedGame.description) : '',
                      }}
                    />
                  </section>

                  <section className="glass p-10 rounded-xl relative overflow-hidden group">
                    <div className="flex flex-col md:flex-row items-center justify-between gap-8 relative z-10 w-full">
                      <div className="flex flex-col sm:flex-row gap-4 w-full">
                        <a href={downloadUrl} download className="flex-1 flex items-center justify-center gap-4 bg-brand-red hover:bg-brand-red/90 text-white px-10 py-5 rounded-sm font-black tracking-tighter uppercase text-sm neon-glow transition-all hover:scale-[1.02] active:scale-95 group cursor-pointer">
                          <Download size={18} className="stroke-[3px]" />
                          Játék Letöltése
                        </a>
                        {selectedGame?.fixDownloadLink && (
                          <a href={selectedGame.fixDownloadLink} download className="flex-1 flex items-center justify-center gap-4 border border-brand-red/50 hover:bg-brand-red/10 text-brand-red px-10 py-5 rounded-sm font-black tracking-tighter uppercase text-sm transition-all hover:scale-[1.02] active:scale-95 group cursor-pointer">
                            <Download size={18} className="stroke-[3px]" />
                            Javító letöltése
                          </a>
                        )}
                      </div>
                    </div>
                  </section>
                </div>

                {/* Right Column: Instructions */}
                <div className="lg:col-span-5">
                  <div className="lg:sticky lg:top-32">
                    <div className="flex items-center gap-3 text-brand-red mb-8">
                      <div className="w-1 h-5 bg-brand-red block" />
                      <h3 className="font-mono text-xs uppercase tracking-widest font-bold">Telepítési Utasítások</h3>
                    </div>
                    
                    <div className="glass p-8 rounded-xl space-y-6">
                      {selectedGame?.instructions.map((step, idx) => (
                        <motion.div 
                          initial={{ x: 20, opacity: 0 }}
                          animate={{ x: 0, opacity: 1 }}
                          transition={{ delay: 0.3 + idx * 0.05 }}
                          key={idx} 
                          className="flex gap-4 group"
                        >
                          <div className="shrink-0 font-mono text-xs font-bold text-brand-red/60">
                            {String(idx + 1).padStart(2, '0')}.
                          </div>
                          <div>
                             <p className="text-xs text-neutral-400 group-hover:text-neutral-100 transition-colors leading-relaxed font-medium">
                               {step}
                             </p>
                          </div>
                        </motion.div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </div>
            
            <footer className="p-8 border-t border-white/5 flex flex-col md:flex-row justify-between items-center gap-8 text-neutral-700 text-[10px] font-mono tracking-tighter uppercase mb-16">
              <div>© 2026 MÁRK WHISLIST PROTOCOL</div>
            </footer>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Support Floating Action Button */}
      {!showSupport && (
        <motion.button
          initial={{ scale: 0, opacity: 0, rotate: -45 }}
          animate={{ scale: 1, opacity: 1, rotate: 0 }}
          whileHover={{ 
            scale: 1.1, 
            boxShadow: "0 0 40px rgba(255,49,49,0.6)",
          }}
          whileTap={{ scale: 0.9 }}
          onClick={() => setShowSupport(true)}
          className="fixed bottom-10 right-10 z-[80] w-12 h-12 bg-brand-red text-white rounded-full flex items-center justify-center shadow-[0_0_30px_rgba(255,49,49,0.3)] cursor-pointer group"
        >
          <div className="absolute inset-0 border border-white/20 rounded-full scale-110 group-hover:scale-125 transition-transform duration-500 animate-pulse" />
          <MessageSquare size={20} className="drop-shadow-md" />
        </motion.button>
      )}

      {/* Support Modal */}
      <AnimatePresence>
        {showSupport && (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[100] flex items-center justify-center p-6 bg-black/80 backdrop-blur-xl"
          >
            <motion.div 
              initial={{ scale: 0.9, y: 20 }}
              animate={{ scale: 1, y: 0 }}
              exit={{ scale: 0.9, y: 20 }}
              className="w-full max-w-lg glass p-10 rounded-2xl relative border-brand-red/20"
            >
              <button 
                onClick={() => setShowSupport(false)}
                className="absolute top-6 right-6 text-neutral-500 hover:text-brand-red transition-colors cursor-pointer"
              >
                <X size={24} />
              </button>
              
              <div className="mb-8">
                <div className="w-12 h-12 bg-brand-red/10 rounded-full flex items-center justify-center text-brand-red mb-4">
                  <MessageSquare size={24} />
                </div>
                <h2 className="text-3xl font-black uppercase tracking-tighter mb-2 italic">Support</h2>
                <p className="text-neutral-400 text-lg leading-tight font-light">
                  Mondja mi a gondja Horváth Milán megoldja
                </p>
              </div>

              <form onSubmit={handleSupportSubmit} className="space-y-6">
                <div>
                  <textarea 
                    value={supportMessage}
                    onChange={(e) => setSupportMessage(e.target.value)}
                    placeholder="Írja meg ide a problémát..."
                    className="w-full h-40 bg-white/5 border border-white/10 rounded-lg p-4 text-white focus:outline-none focus:border-brand-red/50 transition-colors resize-none font-mono text-sm"
                  ></textarea>
                </div>
                <button 
                  disabled={sending}
                  className="w-full flex items-center justify-center gap-3 bg-brand-red hover:bg-brand-red/90 text-white py-4 rounded-sm font-bold uppercase tracking-widest text-xs transition-all active:scale-95 disabled:opacity-50 cursor-pointer"
                >
                  {sending ? 'Küldés...' : (
                    <>
                      Küldés <Send size={14} />
                    </>
                  )}
                </button>
              </form>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
