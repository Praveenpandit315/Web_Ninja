// Theme Toggle
function toggleTheme() {
  const body = document.body;
  const toggle = document.getElementById('theme-toggle');

  if (body.classList.contains('light-theme')) {
    body.classList.remove('light-theme');
    body.classList.add('dark-theme');
    toggle.classList.add('active');
    localStorage.setItem('theme', 'dark');
  } else {
    body.classList.remove('dark-theme');
    body.classList.add('light-theme');
    toggle.classList.remove('active');
    localStorage.setItem('theme', 'light');
  }
}

// Load saved theme
window.addEventListener('DOMContentLoaded', () => {
  const savedTheme = localStorage.getItem('theme') || 'light';
  const body = document.body;
  const toggle = document.getElementById('theme-toggle');

  if (savedTheme === 'dark') {
    body.classList.remove('light-theme');
    body.classList.add('dark-theme');
    toggle.classList.add('active');
  }
});

// Language Change
function changeLanguage(lang) {
  document.getElementById('current-language').textContent = lang;
  localStorage.setItem('language', lang);
  // In a real app, this would trigger translation
  console.log('Language changed to:', lang);
}

// Mobile Menu Toggle
document.getElementById('mobile-menu-btn').addEventListener('click', () => {
  const menu = document.getElementById('mobile-menu');
  menu.classList.toggle('hidden');
});

// Smooth Scrolling
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener('click', function (e) {
    e.preventDefault();
    const target = document.querySelector(this.getAttribute('href'));
    if (target) {
      target.scrollIntoView({
        behavior: 'smooth',
        block: 'start'
      });
      // Close mobile menu if open
      document.getElementById('mobile-menu').classList.add('hidden');
    }
  });
});

// Symptom Button Selection
document.querySelectorAll('.symptom-btn').forEach(btn => {
  btn.addEventListener('click', function () {
    this.classList.toggle('border-purple-600');
    this.classList.toggle('bg-purple-50');
  });
});

// Medicine Reminder Notification (Demo)
function showMedicineReminder() {
  if ('Notification' in window && Notification.permission === 'granted') {
    new Notification('Medicine Reminder', {
      body: 'Time to take your Aspirin!',
      icon: 'data:image/svg+xml,%3Csvg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="%23667eea"%3E%3Cpath d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z"/%3E%3C/svg%3E'
    });
  }
}

// Request notification permission on load
window.addEventListener('DOMContentLoaded', () => {
  if ('Notification' in window && Notification.permission === 'default') {
    Notification.requestPermission();
  }
});

// Navbar scroll effect
window.addEventListener('scroll', () => {
  const nav = document.querySelector('.navbar');
  if (window.scrollY > 50) {
    nav.style.boxShadow = '0 4px 20px rgba(0, 0, 0, 0.1)';
  } else {
    nav.style.boxShadow = '0 2px 10px rgba(0, 0, 0, 0.1)';
  }
});
