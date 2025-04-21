const canvas = document.getElementById("dots-canvas");
const ctx = canvas.getContext("2d");

canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

let mouse = {
  x: undefined,
  y: undefined,
};

window.addEventListener("mousemove", (e) => {
  mouse.x = e.x;
  mouse.y = e.y;
});

window.addEventListener("resize", () => {
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;
  initDots();
});

class Dot {
  constructor(x, y) {
    this.x = x;
    this.y = y;
    this.baseX = x;
    this.baseY = y;
    this.radius = 1.5;
  }

  draw() {
    ctx.beginPath();
    ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2);
    // ctx.fillStyle = "#888888";
    ctx.fillStyle = "rgba(255, 255, 255, 0.1)";
    // ctx.fillStyle = "#666666";
    ctx.fill();
  }

  update() {
    let dx = mouse.x - this.x;
    let dy = mouse.y - this.y;
    let dist = Math.sqrt(dx * dx + dy * dy);
    let maxDist = 37;
    let force = (maxDist - dist) / maxDist;

    if (dist < maxDist) {
      let angle = Math.atan2(dy, dx);
      this.x -= Math.cos(angle) * force * 10;
      this.y -= Math.sin(angle) * force * 10;
    } else {
      // Return to original position
      this.x += (this.baseX - this.x) * 0.05;
      this.y += (this.baseY - this.y) * 0.05;
    }

    this.draw();
  }
}

let dotsArray = [];

function initDots() {
  dotsArray = [];
  const spacing = 19;
  for (let y = spacing; y < canvas.height; y += spacing) {
    for (let x = spacing; x < canvas.width; x += spacing) {
      dotsArray.push(new Dot(x, y));
    }
  }
}

function animate() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  dotsArray.forEach((dot) => dot.update());
  requestAnimationFrame(animate);
}

// Typing animation
const typewriterText = document.getElementById("typewriter-text");

const phrases = [
  "Hey there 👋",
  "I'm Bharadwaja.",
  "Welcome to my personal website!",
];

let currentPhrase = 0;
let currentChar = 0;
let isDeleting = false;
let typingSpeed = 120;
let pauseTime = 1557;

function type() {
  const current = phrases[currentPhrase];
  if (isDeleting) {
    currentChar--;
  } else {
    currentChar++;
  }

  typewriterText.textContent = current.substring(0, currentChar);

  if (!isDeleting && currentChar === current.length) {
    setTimeout(() => {
      isDeleting = true;
      type();
    }, pauseTime);
    return;
  } else if (isDeleting && currentChar === 0) {
    isDeleting = false;
    currentPhrase = (currentPhrase + 1) % phrases.length;
  }

  setTimeout(type, isDeleting ? 40 : typingSpeed);
}

const hamburger = document.getElementById("hamburger");
const navLinks = document.getElementById("nav-links");

hamburger.addEventListener("click", () => {
  navLinks.classList.toggle("active");
});

initDots();
animate();
type();
