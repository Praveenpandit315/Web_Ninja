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
// Medicine data
let medicines = [
  {
    id: 1,
    name: "Aspirin",
    dosage: "100mg",
    time: "09:00",
    instructions: "After breakfast",
    frequency: "daily",
    color: "blue",
    status: "pending",
    takenAt: null,
  },
  {
    id: 2,
    name: "Vitamin D3",
    dosage: "1000 IU",
    time: "13:00",
    instructions: "After lunch",
    frequency: "weekly",
    color: "red",
    status: "pending",
    takenAt: null,
  },
  {
    id: 3,
    name: "Omega-3",
    dosage: "500mg",
    time: "20:30",
    instructions: "After dinner",
    frequency: "daily",
    color: "purple",
    status: "taken",
    takenAt: "8:30 PM",
  },
  {
    id: 4,
    name: "Multivitamin",
    dosage: "1 tablet",
    time: "07:00",
    instructions: "Morning",
    frequency: "daily",
    color: "orange",
    status: "missed",
    takenAt: null,
  },
];

let nextId = 5;
let selectedColor = "blue";

// DOM elements
const medicineGrid = document.getElementById("medicine-grid");
const emptyState = document.getElementById("empty-state");
const addMedicineBtn = document.getElementById("add-medicine-btn");
const modal = document.getElementById("add-medicine-modal");
const closeModalBtn = document.getElementById("close-modal-btn");
const cancelBtn = document.getElementById("cancel-btn");
const medicineForm = document.getElementById("medicine-form");
const colorButtons = document.querySelectorAll(".color-btn");

// Initialize
renderMedicines();

// Event listeners
addMedicineBtn.addEventListener("click", () => openModal());
closeModalBtn.addEventListener("click", () => closeModal());
cancelBtn.addEventListener("click", () => closeModal());
medicineForm.addEventListener("submit", handleAddMedicine);

// Color selection
colorButtons.forEach((btn) => {
  btn.addEventListener("click", (e) => {
    e.preventDefault();
    colorButtons.forEach((b) => b.classList.remove("border-purple-600"));
    btn.classList.add("border-purple-600");
    selectedColor = btn.dataset.color;
    document.getElementById("medicine-color").value = selectedColor;
  });
});

// Close modal on outside click
modal.addEventListener("click", (e) => {
  if (e.target === modal) closeModal();
});

function openModal() {
  modal.classList.add("active");
  medicineForm.reset();
  selectedColor = "blue";
  colorButtons[0].classList.add("border-purple-600");
}

function closeModal() {
  modal.classList.remove("active");
}

function handleAddMedicine(e) {
  e.preventDefault();

  const newMedicine = {
    id: nextId++,
    name: document.getElementById("medicine-name").value,
    dosage: document.getElementById("medicine-dosage").value,
    time: document.getElementById("medicine-time").value,
    instructions:
      document.getElementById("medicine-instructions").value ||
      "No instructions",
    frequency: document.getElementById("medicine-frequency").value,
    color: selectedColor,
    status: "pending",
    takenAt: null,
  };

  medicines.push(newMedicine);
  renderMedicines();
  closeModal();
}

function renderMedicines() {
  if (medicines.length === 0) {
    medicineGrid.classList.add("hidden");
    emptyState.classList.remove("hidden");
    return;
  }

  medicineGrid.classList.remove("hidden");
  emptyState.classList.add("hidden");

  medicineGrid.innerHTML = medicines
    .map((medicine) => createMedicineCard(medicine))
    .join("");

  // Add event listeners
  document.querySelectorAll(".mark-taken-btn").forEach((btn) => {
    btn.addEventListener("click", () => markAsTaken(parseInt(btn.dataset.id)));
  });

  document.querySelectorAll(".take-now-btn").forEach((btn) => {
    btn.addEventListener("click", () => markAsTaken(parseInt(btn.dataset.id)));
  });

  document.querySelectorAll(".menu-btn").forEach((btn) => {
    btn.addEventListener("click", (e) =>
      toggleDropdown(e, parseInt(btn.dataset.id)),
    );
  });

  document.querySelectorAll(".delete-btn").forEach((btn) => {
    btn.addEventListener("click", () =>
      deleteMedicine(parseInt(btn.dataset.id)),
    );
  });

  document.querySelectorAll(".edit-btn").forEach((btn) => {
    btn.addEventListener("click", () => editMedicine(parseInt(btn.dataset.id)));
  });
}

function createMedicineCard(medicine) {
  const frequencyBadge =
    medicine.frequency === "daily"
      ? "badge-info"
      : medicine.frequency === "weekly"
        ? "badge-warning"
        : "badge-info";

  const timeUntil = calculateTimeUntil(medicine.time);
  const icon = getMedicineIcon(medicine.color);

  let statusHTML = "";
  if (medicine.status === "taken") {
    statusHTML = `
                    <div class="flex items-center space-x-2 text-sm text-green-600 dark:text-green-400">
                        <svg class="h-5 w-5" fill="currentColor" viewBox="0 0 20 20">
                            <path fill-rule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clip-rule="evenodd"></path>
                        </svg>
                        <span>Taken at ${medicine.takenAt}</span>
                    </div>
                    <span class="badge badge-success">Completed</span>
                `;
  } else if (medicine.status === "missed") {
    statusHTML = `
                    <div class="flex items-center space-x-2 text-sm text-red-600 dark:text-red-400 pulse">
                        <svg class="h-5 w-5" fill="currentColor" viewBox="0 0 20 20">
                            <path fill-rule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clip-rule="evenodd"></path>
                        </svg>
                        <span>Missed: ${medicine.time}</span>
                    </div>
                    <button class="take-now-btn px-4 py-2 bg-yellow-100 dark:bg-yellow-900 text-yellow-700 dark:text-yellow-300 rounded-lg hover:bg-yellow-200 dark:hover:bg-yellow-800 transition font-semibold" data-id="${medicine.id}">
                        Take Now
                    </button>
                `;
  } else {
    statusHTML = `
                    <div class="flex items-center space-x-2 text-sm text-gray-600 dark:text-gray-400">
                        <svg class="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"></path>
                        </svg>
                        <span>Next: ${medicine.time} ${timeUntil}</span>
                    </div>
                    <button class="mark-taken-btn px-4 py-2 bg-green-100 dark:bg-green-900 text-green-700 dark:text-green-300 rounded-lg hover:bg-green-200 dark:hover:bg-green-800 transition font-semibold" data-id="${medicine.id}">
                        Mark Taken
                    </button>
                `;
  }

  return `
                <div class="medicine-card card p-6 shadow-lg">
                    <div class="flex items-start justify-between mb-4">
                        <div class="flex items-start space-x-4">
                            <div class="bg-${medicine.color}-100 dark:bg-${medicine.color}-900 rounded-lg p-3">
                                ${icon}
                            </div>
                            <div>
                                <h3 class="font-bold text-xl mb-1 text-gray-900 dark:text-white">${medicine.name}</h3>
                                <p class="text-gray-600 dark:text-gray-400 text-sm">${medicine.dosage} • ${medicine.instructions}</p>
                                <span class="badge ${frequencyBadge} mt-2">${capitalize(medicine.frequency)}</span>
                            </div>
                        </div>
                        <div class="relative">
                            <button class="menu-btn text-gray-400 hover:text-gray-600 dark:hover:text-gray-300" data-id="${medicine.id}">
                                <svg class="h-6 w-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 5v.01M12 12v.01M12 19v.01M12 6a1 1 0 110-2 1 1 0 010 2zm0 7a1 1 0 110-2 1 1 0 010 2zm0 7a1 1 0 110-2 1 1 0 010 2z"></path>
                                </svg>
                            </button>
                            <div class="dropdown-menu" id="dropdown-${medicine.id}">
                                <div class="dropdown-item edit-btn text-gray-700 dark:text-gray-300" data-id="${medicine.id}">Edit</div>
                                <div class="dropdown-item delete-btn text-red-600 dark:text-red-400" data-id="${medicine.id}">Delete</div>
                            </div>
                        </div>
                    </div>
                    <div class="flex items-center justify-between flex-wrap gap-3">
                        ${statusHTML}
                    </div>
                </div>
            `;
}

function getMedicineIcon(color) {
  const icons = {
    blue: `<svg class="h-8 w-8 text-blue-600 dark:text-blue-400" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19.428 15.428a2 2 0 00-1.022-.547l-2.387-.477a6 6 0 00-3.86.517l-.318.158a6 6 0 01-3.86.517L6.05 15.21a2 2 0 00-1.806.547M8 4h8l-1 1v5.172a2 2 0 00.586 1.414l5 5c1.26 1.26.367 3.414-1.415 3.414H4.828c-1.782 0-2.674-2.154-1.414-3.414l5-5A2 2 0 009 10.172V5L8 4z"></path></svg>`,
    red: `<svg class="h-8 w-8 text-red-600 dark:text-red-400" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"></path></svg>`,
    purple: `<svg class="h-8 w-8 text-purple-600 dark:text-purple-400" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2"></path></svg>`,
    orange: `<svg class="h-8 w-8 text-orange-600 dark:text-orange-400" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8v13m0-13V6a2 2 0 112 2h-2zm0 0V5.5A2.5 2.5 0 109.5 8H12zm-7 4h14M5 12a2 2 0 110-4h14a2 2 0 110 4M5 12v7a2 2 0 002 2h10a2 2 0 002-2v-7"></path></svg>`,
  };
  return icons[color] || icons.blue;
}

function calculateTimeUntil(time) {
  const now = new Date();
  const [hours, minutes] = time.split(":").map(Number);
  const targetTime = new Date();
  targetTime.setHours(hours, minutes, 0);

  if (targetTime < now) {
    targetTime.setDate(targetTime.getDate() + 1);
  }

  const diff = targetTime - now;
  const hoursDiff = Math.floor(diff / (1000 * 60 * 60));

  if (hoursDiff === 0) {
    const minutesDiff = Math.floor(diff / (1000 * 60));
    return `(in ${minutesDiff} min)`;
  }
  return `(in ${hoursDiff} hour${hoursDiff > 1 ? "s" : ""})`;
}

function capitalize(str) {
  return str
    .split("-")
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
    .join(" ");
}

function markAsTaken(id) {
  const medicine = medicines.find((m) => m.id === id);
  if (medicine) {
    medicine.status = "taken";
    medicine.takenAt = new Date().toLocaleTimeString("en-US", {
      hour: "numeric",
      minute: "2-digit",
      hour12: true,
    });
    renderMedicines();
  }
}

function deleteMedicine(id) {
  if (confirm("Are you sure you want to delete this medicine?")) {
    medicines = medicines.filter((m) => m.id !== id);
    renderMedicines();
  }
}

function editMedicine(id) {
  alert("Edit functionality - Coming soon!");
}

function toggleDropdown(e, id) {
  e.stopPropagation();
  const dropdown = document.getElementById(`dropdown-${id}`);

  // Close all other dropdowns
  document.querySelectorAll(".dropdown-menu").forEach((menu) => {
    if (menu.id !== `dropdown-${id}`) {
      menu.classList.remove("active");
    }
  });

  dropdown.classList.toggle("active");
}

// Close dropdowns when clicking outside
document.addEventListener("click", () => {
  document.querySelectorAll(".dropdown-menu").forEach((menu) => {
    menu.classList.remove("active");
  });
});
// State management
let selectedSymptoms = new Set();

// DOM elements
const symptomButtons = document.querySelectorAll('.symptom-btn');
const analyzeBtn = document.getElementById('analyze-btn');
const selectionCount = document.getElementById('selection-count');
const resultContainer = document.getElementById('result-container');
const resultContent = document.getElementById('result-content');
const clearBtn = document.getElementById('clear-btn');

// Symptom button click handler
symptomButtons.forEach(button => {
  button.addEventListener('click', () => {
    const symptom = button.dataset.symptom;

    if (selectedSymptoms.has(symptom)) {
      selectedSymptoms.delete(symptom);
      button.classList.remove('selected');
    } else {
      selectedSymptoms.add(symptom);
      button.classList.add('selected');
    }

    updateUI();
  });
});

// Update UI based on selection
function updateUI() {
  const count = selectedSymptoms.size;

  if (count === 0) {
    selectionCount.textContent = 'No symptoms selected';
    analyzeBtn.disabled = true;
  } else {
    selectionCount.textContent = `${count} symptom${count > 1 ? 's' : ''} selected`;
    analyzeBtn.disabled = false;
  }
}

// Analyze button click handler
analyzeBtn.addEventListener('click', async () => {
  if (selectedSymptoms.size === 0) return;

  // Show loading state
  const originalText = analyzeBtn.innerHTML;
  analyzeBtn.innerHTML = '<span class="loading"></span><span class="ml-2">Analyzing...</span>';
  analyzeBtn.disabled = true;

  // Simulate AI analysis (replace with actual API call)
  await simulateAnalysis();

  // Show results
  displayResults();

  // Reset button
  analyzeBtn.innerHTML = originalText;
  analyzeBtn.disabled = false;
});

// Simulate AI analysis
function simulateAnalysis() {
  return new Promise(resolve => {
    setTimeout(resolve, 1500);
  });
}

// Display analysis results
function displayResults() {
  const symptoms = Array.from(selectedSymptoms);
  const symptomText = symptoms.map(s => s.replace('-', ' ')).join(', ');

  // Generate analysis based on symptoms
  let analysis = generateAnalysis(symptoms);

  resultContent.innerHTML = analysis;
  resultContainer.classList.remove('hidden');

  // Scroll to results
  resultContainer.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
}

// Generate analysis content
function generateAnalysis(symptoms) {
  let html = `<p class="mb-4"><strong>Selected Symptoms:</strong> ${symptoms.map(s => s.replace('-', ' ')).join(', ')}</p>`;

  // Simple logic for common combinations
  if (symptoms.includes('fever') && symptoms.includes('cough') && symptoms.includes('body-aches')) {
    html += `
                    <div class="mb-4">
                        <p class="font-semibold mb-2">Possible Condition: Flu-like Illness</p>
                        <p class="mb-2">Your symptoms are consistent with a viral infection such as influenza.</p>
                    </div>
                `;
  } else if (symptoms.includes('headache') && symptoms.includes('nausea')) {
    html += `
                    <div class="mb-4">
                        <p class="font-semibold mb-2">Possible Condition: Migraine or Tension Headache</p>
                        <p class="mb-2">The combination of headache and nausea may indicate a migraine or severe tension headache.</p>
                    </div>
                `;
  } else {
    html += `
                    <div class="mb-4">
                        <p class="font-semibold mb-2">General Assessment</p>
                        <p class="mb-2">Based on your symptoms, you may be experiencing a common illness.</p>
                    </div>
                `;
  }

  html += `
  <div class="bg-white dark:bg-gray-800 rounded-lg p-4 mb-4">
    <p class="font-semibold mb-2">Recommendations:</p>
    <ul class="list-disc list-inside space-y-1 text-sm">
      <li>Rest and stay hydrated</li>
      <li>Monitor your symptoms</li>
      <li>Consider over-the-counter medication if appropriate</li>
      <li>Consult a healthcare provider if symptoms worsen or persist</li>
    </ul>
  </div>
  <div class="bg-yellow-50 dark:bg-yellow-900 dark:bg-opacity-20 border border-yellow-200 dark:border-yellow-700 rounded-lg p-4">
    <p class="text-sm"><strong>⚠️ Disclaimer:</strong> This is not a medical diagnosis. Always consult with a qualified healthcare professional for proper medical advice.</p>
  </div>
            `;

  return html;
}

// Clear button handler
clearBtn.addEventListener('click', () => {
  selectedSymptoms.clear();
  symptomButtons.forEach(btn => btn.classList.remove('selected'));
  resultContainer.classList.add('hidden');
  updateUI();

  // Scroll back to top
  document.getElementById('symptoms').scrollIntoView({ behavior: 'smooth' });
});

// Initialize
updateUI();
