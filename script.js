// Smooth scrolling
document.querySelectorAll('.smooth-scroll').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
        e.preventDefault();
        document.querySelector(this.getAttribute('href')).scrollIntoView({ behavior: 'smooth' });
    });
});

// Form validation and submission
document.getElementById('contact-form').addEventListener('submit', function(e) {
    e.preventDefault();
    const name = document.getElementById('name').value.trim();
    const email = document.getElementById('email').value.trim();
    const message = document.getElementById('message').value.trim();
    if (name && email && /\S+@\S+\.\S+/.test(email) && message) {
        alert(`Message sent! Name: ${name}, Email: ${email}, Message: ${message} (In production, integrate with email API like EmailJS).`);
        this.reset();
    } else {
        alert('Please fill all fields correctly.');
    }
});

// Fade-in on scroll
const sections = document.querySelectorAll('.fade-in');
const observer = new IntersectionObserver(entries => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('visible');
        }
    });
}, { threshold: 0.1 });
sections.forEach(section => observer.observe(section));

// Dark mode toggle
document.getElementById('dark-mode-toggle').addEventListener('click', () => {
    document.body.classList.toggle('dark-mode');
    localStorage.setItem('darkMode', document.body.classList.contains('dark-mode'));
});

// Load dark mode preference
if (localStorage.getItem('darkMode') === 'true') {
    document.body.classList.add('dark-mode');
}

// Parallax effect (simple)
window.addEventListener('scroll', () => {
    document.querySelectorAll('.parallax').forEach(el => {
        const speed = 0.5;
        el.style.backgroundPositionY = `${window.scrollY * speed}px`;
    });
});