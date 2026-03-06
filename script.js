// ===== WELCOME MODAL & BACKGROUND MUSIC =====
const welcomeModal = document.getElementById('welcomeModal');
const enterBtn = document.getElementById('enterBtn');
const soundToggle = document.getElementById('soundToggle');

// Créer l'élément audio pour la musique de fond
const bgMusic = new Audio();
// Vous devrez ajouter le fichier audio dans le dossier portfolio
// Pour l'instant, on utilise une URL de placeholder
bgMusic.src = 'audio/son.mp3'; // Ajoutez votre fichier audio ici
bgMusic.loop = true;
bgMusic.volume = 0.3;

let soundEnabled = true;

enterBtn.addEventListener('click', () => {
  welcomeModal.classList.add('hidden');
  
  // Démarrer la musique si activée
  if (soundEnabled) {
    bgMusic.play().catch(err => {
      console.log('Autoplay bloqué par le navigateur:', err);
    });
  }
  
  // Animation d'entrée
  document.body.style.animation = 'fadeIn 1s ease';
});

soundToggle.addEventListener('click', () => {
  soundEnabled = !soundEnabled;
  const icon = soundToggle.querySelector('i');
  
  if (soundEnabled) {
    icon.className = 'fas fa-volume-up';
    soundToggle.innerHTML = '<i class="fas fa-volume-up"></i> Son activé';
    if (!welcomeModal.classList.contains('hidden')) {
      // La musique démarrera au clic sur "Entrer"
    } else {
      bgMusic.play();
    }
  } else {
    icon.className = 'fas fa-volume-mute';
    soundToggle.innerHTML = '<i class="fas fa-volume-mute"></i> Son désactivé';
    bgMusic.pause();
  }
});

// ===== MODE TOGGLE =====
const modeToggle = document.getElementById('modeToggle');
const body = document.body;

// Charger le mode sauvegardé
const savedMode = localStorage.getItem('theme') || 'light-mode';
body.className = savedMode;
updateModeIcon();

modeToggle.addEventListener('click', () => {
  if (body.classList.contains('light-mode')) {
    body.classList.replace('light-mode', 'dark-mode');
    localStorage.setItem('theme', 'dark-mode');
  } else {
    body.classList.replace('dark-mode', 'light-mode');
    localStorage.setItem('theme', 'light-mode');
  }
  updateModeIcon();
});

function updateModeIcon() {
  const icon = modeToggle.querySelector('i');
  if (body.classList.contains('dark-mode')) {
    icon.className = 'fas fa-sun';
  } else {
    icon.className = 'fas fa-moon';
  }
}

// ===== SCROLL TO TOP BUTTON =====
const scrollToTopBtn = document.getElementById('scrollToTop');

window.addEventListener('scroll', () => {
  if (window.pageYOffset > 500) {
    scrollToTopBtn.classList.add('visible');
  } else {
    scrollToTopBtn.classList.remove('visible');
  }
});

scrollToTopBtn.addEventListener('click', () => {
  window.scrollTo({
    top: 0,
    behavior: 'smooth'
  });
});

// ===== MOBILE MENU =====
const mobileToggle = document.getElementById('mobileToggle');
const navMenu = document.getElementById('navMenu');

mobileToggle.addEventListener('click', () => {
  navMenu.classList.toggle('active');
  mobileToggle.classList.toggle('active');
});

// Fermer le menu au clic sur un lien
document.querySelectorAll('.nav-link').forEach(link => {
  link.addEventListener('click', () => {
    navMenu.classList.remove('active');
    mobileToggle.classList.remove('active');
  });
});

// ===== NAVBAR SCROLL =====
const navbar = document.getElementById('navbar');
let lastScroll = 0;

window.addEventListener('scroll', () => {
  const currentScroll = window.pageYOffset;
  
  if (currentScroll > 100) {
    navbar.style.padding = '0.5rem 0';
    navbar.style.boxShadow = '0 5px 30px rgba(0, 188, 212, 0.3)';
  } else {
    navbar.style.padding = '1rem 0';
    navbar.style.boxShadow = 'none';
  }
  
  lastScroll = currentScroll;
});

// ===== TYPING EFFECT =====
const typingText = document.querySelector('.typing-text');
const texts = [
  'Développeur Full-Stack',
  'Blockchain Enthusiast',
  'Ethical Hacker',
  'UI/UX Designer',
  'Creative Coder'
];

let textIndex = 0;
let charIndex = 0;
let isDeleting = false;

function typeEffect() {
  const currentText = texts[textIndex];
  
  if (isDeleting) {
    typingText.textContent = currentText.substring(0, charIndex - 1);
    charIndex--;
  } else {
    typingText.textContent = currentText.substring(0, charIndex + 1);
    charIndex++;
  }
  
  if (!isDeleting && charIndex === currentText.length) {
    setTimeout(() => isDeleting = true, 2000);
  } else if (isDeleting && charIndex === 0) {
    isDeleting = false;
    textIndex = (textIndex + 1) % texts.length;
  }
  
  const speed = isDeleting ? 50 : 100;
  setTimeout(typeEffect, speed);
}

typeEffect();

// ===== COUNTER ANIMATION =====
const counters = document.querySelectorAll('.stat-number');
const observerOptions = {
  threshold: 0.5
};

const counterObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      const counter = entry.target;
      const target = parseInt(counter.getAttribute('data-target'));
      const duration = 2000;
      const increment = target / (duration / 16);
      let current = 0;
      
      const updateCounter = () => {
        current += increment;
        if (current < target) {
          counter.textContent = Math.floor(current);
          requestAnimationFrame(updateCounter);
        } else {
          counter.textContent = target + '+';
        }
      };
      
      updateCounter();
      counterObserver.unobserve(counter);
    }
  });
}, observerOptions);

counters.forEach(counter => counterObserver.observe(counter));

// ===== SKILL BARS ANIMATION =====
const skillBars = document.querySelectorAll('.skill-progress');

const skillObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      const bar = entry.target;
      const progress = bar.getAttribute('data-progress');
      bar.style.width = progress + '%';
      skillObserver.unobserve(bar);
    }
  });
}, observerOptions);

skillBars.forEach(bar => skillObserver.observe(bar));

// ===== PROJECTS FILTER =====
const filterBtns = document.querySelectorAll('.filter-btn');
const projectCards = document.querySelectorAll('.project-card');

filterBtns.forEach(btn => {
  btn.addEventListener('click', () => {
    // Remove active class from all buttons
    filterBtns.forEach(b => b.classList.remove('active'));
    btn.classList.add('active');
    
    const filter = btn.getAttribute('data-filter');
    
    projectCards.forEach(card => {
      const categories = card.getAttribute('data-category');
      
      if (filter === 'all' || categories.includes(filter)) {
        card.style.display = 'block';
        setTimeout(() => {
          card.style.opacity = '1';
          card.style.transform = 'scale(1)';
        }, 10);
      } else {
        card.style.opacity = '0';
        card.style.transform = 'scale(0.8)';
        setTimeout(() => {
          card.style.display = 'none';
        }, 300);
      }
    });
  });
});

// ===== PARTICLES SYSTEM =====
const particlesContainer = document.getElementById('particles-container');
const particleCount = 50;

function createParticles() {
  for (let i = 0; i < particleCount; i++) {
    const particle = document.createElement('div');
    particle.className = 'particle';
    particle.style.left = Math.random() * 100 + '%';
    particle.style.animationDelay = Math.random() * 15 + 's';
    particle.style.animationDuration = (Math.random() * 10 + 10) + 's';
    
    // Random colors
    const colors = ['#00bcd4', '#00ffff', '#0097a7'];
    particle.style.background = colors[Math.floor(Math.random() * colors.length)];
    
    particlesContainer.appendChild(particle);
  }
}

createParticles();

// ===== 3D CANVAS BACKGROUND =====
const canvas = document.getElementById('canvas3d');
const ctx = canvas.getContext('2d');

canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

class Particle3D {
  constructor() {
    this.x = Math.random() * canvas.width;
    this.y = Math.random() * canvas.height;
    this.z = Math.random() * 1000;
    this.vx = (Math.random() - 0.5) * 0.5;
    this.vy = (Math.random() - 0.5) * 0.5;
    this.vz = Math.random() * 2 + 1;
  }
  
  update() {
    this.x += this.vx;
    this.y += this.vy;
    this.z -= this.vz;
    
    if (this.z <= 0) {
      this.z = 1000;
      this.x = Math.random() * canvas.width;
      this.y = Math.random() * canvas.height;
    }
    
    if (this.x < 0 || this.x > canvas.width) this.vx *= -1;
    if (this.y < 0 || this.y > canvas.height) this.vy *= -1;
  }
  
  draw() {
    const scale = 1000 / (1000 + this.z);
    const x2d = (this.x - canvas.width / 2) * scale + canvas.width / 2;
    const y2d = (this.y - canvas.height / 2) * scale + canvas.height / 2;
    const size = scale * 3;
    const opacity = (1000 - this.z) / 1000;
    
    ctx.fillStyle = `rgba(0, 188, 212, ${opacity * 0.5})`;
    ctx.beginPath();
    ctx.arc(x2d, y2d, size, 0, Math.PI * 2);
    ctx.fill();
  }
}

const particles3D = [];
for (let i = 0; i < 100; i++) {
  particles3D.push(new Particle3D());
}

function animate3D() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  
  particles3D.forEach(particle => {
    particle.update();
    particle.draw();
  });
  
  // Draw connections
  particles3D.forEach((p1, i) => {
    particles3D.slice(i + 1).forEach(p2 => {
      const dx = p1.x - p2.x;
      const dy = p1.y - p2.y;
      const distance = Math.sqrt(dx * dx + dy * dy);
      
      if (distance < 150) {
        const opacity = (150 - distance) / 150 * 0.2;
        ctx.strokeStyle = `rgba(0, 188, 212, ${opacity})`;
        ctx.lineWidth = 1;
        ctx.beginPath();
        ctx.moveTo(p1.x, p1.y);
        ctx.lineTo(p2.x, p2.y);
        ctx.stroke();
      }
    });
  });
  
  requestAnimationFrame(animate3D);
}

animate3D();

// Resize canvas
window.addEventListener('resize', () => {
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;
});

// ===== SCROLL ANIMATIONS (AOS) =====
const observeElements = document.querySelectorAll('[data-aos]');

const aosObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('aos-animate');
    }
  });
}, {
  threshold: 0.1,
  rootMargin: '0px 0px -100px 0px'
});

observeElements.forEach(el => aosObserver.observe(el));

// ===== SMOOTH SCROLL =====
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener('click', function (e) {
    e.preventDefault();
    const target = document.querySelector(this.getAttribute('href'));
    
    if (target) {
      const offsetTop = target.offsetTop - 80;
      window.scrollTo({
        top: offsetTop,
        behavior: 'smooth'
      });
    }
  });
});

// ===== PARALLAX EFFECT =====
window.addEventListener('scroll', () => {
  const scrolled = window.pageYOffset;
  
  // Hero parallax
  const heroImage = document.querySelector('.hero-image');
  if (heroImage) {
    heroImage.style.transform = `translateY(${scrolled * 0.3}px)`;
  }
  
  // Orbit rings
  const rings = document.querySelectorAll('.orbit-ring');
  rings.forEach((ring, index) => {
    ring.style.transform = `rotate(${scrolled * (0.05 + index * 0.02)}deg)`;
  });
});

// ===== 3D CARD TILT EFFECT =====
const cards3D = document.querySelectorAll('.card-3d, .floating-card');

cards3D.forEach(card => {
  card.addEventListener('mousemove', (e) => {
    const rect = card.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    
    const centerX = rect.width / 2;
    const centerY = rect.height / 2;
    
    const rotateX = (y - centerY) / 10;
    const rotateY = (centerX - x) / 10;
    
    card.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale3d(1.05, 1.05, 1.05)`;
  });
  
  card.addEventListener('mouseleave', () => {
    card.style.transform = 'perspective(1000px) rotateX(0) rotateY(0) scale3d(1, 1, 1)';
  });
});

// ===== CURSOR TRAIL EFFECT =====
const cursorTrail = [];
const trailLength = 20;

document.addEventListener('mousemove', (e) => {
  cursorTrail.push({ x: e.clientX, y: e.clientY, time: Date.now() });
  
  if (cursorTrail.length > trailLength) {
    cursorTrail.shift();
  }
  
  // Clean old trails
  document.querySelectorAll('.cursor-dot').forEach(dot => {
    const age = Date.now() - parseInt(dot.dataset.time);
    if (age > 1000) {
      dot.remove();
    }
  });
});

// ===== PROJECT MODAL (Optional) =====
const projectBtns = document.querySelectorAll('.btn-view');

projectBtns.forEach(btn => {
  btn.addEventListener('click', (e) => {
    e.stopPropagation();
    const projectId = btn.getAttribute('data-project');
    console.log('Opening project:', projectId);
    // Vous pouvez ajouter une modal ici pour afficher plus de détails
  });
});

// ===== TIMELINE ANIMATION =====
const timelineCards = document.querySelectorAll('.timeline-card');

const timelineObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.style.opacity = '1';
      entry.target.style.transform = 'translateY(0) scale(1)';
    }
  });
}, {
  threshold: 0.2
});

timelineCards.forEach(card => {
  card.style.opacity = '0';
  card.style.transform = 'translateY(50px) scale(0.9)';
  timelineObserver.observe(card);
});

// ===== LOADING ANIMATION =====
window.addEventListener('load', () => {
  document.body.style.opacity = '0';
  setTimeout(() => {
    document.body.style.transition = 'opacity 1s';
    document.body.style.opacity = '1';
  }, 100);
});

// ===== EASTER EGG - KONAMI CODE =====
let konamiCode = [];
const konamiSequence = ['ArrowUp', 'ArrowUp', 'ArrowDown', 'ArrowDown', 'ArrowLeft', 'ArrowRight', 'ArrowLeft', 'ArrowRight', 'b', 'a'];

document.addEventListener('keydown', (e) => {
  konamiCode.push(e.key);
  konamiCode = konamiCode.slice(-10);
  
  if (konamiCode.join(',') === konamiSequence.join(',')) {
    activateEasterEgg();
  }
});

function activateEasterEgg() {
  // Animation spéciale
  document.body.style.animation = 'rainbow 2s infinite';
  
  // Créer des confettis
  for (let i = 0; i < 100; i++) {
    createConfetti();
  }
  
  setTimeout(() => {
    document.body.style.animation = '';
  }, 5000);
}

function createConfetti() {
  const confetti = document.createElement('div');
  confetti.style.position = 'fixed';
  confetti.style.width = '10px';
  confetti.style.height = '10px';
  confetti.style.background = `hsl(${Math.random() * 360}, 100%, 50%)`;
  confetti.style.left = Math.random() * 100 + '%';
  confetti.style.top = '-10px';
  confetti.style.borderRadius = '50%';
  confetti.style.pointerEvents = 'none';
  confetti.style.zIndex = '9999';
  
  document.body.appendChild(confetti);
  
  const animation = confetti.animate([
    { transform: 'translateY(0) rotate(0deg)', opacity: 1 },
    { transform: `translateY(${window.innerHeight}px) rotate(${Math.random() * 360}deg)`, opacity: 0 }
  ], {
    duration: Math.random() * 2000 + 2000,
    easing: 'cubic-bezier(0.25, 0.46, 0.45, 0.94)'
  });
  
  animation.onfinish = () => confetti.remove();
}

// ===== PERFORMANCE OPTIMIZATION =====
// Lazy load images
const images = document.querySelectorAll('img[data-src]');
const imageObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      const img = entry.target;
      img.src = img.dataset.src;
      img.removeAttribute('data-src');
      imageObserver.unobserve(img);
    }
  });
});

images.forEach(img => imageObserver.observe(img));

// ===== CONSOLE MESSAGE =====
console.log('%c🎨 Bienvenue dans l\'univers StomaDev !', 'font-size: 24px; color: #00bcd4; font-weight: bold; text-shadow: 0 0 10px #00bcd4;');
console.log('%c👋 Salut ! Tu es curieux ?', 'font-size: 18px; color: #00ffff; font-weight: bold;');
console.log('%cSi tu veux discuter de code, contacte-moi !', 'font-size: 14px; color: #00bcd4;');
console.log('%c📧 stomadev@exemple.com', 'font-size: 12px; color: #0097a7;');
console.log('%c🚀 Portfolio développé avec passion en Côte d\'Ivoire 🇨🇮', 'font-size: 12px; color: #00bcd4; font-style: italic;');

// ===== ANALYTICS (Optional) =====
// Track page views
const trackPageView = () => {
  console.log('Page viewed:', window.location.pathname);
  // Vous pouvez intégrer Google Analytics ou autre ici
};

trackPageView();

// Track section views
const sections = document.querySelectorAll('section[id]');
const sectionObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      console.log('Section viewed:', entry.target.id);
      // Analytics tracking
    }
  });
}, {
  threshold: 0.5
});

sections.forEach(section => sectionObserver.observe(section));

// ===== PREVENT CONTEXT MENU (Optional) =====
// Décommenter si vous voulez protéger vos images
// document.addEventListener('contextmenu', (e) => {
//   if (e.target.tagName === 'IMG') {
//     e.preventDefault();
//   }
// });

console.log('Bienvenue dans l\'univers de Stoma !');
