import { createSignal, onCleanup, onMount } from "solid-js";
import { twMerge } from "tailwind-merge";

const WIDTH = 600;
const HEIGHT = 120;
const AMPLITUDE = 40;
const FREQUENCY = 2; // Number of full waves across the width
const POINTS = 200; // Number of points across wave
const SPEED = Math.PI / 3; // radians per second One full cycle in ~6 seconds

function getWavePath(offset: number) {
  let d = "";
  for (let i = 0; i <= POINTS; i++) {
    const x = (i / POINTS) * WIDTH;
    // Notice the minus sign for offset! - this makes the wave move from left to right
    const y = HEIGHT / 2 +
      AMPLITUDE * Math.sin(FREQUENCY * (2 * Math.PI * x) / WIDTH - offset);
    d += i === 0 ? `M ${x},${y}` : ` L ${x},${y}`;
  }
  return d;
}

export default function SineWave({className}: {className?: string}) {
  const [path, setPath] = createSignal(getWavePath(0));

  const classes = twMerge(
    className,
    "bg-surface-main-light dark:bg-surface-main-dark"
  );

  onMount(() => {
    let running = true;
    let start = performance.now();

    function animate(now: number) {
      if (!running) return;
      const elapsed = (now - start) / 1000;
      const offset = SPEED * elapsed;
      setPath(getWavePath(offset));
      requestAnimationFrame(animate);
    }

    requestAnimationFrame(animate);

    onCleanup(() => {
      running = false;
    });
  });

  return (
    <svg
      width={WIDTH}
      height={HEIGHT}
      class={classes}
    >
      <defs>
        <filter id="blurMe" x="-10%" y="-10%" width="120%" height="120%">
          <feGaussianBlur stdDeviation="4" />
        </filter>
      </defs>
      <path
        d={path()}
        stroke="var(--color-primary)"
        stroke-width="3"
        fill="none"
        stroke-linecap="round"
        filter="url(#blurMe)"
      />
    </svg>
  );
}
