// ===== Smooth Scroll =====
document.querySelectorAll('.smooth-scroll').forEach(anchor => {
  anchor.addEventListener('click', function (e) {
    e.preventDefault();
    document.querySelector(this.getAttribute('href')).scrollIntoView({ behavior: 'smooth' });
  });
});

// ===== Dark Mode Toggle =====
const toggleBtn = document.getElementById('dark-mode-toggle');
toggleBtn.addEventListener('click', () => {
  document.body.classList.toggle('dark-mode');
  localStorage.setItem('darkMode', document.body.classList.contains('dark-mode'));
});
if (localStorage.getItem('darkMode') === 'true') {
  document.body.classList.add('dark-mode');
}

// ===== GSAP Animations =====
window.addEventListener('DOMContentLoaded', () => {
  if (typeof gsap !== "undefined") {
    gsap.from("header", { y: -100, opacity: 0, duration: 1, ease: "power4.out" });
    gsap.utils.toArray(".fade-in").forEach((el, i) => {
      gsap.from(el, { opacity: 0, y: 50, duration: 1, delay: i * 0.3, scrollTrigger: el });
    });
  }
});

// ===== AOS (if included) =====
if (typeof AOS !== "undefined") {
  AOS.init({
    duration: 1000,
    once: true
  });
}

// ===== Skill Bar Animation =====
const skillBars = document.querySelectorAll('.fill');
skillBars.forEach(bar => {
  bar.style.width = "0";
});
const observer = new IntersectionObserver(entries => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      skillBars.forEach(bar => {
        bar.style.width = bar.style.getPropertyValue('--width');
      });
    }
  });
}, { threshold: 0.3 });
document.querySelectorAll('.skills-grid').forEach(grid => observer.observe(grid));

// ===== Contact Form Submission =====
document.getElementById('contact-form').addEventListener('submit', function (e) {
  e.preventDefault();

  const name = document.getElementById('name').value.trim();
  const email = document.getElementById('email').value.trim();
  const message = document.getElementById('message').value.trim();

  if (name && /\S+@\S+\.\S+/.test(email) && message) {
    showSuccessPopup(name);
    this.reset();
  } else {
    showErrorPopup();
  }
});

// ===== Success Popup =====
function showSuccessPopup(name) {
  const popup = document.createElement('div');
  popup.innerHTML = `
    <div class="fixed inset-0 bg-black/60 flex items-center justify-center z-50">
      <div class="bg-white dark:bg-gray-800 p-8 rounded-xl shadow-2xl text-center max-w-sm animate-bounce">
        <h2 class="text-2xl font-bold text-green-600 mb-4">✅ Message Sent!</h2>
        <p class="mb-4">Thank you, <strong>${name}</strong>. I’ll get back to you soon.</p>
        <button id="close-popup" class="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700">Close</button>
      </div>
    </div>
  `;
  document.body.appendChild(popup);
  document.getElementById('close-popup').addEventListener('click', () => popup.remove());
}

// ===== Error Popup =====
function showErrorPopup() {
  const popup = document.createElement('div');
  popup.innerHTML = `
    <div class="fixed inset-0 bg-black/60 flex items-center justify-center z-50">
      <div class="bg-white dark:bg-gray-800 p-8 rounded-xl shadow-2xl text-center max-w-sm animate-shake">
        <h2 class="text-2xl font-bold text-red-600 mb-4">⚠️ Invalid Input</h2>
        <p class="mb-4">Please fill all fields correctly before sending.</p>
        <button id="close-error" class="bg-red-600 text-white px-4 py-2 rounded-lg hover:bg-red-700">Close</button>
      </div>
    </div>
  `;
  document.body.appendChild(popup);
  document.getElementById('close-error').addEventListener('click', () => popup.remove());
}