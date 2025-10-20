// Load saved counts or initialize to 0
const counts = {
  tasbih: Number.parseInt(localStorage.getItem("tasbihCount")) || 0,
  tahmeed: Number.parseInt(localStorage.getItem("tahmeedCount")) || 0,
  takbeer: Number.parseInt(localStorage.getItem("takbeerCount")) || 0,
  tahleel: Number.parseInt(localStorage.getItem("tahleelCount")) || 0,
  istighfar: Number.parseInt(localStorage.getItem("istighfarCount")) || 0,
}

// Update the display safely
function updateDisplay() {
  const ids = ["tasbih", "tahmeed", "takbeer", "tahleel", "istighfar"];
  ids.forEach(type => {
    const el = document.getElementById(`${type}Count`);
    if (el) el.textContent = counts[type]; // only update if element exists
  });
}

// Only call if at least one count element exists
document.addEventListener("DOMContentLoaded", () => {
  if (document.querySelector(".count")) {
    updateDisplay();
  }

  // Increment a dhikr
  window.increment = function(type) {
    counts[type]++;
    localStorage.setItem(`${type}Count`, counts[type]);
    updateDisplay();
    animate(type);
    if (navigator.vibrate) navigator.vibrate(30);
  };

  // Decrement a dhikr
  window.decrement = function(type) {
    if (counts[type] > 0) {
      counts[type]--;
      localStorage.setItem(`${type}Count`, counts[type]);
      updateDisplay();
      animate(type);
      if (navigator.vibrate) navigator.vibrate(20);
    }
  };

  // Reset a dhikr
  window.reset = function(type) {
    counts[type] = 0;
    localStorage.setItem(`${type}Count`, 0);
    updateDisplay();
  };

  // Animate
  function animate(type) {
    const element = document.getElementById(`${type}Count`);
    if (!element) return;
    element.classList.remove("pulse");
    void element.offsetWidth;
    element.classList.add("pulse");
    setTimeout(() => element.classList.remove("pulse"), 400);
  }

  // ===== Navbar Toggle =====
  const menuToggle = document.getElementById("menu-toggle");
  const navLinks = document.getElementById("nav-links");

  if (menuToggle && navLinks) {
    menuToggle.addEventListener("click", () => {
      navLinks.classList.toggle("show");
      menuToggle.classList.toggle("active");
    });

    // Optional: close menu when a link is clicked
    //navLinks.querySelectorAll("a").forEach(link => {
    //  link.addEventListener("click", () => {
    //    navLinks.classList.remove("show");
    //    menuToggle.classList.remove("active");
    //  });
    //});
  }
});
