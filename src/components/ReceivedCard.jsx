import { useEffect, useRef } from "react";
import { Gift, TreePine, X, Snowflake } from "lucide-react";

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

const ReceivedCard = ({ data, onClose }) => {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-2 sm:p-4">
      {/* Backdrop */}
      <div
        className="absolute inset-0 bg-black/70 backdrop-blur-md"
        onClick={onClose}
      ></div>

      {/* Modal */}
      <div className="relative bg-gradient-to-b from-[#1e3a5f] via-[#0f2744] to-[#0a1929] border border-white/20 p-4 sm:p-6 md:p-8 lg:p-12 rounded-xl sm:rounded-2xl w-full max-w-[calc(100%-1rem)] sm:max-w-lg shadow-[0_0_60px_rgba(100,180,255,0.15)] overflow-hidden max-h-[90vh] overflow-y-auto">
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
        <div className="relative z-10 text-center">
          {/* Header with gift icon */}
          <div className="mb-4 sm:mb-6">
            <div className="inline-flex items-center justify-center w-14 h-14 sm:w-16 sm:h-16 md:w-20 md:h-20 rounded-full bg-white/10 backdrop-blur-sm border border-white/20 mb-2 sm:mb-4">
              <Gift className="w-7 h-7 sm:w-8 sm:h-8 md:w-10 md:h-10 text-red-400 animate-bounce" />
            </div>
            <h3 className="text-xl sm:text-2xl md:text-3xl font-serif text-white drop-shadow-lg">
              Special Delivery!
            </h3>
            {data.s && (
              <p className="text-blue-200/80 mt-1 sm:mt-2 font-sans uppercase tracking-widest text-xs sm:text-sm">
                From: {data.s}
              </p>
            )}
          </div>

          {/* Message card */}
          <div className="bg-white/5 border border-white/20 p-4 sm:p-6 rounded-lg sm:rounded-xl my-4 sm:my-6 backdrop-blur-sm relative overflow-hidden">
            <div className="absolute top-0 right-0 p-2 sm:p-4 opacity-10">
              <TreePine className="w-16 h-16 sm:w-20 sm:h-20 md:w-24 md:h-24" />
            </div>
            <p className="text-base sm:text-xl md:text-2xl font-serif leading-relaxed italic text-yellow-100 relative z-10">
              "{data.m}"
            </p>
          </div>

          <p className="text-blue-200/60 text-xs sm:text-sm mt-6 sm:mt-8">
            Merry Christmas & Happy New Year
          </p>
        </div>

        {/* Bottom frost */}
        <div className="absolute bottom-0 left-0 right-0 h-12 sm:h-16 bg-gradient-to-t from-white/5 to-transparent pointer-events-none rounded-b-xl sm:rounded-b-2xl"></div>
      </div>
    </div>
  );
};

export default ReceivedCard;
