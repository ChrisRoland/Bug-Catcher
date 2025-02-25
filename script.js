const screens = document.querySelectorAll(".screen");
const chooseBugBtn = document.querySelectorAll(".choose-bug-btn");
const startBtn = document.getElementById("start-btn");
const timeEl = document.getElementById("time");
const scoreEl = document.getElementById("score");
const message = document.getElementById("message");
const gameContainer = document.getElementById("game-container");

let seconds = 0;
let score = 0;
let selectedBug = {};

startBtn.addEventListener("click", () => screens[0].classList.add("up"));

chooseBugBtn.forEach((btn) => {
  btn.addEventListener("click", () => {
    const img = btn.querySelector("img");
    const src = img.getAttribute("src");
    const alt = img.getAttribute("alt");
    selectedBug = { src, alt };

    screens[1].classList.add("up");

    setTimeout(createBug(), 1000);
    startTimer();
  });
});

function startTimer() {
  setInterval(increaseTime, 1000);
}

function increaseTime() {
  let m = Math.floor(seconds / 60);
  let s = seconds % 50;

  m = m < 10 ? `0${m}` : m;
  s = s < 10 ? `0${s}` : s;

  timeEl.innerHTML = `Time: ${m}:${s}`;
  seconds++;
}

function createBug() {
  const bug = document.createElement("div");
  bug.classList.add("bug");

  const { x, y } = getRandomLocation();

  bug.style.top = `${y}px`;
  bug.style.left = `${x}px`;
  bug.innerHTML = `<img src="${selectedBug.src}" alt="${
    selectedBug.alt
  }" style="transform: rotate(${Math.random() * 360}deg);">`;

  bug.addEventListener("click", catchBug);

  gameContainer.appendChild(bug);
}

function getRandomLocation() {
  const width = window.innerWidth;
  const height = window.innerHeight;

  const x = Math.random() * (width - 200) + 100;
  const y = Math.random() * (height - 200) + 100;

  return { x, y };
}

function catchBug() {
  increaseScore();
  this.classList.add("caught");

  setTimeout(() => this.remove(), 2000);
  addBugs();
}

function addBugs() {
  setTimeout(createBug, 1000);
  setTimeout(createBug, 1500);
}

function increaseScore() {
  score++;

  if (score > 10) {
    message.classList.add("visible");
  }

  scoreEl.innerHTML = `Score: ${score}`;
}
