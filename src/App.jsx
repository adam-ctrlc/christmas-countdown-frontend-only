import { useState, useEffect } from "react";
import { Gift, TreePine, Star, Moon, Send } from "lucide-react";
import {
  ParallaxElement,
  CountdownTimer,
  SnowEffect,
  GreetingModal,
  ReceivedCard,
} from "./components";

function App() {
  const [activeGift, setActiveGift] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [receivedData, setReceivedData] = useState(null);

  useEffect(() => {
    // Check for URL params
    const params = new URLSearchParams(window.location.search);
    const text = params.get("text");
    if (text) {
      try {
        const decoded = JSON.parse(atob(text));
        setReceivedData(decoded);
        // Clean URL without refresh
        window.history.replaceState(
          {},
          document.title,
          window.location.pathname
        );
      } catch (e) {
        console.error("Failed to decode greeting", e);
      }
    }
  }, []);

  const handleGiftClick = (id) => {
    setActiveGift(id);
    setTimeout(() => setActiveGift(null), 2000);
  };

  return (
    <div className="relative min-h-screen overflow-hidden bg-[#0a0f1e] text-white selection:bg-red-500/30">
      {/* Modals */}
      <GreetingModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
      />
      {receivedData && (
        <ReceivedCard
          data={receivedData}
          onClose={() => setReceivedData(null)}
        />
      )}

      {/* Background Gradients & Images */}
      <div className="absolute inset-0 bg-gradient-to-b from-slate-900 via-[#0b1026] to-black z-0"></div>
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-blue-900/10 via-transparent to-transparent pointer-events-none z-0"></div>

      {/* Background Image Overlay */}
      <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1543589077-47d81606c1bf?q=80&w=2560&auto=format&fit=crop')] bg-cover bg-center opacity-20 bg-no-repeat pointer-events-none mix-blend-overlay z-0"></div>

      <div className="relative z-0">
        <SnowEffect />
      </div>

      {/* Moon - responsive positioning */}
      <ParallaxElement
        speed={2}
        className="absolute top-6 right-4 sm:top-10 sm:right-10 md:top-20 md:right-32 z-10"
      >
        <div className="relative animate-pulse">
          <div className="absolute inset-0 bg-yellow-100 blur-3xl opacity-20 rounded-full scale-150"></div>
          <Moon
            className="w-10 h-10 sm:w-14 sm:h-14 md:w-20 md:h-20 lg:w-24 lg:h-24 text-yellow-50 fill-yellow-100/10 rotate-12"
            strokeWidth={0.5}
          />
        </div>
      </ParallaxElement>

      {/* Santa Sleigh Animation - hidden on mobile */}
      <div className="absolute top-32 -left-64 animate-[fly_25s_linear_infinite] z-20 hidden lg:block opacity-90 pointer-events-none">
        <img
          src="https://cdn-icons-png.flaticon.com/512/754/754756.png"
          className="w-32 h-32 -rotate-6 filter drop-shadow-[0_0_15px_rgba(255,255,255,0.4)] invert brightness-200"
          alt="Santa Sleigh"
        />
      </div>

      {/* Bottom Forest Layer - Parallax (lower z-index) - responsive sizes */}
      <ParallaxElement
        speed={-1}
        className="absolute bottom-0 left-0 w-full flex items-end justify-between pointer-events-none z-10 opacity-90"
      >
        <TreePine
          className="w-24 h-24 sm:w-36 sm:h-36 md:w-64 md:h-64 lg:w-96 lg:h-96 text-[#042f2e] fill-[#064e3b] stroke-[#065f46] -ml-8 sm:-ml-16 md:-ml-24 shadow-2xl drop-shadow-2xl"
          strokeWidth={0.5}
        />
        <TreePine
          className="w-16 h-16 sm:w-24 sm:h-24 md:w-48 md:h-48 lg:w-72 lg:h-72 text-[#042f2e] fill-[#064e3b] stroke-[#065f46] stroke-1 -mb-2 sm:-mb-4 md:-mb-6 hidden sm:block"
          strokeWidth={0.5}
        />
        <TreePine
          className="w-20 h-20 sm:w-32 sm:h-32 md:w-56 md:h-56 lg:w-80 lg:h-80 text-[#042f2e] fill-[#064e3b] stroke-[#065f46] mx-auto transform translate-y-4 sm:translate-y-8 md:translate-y-12 hidden sm:block"
          strokeWidth={0.5}
        />
        <TreePine
          className="w-28 h-28 sm:w-40 sm:h-40 md:w-72 md:h-72 lg:w-[32rem] lg:h-[32rem] text-[#042f2e] fill-[#064e3b] stroke-[#065f46] -mr-8 sm:-mr-16 md:-mr-32"
          strokeWidth={0.5}
        />
      </ParallaxElement>

      {/* Main Content - higher z-index to be above trees */}
      <div className="relative z-20 flex flex-col items-center justify-center min-h-screen px-4 py-8 sm:py-12">
        {/* Header */}
        <div className="text-center mb-8 sm:mb-12 md:mb-16 space-y-4 sm:space-y-6">
          <div className="flex items-center justify-center gap-2 sm:gap-4 mb-2">
            <Star className="text-yellow-300 fill-yellow-300 animate-spin-slow w-4 h-4 sm:w-5 sm:h-5 md:w-6 md:h-6 opacity-80" />
            <h1 className="text-sm sm:text-lg md:text-xl lg:text-2xl font-sans font-light tracking-[0.2em] sm:tracking-[0.3em] md:tracking-[0.4em] uppercase text-blue-100/70 drop-shadow-sm">
              It's Beginning to Look Like
            </h1>
            <Star className="text-yellow-300 fill-yellow-300 animate-spin-slow w-4 h-4 sm:w-5 sm:h-5 md:w-6 md:h-6 opacity-80" />
          </div>

          <div className="relative">
            <h2 className="text-5xl sm:text-6xl md:text-7xl lg:text-9xl font-serif text-transparent bg-clip-text bg-gradient-to-b from-red-500 via-red-600 to-red-800 drop-shadow-[0_4px_20px_rgba(220,38,38,0.4)] z-10 relative leading-tight py-2">
              Christmas
            </h2>
            {/* Decorative shine behind text */}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-3/4 h-16 sm:h-20 md:h-24 bg-red-500/20 blur-3xl -z-10 rounded-full"></div>
          </div>

          <div className="flex items-center justify-center gap-2 sm:gap-4 mt-4 sm:mt-6">
            <div className="h-px w-12 sm:w-16 md:w-32 bg-gradient-to-r from-transparent via-white/20 to-transparent"></div>
            <div className="w-1 h-1 sm:w-1.5 sm:h-1.5 rounded-full bg-white/40"></div>
            <div className="h-px w-12 sm:w-16 md:w-32 bg-gradient-to-r from-transparent via-white/20 to-transparent"></div>
          </div>
        </div>

        {/* Timer */}
        <div className="my-4 sm:my-6 md:my-8 lg:my-12 w-full">
          <CountdownTimer />
        </div>

        {/* Call to Action / Decoration */}
        <div className="mt-8 sm:mt-12 md:mt-16 text-center space-y-6 sm:space-y-8">
          <p className="text-base sm:text-lg md:text-xl lg:text-2xl text-blue-100/70 font-sans font-light max-w-xs sm:max-w-md lg:max-w-lg mx-auto leading-relaxed drop-shadow-md px-4">
            <span className="italic font-serif text-xl sm:text-2xl md:text-3xl pr-2 text-white/90">
              Magic
            </span>{" "}
            is on its way.
          </p>

          <button
            onClick={() => setIsModalOpen(true)}
            className="group relative inline-flex items-center gap-2 px-6 sm:px-8 py-3 sm:py-4 bg-red-600/80 hover:bg-red-600 text-white rounded-full transition-all duration-300 hover:scale-105 hover:shadow-[0_0_30px_rgba(220,38,38,0.6)] overflow-hidden text-sm sm:text-base"
          >
            <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-700"></div>
            <Send className="w-4 h-4 sm:w-5 sm:h-5" />
            <span className="font-serif tracking-wider">
              Send a Christmas Card
            </span>
          </button>
        </div>
      </div>

      {/* Foreground Gifts - Clickable - responsive positioning */}
      <div className="absolute bottom-4 right-4 sm:bottom-8 sm:right-8 md:bottom-12 md:right-24 z-30 flex gap-4 sm:gap-6 items-end">
        <div
          onClick={() => handleGiftClick("red")}
          className="cursor-pointer transition-transform hover:-translate-y-2 hover:rotate-12 duration-300 relative group"
        >
          {activeGift === "red" && (
            <div className="absolute -top-8 sm:-top-10 left-1/2 -translate-x-1/2 text-white font-serif text-sm sm:text-xl animate-bounce whitespace-nowrap">
              Ho Ho Ho!
            </div>
          )}
          <Gift
            className="w-10 h-10 sm:w-12 sm:h-12 md:w-14 md:h-14 lg:w-16 lg:h-16 text-red-500 fill-red-600/30 rotate-6 drop-shadow-[0_0_15px_rgba(220,38,38,0.5)]"
            strokeWidth={1.5}
          />
        </div>

        <div
          onClick={() => handleGiftClick("gold")}
          className="cursor-pointer transition-transform hover:-translate-y-3 hover:-rotate-6 duration-300 relative group"
        >
          {activeGift === "gold" && (
            <div className="absolute -top-8 sm:-top-10 left-1/2 -translate-x-1/2 text-yellow-200 font-serif text-sm sm:text-xl animate-bounce whitespace-nowrap">
              Merry Christmas!
            </div>
          )}
          <Gift
            className="w-12 h-12 sm:w-14 sm:h-14 md:w-16 md:h-16 lg:w-20 lg:h-20 text-yellow-400 fill-yellow-500/30 -rotate-3 drop-shadow-[0_0_20px_rgba(250,204,21,0.4)]"
            strokeWidth={1.5}
          />
        </div>
      </div>
    </div>
  );
}

export default App;
