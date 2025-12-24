import { useState, useEffect, useRef } from "react";
import { Send, X, Copy, Snowflake } from "lucide-react";

// Mini snow effect for modal
const ModalSnowEffect = () => {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    const rect = canvas.getBoundingClientRect();
    canvas.width = rect.width;
    canvas.height = rect.height;

    const snowflakes = [];
    const snowflakeCount = 50;

    class Snowflake {
      constructor() {
        this.reset();
        this.y = Math.random() * canvas.height;
      }

      reset() {
        this.x = Math.random() * canvas.width;
        this.y = -10;
        this.r = Math.random() * 2 + 0.5;
        this.d = Math.random() * snowflakeCount;
        this.a = Math.random() * 0.4 + 0.2;
      }

      update() {
        this.y += 0.5 + this.r / 4;
        this.x += Math.sin(this.d) * 0.5;
        this.d += 0.01;

        if (this.y > canvas.height) {
          this.reset();
        }
      }

      draw() {
        ctx.fillStyle = `rgba(255, 255, 255, ${this.a})`;
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.r, 0, Math.PI * 2, true);
        ctx.fill();
      }
    }

    for (let i = 0; i < snowflakeCount; i++) {
      snowflakes.push(new Snowflake());
    }

    let animationFrameId;

    function animate() {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      snowflakes.forEach((f) => {
        f.update();
        f.draw();
      });
      animationFrameId = requestAnimationFrame(animate);
    }

    animate();

    return () => {
      cancelAnimationFrame(animationFrameId);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="absolute inset-0 w-full h-full pointer-events-none z-0 rounded-2xl"
    />
  );
};

const GreetingModal = ({ isOpen, onClose }) => {
  const [sender, setSender] = useState("");
  const [message, setMessage] = useState("");
  const [generatedLink, setGeneratedLink] = useState("");
  const [copied, setCopied] = useState(false);

  if (!isOpen) return null;

  const generateLink = () => {
    if (!message.trim()) return;
    const data = { s: sender, m: message };
    // Simple Base64 encoding "encryption"
    const encrypted = btoa(JSON.stringify(data));
    const url = `${window.location.origin}${window.location.pathname}?text=${encrypted}`;
    setGeneratedLink(url);
  };

  const copyToClipboard = () => {
    navigator.clipboard.writeText(generatedLink);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const resetForm = () => {
    setGeneratedLink("");
    setMessage("");
    setSender("");
    setCopied(false);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-2 sm:p-4">
      {/* Backdrop */}
      <div
        className="absolute inset-0 bg-black/70 backdrop-blur-md"
        onClick={onClose}
      ></div>

      {/* Modal */}
      <div className="relative bg-gradient-to-b from-[#1e3a5f] via-[#0f2744] to-[#0a1929] border border-white/20 p-4 sm:p-6 md:p-8 rounded-xl sm:rounded-2xl w-full max-w-[calc(100%-1rem)] sm:max-w-md shadow-[0_0_60px_rgba(100,180,255,0.15)] overflow-hidden max-h-[90vh] overflow-y-auto">
        {/* Snow effect inside modal */}
        <ModalSnowEffect />

        {/* Frost overlay at top */}
        <div className="absolute top-0 left-0 right-0 h-16 sm:h-24 bg-gradient-to-b from-white/10 to-transparent pointer-events-none rounded-t-xl sm:rounded-t-2xl"></div>

        {/* Snowflake decorations - hidden on very small screens */}
        <div className="absolute top-4 left-4 opacity-20 hidden sm:block">
          <Snowflake className="w-6 h-6 sm:w-8 sm:h-8 text-white animate-spin-slow" />
        </div>
        <div className="absolute top-8 right-12 opacity-15 hidden sm:block">
          <Snowflake className="w-4 h-4 sm:w-6 sm:h-6 text-white animate-spin-slow" style={{ animationDelay: "-2s" }} />
        </div>
        <div className="absolute bottom-16 left-8 opacity-10 hidden sm:block">
          <Snowflake className="w-8 h-8 sm:w-10 sm:h-10 text-white animate-spin-slow" style={{ animationDelay: "-4s" }} />
        </div>
        <div className="absolute bottom-8 right-6 opacity-15 hidden sm:block">
          <Snowflake className="w-4 h-4 sm:w-6 sm:h-6 text-white animate-spin-slow" style={{ animationDelay: "-1s" }} />
        </div>

        {/* Close button */}
        <button
          onClick={onClose}
          className="absolute top-2 right-2 sm:top-4 sm:right-4 text-white/50 hover:text-white transition-colors z-20 p-2 hover:bg-white/10 rounded-full"
        >
          <X className="w-5 h-5 sm:w-6 sm:h-6" />
        </button>

        {/* Content */}
        <div className="relative z-10">
          {/* Header with snowflake */}
          <div className="text-center mb-4 sm:mb-6 md:mb-8">
            <div className="inline-flex items-center justify-center w-12 h-12 sm:w-14 sm:h-14 md:w-16 md:h-16 rounded-full bg-white/10 backdrop-blur-sm border border-white/20 mb-2 sm:mb-4">
              <Snowflake className="w-6 h-6 sm:w-7 sm:h-7 md:w-8 md:h-8 text-blue-200" />
            </div>
            <h3 className="text-lg sm:text-xl md:text-2xl font-serif text-white drop-shadow-lg">
              Send a Special Greeting
            </h3>
            <p className="text-blue-200/60 text-xs sm:text-sm mt-1 sm:mt-2">
              Create a magical Christmas card
            </p>
          </div>

          {!generatedLink ? (
            <div className="space-y-4 sm:space-y-6">
              <div>
                <label htmlFor="sender-name" className="block text-xs sm:text-sm text-blue-100/70 mb-1 sm:mb-2 font-medium">
                  Your Name (Optional)
                </label>
                <input
                  id="sender-name"
                  name="sender-name"
                  value={sender}
                  onChange={(e) => setSender(e.target.value)}
                  className="w-full bg-white/5 border border-white/20 rounded-lg sm:rounded-xl p-3 sm:p-4 text-sm sm:text-base text-white placeholder-white/30 focus:outline-none focus:border-blue-400/50 focus:bg-white/10 transition-all backdrop-blur-sm"
                  placeholder="Santa Claus"
                  autoComplete="name"
                />
              </div>
              <div>
                <label htmlFor="greeting-message" className="block text-xs sm:text-sm text-blue-100/70 mb-1 sm:mb-2 font-medium">
                  Your Message
                </label>
                <textarea
                  id="greeting-message"
                  name="greeting-message"
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  className="w-full bg-white/5 border border-white/20 rounded-lg sm:rounded-xl p-3 sm:p-4 text-sm sm:text-base text-white placeholder-white/30 h-24 sm:h-32 focus:outline-none focus:border-blue-400/50 focus:bg-white/10 transition-all backdrop-blur-sm resize-none"
                  placeholder="Merry Christmas! Wishing you love and joy..."
                />
              </div>
              <button
                onClick={generateLink}
                disabled={!message.trim()}
                className="w-full bg-gradient-to-r from-red-500 to-red-600 hover:from-red-600 hover:to-red-700 disabled:from-gray-500 disabled:to-gray-600 disabled:cursor-not-allowed text-white font-bold py-3 sm:py-4 rounded-lg sm:rounded-xl transition-all flex items-center justify-center gap-2 shadow-lg hover:shadow-red-500/25 hover:scale-[1.02] active:scale-[0.98] text-sm sm:text-base"
              >
                <Send className="w-4 h-4 sm:w-5 sm:h-5" /> Generate Magic Link
              </button>
            </div>
          ) : (
            <div className="space-y-4 sm:space-y-6">
              <div className="p-3 sm:p-4 bg-green-500/20 border border-green-400/30 rounded-lg sm:rounded-xl text-green-100 text-center backdrop-blur-sm">
                <p className="font-medium text-sm sm:text-base">Your greeting card is ready!</p>
                <p className="text-xs sm:text-sm text-green-200/70 mt-1">Share this link with someone special</p>
              </div>
              <div className="flex gap-2">
                <input
                  readOnly
                  value={generatedLink}
                  className="flex-1 bg-white/5 border border-white/20 rounded-lg sm:rounded-xl p-3 sm:p-4 text-white text-xs sm:text-sm backdrop-blur-sm min-w-0"
                />
                <button
                  onClick={copyToClipboard}
                  className={`p-3 sm:p-4 rounded-lg sm:rounded-xl border transition-all flex-shrink-0 ${
                    copied
                      ? "bg-green-500/20 border-green-400/30 text-green-300"
                      : "bg-white/10 hover:bg-white/20 border-white/20 text-white"
                  }`}
                >
                  <Copy className="w-4 h-4 sm:w-5 sm:h-5" />
                </button>
              </div>
              {copied && (
                <p className="text-center text-green-300 text-xs sm:text-sm animate-pulse">
                  Copied to clipboard!
                </p>
              )}
              <button
                onClick={resetForm}
                className="w-full text-white/60 hover:text-white text-xs sm:text-sm py-2 transition-colors"
              >
                Create another card
              </button>
            </div>
          )}
        </div>

        {/* Bottom frost */}
        <div className="absolute bottom-0 left-0 right-0 h-12 sm:h-16 bg-gradient-to-t from-white/5 to-transparent pointer-events-none rounded-b-xl sm:rounded-b-2xl"></div>
      </div>
    </div>
  );
};

export default GreetingModal;
