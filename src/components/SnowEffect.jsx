import React, { useEffect } from "react";

const SnowEffect = () => {
  useEffect(() => {
    const canvas = document.getElementById("snow-canvas");
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    let width = window.innerWidth;
    let height = window.innerHeight;
    canvas.width = width;
    canvas.height = height;

    const snowflakes = [];
    const snowflakeCount = 200;

    class Snowflake {
      constructor() {
        this.reset();
        this.y = Math.random() * height; // Start scattered
      }

      reset() {
        this.x = Math.random() * width;
        this.y = -10;
        this.r = Math.random() * 2 + 1;
        this.d = Math.random() * snowflakeCount;
        this.a = Math.random() * 0.5 + 0.3;
        this.speed = Math.random() * 0.5 + 0.2;
      }

      update() {
        this.y += Math.cos(this.d) + 1 + this.r / 2;
        this.x += Math.sin(this.d); // Sway effect
        this.d += 0.01;

        if (this.y > height) {
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
      ctx.clearRect(0, 0, width, height);
      snowflakes.forEach((f) => {
        f.update();
        f.draw();
      });
      animationFrameId = requestAnimationFrame(animate);
    }

    animate();

    const handleResize = () => {
      width = window.innerWidth;
      height = window.innerHeight;
      canvas.width = width;
      canvas.height = height;
    };

    window.addEventListener("resize", handleResize);
    return () => {
      window.removeEventListener("resize", handleResize);
      cancelAnimationFrame(animationFrameId);
    };
  }, []);

  return (
    <canvas
      id="snow-canvas"
      className="fixed top-0 left-0 w-full h-full pointer-events-none z-0 mix-blend-screen"
    />
  );
};

export default SnowEffect;
