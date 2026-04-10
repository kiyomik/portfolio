const tabs = document.querySelectorAll('.nav-tab');
const tabContents = document.querySelectorAll('.tab-content');

tabs.forEach(tab => {
  tab.addEventListener('click', () => {
    const target = tab.dataset.tab;

    tabs.forEach(t => t.classList.remove('active'));
    tab.classList.add('active');

    tabContents.forEach(content => {
      content.classList.remove('active');
      content.style.animation = 'none';
      content.offsetHeight;
      content.style.animation = '';
    });

    const targetSection = document.getElementById(target);
    targetSection.classList.add('active');

    triggerFadeIns(targetSection);

    if (target === 'resume') {
      animateSkillBars();
    }

    if (target === 'about') {
      animateCounters();
    }
  });
});

function triggerFadeIns(container) {
  const elements = container.querySelectorAll('.fade-in, .fade-in-delay');
  elements.forEach((el, i) => {
    el.classList.remove('visible');
    setTimeout(() => {
      el.classList.add('visible');
    }, i * 100);
  });
}

const observer = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('visible');
    }
  });
}, { threshold: 0.1 });

document.querySelectorAll('.fade-in, .fade-in-delay').forEach(el => {
  observer.observe(el);
});

triggerFadeIns(document.querySelector('.tab-content.active'));

function animateCounters() {
  const counters = document.querySelectorAll('.stat-number');
  counters.forEach(counter => {
    const target = parseInt(counter.dataset.count, 10);
    const duration = 1500;
    const start = performance.now();
    counter.textContent = '0';

    function update(now) {
      const elapsed = now - start;
      const progress = Math.min(elapsed / duration, 1);
      const ease = 1 - Math.pow(1 - progress, 3);
      counter.textContent = Math.round(target * ease);
      if (progress < 1) {
        requestAnimationFrame(update);
      }
    }
    requestAnimationFrame(update);
  });
}

animateCounters();

function animateSkillBars() {
  const fills = document.querySelectorAll('.skill-fill');
  fills.forEach((fill, i) => {
    fill.classList.remove('animate');
    setTimeout(() => {
      fill.classList.add('animate');
    }, i * 120);
  });
}

tabs.forEach(tab => {
  tab.addEventListener('mousedown', function (e) {
    const ripple = document.createElement('span');
    ripple.style.cssText = `
      position: absolute;
      border-radius: 50%;
      background: rgba(59,130,246,0.15);
      transform: scale(0);
      animation: ripple-effect 0.6s linear;
      pointer-events: none;
    `;
    const rect = this.getBoundingClientRect();
    const size = Math.max(rect.width, rect.height);
    ripple.style.width = ripple.style.height = size + 'px';
    ripple.style.left = (e.clientX - rect.left - size / 2) + 'px';
    ripple.style.top = (e.clientY - rect.top - size / 2) + 'px';
    this.appendChild(ripple);
    setTimeout(() => ripple.remove(), 600);
  });
});

const style = document.createElement('style');
style.textContent = `
  @keyframes ripple-effect {
    to { transform: scale(4); opacity: 0; }
  }
`;
document.head.appendChild(style);
