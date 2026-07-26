// ===== mobile nav =====
const hamburger = document.getElementById('hamburger');
const mobileNav = document.getElementById('mobileNav');
hamburger.addEventListener('click', () => {
  hamburger.classList.toggle('is-open');
  mobileNav.classList.toggle('is-open');
});
mobileNav.querySelectorAll('a').forEach(a => {
  a.addEventListener('click', () => {
    hamburger.classList.remove('is-open');
    mobileNav.classList.remove('is-open');
  });
});

// ===== FAQ accordion =====
document.querySelectorAll('.faq-item').forEach(item => {
  const q = item.querySelector('.faq-q');
  const a = item.querySelector('.faq-a');
  q.addEventListener('click', () => {
    const isOpen = item.classList.contains('is-open');
    document.querySelectorAll('.faq-item.is-open').forEach(other => {
      if (other !== item) {
        other.classList.remove('is-open');
        other.querySelector('.faq-a').style.maxHeight = null;
      }
    });
    if (isOpen) {
      item.classList.remove('is-open');
      a.style.maxHeight = null;
    } else {
      item.classList.add('is-open');
      a.style.maxHeight = a.scrollHeight + 'px';
    }
  });
});

// ===== campus tabs (visual state only — same schedule shown for all in this demo) =====
document.querySelectorAll('.campus-tab').forEach(tab => {
  tab.addEventListener('click', () => {
    document.querySelectorAll('.campus-tab').forEach(t => t.classList.remove('is-active'));
    tab.classList.add('is-active');
  });
});

// ===== schedule type toggle (無料体験 / 講座) =====
document.querySelectorAll('.toggle-btn').forEach(btn => {
  btn.addEventListener('click', () => {
    document.querySelectorAll('.toggle-btn').forEach(b => b.classList.remove('is-active'));
    btn.classList.add('is-active');
  });
});

// ===== form submit (demo — no backend) =====
const form = document.getElementById('applyForm');
const formMsg = document.getElementById('formMsg');
form.addEventListener('submit', (e) => {
  e.preventDefault();
  formMsg.hidden = false;
  formMsg.scrollIntoView({ behavior: 'smooth', block: 'center' });
  form.reset();
});