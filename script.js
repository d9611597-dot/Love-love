const UNLOCK_DATE = "2026-08-01T00:00:00";
const START_DATE = "2023-08-01T00:00:00"; // Anniversary start date

function checkLockStatus() {
  const targetTime = new Date(UNLOCK_DATE).getTime();

  const timer = setInterval(() => {
    const now = new Date().getTime();
    const diff = targetTime - now;

    if (diff <= 0) {
      clearInterval(timer);
      unlockWebsite();
    } else {
      const d = Math.floor(diff / (1000 * 60 * 60 * 24));
      const h = Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
      const m = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
      const s = Math.floor((diff % (1000 * 60)) / 1000);

      document.getElementById("lock-days").innerText = String(d).padStart(2, '0');
      document.getElementById("lock-hours").innerText = String(h).padStart(2, '0');
      document.getElementById("lock-minutes").innerText = String(m).padStart(2, '0');
      document.getElementById("lock-seconds").innerText = String(s).padStart(2, '0');
    }
  }, 1000);
}

function updateTogetherCounter() {
  const start = new Date(START_DATE).getTime();

  setInterval(() => {
    const now = new Date().getTime();
    const diff = now - start;

    const d = Math.floor(diff / (1000 * 60 * 60 * 24));
    const h = Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    const m = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
    const s = Math.floor((diff % (1000 * 60)) / 1000);

    const daysEl = document.getElementById("together-days");
    const hoursEl = document.getElementById("together-hours");
    const minsEl = document.getElementById("together-minutes");
    const secsEl = document.getElementById("together-seconds");

    if (daysEl) daysEl.innerText = d;
    if (hoursEl) hoursEl.innerText = String(h).padStart(2, '0');
    if (minsEl) minsEl.innerText = String(m).padStart(2, '0');
    if (secsEl) secsEl.innerText = String(s).padStart(2, '0');
  }, 1000);
}

function unlockWebsite() {
  const lockScreen = document.getElementById("lock-screen");
  const mainContent = document.getElementById("main-content");

  lockScreen.classList.add("hidden");
  mainContent.classList.remove("hidden");

  startFloatingParticles();
  updateTogetherCounter();
}

function bypassLock() {
  unlockWebsite();
  toggleMusic(true);
}

let isPlaying = false;
function toggleMusic(forcePlay = false) {
  const music = document.getElementById("bg-music");
  const musicBtn = document.getElementById("music-btn");

  if (!music) return;

  if (!isPlaying || forcePlay) {
    music.load();
    const playPromise = music.play();

    if (playPromise !== undefined) {
      playPromise.then(() => {
        isPlaying = true;
        if (musicBtn) musicBtn.innerText = "⏸️ Pause Song";
      }).catch(err => {
        console.log("Mobile autoplay prevented:", err);
        isPlaying = false;
        if (musicBtn) musicBtn.innerText = "🎵 Tap Play Player Below";
      });
    }
  } else {
    music.pause();
    isPlaying = false;
    if (musicBtn) musicBtn.innerText = "🎵 Play Our Song";
  }
}

/* STOP BACKGROUND MUSIC WHEN VIDEO PLAYS */
function stopAudioOnVideoPlay() {
  const music = document.getElementById("bg-music");
  const musicBtn = document.getElementById("music-btn");

  if (music && !music.paused) {
    music.pause();
    isPlaying = false;
    if (musicBtn) musicBtn.innerText = "🎵 Play Our Song";
  }
}

let slideIndex = 0;
function changeSlide(n) {
  const slides = document.getElementsByClassName("slide");
  slides[slideIndex].classList.remove("active");

  slideIndex = (slideIndex + n + slides.length) % slides.length;
  slides[slideIndex].classList.add("active");
}

/* COUPON REDEEM FUNCTION */
function redeemCoupon(btn, couponName) {
  if (btn.classList.contains("redeemed")) return;
  
  btn.classList.add("redeemed");
  btn.innerText = "Claimed! ❤️";
  
  alert(`Coupon Redeemed: ${couponName}! Get ready for your treat 🥰`);
}

function startFloatingParticles() {
  const canvas = document.getElementById("bg-canvas");
  const ctx = canvas.getContext("2d");

  function resize() {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
  }
  resize();
  window.addEventListener('resize', resize);

  const symbols = ['🌸', '💖', '✨', '🌹', '💕'];
  const particles = Array.from({ length: 30 }, () => ({
    x: Math.random() * canvas.width,
    y: Math.random() * canvas.height,
    size: Math.random() * 20 + 15,
    speedY: Math.random() * 1 + 0.5,
    symbol: symbols[Math.floor(Math.random() * symbols.length)]
  }));

  function animate() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    particles.forEach(p => {
      ctx.font = `${p.size}px serif`;
      ctx.fillText(p.symbol, p.x, p.y);
      p.y -= p.speedY;
      if (p.y < -30) {
        p.y = canvas.height + 30;
        p.x = Math.random() * canvas.width;
      }
    });
    requestAnimationFrame(animate);
  }
  animate();
}

let fireworksInterval;
function triggerFinale() {
  const finaleScreen = document.getElementById("finale-screen");
  finaleScreen.classList.remove("hidden");
  startFireworks();
}

function closeFinale() {
  const finaleScreen = document.getElementById("finale-screen");
  finaleScreen.classList.add("hidden");
  clearInterval(fireworksInterval);
}

function startFireworks() {
  const canvas = document.getElementById("fireworks-canvas");
  const ctx = canvas.getContext("2d");
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;

  let particles = [];

  function createFirework() {
    const x = Math.random() * canvas.width;
    const y = Math.random() * (canvas.height / 2);
    const color = `hsl(${Math.random() * 360}, 100%, 50%)`;

    for (let i = 0; i < 40; i++) {
      const angle = (Math.PI * 2 / 40) * i;
      const velocity = Math.random() * 4 + 2;
      particles.push({
        x, y,
        vx: Math.cos(angle) * velocity,
        vy: Math.sin(angle) * velocity,
        alpha: 1,
        color
      });
    }
  }

  fireworksInterval = setInterval(createFirework, 400);

  function render() {
    ctx.fillStyle = 'rgba(0, 0, 0, 0.2)';
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    particles.forEach((p, index) => {
      ctx.beginPath();
      ctx.arc(p.x, p.y, 3, 0, Math.PI * 2);
      ctx.fillStyle = p.color;
      ctx.globalAlpha = p.alpha;
      ctx.fill();

      p.x += p.vx;
      p.y += p.vy;
      p.alpha -= 0.015;

      if (p.alpha <= 0) particles.splice(index, 1);
    });

    const finaleScreen = document.getElementById("finale-screen");
    if (!finaleScreen.classList.contains("hidden")) {
      requestAnimationFrame(render);
    }
  }
  render();
}

/* FLOATING HEART ON TAP LOGIC */
document.addEventListener("click", function (e) {
  const heart = document.createElement("div");
  heart.className = "floating-tap-heart";
  
  const hearts = ["💖", "💗", "💕", "🌸", "✨"];
  heart.innerText = hearts[Math.floor(Math.random() * hearts.length)];
  
  heart.style.left = e.clientX + "px";
  heart.style.top = e.clientY + "px";

  document.body.appendChild(heart);

  setTimeout(() => {
    heart.remove();
  }, 1200);
});

checkLockStatus();