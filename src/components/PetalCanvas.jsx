import { useRef, useEffect } from 'react';

const PETAL_COLORS = ['#F48FB1', '#F06292', '#EC407A', '#FCE4EC', '#F8BBD0', '#FFB3C6'];
const PETAL_COUNT = 28;

function randomPetal(canvasWidth, canvasHeight, preload = false) {
  return {
    x: Math.random() * canvasWidth,
    y: preload ? Math.random() * canvasHeight : -20,
    r: 6 + Math.random() * 8,
    speed: 0.8 + Math.random() * 1.4,
    drift: (Math.random() - 0.5) * 0.6,
    rot: Math.random() * Math.PI * 2,
    rotSpeed: (Math.random() - 0.5) * 0.04,
    color: PETAL_COLORS[Math.floor(Math.random() * PETAL_COLORS.length)],
    alpha: 0.5 + Math.random() * 0.4,
  };
}

export default function PetalCanvas() {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');
    let rafId;

    const resize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };
    resize();

    let petals = Array.from({ length: PETAL_COUNT }, () =>
      randomPetal(canvas.width, canvas.height, true)
    );

    const draw = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      petals.forEach(p => {
        ctx.save();
        ctx.globalAlpha = p.alpha;
        ctx.translate(p.x, p.y);
        ctx.rotate(p.rot);
        ctx.fillStyle = p.color;
        ctx.beginPath();
        ctx.ellipse(0, 0, p.r, p.r * 0.55, 0, 0, Math.PI * 2);
        ctx.fill();
        ctx.restore();

        p.y += p.speed;
        p.x += p.drift + Math.sin(p.y * 0.02) * 0.4;
        p.rot += p.rotSpeed;

        if (p.y > canvas.height + 20) {
          Object.assign(p, randomPetal(canvas.width, canvas.height, false));
        }
      });
      rafId = requestAnimationFrame(draw);
    };

    draw();

    const handleResize = () => {
      cancelAnimationFrame(rafId);
      resize();
      petals = Array.from({ length: PETAL_COUNT }, () =>
        randomPetal(canvas.width, canvas.height, true)
      );
      draw();
    };
    window.addEventListener('resize', handleResize);

    return () => {
      cancelAnimationFrame(rafId);
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      aria-hidden="true"
      style={{ position: 'fixed', inset: 0, zIndex: 0, pointerEvents: 'none' }}
    />
  );
}
