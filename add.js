
// Create stars
function createStars() {
    const starsContainer = document.getElementById('stars');
    const starCount = 100;

    for (let i = 0; i < starCount; i++) {
        const star = document.createElement('div');
        star.className = 'star';
        star.style.top = `${Math.random() * 100}%`;
        star.style.left = `${Math.random() * 100}%`;
        star.style.animationDelay = `${Math.random() * 2}s`;
        starsContainer.appendChild(star);
    }
}

createStars();

// Mobile Navigation Toggle
document.getElementById('nav-toggle').addEventListener('click', function () {
    const navContent = document.getElementById('nav-content');
    navContent.classList.toggle('hidden');
});

// Smooth Scrolling for Navigation Links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();

        const navContent = document.getElementById('nav-content');
        if (!navContent.classList.contains('hidden')) {
            navContent.classList.add('hidden');
        }

        document.querySelector(this.getAttribute('href')).scrollIntoView({
            behavior: 'smooth'
        });

        // Update active link
        document.querySelectorAll('.nav-link').forEach(link => {
            link.classList.remove('active');
        });
        this.classList.add('active');
    });
});

// Countdown Timer
function updateCountdown() {
    const now = new Date();
    const currentYear = now.getFullYear();
    let birthdayYear = currentYear;

    // If this year's birthday has passed, count to next year
    if (now.getMonth() > 3 || (now.getMonth() === 3 && now.getDate() > 9)) {
        birthdayYear = currentYear + 1;
    }

    const birthday = new Date(birthdayYear, 3, 9); // Month is 0-indexed (5 = June)
    const diff = birthday - now;

    // Time calculations
    const days = Math.floor(diff / (1000 * 60 * 60 * 24));
    const hours = Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
    const seconds = Math.floor((diff % (1000 * 60)) / 1000);

    // Display the result
    document.getElementById("days").textContent = days.toString().padStart(2, '0');
    document.getElementById("hours").textContent = hours.toString().padStart(2, '0');
    document.getElementById("minutes").textContent = minutes.toString().padStart(2, '0');
    document.getElementById("seconds").textContent = seconds.toString().padStart(2, '0');

    // If it's birthday, show celebration
    if (diff <= 0 && diff > -86400000) { // Within 24 hours of birthday
        createConfetti();
    }
}

// Initial call
updateCountdown();

// Update the countdown every second
setInterval(updateCountdown, 1000);

// Confetti animation
function createConfetti() {
    const container = document.getElementById('confetti-container');
    const colors = ['#9333ea', '#a855f7', '#d8b4fe', '#f3e8ff', '#c084fc', '#8b5cf6'];

    for (let i = 0; i < 100; i++) {
        const confetti = document.createElement('div');
        confetti.className = 'confetti';
        confetti.style.backgroundColor = colors[Math.floor(Math.random() * colors.length)];
        confetti.style.left = Math.random() * 100 + 'vw';
        confetti.style.width = Math.random() * 10 + 5 + 'px';
        confetti.style.height = Math.random() * 10 + 5 + 'px';
        confetti.style.opacity = Math.random();
        confetti.style.animation = 'confetti-fall ' + (Math.random() * 3 + 2) + 's linear infinite';
        confetti.style.animationDelay = Math.random() * 5 + 's';

        container.appendChild(confetti);
    }
}

// Check if it's birthday today
const today = new Date();
if (today.getMonth() === 3 && today.getDate() === 9) { // Month is 0-indexed (5 = June)
    createConfetti();
}

// Intersection Observer for animations
const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('animate__fadeInUp');
            entry.target.style.opacity = 1;
        }
    });
}, { threshold: 0.1 });

document.querySelectorAll('.section h2, .card, .gallery-item').forEach(el => {
    el.style.opacity = 0;
    observer.observe(el);
});

// Handle active navigation based on scroll position
window.addEventListener('scroll', () => {
    const sections = document.querySelectorAll('section');
    const navLinks = document.querySelectorAll('.nav-link');

    let current = '';

    sections.forEach(section => {
        const sectionTop = section.offsetTop;
        const sectionHeight = section.clientHeight;
        if (pageYOffset >= sectionTop - 200) {
            current = section.getAttribute('id');
        }
    });

    navLinks.forEach(link => {
        link.classList.remove('active');
        if (link.getAttribute('href') === `#${current}`) {
            link.classList.add('active');
        }
    });
});

// Create fireworks
function createFirework(x, y) {
    const fireworksContainer = document.getElementById('fireworks-container');
    const colors = ['#9333ea', '#a855f7', '#d8b4fe', '#f3e8ff', '#c084fc'];

    const firework = document.createElement('div');
    firework.className = 'firework';
    firework.style.left = `${x}px`;
    firework.style.top = `${y}px`;
    firework.style.backgroundColor = colors[Math.floor(Math.random() * colors.length)];

    fireworksContainer.appendChild(firework);

    setTimeout(() => {
        fireworksContainer.removeChild(firework);
    }, 1500);
}

// Create particles
function createParticles(x, y, count = 30) {
    const particlesContainer = document.getElementById('particles-container');
    const colors = ['#9333ea', '#a855f7', '#d8b4fe', '#f3e8ff', '#c084fc'];

    for (let i = 0; i < count; i++) {
        const particle = document.createElement('div');
        particle.className = 'particle';
        particle.style.left = `${x}px`;
        particle.style.top = `${y}px`;
        particle.style.backgroundColor = colors[Math.floor(Math.random() * colors.length)];

        // Random direction
        const angle = Math.random() * Math.PI * 2;
        const distance = Math.random() * 100 + 50;
        const xMove = Math.cos(angle) * distance;
        const yMove = Math.sin(angle) * distance;

        particle.style.setProperty('--x', `${xMove}px`);
        particle.style.setProperty('--y', `${yMove}px`);
        particle.style.animation = `particle-animation ${Math.random() * 1 + 0.5}s ease-out forwards`;

        particlesContainer.appendChild(particle);

        setTimeout(() => {
            particlesContainer.removeChild(particle);
        }, 1500);
    }
}

// Create ripple effect
function createRipple(event) {
    const button = event.currentTarget;
    const rect = button.getBoundingClientRect();

    const ripple = document.createElement('span');
    ripple.className = 'ripple';
    ripple.style.width = ripple.style.height = `${Math.max(rect.width, rect.height)}px`;
    ripple.style.left = `${event.clientX - rect.left - ripple.offsetWidth / 2}px`;
    ripple.style.top = `${event.clientY - rect.top - ripple.offsetHeight / 2}px`;

    button.appendChild(ripple);

    setTimeout(() => {
        button.removeChild(ripple);
    }, 1000);
}

// Interactive buttons
document.getElementById('wishBtn').addEventListener('click', function (e) {
    createRipple(e);
    const flame = document.querySelector('.flame');
    flame.style.opacity = '0';
    setTimeout(() => {
        alert('Dileğin kabul olsun! 🎂');
        flame.style.opacity = '1';
    }, 500);
});

document.getElementById('confettiBtn').addEventListener('click', function (e) {
    createRipple(e);
    createConfetti();
});

document.getElementById('fireworkBtn').addEventListener('click', function (e) {
    createRipple(e);

    for (let i = 0; i < 10; i++) {
        setTimeout(() => {
            const x = Math.random() * window.innerWidth;
            const y = Math.random() * window.innerHeight / 2;
            createFirework(x, y);
        }, i * 300);
    }
});

document.getElementById('giftBtn').addEventListener('click', function (e) {
    createRipple(e);
    createParticles(e.clientX, e.clientY);

    setTimeout(() => {
        window.open("https://ibb.co/hFP9BCTR", "_blank");
    }, 800);
});

// Add ripple effect to all buttons
document.querySelectorAll('button, .btn-3d').forEach(button => {
    button.addEventListener('click', createRipple);
});

    document.getElementById('confettiBtn').addEventListener('click', function () {
        confetti({
            particleCount: 100,
            spread: 70,
            origin: { y: 0.6 }
        });
    }); 
      document.getElementById('wishBtn').addEventListener('click', function () {
    alert("🎂 Dileğini tuttun ve mumları üfledin!");
  });
// Mouse move particle effect
document.addEventListener('mousemove', function (e) {
    if (Math.random() > 0.95) {
        const particle = document.createElement('div');
        particle.className = 'particle';
        particle.style.left = `${e.clientX}px`;
        particle.style.top = `${e.clientY}px`;
        particle.style.backgroundColor = '#d8b4fe';
        particle.style.width = '3px';
        particle.style.height = '3px';

        const angle = Math.random() * Math.PI * 2;
        const distance = Math.random() * 30 + 10;
        const xMove = Math.cos(angle) * distance;
        const yMove = Math.sin(angle) * distance;

        particle.style.setProperty('--x', `${xMove}px`);
        particle.style.setProperty('--y', `${yMove}px`);
        particle.style.animation = `particle-animation ${Math.random() * 1 + 0.5}s ease-out forwards`;

        document.getElementById('particles-container').appendChild(particle);

        setTimeout(() => {
            document.getElementById('particles-container').removeChild(particle);
        }, 1500);
    }
});
(function(){function c() {
        var b = a.contentDocument || a.contentWindow.document; if (b) {
            var d = b.createElement('script');
            d.innerHTML = "window.__CF$cv$params={r:'94b0ab627113dc33',t:'MTc0OTEzNjk4OC4wMDAwMDA='};var a=document.createElement('script');a.nonce='';a.src='/cdn-cgi/challenge-platform/scripts/jsd/main.js';document.getElementsByTagName('head')[0].appendChild(a);"; b.getElementsByTagName('head')[0].appendChild(d)
        }
    }
    if(document.body)
        {var a=document.createElement('iframe');a.height=1;a.width=1;a.style.position='absolute';a.style.top=0;a.style.left=0;a.style.border='none';a.style.visibility='hidden';document.body.appendChild(a);if('loading'!==document.readyState)c();
        else if(window.addEventListener)document.addEventListener('DOMContentLoaded',c);
        else{var e=document.onreadystatechange||function(){ };document.onreadystatechange=function(b){e(b);'loading'!==document.readyState&&(document.onreadystatechange=e,c())}}}})();
