import { useState, useEffect } from "react";

const CountdownTimer = () => {
  const [timeLeft, setTimeLeft] = useState(calculateTimeLeft());

  function calculateTimeLeft() {
    // Get current UTC time
    const now = new Date();
    const nowUTC = Date.UTC(
      now.getUTCFullYear(),
      now.getUTCMonth(),
      now.getUTCDate(),
      now.getUTCHours(),
      now.getUTCMinutes(),
      now.getUTCSeconds()
    );

    // Get user's timezone offset in hours
    const timezoneOffset = -now.getTimezoneOffset() / 60;

    let targetYear = now.getUTCFullYear();

    let christmasUTC =
      Date.UTC(targetYear, 11, 25, 0, 0, 0) - timezoneOffset * 60 * 60 * 1000;

    // If Christmas has passed, target next year
    if (nowUTC >= christmasUTC) {
      targetYear = year + 1;
      christmasUTC =
        Date.UTC(targetYear, 11, 25, 0, 0, 0) - timezoneOffset * 60 * 60 * 1000;
    }

    const difference = christmasUTC - nowUTC;

    let timeLeft = {};

    if (difference > 0) {
      timeLeft = {
        days: Math.floor(difference / (1000 * 60 * 60 * 24)),
        hours: Math.floor((difference / (1000 * 60 * 60)) % 24),
        minutes: Math.floor((difference / 1000 / 60) % 60),
        seconds: Math.floor((difference / 1000) % 60),
      };
    } else {
      timeLeft = { days: 0, hours: 0, minutes: 0, seconds: 0 };
    }

    return timeLeft;
  }

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft(calculateTimeLeft());
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  const timeUnits = [
    { label: "Days", value: timeLeft.days },
    { label: "Hours", value: timeLeft.hours },
    { label: "Min", value: timeLeft.minutes },
    { label: "Sec", value: timeLeft.seconds },
  ];

  return (
    <div className="flex flex-wrap justify-center gap-2 sm:gap-4 md:gap-6 lg:gap-8 z-10 relative px-2">
      {timeUnits.map((unit, index) => (
        <div
          key={index}
          className="flex flex-col items-center group cursor-default"
        >
          <div className="w-16 h-16 sm:w-20 sm:h-20 md:w-28 md:h-28 lg:w-32 lg:h-32 bg-white/5 backdrop-blur-xl rounded-xl sm:rounded-2xl border border-white/10 flex items-center justify-center shadow-[0_4px_30px_rgba(0,0,0,0.1)] transition-all duration-300 group-hover:border-white/30 group-hover:bg-white/10 group-hover:shadow-[0_0_20px_rgba(255,255,255,0.2)]">
            <span className="text-2xl sm:text-3xl md:text-5xl lg:text-6xl font-black text-white drop-shadow-lg font-mono">
              {String(unit.value || 0).padStart(2, "0")}
            </span>
          </div>
          <span className="mt-2 sm:mt-4 text-[10px] sm:text-xs md:text-sm text-blue-200/80 font-bold tracking-[0.1em] sm:tracking-[0.2em] uppercase">
            {unit.label}
          </span>
        </div>
      ))}
    </div>
  );
};

export default CountdownTimer;
