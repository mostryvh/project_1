document.addEventListener('DOMContentLoaded', () => {
  let seconds = 0;
  const timerDisplay = document.getElementById('visit-timer');
  const resetBtn = document.getElementById('reset-timer-btn');

  function updateTimer() {
    seconds++;

    const hrs = Math.floor(seconds / 3600);
    const mins = Math.floor((seconds % 3600) / 60);
    const secs = seconds % 60;

    const formattedTime = 
      (hrs > 0 ? String(hrs).padStart(2, '0') + ':' : '') +
      String(mins).padStart(2, '0') + ':' +
      String(secs).padStart(2, '0');

    timerDisplay.textContent = `Time on site: ${formattedTime}`;
  }

  timerDisplay.textContent = "Time on site: 00:00";

  setInterval(updateTimer, 1000);

  resetBtn.addEventListener('click', () => {
    seconds = 0;
    timerDisplay.textContent = "Time on site: 00:00";
  });
});

 const canvas = document.getElementById("stars");
const ctx = canvas.getContext("2d");

let stars = [];
const numStars = 150;

function randomRange(min, max) {
  return Math.random() * (max - min) + min;
}

function createStars() {
  stars = [];
  for (let i = 0; i < numStars; i++) {
    stars.push({
      x: Math.random() * canvas.width,
      y: Math.random() * canvas.height,
      radius: randomRange(0.5, 1.5),
      speed: randomRange(0.01, 0.05),
      opacity: randomRange(0.2, 1),
      direction: Math.random() > 0.5 ? 1 : -1,
    });
  }
}

function resize() {
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;
  createStars();
}

function animate() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);

  stars.forEach(star => {
    star.x += star.speed * star.direction;
    if (star.x > canvas.width || star.x < 0) {
      star.direction *= -1;
    }
    ctx.beginPath();
    ctx.arc(star.x, star.y, star.radius, 0, 2 * Math.PI);
    ctx.fillStyle = `rgba(255, 255, 255, ${star.opacity})`;
    ctx.shadowBlur = 8;
    ctx.shadowColor = "white";
    ctx.fill();
  });

  requestAnimationFrame(animate);
}

window.addEventListener("resize", resize);

resize();
animate();

