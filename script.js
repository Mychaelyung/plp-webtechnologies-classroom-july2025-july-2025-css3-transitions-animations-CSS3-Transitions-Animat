/* =================================================================
   PART 2: JAVASCRIPT FUNCTIONS - SCOPE, PARAMETERS & RETURN VALUES
   ================================================================= */

// Global variables
let globalAnimationCount = 0;
const globalColors = ["#ff6b6b", "#4ecdc4", "#45b7d1", "#f9ca24", "#f0932b"];

// Function: calculate delay
function calculateAnimationDelay(index, multiplier = 0.1) {
  const baseDelay = 100;
  const calculatedDelay = baseDelay * index * multiplier;
  globalAnimationCount++;
  console.log(
    `Animation #${globalAnimationCount} calculated with delay: ${calculatedDelay}ms`
  );
  return calculatedDelay;
}

// Function: create particle
function createParticle(x, y, size = 4, color = "rgba(255,255,255,0.3)") {
  const particle = document.createElement("div");
  particle.className = "particle";
  particle.style.left = x + "px";
  particle.style.top = y + "px";
  particle.style.width = size + "px";
  particle.style.height = size + "px";
  particle.style.background = color;
  particle.style.animationDelay = Math.random() * 2 + "s";
  return particle;
}

// Function: random color
function getRandomColor() {
  const randomIndex = Math.floor(Math.random() * globalColors.length);
  return globalColors[randomIndex];
}

/* =================================================================
   PART 3: CSS + JS Integration
   ================================================================= */

// Flip card
function flipCard(cardElement) {
  if (!cardElement) return false;
  cardElement.classList.toggle("flipped");
  return cardElement.classList.contains("flipped");
}

// Flip all cards
function triggerCardFlip() {
  const cards = document.querySelectorAll(".card");
  let flippedCount = 0;
  cards.forEach((card, index) => {
    setTimeout(() => {
      const wasFlipped = flipCard(card);
      if (wasFlipped) flippedCount++;
    }, calculateAnimationDelay(index, 0.2));
  });
  setTimeout(() => console.log(`Total cards flipped: ${flippedCount}`), 1000);
}

// Animate progress bars
function animateProgress(duration = 1000) {
  const progressBars = document.querySelectorAll(".progress-fill");
  progressBars.forEach((bar, index) => {
    const targetWidth = bar.getAttribute("data-width");
    bar.style.width = "0%";
    setTimeout(() => {
      bar.style.width = targetWidth + "%";
    }, calculateAnimationDelay(index, 0.1));
  });
  return progressBars.length;
}

// Modal controls
function showModal() {
  const modal = document.getElementById("modal");
  modal.classList.add("show");
  document.body.style.overflow = "hidden";
  return true;
}
function hideModal() {
  const modal = document.getElementById("modal");
  modal.classList.remove("show");
  document.body.style.overflow = "auto";
  return false;
}

// Loader
function toggleLoader() {
  const loader = document.getElementById("loader");
  const isVisible = loader.classList.contains("show");
  if (isVisible) loader.classList.remove("show");
  else {
    loader.classList.add("show");
    setTimeout(() => loader.classList.remove("show"), 3000);
  }
  return !isVisible;
}

// Pulse effect
function addPulseEffect(duration = 3000) {
  const buttons = document.querySelectorAll(".btn");
  const randomButton = buttons[Math.floor(Math.random() * buttons.length)];
  randomButton.classList.add("pulse");
  setTimeout(() => randomButton.classList.remove("pulse"), duration);
  return randomButton;
}

// Particles
function initializeParticles(count = 20) {
  const particlesContainer = document.getElementById("particles");
  for (let i = 0; i < count; i++) {
    const particle = createParticle(
      Math.random() * window.innerWidth,
      Math.random() * window.innerHeight,
      Math.random() * 4 + 2,
      getRandomColor() + "40"
    );
    particlesContainer.appendChild(particle);
  }
  return count;
}

// Dynamic animations
function createDynamicAnimation(
  element,
  animationType = "bounce",
  intensity = 1
) {
  if (!element) return null;
  const animationProps = {
    bounce: { transform: `translateY(-${10 * intensity}px)`, duration: "0.6s" },
    shake: { transform: `translateX(${5 * intensity}px)`, duration: "0.1s" },
    rotate: { transform: `rotate(${45 * intensity}deg)`, duration: "0.5s" },
    scale: { transform: `scale(${1 + 0.2 * intensity})`, duration: "0.3s" },
  };
  const props = animationProps[animationType] || animationProps.bounce;
  element.style.transition = `transform ${props.duration} ease-in-out`;
  element.style.transform = props.transform;
  setTimeout(() => {
    element.style.transform = "none";
  }, parseFloat(props.duration) * 1000);
  return props;
}

// Init
document.addEventListener("DOMContentLoaded", function () {
  const particleCount = initializeParticles(25);
  console.log(`Initialized ${particleCount} particles`);
  setTimeout(() => {
    const animatedBars = animateProgress();
    console.log(`Animated ${animatedBars} progress bars`);
  }, 1000);
  document.querySelectorAll(".card").forEach((card) => {
    card.addEventListener("mouseenter", () =>
      createDynamicAnimation(card, "scale", 0.5)
    );
  });
  document.getElementById("modal").addEventListener("click", function (e) {
    if (e.target === this) hideModal();
  });
  console.log(`Global animation count: ${globalAnimationCount}`);
  console.log(`Available colors: ${globalColors.length}`);
});
